import Container from "./Container"
import {Logo} from "./index"

import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {LogoutBtn} from "./index"

function Header() {
  const authStatus = useSelector((state)=> {
    return state?.auth?.status ?? false;
  })
  const navigate = useNavigate()

  const navItems = [
    {
      name : 'Home',
      slug : "/",
      active : true,
      hover : "hover:border-2 hover:border-blue-100"
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      hover : "border-2 border-green-600 text-green-600 hover:bg-green-700 hover:text-white hover:border-0"
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      hover : "border-2 border-blue-800 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-0"
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      hover : "hover:border-2 hover:border-blue-100"
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      hover : "hover:border-2 hover:border-blue-100"
  }
  ]
  return (
    <header className=" bg-gray-700">
      <Container>
        <nav className="flex">
          <div className="mr-4 flex justify-center items-center gap-3">
            <Link to="/">
            <Logo width="70px"/>
            </Link>
            <h1 className=" text-xl text-gray-400">REBLOG</h1>
          </div>
          <ul className="flex ml-auto justify-center items-center gap-2">
            {navItems.map((item) => 
           item.active ? (
            <li key={item.name}>
              <button onClick={()=>navigate(item.slug)}
              
                className={`inline-block px-6 py-2 duration-200  rounded-lg    cursor-pointer hover:scale-110 font-bold ${item.hover}`}>{item.name}</button>

            </li>
           ): null 
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

      </Container>
    </header>
  
  )
}
export default Header