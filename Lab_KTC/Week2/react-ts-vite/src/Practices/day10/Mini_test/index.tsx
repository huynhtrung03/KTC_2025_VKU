import {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  OurtaskPage from './pages/OurtaskPage'
import  CreatePage from './pages/CreatePage'
import  MytaskPage from './pages/MytaskPage'  
import  UpdatePage from './pages/UpdatePage'   
import Login from './pages/Login'   
import AuthContext from './context'
import AccessDenied from './pages/AccessDenied'



const userData = {
    id: '1',
    username: 'trung@gmail.com',
    name: 'tony',

};

export default function TaskManegement() {
    const [user, setUser] = useState<any>(userData);

    
  return (
    <AuthContext.Provider value={{user, setUser}}>
    {/* css bằng tailwind */}
    <div className='container'>
        <h1>TaskManagement</h1>
        <hr />
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />}  />
                {/* Private */}
                {user && <Route path="/tasks" element={<OurtaskPage />} />}
                {user &&<Route path="/create" element={<CreatePage />} />}
                {user &&<Route path="/mytask" element={<MytaskPage />} />}
                {user &&<Route path="/update" element={<UpdatePage />} />}

                <Route path="/*" element={<AccessDenied />} />

            </Routes>




        </BrowserRouter>
    
    </div>
    </AuthContext.Provider>
  )
}