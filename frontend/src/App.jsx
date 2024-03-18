import './App.css';
import {Route, Routes} from 'react-router-dom';
import Registration from './Components/User/Registration/Registrations';
import Header from './Components/Header/Header';
import Login from './Components/User/Login/Login';
import Configurator from './Components/Configurator/Configurator';
import React from 'react';
import { useDispatch} from 'react-redux';
import { fetchAuthMe} from './redux/slices/Auth';
import Verification from './Components/User/Verification/Verification';
import Admin from './Components/Admin/Admin';


function App() {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  React.useEffect(()=>{
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className=" bg-mainBg flex flex-col space-y-3 min-h-screen items-center">
      
      <Header />
      <Routes>
        <Route path="/" element={<Configurator />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/emailVerify' element={<Verification />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
