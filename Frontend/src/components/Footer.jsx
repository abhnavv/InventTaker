import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='bg-black text-zinc-300 p-5'>
       <div className='flex items-center  gap-2'>
            <FontAwesomeIcon className='text-sm' icon={faWarehouse}/>
           <h1 className="text-xl">InvenTaker</h1>            
        </div> 
        <p>Manage your personal inventory with ease.</p>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-3  text-zinc-400'>
            <div className='flex flex-col'>
                <h1>Official Links</h1>
                
                    <Link to={'/'}>Overview</Link>
                    <Link to={'/inventory'}>My Inventory</Link>
                
            </div>
            <div className='flex flex-col'>
                <h1>Support</h1>
                <a href="">Help</a>
                <a href="">About</a>
            </div>
            <div className='flex flex-col' >
                <h1>Follow</h1>
                <a href="">Instagram</a>
                <a href="">Linkedin</a>
            </div>
        </div>
        <h1 className='mt-3'>© 2026 InvenTaker </h1>
    </div>
  )
}

export default Footer
