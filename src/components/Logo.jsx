import logo from "../assets/Logo.png"
function Logo({width = "100px"}) {
  return (
    <img src={logo} alt="Logo" style={{width :width,stroke:"#000000" ,strokeWidth: "5"}}/>
  )
}
export default Logo