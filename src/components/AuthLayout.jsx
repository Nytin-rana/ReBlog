import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication) {
            // route requires auth (protected route)
            if (authStatus === false) {
                navigate('/login')
            }
        } else {
            // public auth pages (login/signup) should not be accessed when already logged in
            if (authStatus === true) {
                navigate('/')
            }
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
