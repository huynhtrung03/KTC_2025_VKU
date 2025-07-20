const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#e3f2fd] to-[#f1f5ff]">
      <div className="text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-r-transparent border-l-[#7f7fd5] border-b-[#91eae4] rounded-full animate-spin"></div>
        </div>

        <p className="text-[#7f7fd5] text-lg font-semibold tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;