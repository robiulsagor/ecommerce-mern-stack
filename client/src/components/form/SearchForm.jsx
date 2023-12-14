import React from 'react'
import { useSearch } from '../../context/searchContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import SmallSpinner from '../SmallSpinner'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
    const [values, setValues, loading, setLoading] = useSearch()
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/product/search/${values.keyword}`, {
                signal: AbortSignal.timeout(3000)
            })
            setLoading(false)
            setValues({ ...values, result: data })
            navigate("/search")
        } catch (error) {
            console.log(error);
            toast.error("Searching error!")
            setLoading(false)
        }
    }

    return (
        <form className="d-flex ms-5" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search"
                value={values.keyword} onChange={e => setValues({ ...values, keyword: e.target.value })} />
            <button className="btn btn-outline-success" type="submit" disabled={values.keyword == ""}>
                {loading ? (
                    <SmallSpinner />
                ) : "Search"}
            </button>
        </form>
    )
}

export default SearchForm