import { useEffect } from "react";
import UserNavBar from "./userNavBar";
import CategoryList from "./features/Category/categoryList";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllCategoriesFromServer } from "./features/Category/categorySlice";
import AdminNavBar from "./adminNavbar";


const Home = () => {

    const currentUser = useSelector(x => x.user.currentUser)

    let dis = useDispatch()
    useEffect(() => {
       getData()
    },[])
    const getData = () =>{
        dis(fetchAllCategoriesFromServer())
    }
    return (
        <>
            <h2>Home</h2>
            {currentUser.username!=="pnini"&&<UserNavBar></UserNavBar>}
            {currentUser.username==="pnini"&&<AdminNavBar></AdminNavBar>}
            <CategoryList></CategoryList>
        </>
    )
}
export default Home;