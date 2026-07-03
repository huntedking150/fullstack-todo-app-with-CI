import PropTypes from "prop-types";
import { SquarePen, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/posts";
import { User } from "./User";
import toast from "react-hot-toast";
import { useState } from "react";
import { EditPostModal } from "./EditPostModal";

export function Post({ _id, title, contents, author }) {
  const [editingPost, setEditingPost] = useState(null);
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      toast.success("Post deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  return (
    <>
      <article className="w-full max-w-xl rounded-2xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-1">
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">
          {title}
        </h3>
        <div className="text-base leading-7 text-slate-600 dark:text-slate-300">
          {contents}
        </div>
        {author && (
          <em className="mt-5 block text-sm text-slate-500 transition-colors duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 dark:text-slate-300 rounded-lg px-1 py-1">
            Written by{" "}
            <strong className="ml-1 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              <User id={author} />
            </strong>
          </em>
        )}

        <div className="flex items-center gap-2">
          <button
            className="
        rounded-lg
        p-2
        text-slate-500
        transition-all
        duration-200
        hover:bg-amber-100
        hover:text-amber-600
        dark:hover:bg-amber-900/30
        dark:hover:text-amber-400
        hover:scale-110 active:scale-95
      "
            title="Edit Post"
            onClick={() =>
              setEditingPost({
                _id,
                title,
                author,
                contents,
              })
            }
          >
            <SquarePen size={18} />
          </button>

          <button
            className="
        rounded-lg
        p-2
        text-slate-500
        transition-all
        duration-200
        hover:bg-red-100
        hover:text-red-600
        dark:hover:bg-red-900/30
        dark:hover:text-red-400
        hover:scale-110 active:scale-95
      "
            title="Delete Post"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this post?")
              ) {
                deletePostMutation.mutate(_id);
              }
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </article>
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </>
  );
}

// defining props Types
Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
};
