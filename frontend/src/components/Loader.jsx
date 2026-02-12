function Loader({ text }) {
  return (
    <div className="loader">
      <p>{text || "Processing..."}</p>
    </div>
  );
}

export default Loader;
