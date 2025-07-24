import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
  const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    mode:'onBlur'
  });
const navigate = useNavigate();

  const onSubmit = async (data) => {

    try{
      const response = await axios.post(`${API_URL}/auth/register`, data);
            console.log('Register successful:', response.data);

    }
    
   catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
   };

  const password = watch('password');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/logo.png" alt="Logo" className="h-12" /> {/* Replace with your <app-logo> equivalent */}
      </div>

      {/* Register Box */}
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input type="text" 
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='username'
              {...register('name', { required: 'Name is required' })}
            />
            { errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <input placeholder='email'  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format.',
                }

              }


              )}
            />
            { errors.email &&
              <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
            }
          </div>
          <div>
            <input type="password" placeholder='choose your password'  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required:'choose your password'
            })}   
            
            />
            {errors.password &&
              <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
            }
          </div>
          <div>
            <input type="password" placeholder="confirmPassword" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('confirmPassword', {
                required: 'password should match',

                validate: (value) => value === password || 'Passwords do not match.'

              })}
            />
            {errors.confirmPassword &&
              <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
            }
          </div>
          <button type='submit' className='w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700'>Register</button>

        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?

        </p>

        <p className="text-left">
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register
