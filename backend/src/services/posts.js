import { Post } from '../db/models/post.js'

/**
 * Creates a new blog post and saves it to the database.
 */
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
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
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

/* Retrieves blog posts associated with one or more tags, with optional sorting.*/
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}

export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
