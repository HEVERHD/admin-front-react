import Sidebar from '../../components/SideBar/Sidebar';
import { useEffect, useState } from "react";
import {  updateUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './EditUser.module.scss';
import { useLocation } from "react-router-dom";
import {TextField, MenuItem} from '@mui/material';

export default function EditUser(){



    const dispatch = useDispatch()

    const fetchedUserData = useLocation().state

    console.log(fetchedUserData)


    const [userData, setData] = useState({...fetchedUserData})

    useEffect(()=>{
        console.log(userData)
    }, [userData])

    const adminToken = useSelector(state=>state.currentUser.accessToken)

    function submitHandler(userData){
        dispatch(updateUser(userData.id, userData, adminToken))
    }

    function handleChange(e){
        e.preventDefault()
        console.dir(e)
        setData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }

    function handleNoChange(e){
        e.preventDefault()
        if(!e.target.value){
            setData({
                ...userData,
                [e.target.name]: fetchedUserData[e.target.name]
            })
        }
    }

    return (
        <div>
            <Sidebar/>
            <form className={style.userForm} onSubmit={e=>{
                e.preventDefault()
                submitHandler(userData)
            }}>
                <TextField 
                    type='email'
                    name='email'
                    label='Email'
                    value={userData.email}
                    onChange={handleChange}
                    onBlur={handleNoChange}
                />
                <TextField 
                    type='name'
                    name='name'
                    label='name'
                    value={userData.name}
                    onChange={handleChange}
                    onBlur={handleNoChange}
                />
                <TextField 
                    type='password'
                    name='password'
                    label='password'
                    placeholder={userData.password===fetchedUserData.password||userData.password===''?'Unchanged':userData.password}
                    onChange={handleChange}
                    onBlur={handleNoChange}
                />
                <TextField 
                    type='text'
                    name='isAdmin'
                    label='User type'
                    value={userData.isAdmin}
                    select
                    onChange={handleChange}
                    onBlur={handleNoChange}
                >
                    <MenuItem key={'admin'} value={true}>Admin</MenuItem>
                    <MenuItem key={'Employed'} value={false}>Employed</MenuItem>
                </TextField>
                <button type='submit'>Edit</button>
            </form>
        </div>
    )
}