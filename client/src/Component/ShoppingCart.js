import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllLendsFromServer } from "./features/Lend/lendSlice"
import ImageList from '@mui/material/ImageList';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchAllUsersFromServer } from "./features/User/userSlice";


const Cart=()=>{
    useEffect(() => {
        getData()
    }, [])
    
    const getData = async() => {
        await dis(fetchAllLendsFromServer())
        await dis(fetchAllUsersFromServer())
    }
     const navigate = useNavigate()
     const currentUsers = useSelector(x => x.user.users)
     let d = sessionStorage.getItem("currentUser")
     const currentUser = JSON.parse(d)
     let dis = useDispatch()

    
    const finish=()=>{
        navigate("/home")
    }
    const cuurentLends=useSelector(x=>x.lend.lends)
    console.log(currentUsers)  
    const User=currentUsers.filter(x=>x.name==currentUser.username)
    console.log(User)  
    const idUser=User[0].id
    console.log(idUser)
    const l=cuurentLends.filter(x=>x.userId==idUser) 
    console.log(l)
    return (
        <>
        <input type="button" value="finish the land" onClick={finish}></input> 
        
        <div>
        <ImageList sx={{ width: 1000, height: 1000 }}>
        {l.map((item)=>{return   <>
            <h1>{item.id}</h1>
            <div>
                
            <Card sx={{ maxWidth: 400 }}>
               
                       <CardActionArea>
                           <CardContent>
                               <Typography gutterBottom variant="h4" component="div" >
                               {item.id}
                               </Typography>
                               <Typography gutterBottom variant="h4" component="div">
                               {item.productId}
                               </Typography>
                               <Typography gutterBottom variant="h4" component="div">
                               {item.lendingDate}
                               </Typography>
                               <Typography gutterBottom variant="h4" component="div">
                               {item.restingDate}
                               </Typography>
                               <Typography variant="body2" color="text.secondary">
                               </Typography>
                           </CardContent>
                       </CardActionArea>
                   </Card>
                   <br></br>
                   <br></br>   
                   </div>
        
                   </>
        
            }
           )      
        }
        </ImageList> 
        </div>
        </>    
    )

}
export default Cart