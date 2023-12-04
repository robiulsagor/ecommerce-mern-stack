import { useContext, useEffect } from "react"
import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" })

    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parsedData = JSON.parse(data)
            console.log(parsedData);
            setAuth({
                ...auth, user: parsedData.details, token: parsedData.token
            })
        }
    }, [])

    return <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

// I'm already using REDUX TOOLKIT, but I'm testing the CONTEXT API
// I'll remove it after testing, or just comment it out.