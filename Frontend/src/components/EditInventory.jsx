import React, { useEffect, useState } from 'react'
import { editItemAPI } from '../services/allApi'
import { FaWindowClose } from "react-icons/fa";
function EditInventory({item,onClose,onUpdated}) {
    const [formData,setFormData]=useState({
        itemName:'',
        category:'',
        purchaseDate:'',
        warrantyLength:'',
        purchasePrice:'',
        location:'',
        serielNumber:'',
        notes:'',
        image:''
    })
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        if(item){
            setFormData({
                itemName:item.itemName || '',
                category:item.category||'',
                purchaseDate:item.purchaseDate||'',
                warrantyLength:item.warrantyLength||'',
                purchasePrice:item.purchasePrice ?? '',
                location:item.location||'',
                serielNumber:item.serielNumber||'',
                notes:item.notes||'',
                image:item.image||''
            })
        }
    },[item])

    const handleFormClose=()=>onClose()
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => resolve(reader.result);
      
          reader.onerror = () => reject(reader.error);
      
          reader.readAsDataURL(file);
        });
      };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const updatedData={...formData,createdAt:item.createdAt}
            if(formData.image instanceof File){
                updatedData.image=await convertToBase64(formData.image)
            }
            await editItemAPI(item.id,updatedData)
            onUpdated()
            onClose()
        } catch (error) {
            console.error("Failed to update item details!..",error);
            alert("Failed to update item. Please try again.");
        }finally{
            setLoading(false)
        }
        
    }

    const imagePreview=formData.image?typeof formData.image==="string"?formData.image:URL.createObjectURL(formData.image)
    :""
  return (
    <div className='bg-black/70 w-full p-5 fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50' onClick={handleFormClose}>
      <div className='bg-white rounded-2xl p-4 w-4xl mt-10 mb-10' onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center justify-between border-b border-gray-50 shadow pb-3'>
          <h1 className='font-black text-xl'>Edit Item Details</h1>
          <button onClick={handleFormClose} className='border border-red-50 shadow hover:transition-transform duration-200 hover:scale-115'><FaWindowClose className='text-3xl text-red-700' /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-5 max-h-[80vh] overflow-y-auto'>
            <div className='flex gap-20 mb-9 mt-3 items-center'>
              
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Product Image(optional)</label>
                <label className='border  border-gray-300 shadow rounded-2xl px-4 py-3 cursor-pointer hover:border-red-400  '>
    
                  <input type="file" accept='image/*' name="image" id="" onChange={(e) => setFormData({...formData,image:e.target.files[0]})} />
                  
                </label>
                {imagePreview && (
                    <div className='mt-3'>
                      <img
                        src={imagePreview}
                        alt="Item Preview"
                        className="w-24 h-24 object-cover rounded-xl  border border-gray-200"
                      />
                    </div>
                  )}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
                 {/* item name */}
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Item name </label>
                  <input type="text" name="itemName" id="" placeholder='e.g. Wireless headphones' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,itemName:e.target.value})} value={formData.itemName} required/>
                </div>
                {/* category */}
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Category</label>
                  <select name='category' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,category:e.target.value})} value={formData.category} required>
                    <option value="">Select item</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Home & garden">Home & garden</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Purchase date</label>
                  <input type="date" name="purchaseDate" id="" className='border border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,purchaseDate:e.target.value})} value={formData.purchaseDate}/>
                </div>
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Warranty length(optional)</label>
                  <input type="text" name="warrantyLength" id="" placeholder='e.g 1 year or 6 months' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,warrantyLength:e.target.value})} value={formData.warrantyLength} pattern="(\d+\s*(year|years|month|months))?" title="Enter a number followed by year(s) or month(s), or leave empty."/>
                </div>
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Purchase price</label>
                  <input type="number" name="purchasePrice" id="" placeholder='Rs.0.00' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,purchasePrice:e.target.value})} value={formData.purchasePrice}/>
                </div>
                <div className='flex flex-col gap-3 mb-3'>
                  <label htmlFor="" className='text-sm font-medium text-gray-700'>Where is it?(optional)</label>
                  <input type="text" name="location" id="" placeholder='e.g. Living room' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,location:e.target.value})} value={formData.location}/>
                </div>
              </div>
              <div className='flex flex-col gap-3 mb-3'>
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Serial number (optional)</label>
                <input type="text" name="serielNumber" id="" placeholder='Useful when contacting support' className='mb-3 border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,serielNumber:e.target.value})} value={formData.serielNumber}/>
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Notes</label>
                <textarea name="notes" id="" placeholder='Add details,reciepient info, or anything else to remember..' className='border  border-gray-300 shadow rounded-2xl p-3' onChange={e=>setFormData({...formData,notes:e.target.value})} value={formData.notes}>    
                </textarea>
              </div>
                 
          </div>
          <div className='flex gap-6 float-end'>
            <button type='button' className='bg-blue-500 border border-red-50 shadow rounded-3xl px-3 py-2 hover:transition-transform duration-200 hover:scale-105 hover:bg-blue-800 hover:text-white' onClick={handleFormClose}>Cancel</button>
            <button type='submit' className='bg-red-500 border border-red-50 shadow rounded-3xl px-3 py-2 hover:transition-transform duration-200 hover:scale-105 hover:bg-red-800 hover:text-white' disabled={loading}>{loading?"Saving..":"Save"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditInventory
