import { useState } from "react";

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleOn = () => {
    setIsOpen(true);
  };

  const toggleOff = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return [isOpen, toggleOn, toggleOff, toggle];
};

export default useToggle;
