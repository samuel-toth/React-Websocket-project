import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { perPageOptions } from "../utils/helper";

const PaginationFooter = ({ page, changeCurrentPage, setPerPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState("20");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedPerPage(value);
    setPerPage(Number(value));
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center md:mt-8 m-6">
      {/* Per page dropdown button*/}
      <div className="relative bg-slate-300/30 backdrop-blur-sm rounded-xl text-sm sm:text-md shadow-lg p-2 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <div
            className="bg-transparent pl-2 pr-9 cursor-pointer select-none flex 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedPerPage}
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            >
              <FaChevronUp />
              <FaChevronDown />
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className={`absolute bottom-full mb-4 bg-slate-300/30 backdrop-blur-md rounded-lg 
              shadow-lg z-10 w-16 transform transition-all duration-500`}
            >
              {perPageOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2  ${
                    selectedPerPage === option ? "font-bold" : ""
                  } cursor-pointer`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
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
          >
            <FaChevronLeft />
          </button>
          <div className="h-5 border-r-2 border-slate-400 mx-2" />
          <button
            className="px-2  sm:hover:scale-125 hover:scale-110"
            onClick={() => changeCurrentPage(page + 1)}
            disabled={page === Math.ceil(1000 / Number(selectedPerPage))}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
