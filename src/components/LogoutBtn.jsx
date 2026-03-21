import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import {logout} from "../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className="inline
    -block px-6 py-2 duration-200 bg-red-600 text-white hover:bg-gray-500 rounded-lg   cursor-pointer hover:scale-110 text-lg" onClick={logoutHandler}>Logout</button>
  )
}
export default LogoutBtn