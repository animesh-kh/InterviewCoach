import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle(){
  const { isDark, toggleTheme } = useTheme();
  return(
    <div className="theme-toggle">
      <button
        className={isDark ? "active" : ""}
        onClick={toggleTheme}
      >
        <Moon size={14}/> Dark
      </button>
      <button
        className={!isDark ? "active" : ""}
        onClick={toggleTheme}
      >
        <Sun size={14}/> Light
      </button>
    </div>
  );
}