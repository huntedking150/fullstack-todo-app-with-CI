import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../api/posts";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 rounded-lg bg-indigo-100 w-fit p-7"
    >
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your blog title"
          className="outline-2 rounded-lg px-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Enter your name"
          className="outline-2 rounded-lg px-1"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <br />

      <div className="flex gap-x-1">
        <label htmlFor="contents">Content: </label>
        <textarea
          name="contents"
          id="contents"
          placeholder="Enter your content here..."
          className="outline-2 rounded-lg px-1 resize-none"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
      </div>

      <br />
      <br />
      <input
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Create"}
        disabled={!title || createPostMutation.isPending}
        className="rounded-md bg-blue-700 px-14 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-800 cursor-pointer"
      />

      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  );
}
