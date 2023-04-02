import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='footer'>
        <h5 className='text-center'> Online Store @ Buy Brands</h5>
        <div className='text-center mt-3'>
            <Link to={"/about"}>About</Link>
            |
            <Link to={"/contact"}>Contact</Link>
            |
            <Link to={"/policy"}>Policy</Link>
        </div>
    </div>
  )
}
