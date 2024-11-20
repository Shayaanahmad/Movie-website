import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import TVShows from './pages/TVShows/TVShows'
import Movies from './pages/Movies/Movies'
import MyList from './pages/MyList/MyList'
import { MyListProvider } from './context/MyListContext'
import ProfilePage from './pages/ProfilePage/ProfilePage' 
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const App = () => {

  const navigate = useNavigate();

  // const [user, setUser] = useState();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged In");
        navigate('/');
      }else{
        console.log("Logged Out")
        navigate('/login');
      }
    });
  },[])

  return (
    <MyListProvider>
      <ToastContainer theme='dark'/>
      {/* {user && <Navbar />} */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
      

    </MyListProvider>
  )
}

export default App
