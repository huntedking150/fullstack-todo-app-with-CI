import PropTypes from "prop-types";

export function Post({ title, contents, author }) {
  return (
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
            {author}
          </strong>
        </em>
      )}
    </article>
  );
}

// defining props Types
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
};
