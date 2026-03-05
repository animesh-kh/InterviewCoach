import { Mail, Loader2, Sparkles } from "lucide-react";

export default function ForgotPassword({
  email,
  setEmail,
  handleResetSubmit,
  isLoading,
  isResetSent,
  setIsForgotPassword,
  setIsResetSent
}) {

  if (isResetSent) {

    return (

      <div className="text-center space-y-4">

        <Sparkles size={24} />

        <h3 className="text-xl font-bold">
          Check your email
        </h3>

        <p className="text-sm text-slate-500">
          Password reset link sent to your email.
        </p>

        <button
          onClick={() => {
            setIsForgotPassword(false);
            setIsResetSent(false);
          }}
          className="w-full bg-slate-100 py-3 rounded-xl"
        >
          Back to login
        </button>

      </div>

    );
  }

  return (

    <form onSubmit={handleResetSubmit} className="space-y-5">

      <h3 className="text-xl font-bold">
        Reset Password
      </h3>

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

      <button className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center">

        {isLoading
          ? <Loader2 className="animate-spin" />
          : "Send Reset Link"}

      </button>

    </form>
  );
}