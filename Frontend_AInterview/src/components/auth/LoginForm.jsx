import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  handleAuthSubmit,
  setIsForgotPassword,
  isLoading
}) {

  return (

    <form onSubmit={handleAuthSubmit} className="space-y-5">

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-slate-400" />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full pl-10 py-3 border rounded-xl"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-slate-400" />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full pl-10 py-3 border rounded-xl"
        />
      </div>

      <div className="flex justify-between items-center text-sm">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>

        <button
          type="button"
          onClick={() => setIsForgotPassword(true)}
          className="text-indigo-600"
        >
          Forgot password?
        </button>

      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2">

        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight size={18} />
          </>
        )}

      </button>

    </form>
  );
}