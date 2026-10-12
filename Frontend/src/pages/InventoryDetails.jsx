import React, { useEffect, useState,useContext } from 'react'
import { Link ,useParams} from 'react-router-dom'
import { TiArrowBack, TiUser } from "react-icons/ti";
import { MdEdit } from 'react-icons/md';
import { getAllItemsAPI } from '../services/allApi';
import { calculateExpiryDate,getDaysRemaining,getWarrantyStatus } from '../utils/warranty';
import EditInventory from '../components/EditInventory';
import inventoryContext from '../context/InventoryContext';
function InventoryDetails() {

  const {id}=useParams()
  const [item,setItem]=useState(null)
  const [loading,setLoading]=useState(true)
  const [showEdit,setShowEdit]=useState(false)
  const {notifyInventoryUpdate}=useContext(inventoryContext)
  const [refreshDetials,setRefreshDetails]=useState(false)
  useEffect(()=>{
    const fetchItem=async ()=>{
      try {
        const response=await getAllItemsAPI()
        const selectedItem=response.data.find((item)=>String(item.id)===id)
        setItem(selectedItem || null)
      } catch (error) {
        console.error("Failed to fetch item details",error);
        
      }finally{
        setLoading(false)
      }
    }
    fetchItem() 
  },[id,refreshDetials])
console.log(item);


  if(loading){
    return (
    <div className='min-h-screen flex justify-center items-center'>
      <p className="text-lg font-medium text-gray-500">Loading item details...</p>
    </div>
   

    )
  }

  if(!item){
    return <p className='m-5'>Item not found</p>
  }

  const expirydate=calculateExpiryDate(item.purchaseDate,item.warrantyLength)

  const warrantyStatus=getWarrantyStatus(item.purchaseDate,item.warrantyLength)

  const daysRemaining=getDaysRemaining(item.purchaseDate,item.warrantyLength)
  
  

  return (
    <div className='m-5'>
      <div className='flex items-center justify-between ms-10'>
        <Link to={'/inventory'}>
          <div className='flex items-center hover:text-gray-500'>
            <TiArrowBack/>Back to Inventory
          </div>
        </Link>
        <button className='flex items-center me-10 bg-indigo-500 px-3 py-2 rounded-4xl gap-2 hover:bg-indigo-800 text-white' onClick={()=>setShowEdit(true)}>
          <MdEdit/>Edit Item
        </button>
      </div>
      <div className='bg-gray-100 rounded-2xl p-5 m-5'>
        <div className='grid grid-cols-2 gap-3 m-5'>
            <div className='px-5 py-2'>
              {item.image
               ? (<img src={item.image} alt={item.itemName} className="w-full max-h-80 object-contain rounded-xl"/>)
                : (
                  <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 w-100">
                    No image available
                  </div>
                )
              }
            </div>
            <div className="space-y-3 mt-7">
              <h1 className="text-4xl font-black">{item.itemName.toUpperCase()}</h1>
              <p className="text-gray-500 font-black text-2xl">{item.category}</p>

              <p className="text-3xl font-semibold text-red-500">
               ₹{item.purchasePrice || 0}
              </p>

              <p className='text-blue-600 font-black text-2xl'>
                Warranty:{" "}<span className="font-black text-lg">
                {item.warrantyLength || "Not specified"}</span>
              </p>
            </div>
          </div>
            <div>
              <h1 className='border-b border-gray-400 pl-4 font-serif'>Product Information</h1>
              <div className='pl-7 py-4'>
                <h3>Item Name : {item.itemName || "Not specified"}</h3>
                <h3>Category:{item.category || "Not specified"}</h3>
                <h3>Seriel Number : {item.serielNumber || "Not specified"}</h3>
              </div>
            </div>
            <div>
              <h1 className='border-b border-gray-400 pl-4 font-serif'>Purchase Information</h1>
              <div className='pl-7  py-4'>
                <h3>Purchase Date   : {item.purchaseDate || "Not specified"}</h3>
                <h3>Purchase Price : ₹{item.purchasePrice || 0}</h3>
                <h3>Location : {item.location || "Not specified"} </h3>
                
              </div>
            </div>

            <div>
              <h1 className='border-b border-gray-400 pl-4 font-serif'>Warranty Information</h1>
              <div className='pl-7  py-4'>
                <h3 >Status : <span className={`px-3 py-1 rounded-2xl text-center w-fit ${warrantyStatus.color}`}>{warrantyStatus.status}</span></h3>
                <h3>Warranty Start : <span className='text-blue-500'>{item.purchaseDate}</span></h3>
                <h3>Warranty Duration : <span className='text-yellow-700'>{item.warrantyLength || "Not Specified"}</span></h3>
                <h3>Warranty Ends : <span className='text-red-800'>
                 {
                    expirydate?expirydate.toLocaleDateString('en-IN',{
                      day:'2-digit',
                      month:'long',
                      year:'numeric'
                    })
                    :"Not Specified"
                  }  </span></h3>
                <h3 className=''>Days Remaining : {
                    daysRemaining == null ?(<span className='text-gray-500'>"Not Specified"</span>)
                    :daysRemaining <0 ? (<span className='text-red-600 font-bold'>Expired {Math.abs(daysRemaining)} days ago</span>)
                    :daysRemaining <30 ? (<span className='text-amber-400 font-bold'>Expring in {daysRemaining} days</span>)
                    :(<span className='text-green-900'>Expring in {daysRemaining} days</span>)
                  }</h3>
                
              </div>
            </div>

            <div>
              <h1 className='border-b border-gray-400 pl-4 font-serif'>Notes</h1>
              <div className='pl-7  py-4'>
                <p>{item.notes}</p>
                <p>Purchased for personal use.</p>
                <p>Keep the original box and warranty documents safely. </p>
                <div className={`mt-3 bg-amber-100 rounded-2xl w-full p-4 text-center ${warrantyStatus.color}`}>
                    <h1 className='font-black'>{warrantyStatus.status}</h1>
                    <h3 className='font-mono'> {
                    daysRemaining == null ?(<span className='text-gray-500'>"Not Specified"</span>)
                    :daysRemaining <0 ? (<span >Expired {Math.abs(daysRemaining)} days ago</span>)
                    :daysRemaining <30 ? (<span >Expring in {daysRemaining} days</span>)
                    :(<span>Expring in {daysRemaining} days</span>)
                  }</h3>
                    <h2 className='font-light'>Make sure to keep your purchase documents.</h2>
                </div>
              </div>
            </div>
      </div>
      
      { showEdit &&
        (<EditInventory 
          item={item}
          onClose={()=>setShowEdit(false)}
          onUpdated={()=>{
            notifyInventoryUpdate()
            setShowEdit(false)
            setRefreshDetails((prev)=>!prev)
          }}
        />)
      }

    </div>
  )
}

export default InventoryDetails
