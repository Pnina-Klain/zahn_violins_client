import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AddProductToServer } from './productSlice';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const NewProduct=()=>{   

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    p: 10
  };

    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

     const nav=useNavigate()
  

      
      const dispatch = useDispatch()
      const AddP = async (d) => {
        console.log(d.Category);
        const data={id:0,
          factory:d.Factory,
          size:d.Size,
          price:parseInt(d.Price),
          categoryId:parseInt(d.Category)}
         
        await dispatch(AddProductToServer(data))
        nav('/productList/all')
      }
  

    return(
        <>
        <h1>add new product</h1>
        <Box sx={style}>
        <form onSubmit={handleSubmit((data) => AddP(data))}>
        <TextField  {...register('Factory', { required: true })} id="outlined-basic" className="textField" label="factory" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField {...register('Size', { required: true })} id="outlined-basic" className="textField" label="size" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField  {...register('Price', { required: true })} id="outlined-basic" className="textField" label="price" variant="outlined" />
                    <br></br>
                    <br></br>
                    <TextField {...register('Category', { required: true })} id="outlined-basic" className="textField" label="category" variant="outlined" />
                    <br></br>
                    <br></br>
        
                  
 
                    <input type='submit' value="enter"></input>

                  
                  </form>
                </Box>
                
        </>
    )
}

export default NewProduct