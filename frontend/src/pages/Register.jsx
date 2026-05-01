import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { FiUser, FiMail, FiLock, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    leetcode: "",
    codeforces: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.leetcode.trim() && !form.codeforces.trim()) {
      setError("Please provide at least one platform handle (LeetCode or Codeforces).");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        platforms: {
          leetcode: form.leetcode.trim(),
          codeforces: form.codeforces.trim()
        }
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030604] text-white p-4 relative overflow-hidden matrix-grid-bg">
      <SEO
        title="Create Account"
        description="Register for CodePrep to track your LeetCode and Codeforces progress, solve curated problem patterns, and prepare for coding interviews."
      />
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black border-2 border-[#00FF66] text-[#00FF66] font-extrabold text-xl mb-3 shadow-[0_0_20px_rgba(0,255,102,0.4)] font-mono">
          &gt;_
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Code<span className="text-[#00FF66] drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">Prep</span>
        </h1>
        <p className="text-[#6ee7b7]/80 text-sm mt-1 font-mono">
          Initialize Account &bull; Step {step} of 2
        </p>
      </div>

      {/* Register Card */}
      <div className="bg-[#060c08]/90 backdrop-blur-xl border-2 border-[#00FF66]/30 rounded-2xl w-full max-w-md p-8 shadow-[0_0_40px_rgba(0,255,102,0.15)] relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-[#00FF66] font-mono text-sm">&gt;</span>
            <span>{step === 1 ? "Credentials" : "Link Platforms"}</span>
          </h2>
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#00FF66]">
            <span className={`w-2.5 h-2.5 rounded-full ${step === 1 ? "bg-[#00FF66] shadow-[0_0_6px_#00FF66]" : "bg-[#008F39]"}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${step === 2 ? "bg-[#00FF66] shadow-[0_0_6px_#00FF66]" : "bg-slate-800"}`} />
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono leading-relaxed">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                Username / Display Handle *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00FF66] text-sm" />
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="e.g. John Doe"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] focus:shadow-[0_0_10px_rgba(0,255,102,0.25)] pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                Email Address *
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
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                Password *
              </label>
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

            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 font-mono">
                Confirm Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#00FF66] text-sm" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] focus:shadow-[0_0_10px_rgba(0,255,102,0.25)] pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={<FiArrowRight />}
              className="w-full mt-2"
            >
              Continue &rarr; Platform Setup
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-[#040906] border border-[#00FF66]/20 text-xs text-[#a7f3d0] leading-relaxed font-mono">
              Connect at least one platform to automatically stream and analyze your problem solving.
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 flex items-center gap-1.5 font-mono">
                <SiLeetcode className="text-[#FFA116]" />
                <span>LeetCode Username</span>
              </label>
              <input
                type="text"
                name="leetcode"
                placeholder="e.g. tour_de_code"
                value={form.leetcode}
                onChange={handleChange}
                className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a7f3d0] mb-1.5 flex items-center gap-1.5 font-mono">
                <SiCodeforces className="text-[#1890ff]" />
                <span>Codeforces Handle</span>
              </label>
              <input
                type="text"
                name="codeforces"
                placeholder="e.g. tourist"
                value={form.codeforces}
                onChange={handleChange}
                className="w-full bg-[#040906] border border-[#00FF66]/25 focus:border-[#00FF66] px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-[#6ee7b7]/40 outline-none transition font-mono"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                icon={<FiArrowLeft />}
                onClick={() => setStep(1)}
                className="w-1/3"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={<FiCheck />}
                className="w-2/3"
              >
                Initialize
              </Button>
            </div>
          </form>
        )}

        <div className="flex items-center gap-3 my-6 text-[#6ee7b7]/40 text-xs font-mono">
          <div className="flex-1 h-px bg-[#00FF66]/20"></div>
          <span>ALREADY REGISTERED?</span>
          <div className="flex-1 h-px bg-[#00FF66]/20"></div>
        </div>

        <p className="text-center text-slate-400 text-xs leading-relaxed font-mono">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-[#00FF66] font-bold hover:text-[#6ee7b7] transition underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;