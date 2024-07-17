import { useContext } from "react";
import ThemeContext from "@/components/providers/theme-context";

const useTheme = () => {
    const context=useContext(ThemeContext);
    return context;
};

export default useTheme;