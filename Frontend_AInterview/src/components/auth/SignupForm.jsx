import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export default function SignupForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  handleAuthSubmit,
  isLoading
}) {

  return (

    <form onSubmit={handleAuthSubmit} className="space-y-5">

      <div className="relative">
        <User className="absolute left-3 top-3 text-slate-400" />
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name"
          className="w-full pl-10 py-3 border rounded-xl"
        />
      </div>

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

      <button className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center gap-2">

        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Create Account
            <ArrowRight size={18} />
          </>
        )}

      </button>

    </form>
  );
}