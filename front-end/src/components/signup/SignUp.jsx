import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css'

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Prevent double submit
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, role, password } = form;

    if (name.length < 2 || name.length > 30) {
      toast.error("Name should be at least 2 characters", {
        autoClose: 2000,
        draggable: true
      });
      setLoading(false);
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!role) {
      toast.error("Please select a role", {
        autoClose: 1000
      });
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/users/auth/register',
        form
      );

      toast.success(`${form.email}🎉 Registration successful!`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

      setTimeout(() => {
        navigate('/signin');
      }, 2000)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-signup-container">
      <div className="signup-form-container">
        <h2 className="heading">Sign Up</h2>
        <div className="hr-signup"></div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Role</option>
            <option value="consumer">Consumer</option>
            <option value="seller">Seller</option>
          </select>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
          />

          <p className="account-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;