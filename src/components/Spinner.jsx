const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center absolute">
      <div className="flex justify-center animate-ping w-16 h-16 m-8 rounded-full bg-slate-600"></div>
    </div>
  );
};

export default Spinner;
