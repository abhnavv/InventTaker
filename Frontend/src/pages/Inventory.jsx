import {React,useContext,useState,useEffect} from 'react'
import { VscCircleSmallFilledCompact } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom'
import inventoryContext from '../context/InventoryContext';
import { getAllItemsAPI ,deleteItemAPI} from '../services/allApi';
import { calculateExpiryDate,getWarrantyStatus,getDaysRemaining } from '../utils/warranty';
import EditInventory from '../components/EditInventory';

function Inventory() {
  const {handleOpen,refreshInventory,notifyInventoryUpdate}=useContext(inventoryContext)
  const [inventory,setInventory]=useState([])
  const [selectedItem,setSelectedItem]=useState(null)
  useEffect(()=>{
    const fetchInventory=async()=>{
      try {
        const response=await getAllItemsAPI()
        console.log(response.data);
        setInventory(response.data)
        console.log("Fetched Inventory: ",response.data);
        
      } catch (error) {
        console.error("Failed to fetch inventory",error);
        
      }
    }
    fetchInventory()
  },[refreshInventory])
  
  const handleDelete=async(id)=>{
    try{
      await deleteItemAPI(id)
      setInventory(preInventory=>
        preInventory.filter(item=>item.id!==id)
        );
        console.log("Item deleted successfully");
    }catch(err){
      console.error("Failed to delete item",err);
      
    }
  }
  
  const handleEdit=async(item)=>{
    setSelectedItem(item)
  }
  return (
    <div className='m-7'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-2xl font-black'>Your inventory</h1>
            <p className='text-gray-500 '>All your important things, at a glance.</p>
          </div>
          <button className='md:me-30  bg-emerald-400 rounded-2xl md:px-3  px-7 hover:transition-transform duration-300 hover:scale-110 ' onClick={handleOpen}>+ Add item</button>
        </div>
        {/* searchbox */}
        <div className='relative'>
        <CiSearch  className='absolute left-4 top-1/2  '/> 
          <input className="border border-gray-300 rounded-2xl px-4 py-2 w-100 mt-4 outline-blue-200 shadow pl-9 " placeholder='Search your item' />
          
        </div>
        <div className='m-5 bg-gray-100 rounded-4xl border border-gray-200 shadow-lg overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b border-gray-300 bg-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left'>ITEM</th>
                  <th className='px-6 py-4 text-left'>CATEGORY</th>
                  <th className='px-6 py-4 text-left'>PURCHASED</th>
                  <th className='px-6 py-4 text-left'>LOCATION</th>
                  <th className='px-6 py-4 text-left'>WARRANTY</th>
                  <th className='px-6 py-4 text-left'>EXPIRES</th>
                  <th className='px-6 py-4 text-left'></th>
                </tr>
            </thead>
            <tbody>
              {(inventory||[]).map(item=>(
                <tr key={item.id}>

                  {/*item name and image*/}
                <td className="px-6 py-2 text-left relative group hover:bg-gray-200 rounded-lg">
                  <Link to={`/inventoryDetails/${item.id}/view`}>
                    <div className='flex gap-3 items-center'>
                      <img src={item.image} alt="img" className='object-contain rounded-lg w-20 h-20'/>
                      <h1>{item.itemName}</h1>
                    </div>
                 
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                    click to view details
                  </span>
                  </Link>
                </td>

                {/*category*/}
                <td className="px-6 py-2 text-left">{item.category}</td>

                {/*purchase date*/}
                <td className="px-6 py-2 text-left">{item.purchaseDate}</td>

                {/*location */}
                <td className="px-6 py-2 text-left">{item.location}</td>

                {/*under warranty expired status */}
                <td className="px-6 py-2 text-left">
                  {
                    (()=>{
                      const warranty=getWarrantyStatus(item.purchaseDate,item.warrantyLength)
                      const daysRemaining=getDaysRemaining(item.purchaseDate,item.warrantyLength)
                      return (
                        <div className={`flex gap-1 items-center text-sm  rounded-2xl px-3 py-1 w-fit ${warranty.color}`}><VscCircleSmallFilledCompact/>
                        <span>
                          {warranty.status}
                        </span>
                        </div>
                      )
                    })
                    ()
                  }
                  
                  </td>

                {/*expirydate*/}
                <td className="px-6 py-2 text-left">{
                (()=>{
                    const expirydate=calculateExpiryDate(item.purchaseDate,item.warrantyLength)

                    return expirydate ?
                      expirydate.toLocaleDateString('en-IN',{
                        day:'2-digit',
                        month:'short',
                        year:'numeric'
                      })
                      :
                      "Not Specified"

                  })
                ()
                  }</td>

                {/*delte and edit buttons*/}
                <td className='flex gap-3 px-6 py-2 text-left'>
                  <button className="text-blue-500 hover:text-blue-700 hover:bg-gray-200 rounded-full p-2" onClick={()=>handleEdit(item)}><MdEdit/></button>

                  <button className="text-red-500 hover:text-red-700 hover:bg-gray-200 rounded-full p-2" onClick={()=>handleDelete(item.id)}><MdDelete/></button>
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      {selectedItem && (
        <EditInventory 
          item={selectedItem} 
          onClose={()=>setSelectedItem(null)} 
          onUpdated={notifyInventoryUpdate} 
        />
      )}
    
    </div>
  )
}

export default Inventory
