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
import Spinner from './components/Spinner/Spinner';
import ProductPage from './components/ProductPage/ProductPage';
import CompleteOrder from './components/CompleteOrder/CompleteOrder';
import UserShippingInfo from './components/UserShippingInfo/UserShippingInfo';
import UserOrders from './components/UserOrders/UserOrders';
import OrdersManagement from './components/OrdersManagement/OrdersManagement';
import WishList from './components/WishList/WishList';
import ProductByLan from './components/ProductByLan/ProductByLan';
import Pokedex from './components/Pokedex/Pokedex';
import SearchPage from './components/SearchPage/SearchPage';
import SeeOrder from './components/SeeOrder/SeeOrder';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    const user = Cookies.get('user');
    const userPsw = Cookies.get('userPsw')
    ///////////////////// TODO: MODIFICARE L'ENDPOINT PER FARE IL CHECK ANCHE DELLA PASSWORD /////////////////////
    if (user && user > 0) {
      GetUser(user, userPsw)
    }
    setIsLoading(false)
  },[])

  async function GetUser(userId, password){
    setIsLoading(true)
    if(userId) {
      try {
        const res = await fetch(`https://localhost:44350/Database/CheckUser?id=${userId}&password=${password}`)
        if(res.ok) {
            let data = await res.json()
            if (data) {
                dispatch(setUserAction(data))
            }
            if(Promise.all) {
              setIsLoading(false)
            }
        }
      }
      catch(err) {
        console.log(`Errore nel recupero datiaaaa: ${err}`)
        setIsLoading(false)
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        {isLoading ? <Spinner/> : ''}
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
          <Route path='/Product/:id' element={<ProductPage/>}/>
          <Route path='/CompleteOrder' element={<CompleteOrder/>}/>
          <Route path='/AddUserShipmentInfo' element={<UserShippingInfo/>}/>
          <Route path='/UserOrders' element={<UserOrders/>}/>
          <Route path='/OrdersManagement' element={<OrdersManagement/>}/>
          <Route path='/WishList' element={<WishList/>}/>
          <Route path='/ProductByLan/:id' element={<ProductByLan/>}/>
          <Route path='/Pokedex' element={<Pokedex/>}/>
          <Route path='/SearchPage/:id' element={<SearchPage/>}/>
          <Route path='/SeeOrder/:id' element={<SeeOrder/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
