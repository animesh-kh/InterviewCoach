const Step = ({ number, title, description }) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-indigo-200">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-slate-500">{description}</p>
    </div>
  </div>
);

export default Step;