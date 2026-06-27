import PropTypes from "prop-types";

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
      <label
        htmlFor="sortBy"
        className="text-sm font-medium text-slate-600 dark:text-slate-300"
      >
        Field:{" "}
      </label>
      <select
        name="sortBy"
        id="sortBy"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-40 rounded-lg border border-slate-300 bg-white dark:bg-slate-600 dark:text-slate-300 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none"
      >
        {fields.map((field) => (
          <option value={field} key={field}>
            {field}
          </option>
        ))}
      </select>

      {" / "}
      <label
        htmlFor="sortOrder"
        className="text-sm font-medium text-slate-600 dark:text-slate-300"
      >
        Order:{" "}
      </label>
      <select
        name="sortOrder"
        id="sortOrder"
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
        className="min-w-40 rounded-lg border border-slate-300 bg-white dark:bg-slate-600 dark:text-slate-300 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none"
      >
        <option value={"ascending"}>ascending</option>
        <option value={"descending"}>descending</option>
      </select>
    </div>
  );
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};
