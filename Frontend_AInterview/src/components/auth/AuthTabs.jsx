export default function AuthTabs({ isLogin, setIsLogin }) {
  return (
    <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">
      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 py-2 rounded-lg ${
          isLogin ? "bg-white shadow-sm" : ""
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 py-2 rounded-lg ${
          !isLogin ? "bg-white shadow-sm" : ""
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

