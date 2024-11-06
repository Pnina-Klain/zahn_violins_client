import './signIn.scss' ;
import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom/dist';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUsersFromServer, setCurrentUser } from '../features/User/userSlice';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const SignIn=()=>{

  const currentUsers = useSelector(x => x.user.users)
  
  const [flag,setflag] =useState(false)

  const nav=useNavigate()

  let dis = useDispatch()
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
      dis(fetchAllUsersFromServer())
  }

  const save=(user)=>{ 

    const arr=currentUsers.filter(item=>item.name===user.username)
    {console.log(currentUsers)}
    if(arr.length>0){
      dis(setCurrentUser(user))
      const str = JSON.stringify(user);
      sessionStorage.setItem("currentUser",str);
      nav('/home')
    }
    else{
      setflag(true)
    }
  }

  
  

  const { register, handleSubmit,  formState: { errors} } = useForm({
    mode: 'onBlur'
  }) 

  return (
        <>
        <div className="SinInBody">
          <div className="loginCard" >
              <h1>SignIn</h1>
              <h3>sing in to continue</h3> 
              <form onSubmit={handleSubmit(save)}>
              <Box
                  component="form"
                  sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField id="username" label="Name" type="search" {...register("username", { pattern: /^[ A-Za-z]+$/i, required: "*is a required field!!" })}/>
                    <br/>
                    {errors.username && <label className="war1">*please enter only english letters</label>}<br/>
                    {errors.username?.type == "required" && <label className="war1">{errors.username.message}</label>}<br/>
                    <TextField
                      id="identity"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      {...register("identity", { pattern: /^[0-9]+$/i, minLength: 9, maxLength: 9 , required: "*is a required field!!"})}
                    /><br/> 
                    {errors.identity && <label className="war1">*please enter a valid Identity number</label>}<br/> 
                    {errors.username?.type == "required" && <label className="war1">{errors.username.message}</label>}<br/> 
                  </div>
                </Box>
                <br/>    
              <Button type="submit" variant="contained" endIcon={<SendIcon />} >Sign in</Button>
              </form>
              <br></br>
              {flag&&<Link to="/signUp" className="oneLinkNavBarAdmin">
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">click to sign up</Alert>
                </Stack>
              </Link>}
          </div>
        </div>
        </>
    )
  }

export default SignIn