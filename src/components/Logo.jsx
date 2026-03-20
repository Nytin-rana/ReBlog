import logo from "../assets/Logo.png"
function Logo({width = "100px"}) {
  return (
    <img src={logo} alt="Logo" style={{width, opacity:0.7}}/>
  )
}
export default Logo