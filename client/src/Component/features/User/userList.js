import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUsersFromServer } from "./userSlice";


const UserList=()=>{

    let dis = useDispatch()
    useEffect(() => {
       getData()
    },[])
    const getData = () =>{
        dis(fetchAllUsersFromServer())
    }
    const currentUsers = useSelector(x => x.user.users)
    
   
    return(
        <>
            <h2>User List</h2>
            <h3>===========</h3>
            {currentUsers.map((item) => 
            {
                
                return(   

                <>
                    <h3>{item.id}</h3>
                    <h4>{item.name}</h4>
                    <h3>===========</h3>
                </>
                )
            }            
            ) }
              </>
       
        
    )
}
export default UserList;