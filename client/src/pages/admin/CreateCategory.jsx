import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import CategoryForm from '../../components/form/CategoryForm'
import toast from 'react-hot-toast'
import axios from 'axios'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    const getAllCategories = async () => {
        try {
            const categories = await axios.get("/api/category/get-all-categories")
            const { data } = categories
            if (data?.success) {
                setCategories(data.categories)
            } else {
                toast.error(data.message || "Error fetching categories!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Error fetching category list!")
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const addCategory = async e => {
        e.preventDefault()
        if (!value) {
            toast.error("Please enter category name!")
            return;
        }
        setLoading(true)

        try {
            const addCat = await axios.post("/api/category/create-category", { name: value }, {
                signal: AbortSignal.timeout(5000) //Aborts request after 5 seconds
            })
            if (addCat?.data.success) {
                toast.success(`Category ${value} has been added!`)
                getAllCategories()
                setValue("")
            } else {
                toast.error("Failed")
            }
            setLoading(false)

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message == "canceled" && "Network Error" || "Error ")
            setLoading(false)
        }
    }

    return (
        <Layout title={"Create Category - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-3">
                        <AdminMenu />
                    </div>
                    <div className="col-9">
                        <div className="card p-3 w-75">
                            <h2 className='mb-3'>Create Category</h2>
                            <CategoryForm handler={addCategory} value={value} setValue={setValue} loading={loading} setLoading={setLoading} />

                            <div className='mt-4'>
                                <h2>Category List</h2>
                                {categories?.length > 0 ? (

                                    <table className="table w-75">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ width: "50px" }}>#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col" style={{ width: "200px", textAlign: "center" }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {categories?.map((cat, i) => (
                                                <tr key={i}>
                                                    <th scope="row"> {i + 1}</th>
                                                    <td>{cat.name} </td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary me-2" >Edit</button>
                                                        <button type="button" className="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>)
                                    : <h3 className='text-center text-danger'>No data found!    </h3>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory