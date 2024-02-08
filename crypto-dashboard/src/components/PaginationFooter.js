import React, { useState, useRef, useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";
import { perPageOptions } from "../utils/helper";

const PaginationFooter = () => {
  const { page, changeCurrentPage, setPerPage } = useDashboard();

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
    <div className="flex justify-between items-center mx-6">
      <div className="relative bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg p-2 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <div
            className="bg-transparent text-slate-500 text-xl pl-2 pr-9 cursor-pointer select-none flex 
            justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedPerPage}
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 flex flex-col 
            items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125"
            >
              <FaChevronUp />
              <FaChevronDown />
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className={`absolute bottom-full mb-4 bg-slate-300/30 backdrop-blur-sm rounded-lg 
              shadow-lg z-10 w-16 transform transition-all duration-500`}
            >
              {perPageOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 hover:text-indigo-400 text-slate-700 ${
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
      <div className="flex items-center space-x-2 text-xl">
        <span className="text-slate-500">
          {page} of {Math.ceil(1000 / Number(selectedPerPage))}
        </span>
        <div className="bg-slate-300/30 backdrop-blur-md rounded-xl shadow-lg p-2 flex items-center">
          <button
            className="text-indigo-500 px-2 hover:scale-125"
            onClick={() => changeCurrentPage(page - 1)}
            disabled={page === 1}
          >
            <FaChevronLeft />
          </button>
          <div className="h-6 border-r-2 border-slate-400 mx-2" />
          <button
            className="text-indigo-500 px-2  hover:scale-125"
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
