import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Post } from "./Post";

export function PostList({ posts = [] }) {
  const POSTS_PER_PAGE = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = posts.slice(startIndex, endIndex);
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {currentPosts.map((post) => (
          <Fragment key={post._id}>
            <Post {...post} />
            {/* <hr /> */}
          </Fragment>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-950 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className="h-10 w-10 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-950 hover:shadow-md"
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-950 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
