import PropTypes from "prop-types";

export function PostFilter({ field, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={`filter-${field}`}
        className="w-24 text-base font-semibold text-slate-700 dark:text-slate-300 capitalize"
      >
        {field}
      </label>
      <input
        type="text"
        name={`filter-${field}`}
        id={`filter-${field}`}
        className="min-w-20 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 dark:focus:border-green-400 capitalize rounded-xl border border-slate-300 px-4 py-2.5 placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter author name to filter by"
      />
    </div>
  );
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
