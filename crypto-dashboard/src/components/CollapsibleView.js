import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

/**
 * Collapsible view component that can be used to hide and show content,
 * with a title and a toggle button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the collapsible view.
 * @param {ReactNode} props.children - The content to be displayed inside the collapsible view.
 * @returns {JSX.Element} The rendered CollapsibleView component.
 */
const CollapsibleView = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const applyDisplayNone = (ref, isVisible) => {
      if (!isVisible) {
        setTimeout(() => {
          if (ref.current) ref.current.style.maxHeight = 0;
        }, 500);
      } else {
        if (ref.current) ref.current.style.maxHeight = null;
      }
    };

    applyDisplayNone(contentRef, isVisible);
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <h2
        className="sm:text-4xl text-2xl cursor-pointer mt-16 px-2 sm:px-8 font-extralight drop-shadow-lg flex justify-between"
        onClick={toggleVisibility}
        aria-label="Show or hide content"
        title="Show/Hide content"
      >
        {title}
        {isVisible ? (
          <FaChevronUp className="text-2xl drop-shadow-lg" />
        ) : (
          <FaChevronDown className="text-2xl drop-shadow-lg" />
        )}
      </h2>
      <div
        ref={contentRef}
        className={`transition-all duration-500 origin-top ease-in-out ${
          isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleView;
