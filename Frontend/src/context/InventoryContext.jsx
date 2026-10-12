import  { createContext,useState } from 'react'

const inventoryContext=createContext()


export function InventoryProvider({children}) {
  const [show,setshow]=useState(false)
  const [refreshInventory,setRefreshInventory]=useState(false)
  const handleClose=()=>setshow(false)
  const handleOpen=()=>setshow(true)
  const notifyInventoryUpdate=()=>{
    setRefreshInventory(prev=>!prev)
  }
  return(
    <inventoryContext.Provider value={{show,handleClose,handleOpen,refreshInventory,notifyInventoryUpdate}}>
        {children}
    </inventoryContext.Provider>
  )
}


export default inventoryContext