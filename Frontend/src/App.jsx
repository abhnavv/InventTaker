import {Routes,Route} from "react-router-dom"
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Pnf from './pages/Pnf'
import InventoryDetails from './pages/InventoryDetails'
import InventoryForm from './components/InventoryForm'
function App() {
  

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Header/>
        <div className="flex-1">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/inventoryDetails/:id/view' element={<InventoryDetails />}/>
            <Route path='/*' element={<Pnf/>}/>
            
          </Routes> 
        </div>
      <Footer/>
    </div>    
    <InventoryForm /> 
    </>
  )
}

export default App
