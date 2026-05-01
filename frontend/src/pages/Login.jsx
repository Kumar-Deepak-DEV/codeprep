import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) || {};

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      if (setUser && res.data.user) {
        setUser(res.data.user);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030604] text-white p-4 relative overflow-hidden matrix-grid-bg">
      <SEO
        title="Sign In"
        description="Sign in to your CodePrep dashboard to track your DSA coding practice, streaks, and problem recommendations."
      />
      {/* Background glowing matrix green orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black border-2 border-[#00FF66] text-[#00FF66] font-extrabold text-xl mb-3 shadow-[0_0_20px_rgba(0,255,102,0.4)] font-mono">
          &gt;_
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Code<span className="text-[#00FF66] drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">Prep</span>
        </h1>
        <p className="text-[#6ee7b7]/80 text-sm mt-1 font-mono">
          DSA Practice &amp; Progress Engine
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[#060c08]/90 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-2xl w-full max-w-md p-8 shadow-[0_0_40px_rgba(0,255,102,0.15)] relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-[#00FF66] font-mono text-sm">&gt;</span>
            <span>Welcome Back</span>
          </h2>

          {/* Matrix Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black border border-[#00FF66] text-[10px] text-[#00FF66] font-mono shadow-[0_0_8px_rgba(0,255,102,0.3)]">
            <span>☆</span>
            <span>matrix</span>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00FF66] text-sm" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] focus:shadow-[0_0_10px_rgba(0,255,102,0.25)] pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
              <label>Password</label>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00FF66] text-sm" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] focus:shadow-[0_0_10px_rgba(0,255,102,0.25)] pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={<FiArrowRight />}
            className="w-full mt-2"
          >
            Authenticate &rarr; Enter Matrix
          </Button>
        </form>

        <div className="flex items-center gap-3 my-6 text-[#6ee7b7]/40 text-xs font-mono">
          <div className="flex-1 h-px bg-[#00FF66]/20"></div>
          <span>NEW TO CODEPREP?</span>
          <div className="flex-1 h-px bg-[#00FF66]/20"></div>
        </div>

        <p className="text-center text-slate-400 text-xs leading-relaxed font-mono">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#00FF66] font-bold hover:text-[#6ee7b7] transition underline underline-offset-2"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;