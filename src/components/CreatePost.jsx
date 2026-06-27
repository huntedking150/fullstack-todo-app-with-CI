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
      className="w-full max-w-2xl mx-auto rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl"
    >
      <div className="flex items-center gap-6 mb-5">
        <label
          htmlFor="title"
          className="w-24 text-base font-semibold text-slate-700 dark:text-slate-300 "
        >
          Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your blog title"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:focus:border-green-400 text-lg placeholder:text-slate-400 focus:border-green-500  focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 capitalize"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <br />

      <div className="flex items-center gap-6 mb-5">
        <label
          htmlFor="author"
          className="w-24 text-base font-semibold text-slate-700 dark:text-slate-300"
        >
          Author:{" "}
        </label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Enter your name"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:focus:border-green-400 text-lg placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 capitalize"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <br />

      <div className="flex items-start gap-6 mb-5">
        <label
          htmlFor="contents"
          className="w-24 text-base font-semibold text-slate-700 dark:text-slate-300"
        >
          Content:{" "}
        </label>
        <textarea
          name="contents"
          id="contents"
          placeholder="Enter your content here..."
          className="flex-1 min-h-36 rounded-xl border border-slate-300 px-4 py-3 text-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:focus:border-green-400 text-lg placeholder:text-slate-400 resize-none focus:border-green-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
      </div>

      <input
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Create"}
        disabled={!title || createPostMutation.isPending}
        className="w-full rounded-xl bg-blue-600 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-400"
      />

      <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-950 px-4 py-3 text-sm font-medium text-green-700">
        {createPostMutation.isSuccess ? <>Post created successfully!</> : null}
      </div>
    </form>
  );
}
