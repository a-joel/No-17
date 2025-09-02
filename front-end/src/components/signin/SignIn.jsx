import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'
// Import CSS for Toastify
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // ✅ Fix: Correct regex and validate input
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Fixed typo: was `e.taget.name`
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    // ✅ Validation
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      // ✅ Fix: Missing // in URL
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/auth/login`, form);

      // ✅ Save token
      localStorage.setItem('token', res.data.token);

      // ✅ Show success toast
      toast.success(`${form.email}🎉 Login successful!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // ✅ Redirect after 1 second
      setTimeout(() => {
        navigate('/products');
      }, 1000);

    } catch (error) {
      // ✅ Handle error response
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.';

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
  <div className="main-signin-container">

      {/* ✅ Add onSubmit */}
      <form className='form' onSubmit={handleSubmit}>
      <h2 className='heading'>Sign In</h2>
        <p className="account">Use your account</p>
        <div className="hr"></div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <p className="signup-link">New to shopmore? <Link to={'/signup'}>Create an account</Link></p>

        {/* ✅ Submit Button */}
        <button className='submit-btn' type="submit">Login</button>
      </form>
      {/* ✅ Required: ToastContainer to render toasts */}
      <ToastContainer />
    </div>

    </>
  );
}

export default SignIn;