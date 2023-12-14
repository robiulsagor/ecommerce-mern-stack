import { useEffect, useState } from "react"
import axios from "axios"

export const useCategory = () => {
    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/category/get-all-categories")
            setCategories(data?.categories)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return categories
}