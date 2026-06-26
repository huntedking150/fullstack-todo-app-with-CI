import PropTypes from "prop-types";

export function Post({ title, contents, author }) {
  return (
    <article className="bg-linear-65 from-purple-500 to-pink-500 rounded-xl p-5 shadow-blue-500/50 text-white w-fit border-4 border-double">
      <h3 className="text-2xl font-semibold ">{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by{" "}
          <strong className="bg-amber-900 p-2 rounded-2xl">{author}</strong>
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
