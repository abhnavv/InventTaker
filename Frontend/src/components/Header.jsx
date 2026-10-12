import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='h-20 border-b border-gray-200 bg-white flex justify-between pl-7 shadow'>
      <div className='flex gap-3 items-center'>
        <FontAwesomeIcon className='text-red-500 text-xl' icon={faWarehouse} />
        <h1 className='font-bold text-xl'>InvenTaker</h1>
      </div>
      <div className='flex gap-6 md:gap-12 me-3 md:me-40'>
        <button className='text-gray-700 hover:text-red-900'><NavLink to={'/'} className={({ isActive }) =>
          `px-5 py-3 ${isActive
            ? 'border border-gray-300 border-b-white text-red-600 rounded-lg'
            : 'text-gray-700 hover:text-red-600'
          }`
        }>Overview</NavLink></button>
        <button className='text-gray-700 hover:text-red-900' ><NavLink to={'/inventory'} className={({ isActive }) =>
          `px-5 py-3 ${isActive
            ? 'border border-gray-300 border-b-white text-red-600 rounded-lg'
            : 'text-gray-700 hover:text-red-600'
          }`
        }>My Inventory</NavLink></button>
      </div>
    </div>
  )
}

export default Header
