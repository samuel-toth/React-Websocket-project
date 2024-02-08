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
  const [isOpen, setIsOpen] = useState(false);
  const [isUpwards, setIsUpwards] = useState(false);
  const [selectedPerPage, setSelectedPerPage] = useState("20");
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    const updateMenuDirection = () => {
      if (toggleRef.current) {
        const rect = toggleRef.current.getBoundingClientRect();
        const isVisible = window.innerHeight - rect.bottom > 200;
        setIsUpwards(!isVisible);
      }
    };

    window.addEventListener("resize", updateMenuDirection);
    updateMenuDirection();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateMenuDirection);
    };
  }, []);

  const handleSelect = (value) => {
    setSelectedPerPage(value);
    setPerPage(Number(value));
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center mx-6">
      <div className="relative bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg p-2 flex items-center">
        <div className="relative" ref={dropdownRef}>
          <div
            ref={toggleRef}
            className="bg-transparent text-slate-500 text-xl pl-2 pr-8 cursor-pointer select-none flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedPerPage}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 text-lg flex flex-col items-center space-y-[-0.45rem] transition-transform duration-300 transform hover:scale-125">
              <FaChevronUp />
              <FaChevronDown />
            </div>
          </div>
          {isOpen && (
            <div
              className={`absolute ${
                isUpwards ? "bottom-full mb-4" : "top-full mt-1"
              } bg-slate-300/30 backdrop-blur-sm rounded-lg shadow-lg z-10 overflow-hidden w-16`}
            >
              {perPageOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 hover:text-indigo-400 text-slate-700 ${
                    selectedPerPage === option ? "font-semibold" : ""
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
      <div className="flex items-center space-x-2">
        <span className="text-xl text-slate-500">
          {page} of {Math.ceil(1000 / Number(selectedPerPage))}
        </span>
        <div className="bg-slate-300/30 backdrop-blur-sm rounded-xl shadow-lg p-2 flex items-center">
          <button
            className="text-indigo-500 px-2 hover:scale-125"
            onClick={() => changeCurrentPage(page - 1)}
            disabled={page === 1}
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <div className="h-6 border-r-2 border-slate-400 mx-2" />
          <button
            className="text-indigo-500 px-2  hover:scale-125"
            onClick={() => changeCurrentPage(page + 1)}
            disabled={page === Math.ceil(1000 / Number(selectedPerPage))}
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationFooter;
