import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundForward } from "react-icons/io";
import { getAllItemsAPI } from '../services/allApi';
import inventoryContext from '../context/InventoryContext';
import { FaIndianRupeeSign } from "react-icons/fa6";
function RecentyAdded() {

    const [inventory,setInventory]=useState([])
    const [currentTime,setCurrentTime]=useState(Date.now())
    const {refreshInventory}=useContext(inventoryContext)
    useEffect(()=>{
        const fetchInventory=async()=>{
            try {
                const response=await getAllItemsAPI()
                setInventory(response.data)
                

            } catch (error) {
                console.error("failed to fetch item details",error);
                
            }
        }
        fetchInventory()
    },[refreshInventory])
    useEffect(()=>{
        const timer=setInterval(()=>{
            setCurrentTime(Date.now())
        },60*1000)

        return ()=>clearInterval(timer)
    },[])
    const sortedInventory=[...inventory].sort((a,b)=>{
        return new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
    }).slice(0,4)

    
    const createTimeAgo=(createdAt)=>{
        console.log("createdAt:", createdAt)
    console.log("Timestamp:", new Date(createdAt).getTime())
        const elapsedMinutes=Math.floor(( currentTime-new Date(createdAt).getTime())/(1000*60))
        if(elapsedMinutes<1){
            return "Just now"
        }else if(elapsedMinutes<60){
            return `${elapsedMinutes} ${elapsedMinutes===1?'minute': 'minutes'} ago`
        }else if(elapsedMinutes<60*24){
            const hours=Math.floor(elapsedMinutes/60)
            return `${hours} ${hours==1?'hour':'hours'} ago`
        }else{
            const days=Math.floor(elapsedMinutes/(60*24))
            return `${days} ${days===1?'day':'days' } ago`
        }
        
    }
  return (
    <div className='mt-9'>
           <div className='flex items-center w-full justify-between'>    
                <div>
                    <h1 className='text-2xl text-zinc-800 font-stretch-50% font-bold'>Your inventory</h1>
                    <p className='text-zinc-600'>Latest added products to your Inventory</p>
                </div>
                <Link className='float-right flex items-center text-blue-400 hover:text-blue-800' to={'/inventory'}>View All <IoMdArrowRoundForward /></Link>
           </div>
            {/*recent items  */}
            <div>
                {   
                        
                    sortedInventory.map((item)=>(
                        <Link to={`/inventoryDetails/${item.id}/view`} key={item.id} className='flex bg-white flex-wrap border border-gray-200 shadow-lg rounded-2xl w-full md:w-160 min-h-10 justify-between p-3 text-gray-950 text-sm mb-2 hover:transition-transform duration-300 hover:scale-105'>
                            <img src={item.image} alt={item.itemName} className='w-16 h-10 object-cover rounded-lg'/>
                            <div>
                                <h1>{item.itemName}</h1>
                                <h1>{item.category}</h1>
                            </div>
                            <div>
                                <h1>{createTimeAgo(item.createdAt)}</h1>
                                <h1 className='flex items-center'><FaIndianRupeeSign/>{item.purchasePrice}</h1>
                            </div>
                        </Link>
                    ))
                }
                
            </div>
            <p className='text-sm font-light'>Showing the 4 most recently added items in your inventory. Click <Link to={'/inventory'} className='text-gray-600 hover:text-blue-400 font-medium'>View All</Link>  to explore your complete inventory.</p>
        </div>
  )
}

export default RecentyAdded
