/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    
  // Get intial theme from local storage and if not then get system theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      return systemTheme;
    }
  };

  // State hook to manage the current theme
  const [theme, setTheme] = useState(getInitialTheme);

  // Effect to update localStorage and apply theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Effect to listen for changes in system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Handler for system theme change
    const handleSystemThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Add event listener for system theme change
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Clean up event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Provide the theme state and toggle function to child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
