import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'
/**
 * Creates a new blog post and saves it to the database.
 */
export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

/*
 Internal helper function to fetch posts based on a MongoDB query and apply sorting.
 This function provides the core logic for all post listing operations.*/
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

/*Retrieves all blog posts from the database, with optional sorting.*/
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

/* Retrieves blog posts written by a specific author, with optional sorting.*/
export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

/* Retrieves blog posts associated with one or more tags, with optional sorting.*/
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

export async function updatePost(
  userId,
  postId,
  { title, author, contents, tags },
) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
