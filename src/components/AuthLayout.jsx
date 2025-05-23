import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // If authentication required but user not logged in
        if (authentication && !authStatus) {
            navigate("/login")
        } 
        // If authentication not required but user is logged in
        else if (!authentication && authStatus) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}