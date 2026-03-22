import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px 5px 6px",
        borderRadius: "999px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
        background: isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
        cursor: "pointer",
        transition: "all 0.2s",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: isDark ? "rgba(255,255,255,0.55)" : "#64748b",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: isDark ? "#1e293b" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        {isDark
          ? <Moon size={13} style={{ color: "#818cf8" }} />
          : <Sun  size={13} style={{ color: "#f59e0b" }} />
        }
      </span>
      {isDark ? "Dark" : "Light"}
    </button>
  );
}