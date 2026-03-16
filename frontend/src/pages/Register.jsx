import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    leetcode: "",
    codeforces: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = (e) => {

    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.leetcode && !form.codeforces) {
      alert("Please connect at least one platform");
      return;
    }

    try {

      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
        platforms: {
          leetcode: form.leetcode,
          codeforces: form.codeforces
        }
      });

      navigate("/");

    } catch {
      alert("Registration failed");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#0f172a] via-[#0b1320] to-[#020617] text-white">

      {/* Title */}

      <div className="absolute top-24 text-center">

        <h1 className="text-3xl font-bold tracking-wide">
          Code <span className="text-blue-400">Prep</span>
        </h1>

        <h2 className="text-2xl font-semibold mt-3">
          Create an account
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Start your journey to coding mastery
        </p>

        <p className="text-gray-500 text-xs mt-2">
          Step {step} of 2
        </p>

      </div>


      {/* Card */}

      <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-xl w-[420px] shadow-xl p-8">

        {/* VIEWPORT */}
        <div className="overflow-hidden">

          {/* SLIDER */}

          <div
            className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
              step === 1 ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >

            {/* STEP 1 */}

            <form
              onSubmit={handleNext}
              className="w-1/2 space-y-5 pr-4"
            >

              <div>
                <label className="text-sm text-gray-300">Full Name</label>

                <input
                  name="username"
                  placeholder="John Doe"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <div>
                <label className="text-sm text-gray-300">Email Address</label>

                <input
                  name="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <div>
                <label className="text-sm text-gray-300">Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <div>
                <label className="text-sm text-gray-300">Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-md font-semibold"
              >
                Next
              </button>

            </form>


            {/* STEP 2 */}

            <form
              onSubmit={handleSubmit}
              className="w-1/2 space-y-5 pl-4"
            >

              <div>
                <label className="text-sm text-gray-300">LeetCode Username</label>

                <input
                  name="leetcode"
                  placeholder="leetcode_handle"
                  value={form.leetcode}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <div>
                <label className="text-sm text-gray-300">Codeforces Handle</label>

                <input
                  name="codeforces"
                  placeholder="codeforces_handle"
                  value={form.codeforces}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:border-blue-500 outline-none"
                />
              </div>


              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 bg-gray-600 hover:bg-gray-700 transition p-3 rounded-md font-semibold"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 hover:bg-blue-600 transition p-3 rounded-md font-semibold"
                >
                  Register
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>


      {/* Login Link */}

      <div className="absolute bottom-16 text-gray-400 text-sm">

        Already have an account?{" "}

        <span
          className="text-blue-400 font-medium cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Log in
        </span>

      </div>

    </div>

  );
}

export default Register;