import { useContext, createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: "",
        result: [],
    })
    const [loading, setLoading] = useState(false)

    return <SearchContext.Provider value={[values, setValues, loading, setLoading]}>
        {children}
    </SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)

