import React, { useContext, useEffect, useState } from 'react'
import { getAllItemsAPI } from '../services/allApi'
import { getDaysRemaining,calculateExpiryDate } from '../utils/warranty'
import inventoryContext from '../context/InventoryContext'
import { Link } from 'react-router-dom'
function WarantyWatch() {
    const [inventory,setInventory]=useState([])
    const {refreshInventory}=useContext(inventoryContext)
    useEffect(()=>{
        const fetchInventory=async()=>{
            try {
                const response = await getAllItemsAPI()
                setInventory(response.data)
            } catch (error) {
                console.error("Failed to fetch items",error);
                
            }
        }
        fetchInventory()
    },[refreshInventory])
    console.log(inventory);
    
    const expiringItems=inventory.filter((item)=>{
        const days=getDaysRemaining(item.purchaseDate,item.warrantyLength)
        return days!==null && days>=0 && days<=30
    })
    console.log(expiringItems);
    
  return (
    <div className='mt-9'>
            <h1 className='text-2xl font-extrabold text-zinc-800'>Warranty watch</h1>
            <p className='text-zinc-600 font-thin'>A heads-up on coverage ending in the next 30 days.</p>
            <div className='bg-gray-300 rounded-2xl p-5'>
                {
                    expiringItems.map((item)=>{
                        const expiringDate=calculateExpiryDate(item.purchaseDate,item.warrantyLength)
                        const daysRemaining=getDaysRemaining(item.purchaseDate,item.warrantyLength)
                        return (
                        <Link to={`inventoryDetails/${item.id}/view`} key={item.id} className='flex gap-9 items-center mb-4 justify-around px-8 '>
                            <img src={item.image} alt={item.itemName}  className='w-fit h-20'/>
                            <div>
                                <h1 className='text-xl font-bold'>{item.itemName}</h1>
                                <p className='text-yellow-700'>Warranty Ends : {expiringDate.toLocaleDateString('en-IN')}</p>
                            </div>
                            <h1 className='text-red-500'>{daysRemaining} days left</h1>
                        </Link>
                    )})
                }
                
            </div>
        </div>
  )
}

export default WarantyWatch
