import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProductsFromServer } from "./productSlice";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import UserNavBar from "../../userNavBar";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavBar from "../../adminNavbar";
import { AddLendToServer } from "../Lend/lendSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ProductList = () => {

    
    let dis = useDispatch()

    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        dis(fetchAllProductsFromServer())
    }

    const currentUsers = useSelector(x => x.user.users)

    const { id } = useParams()
    const categoryname = id

    const currentProducts = useSelector(x => x.product.products)
    const currentUser = useSelector(x => x.user.currentUser)
    const currentCategories = useSelector(x => x.category.categories)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
        console.log(e.target.id);    
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToCart=(e)=>{
        
        const y=e.target.id
        const ap=currentProducts.filter(x=>x.id==y)
        const p=ap[0] 
        AddLend(p)
    }

    const nav=useNavigate()
      
    // const dispatch = useDispatch()

    const AddLend = async (p) => {
    const User=currentUsers.filter(x=>x.name==currentUser.username)   
    console.log(User);
    const idUser=User[0].id
    const data={
        id:0,
        lendingDate:"2024-07-29T07:15:18.049Z",
        restingDate:"2024-07-29T07:15:18.049Z",
        productId:p.id,
        userId:idUser
    }
    console.log(data)   
    await dis(AddLendToServer(data))
    console.log(data)
    nav('/lend')
    }

    const category=categoryname=="all"?"all":currentCategories.filter(x=>x.name==categoryname);

    return (
        <>
            {currentUser.username!=="pnini"&&<UserNavBar></UserNavBar>}
            {currentUser.username==="pnini"&&<AdminNavBar></AdminNavBar>}

            <h2>Product List</h2>

            {category!="all"&&currentProducts.filter(x => x.categoryId == category[0].id).map((item) => {
                return (
                    <>
                        <h1>{item.id}</h1>
                        <h2>{item.price}</h2>
                        <input type="button" value="details" onClick={handleClickOpen} id={item.id}></input>
                        <input type="button" value="add to cart" onClick={addToCart} id={item.id}></input>
                        <React.Fragment>
                            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                <AppBar sx={{ position: 'relative' }}>
                                    <Toolbar>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={handleClose}
                                            aria-label="close"
                                        ><CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                            Details
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <List>
                                    <div>
                                        <h1>ID: {item.id}</h1>
                                        <h2>PRICE: {item.price}</h2>
                                        <h2>COMPANY: {item.factory}</h2>
                                    </div>
                                    {/* <ListItemButton>
                                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                                    </ListItemButton> */}
                                </List>
                            </Dialog>
                        </React.Fragment>
                    </>
                )
            }
            )}

            {category=="all"&&currentProducts.map((item) => {
                
                return (
                    <>
                        <h1>{item.id}</h1>
                        <h2>{item.price}</h2>
                        <input type="button" value="details" onClick={handleClickOpen} id={item.id}></input>
                        <input type="button" value="add to cart" onClick={addToCart} id={item.id}></input>
                        <React.Fragment>
                            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                                <AppBar sx={{ position: 'relative' }}>
                                    <Toolbar>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={handleClose}
                                            aria-label="close"
                                        ><CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                            Details
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <List>
                                    <div>
                                        <h1>ID: {item.id}</h1>
                                        <h2>PRICE: {item.price}</h2>
                                        <h2>COMPANY: {item.factory}</h2>
                                    </div>
                                    {/* <ListItemButton>
                                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                                    </ListItemButton> */}
                                </List>
                            </Dialog>
                        </React.Fragment>
                    </>
                )
            }
            )}
        </>


    )
}
export default ProductList;