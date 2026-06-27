import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updatePost } from "../api/posts";

export function EditPostModal({ post, onClose }) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author || "");
  const [contents, setContents] = useState(post.contents || "");

  const updatePostMutation = useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      toast.success("Post updated successfully");

      onClose();
    },

    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePostMutation.mutate({
      id: post._id,
      post: {
        title,
        author,
        contents,
      },
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
          dark:bg-slate-900
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Edit Post
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-500
              transition-colors
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="edit-title"
              className="
                mb-1
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Title
            </label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-2.5
                text-slate-800
                transition-all
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:outline-none
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-slate-100
              "
            />
          </div>

          <div>
            <label
              htmlFor="edit-author"
              className="
                mb-1
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Author
            </label>

            <input
              id="edit-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-2.5
                text-slate-800
                transition-all
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:outline-none
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-slate-100
              "
            />
          </div>

          <div>
            <label
              htmlFor="edit-contents"
              className="
                mb-1
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Contents
            </label>

            <textarea
              id="edit-contents"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              rows={6}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-slate-800
                transition-all
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                focus:outline-none
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-slate-100
              "
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-slate-300
                px-5
                py-2.5
                font-medium
                text-slate-700
                transition-colors
                hover:bg-slate-100
                dark:border-slate-600
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updatePostMutation.isPending}
              className="
                rounded-xl
                bg-indigo-600
                px-5
                py-2.5
                font-medium
                text-white
                transition-colors
                hover:bg-indigo-700
                disabled:opacity-50
              "
            >
              {updatePostMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditPostModal.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    contents: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
