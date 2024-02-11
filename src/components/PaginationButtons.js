import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { PER_PAGE_OPTIONS } from "../utils/constants";

/**
 * A component for managing pagination, including a dropdown to select the number of items per page
 * and buttons to navigate between pages.
 * 
 * Utilizes an external utility `perPageOptions` for dropdown options, allowing the user to select
 * how many items should be displayed per page. It also includes previous and next page buttons.
 * 
 * @component
 * @param {Object} props The component props.
 * @param {number} props.page The current page number.
 * @param {Function} props.changeCurrentPage Function to update the current page.
 * @param {Function} props.setPerPage Function to set the number of items displayed per page.
 * @returns {JSX.Element} The PaginationButtons component, comprising a dropdown for items per page selection
 * and navigation buttons for paging.
 * 
 */
const PaginationButtons = ({ page, changeCurrentPage, setPerPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState("20");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedPerPage(value);
    setPerPage(Number(value));
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center md:mt-8 m-6">
      {/* Per page dropdown */}
      <div className="relative bg-slate-300/30 backdrop-blur-sm rounded-xl text-sm sm:text-md shadow-lg p-2 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-transparent pl-2 pr-9 cursor-pointer select-none flex 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Show or hide dropdown menu to select number of items in one page"
            title="Show/Hide dropdown to select no. items per page"
          >
            {selectedPerPage}
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            >
              <FaChevronUp />
              <FaChevronDown />
            </div>
          </button>
          {isDropdownOpen && (
            <div
              className={`absolute bottom-full mb-4 bg-slate-300/30 backdrop-blur-md rounded-lg 
              shadow-lg z-10 w-16 transform transition-all duration-500`}
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2  ${
                    selectedPerPage === option ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => handleSelect(option)}
                  aria-label={`Select ${option} items per page`}
                  title={`Select ${option} per page`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center space-x-2 text-sm sm:text-md ">
        <span className="">
          {page} of {Math.ceil(1000 / Number(selectedPerPage))}
        </span>
        <div className="bg-slate-300/30 backdrop-blur-md rounded-xl shadow-lg p-2 flex items-center">
          <button
            className=" px-2 hover:scale-125"
            onClick={() => changeCurrentPage(page - 1)}
            disabled={page === 1}
            aria-label="Go to previous page"
            title="Go to previous page"
          >
            <FaChevronLeft />
          </button>
          <div className="h-5 border-r-2 border-indigo-400 mx-2" />
          <button
            className="px-2  sm:hover:scale-125 hover:scale-110"
            onClick={() => changeCurrentPage(page + 1)}
            disabled={page === Math.ceil(1000 / Number(selectedPerPage))}
            aria-label="Go to next page"
            title="Go to next page"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationButtons;
