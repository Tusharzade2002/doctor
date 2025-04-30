import React from 'react'
import notfoundimg from '../assets/illustration_404.svg'
import {Link} from 'react-router-dom'
function NotFound() {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <h1 className='text-2xl my-5'>Sorry, page not found!</h1>
        <h4 className='text-xl my-4'>Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.</h4>
        <img src={notfoundimg} alt='...'/>
       <Link to="/home"> <button className='bg-blue-600 mt-10 px-4 py-2 rounded-md'>Go To Home</button></Link>
    </div>
  )
}

export default NotFound