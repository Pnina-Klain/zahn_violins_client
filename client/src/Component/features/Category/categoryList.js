import React from "react";
import {  useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import ImageList from '@mui/material/ImageList';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';



export default function CategoryList() {
  
  const navigate = useNavigate()

  const currentCategory = useSelector(x => x.category.categories)

  const SortCategory = (e) => {
     console.log(e);
      const id = e.target.innerHTML
      navigate("/productList/" + id)
  }

  return (
    <ImageList sx={{ width: 1000, height: 1000 }}>
      {currentCategory.map((item) => ( 
          
         <div>
         <Card sx={{ maxWidth: 400 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" onClick={(e) => SortCategory(e)}>
                               {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                    </CardActions>
                </Card>
                <br></br>
                <br></br>   
                </div>
      ))}
    </ImageList>
    
  )
}

