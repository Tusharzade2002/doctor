import React from 'react'
import { Link } from 'react-router-dom'
function DoctorLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="p-6 space-y-4 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* {(error || message) && (
          <p className="text-sm text-center text-red-500">
            {error || message}
          </p>
        )} */}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
        //   value={username}
        //   onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        //   value={password}
        //   autoComplete="current-password"
        //   onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/doctor/registration" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    
    </div>
  )
}

export default DoctorLogin