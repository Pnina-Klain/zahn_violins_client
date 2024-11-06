import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AddUserToServer, fetchAllUsersFromServer } from '../features/User/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom';

import './signUp.scss'

const SignUp=()=>{

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })

  const nav=useNavigate()

  let dis = useDispatch()
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
      dis(fetchAllUsersFromServer())
  }

  const save =(user) => {
    
    let newUser={}
    newUser.id=0
    newUser.name=user.username
    newUser.mail=user.email
    newUser.phone=user.phone
    newUser.address=user.address
    
    dis(AddUserToServer(newUser))
    const str = JSON.stringify(newUser);
    sessionStorage.setItem("currentUser",str);
    nav('/home') 
  }
 
    return (
        <>
        <div className="SinUpBody">
          <div className="loginCard" >
              <h1>SignUp</h1>
              <h3>sing up to continue</h3> 
              <form onSubmit={handleSubmit(save)}>
              <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                  <div>
                    <TextField id="username" label="Name" type="search" {...register("username", { pattern: /^[ A-Za-z]+$/i, required: "*is a required field!!" })}/>
                    <br/>
                    {errors.username && <label className="war1">*please enter only english letters</label>}<br/>
                    {errors.username?.type == "required" && <label className="war1">{errors.username.message}</label>}
                    <br/>
                    <TextField id="address" label="address" type="search" {...register("address", { pattern: /^[ A-Za-z]+$/i })}/>
                    <br/>
                    {errors.address && <label className="war1">*please enter only english letters</label>}
                    <br/>
                    <TextField id="phone" label="phone" type="search" {...register("phone", { pattern: /^[0-9]+$/i, minLength: 10, maxLength: 10 })}/>
                    <br/>
                    {errors.phone && <label className="war1">*please enter a valid pelephone number</label>}
                    <br/>
                    <TextField id="email" label="email" type="search" {...register("email", { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}/>
                    <br/>
                    {errors.email && <label className="war1">*Please enter a valid email</label>}
                    <br/>
                    <TextField
                      id="identity"
                      label="identity"
                      type="password"
                      autoComplete="current-password"
                      {...register("identity", { pattern: /^[0-9]+$/i , minLength: 9, maxLength: 9 , required: "*is a required field!!"})}
                    /><br/>
                    {errors.identity && <label className="war1">*please enter a valid Identity number</label>}<br/> 
                    {errors.username?.type == "required" && <label className="war1">{errors.username.message}</label>}
                  </div>
                </Box>
                <br/>    
              <Button type="submit" variant="contained" endIcon={<SendIcon />} >Sign up</Button>
              </form>
          </div>
        </div>
        </>
    )
}
export default SignUp