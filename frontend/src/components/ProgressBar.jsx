function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div style={{ background: "#ddd", height: "8px", marginBottom: "20px" }}>
      <div
        style={{
          width: `${percent}%`,
          height: "8px",
          background: "#1976d2",
        }}
      />
    </div>
  );
}

export default ProgressBar;


