import React, {useContext, useEffect} from 'react'
import AuthContext from '../context'
import { get } from 'react-hook-form';
import { getTasks } from '../services';




export default function OurtaskPage() {

    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const tasks = await getTasks();
            console.log('Fetched tasks:', tasks);
            }catch (error) {
            console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    },[])



    console.log(user);

  return (

    <div>OurtaskPage</div>
  )
}