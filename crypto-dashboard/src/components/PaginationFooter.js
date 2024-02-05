import React from 'react';

const PaginationFooter = ({ page, per_page, handleItemsPerPageChange, handlePageChange }) => {
    return (
        <div className="flex justify-between items-center mx-6">
        <div>
          <label htmlFor="itemsPerPage">Per page: </label>
          <select
            id="itemsPerPage"
            className="bg-white border border-gray-300 rounded-md p-1"
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            value={per_page}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 font-black"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            {"<"}
          </button>
          <span>
            Page {page} of {Math.ceil(1000 / per_page)}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 font-black"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === 1000 / per_page}
          >
            {">"}
          </button>
        </div>
      </div>
    );
};

export default PaginationFooter;
