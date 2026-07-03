import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, test } from '@jest/globals'

import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { createUser, loginUser, getUserInfoById } from '../services/users.js'

describe('posts service', () => {
  let author

  beforeEach(async () => {
    await Post.deleteMany({})
    await User.deleteMany({})
    author = await User.create({ username: 'alice', password: 'secret123' })
  })

  test('createPost stores a post with the provided author and tags', async () => {
    const createdPost = await createPost(author._id, {
      title: 'Hello Mongoose',
      contents: 'This post is stored in MongoDB.',
      tags: ['mongoose', 'mongodb'],
    })

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const savedPost = await Post.findById(createdPost._id)
    expect(savedPost.title).toBe('Hello Mongoose')
    expect(savedPost.contents).toBe('This post is stored in MongoDB.')
    expect(savedPost.tags).toEqual(['mongoose', 'mongodb'])
    expect(savedPost.author.toString()).toBe(author._id.toString())
  })

  test('listAllPosts returns posts newest first by default', async () => {
    await createPost(author._id, {
      title: 'First',
      contents: 'One',
      tags: ['news'],
    })
    await createPost(author._id, {
      title: 'Second',
      contents: 'Two',
      tags: ['tech'],
    })

    const posts = await listAllPosts()

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Second')
    expect(posts[1].title).toBe('First')
  })

  test('listPostsByAuthor and listPostsByTag filter posts correctly', async () => {
    const secondAuthor = await User.create({
      username: 'bob',
      password: 'secret456',
    })

    await createPost(author._id, {
      title: 'Alice post',
      contents: 'A',
      tags: ['react'],
    })
    await createPost(secondAuthor._id, {
      title: 'Bob post',
      contents: 'B',
      tags: ['node'],
    })

    const byAuthor = await listPostsByAuthor('alice')
    const byTag = await listPostsByTag(['react'])

    expect(byAuthor).toHaveLength(1)
    expect(byAuthor[0].title).toBe('Alice post')
    expect(byTag).toHaveLength(1)
    expect(byTag[0].title).toBe('Alice post')
  })

  test('getPostById, updatePost, and deletePost work for owned posts', async () => {
    const createdPost = await createPost(author._id, {
      title: 'Original title',
      contents: 'Original body',
      tags: ['original'],
    })

    const fetchedPost = await getPostById(createdPost._id)
    expect(fetchedPost.title).toBe('Original title')

    const updatedPost = await updatePost(author._id, createdPost._id, {
      title: 'Updated title',
      author: author._id,
      contents: 'Updated body',
      tags: ['updated'],
    })
    expect(updatedPost.title).toBe('Updated title')
    expect(updatedPost.contents).toBe('Updated body')

    const deleteResult = await deletePost(author._id, createdPost._id)
    expect(deleteResult.deletedCount).toBe(1)
    expect(await Post.findById(createdPost._id)).toBeNull()
  })

  test('updatePost and deletePost return null or zero when the post is not owned by the user', async () => {
    const createdPost = await createPost(author._id, {
      title: 'Owned by alice',
      contents: 'Body',
      tags: ['test'],
    })

    const updatedPost = await updatePost(
      new mongoose.Types.ObjectId(),
      createdPost._id,
      {
        title: 'Should not update',
        author: author._id,
        contents: 'Nope',
        tags: ['blocked'],
      },
    )
    expect(updatedPost).toBeNull()

    const deleteResult = await deletePost(
      new mongoose.Types.ObjectId(),
      createdPost._id,
    )
    expect(deleteResult.deletedCount).toBe(0)
  })
})

describe('users service', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    process.env.JWT_SECRET = 'test-secret'
  })

  test('createUser hashes the password and persists the user', async () => {
    const createdUser = await createUser({
      username: 'carol',
      password: 'super-secret',
    })

    expect(createdUser.username).toBe('carol')
    expect(createdUser.password).not.toBe('super-secret')

    const savedUser = await User.findById(createdUser._id)
    expect(savedUser.username).toBe('carol')
    expect(savedUser.password).not.toBe('super-secret')
  })

  test('loginUser returns a valid token for correct credentials', async () => {
    const createdUser = await createUser({
      username: 'dave',
      password: 'password123',
    })

    const token = await loginUser({ username: 'dave', password: 'password123' })

    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
    expect(jwt.verify(token, process.env.JWT_SECRET)).toMatchObject({
      sub: createdUser._id.toString(),
    })
  })

  test('getUserInfoById returns the username for an existing user and a fallback for unknown ids', async () => {
    const createdUser = await createUser({
      username: 'erin',
      password: 'password123',
    })

    const existingUser = await getUserInfoById(createdUser._id)
    const missingUser = await getUserInfoById(new mongoose.Types.ObjectId())

    expect(existingUser).toEqual({ username: 'erin' })
    expect(missingUser).toEqual({ username: missingUser.username })
  })
})
