const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-2">
        {/* Previous Button */}
        <li>
          <button
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${idx}`}>
              <span className="px-3 py-1 text-gray-400">...</span>
            </li>
          ) : (
            <li key={page}>
              <button
                className={`px-3 py-1 rounded transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next Button */}
        <li>
          <button
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
