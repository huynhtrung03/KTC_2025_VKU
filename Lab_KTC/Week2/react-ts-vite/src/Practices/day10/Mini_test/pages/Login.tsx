import React, { useContext } from 'react'
import AuthContext from '../context'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const {user, setUser} = useContext(AuthContext);

    const navgite = useNavigate();



    const handleLogin = () => { 
        setUser({
            id: '1',
            username: 'trung@gmail.com',
            name: 'tony',
        });
        navgite('/tasks');
    }   



  return (
    <div>

        <button className='bg-red-400' onClick={handleLogin}>Login1</button>
    </div>
  )
}