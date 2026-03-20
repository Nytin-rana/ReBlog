import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
    }, [authStatus, navigate, authentication])

    if (authStatus === null || authStatus === undefined) {
        return <h1>Loading...</h1>
    }

    const isAuthorized = authentication ? authStatus === true : authStatus === false
    if (!isAuthorized) {
        return <h1>Loading...</h1>
    }

    return <>{children}</>
}
