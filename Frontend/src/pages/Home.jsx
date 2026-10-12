import React, { useContext, useEffect, useState} from 'react'
import { MdAdd } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { IoIosTimer } from "react-icons/io";
import { MdGppGood } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuBadgeIndianRupee } from "react-icons/lu";
import WarantyWatch from '../components/WarantyWatch';
import RecentyAdded from '../components/RecentyAdded';
import inventoryContext from '../context/InventoryContext';
import { getAllItemsAPI } from '../services/allApi';
import { getDaysRemaining } from '../utils/warranty';
function Home() {
    const {handleOpen}=useContext(inventoryContext)
    const {refreshInventory}=useContext(inventoryContext)
    const [inventory,setInventory]=useState([])
    useEffect(()=>{
        const fetchInventory=async()=>{
            try {
                const response=await getAllItemsAPI()
                setInventory(response.data)  
            } catch (error) {
                console.error("Failed to fetch the inventory",error);
                
            }
        }
        fetchInventory()
    },[refreshInventory])

    const totalItemsCount=inventory.length
    const expiringSoonCount=inventory.filter((item)=>{
        const days=getDaysRemaining(item.purchaseDate,item.warrantyLength)

        return days!==null && days>=0 && days<=30
    }
    ).length
    
    const underWarrantyCount=inventory.filter((item)=>{
        const days=getDaysRemaining
        (item.purchaseDate,item.warrantyLength)

        return days!==null && days>30
    }).length

    const totalPurchaseValue=inventory.reduce((total,item)=>{
        return total+(Number(item.purchasePrice) || 0)
    },0)


  return (
    <div className='m-3 ms-9 me-9 mb-9'>
        <div className='flex justify-between '>
            <div>
                <label className='text-zinc-700'>Saturday, October 3</label>
                <h1 className='text-4xl font-extrabold text-zinc-700'>Your home, in one place</h1>
            </div>
            <div className='flex gap-2'>
                {/* <button className='bg-blue-500 px-5 rounded-2xl flex items-center font-bold gap-2 h-13 hover:bg-blue-700 hover:text-white transition'><FaFileExport/> Export</button> */}
                <button className='bg-red-500 rounded-2xl px-5 flex items-center font-bold gap-2 h-13 hover:bg-red-700 hover:text-white transition' onClick={handleOpen}><MdAdd className='font-extrabold'/> Add items</button>
            </div>
            
        </div>
        <div className='bg-green-300 mt-10 rounded-2xl p-6 flex items-center justify-between'>
            <div>
                <h1 className='text-3xl mb-2 font-serif'>Everything you own, thoughtfully organized.</h1>
                <p>Keep track of what you have and know when your warranties are up.</p>
            </div>
            <button className='bg-blue-100 p-4 rounded-3xl hover:bg-amber-200 font-black transition' onClick={handleOpen}>+ Add Your First Item</button>
        </div>
        {/* the boxes containing totalcost totalitems etc.. */}
        {/* items tracked */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-10'>
            <div className='bg-cyan-100 rounded-2xl p-5'>
                <div className='flex justify-between'>
                    <h1 className='text-zinc-500'>Items tracked</h1>
                    <FontAwesomeIcon icon={faList} className='text-blue-300'/>
                </div>
                <h1 className='text-2xl font-black mt-3 mb-3'>{totalItemsCount}</h1>
                <p className='text-zinc-700 mb-2'>Across your personal inventory</p>
            </div>

            {/* expiring soon */}
            <div className='bg-cyan-100 rounded-2xl p-5'>
            <div className='flex justify-between'>
                    <h1 className='text-zinc-500'>Expiring soon</h1>
                    <IoIosTimer className='text-yellow-500 size-5'/>

                </div>
                <h1 className='text-2xl font-black mt-3 mb-3'>{expiringSoonCount}</h1>
                <p className='text-zinc-700 mb-2'>Warranty ends within 30 days</p>
            </div>

            {/* under warranty */}
            <div className='bg-cyan-100 rounded-2xl p-5'>
            <div className='flex justify-between'>
                    <h1 className='text-zinc-500'>Under warranty</h1>
                    <MdGppGood  className='text-green-500 size-5'/>
                </div>
                <h1 className='text-2xl font-black mt-3 mb-3'>{underWarrantyCount}</h1>
                <p className='text-zinc-700 mb-2'>Items with active coverage</p>
            </div>
            <div className='bg-cyan-100 rounded-2xl p-5'>
            <div className='flex justify-between'>
                    <h1 className='text-zinc-500'>Total purchase value</h1>
                    <LuBadgeIndianRupee className='text-red-400 size-5'/>
                </div>
                <h1 className='text-2xl font-black mt-3 mb-3 flex items-center'><FaIndianRupeeSign/>{totalPurchaseValue.toLocaleString('en-IN')}</h1>
                <p className='text-zinc-700 mb-1'>Based on your recorded purchases</p>
            </div>
        </div>

        {/* warranty watch */}
        <WarantyWatch/>


        {/* recently added three items */}
        <RecentyAdded/>

        
    </div>
  )
}

export default Home
