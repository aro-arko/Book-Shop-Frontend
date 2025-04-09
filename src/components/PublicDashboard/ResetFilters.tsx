import { FaUndo } from "react-icons/fa";

const ResetFilters = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 transition text-sm"
    >
      <FaUndo className="mr-2" />
      Reset Filters
    </button>
  );
};

export default ResetFilters;
