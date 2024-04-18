import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from './redux/actions';
import Cookies from 'js-cookie';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './components/Homepage/Homepage'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MyCart from './components/MyCart/MyCart';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Management from './components/Management/Management';
import ProductsManagement from './components/ProductsManagement/ProductsManagement';
import NewProductForm from './components/NewProductForm/NewProductForm';
import EditProduct from './components/EditProduct/EditProduct';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = Cookies.get('user');
    if (user && user > 0) {
      GetUser(user)
    }
  },[])

  async function GetUser(userId){
    if(userId) {
      try {
        const res = await fetch(`https://localhost:44350/Database/CheckUser?id=${userId}`)
        if(res.ok) {
            let data = await res.json()
            if (data) {
                data.Password = null
                dispatch(setUserAction(data))
            }
        }
      }
      catch(err) {
          console.log(`Errore nel recupero dati: ${err}`)
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Cart' element={<MyCart/>}/>
          <Route path='/ProfilePage' element={<ProfilePage/>}/>
          <Route path='/Management' element={<Management/>}/>
          <Route path='/ProductsManagement' element={<ProductsManagement/>}/>
          <Route path='/NewProductForm' element={<NewProductForm/>}/>
          <Route path='/EditProduct/:id' element={<EditProduct/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
