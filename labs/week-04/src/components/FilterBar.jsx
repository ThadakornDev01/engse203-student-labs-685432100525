const filters = [
  ['all', 'All'],
  ['pending', 'Pending'],
  ['in-progress', 'In Progress'],
  ['completed', 'Completed'],
];

function FilterBar({ value, onFilterChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {filters.map(([filterValue, label]) => (
        <button
          className={value === filterValue ? 'filter-active' : 'filter-button'}
          key={filterValue}
          type="button"
          onClick={() => onFilterChange(filterValue)}
          aria-pressed={value === filterValue}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
