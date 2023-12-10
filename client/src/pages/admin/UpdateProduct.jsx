import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import Loading from '../../components/Loading'
import toast from 'react-hot-toast'
import { Modal, Select } from 'antd'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState()
    const [shipping, setShipping] = useState(0)

    const [id, setId] = useState('')

    // select product to preview for delete
    const [selected, setSelected] = useState("")
    const [deleting, setDeleting] = useState(false)


    const onChange = (value) => {
        setCategory(value)
        console.log(value);
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // load all categories
    const getAllCategories = async () => {
        setLoading(true)
        try {
            const categories = await axios.get("/api/category/get-all-categories")
            const { data } = categories
            if (data?.success) {
                setCategories(data.categories)
            } else {
                toast.error(data.message || "Error fetching categories!")
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/get-product/${params.id}`)
            if (data.success) {
                const { product } = data
                console.log(product);
                setId(product._id)
                setName(product.name)
                setCategory(product.category._id)
                setDescription(product.description)
                setQuantity(product.quantity)
                setPrice(product.price)
                setShipping(product.shipping)
            }
        } catch (error) {
            toast.error("Error")
        }
    }

    useEffect(() => {
        getProduct()
        getAllCategories()
    }, [])

    const handleUpdate = async e => {
        e.preventDefault()
        if (!category || !name || !description || !quantity || !price) {
            toast.error("All  field are required!")
            return;
        }
        console.log(category);

        const product = new FormData()
        product.append("name", name)
        product.append("description", description)
        product.append("category", category)
        product.append("price", price)
        product.append("quantity", quantity)
        photo && product.append("photo", photo)
        product.append("shipping", shipping)

        setLoading(true)
        try {
            const saved = await axios.put(`/api/product/update-product/${params.id}`, product)
            console.log(saved);
            toast.success("Product updated!")

            setCategory("")
            setName("")
            setDescription("")
            setPrice("")
            setQuantity("")
            setPhoto("")
            setShipping(0)
            setLoading(false)

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            setLoading(false)
        }
    }

    // FOR DELETE 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        setDeleting(true)
        try {
            await axios.delete(`/api/product/delete-product/${params.id}`)
            toast.success("Product deleted successfully!")
            setIsModalOpen(false);
            setDeleting(false)
            navigate("/admin/products")

        } catch (error) {
            console.log(error);
            toast.error("Error deleting product!")
            setDeleting(false)
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout title={"Update Product - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-sm-4 col-md-3 col-xxl-2 ">
                        <AdminMenu />
                    </div>
                    <div className="col-12  col-sm-8 col-md-9 my-2 my-sm-0">
                        <div className="card p-3">
                            <h2 className='mb-3'>Update Product</h2>

                            <div>
                                <form onSubmit={handleUpdate}>
                                    <Select
                                        showSearch
                                        placeholder="Select a category"
                                        optionFilterProp="children"
                                        size='large'
                                        onChange={onChange}
                                        filterOption={filterOption}
                                        value={category}
                                        options={categories?.map(cat => (
                                            {
                                                value: cat._id,
                                                label: cat.name
                                            }
                                        ))}
                                        style={{
                                            width: '100%',
                                        }}
                                        className='mb-3'
                                    />

                                    {/* <label htmlFor="productImg" className='form-control form-label mb-3'>
                                        {photo ? photo.name : " Select an Image"}
                                    </label>

                                    <input type="file" name="photo" className='form-control mb-3' id='productImg'
                                        onChange={e => setPhoto(e.target.files[0])} hidden /> */}

                                    <div className="mb-3">
                                        <label className="btn btn-outline-secondary col-md-12">
                                            {photo ? photo.name : "Upload Photo"}
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                hidden
                                            />
                                        </label>
                                    </div>

                                    {photo ? (
                                        <>
                                            <div className='photo-cancel-container' style={{ position: "relative" }}>
                                                <button type='button' onClick={() => setPhoto(null)}
                                                    className='btn btn-danger photo-cancel-btn'>&times; </button>
                                            </div>
                                            <label htmlFor="productImg" >
                                                <img src={URL.createObjectURL(photo)} className='img-fluid mb-3' alt="" />
                                            </label>
                                        </>
                                    )
                                        :
                                        <img src={`/api/product/get-product-photo/${id}`} className='img-fluid mb-3' alt="" />
                                    }

                                    {/* {photo && <img src={`/api/product/get-product-photo/${id}`} className='img-fluid mb-3' alt="" />} */}

                                    <input type="text" className='form-control mb-3' placeholder='Product name'
                                        value={name} onChange={e => setName(e.target.value)} />

                                    <textarea className='form-control mb-3' placeholder='Product description'
                                        value={description} onChange={e => setDescription(e.target.value)}></textarea>

                                    <input type="number" className='form-control mb-3' placeholder='Product quantity'
                                        value={quantity} onChange={e => setQuantity(e.target.value)} />

                                    <input type="number" className='form-control mb-3' placeholder='Product price'
                                        value={price} onChange={e => setPrice(e.target.value)} />

                                    <Select
                                        placeholder="Select a shipping method"
                                        size='large'
                                        optionFilterProp="children"
                                        onChange={(value) => setShipping(value)}
                                        filterOption={filterOption}
                                        value={shipping ? "Yes" : "No"}
                                        options={[
                                            {
                                                value: 0,
                                                label: "No"
                                            },
                                            {
                                                value: 1,
                                                label: "Yes"
                                            },
                                        ]}
                                        style={{
                                            width: '100%',
                                        }}
                                        className='mb-3'
                                    />

                                    <div className="row">
                                        <div className="col-6 col-md-4">
                                            <button type='submit' className='btn btn-primary '>UPDATE PRODUCT</button>

                                        </div>
                                        <div className="col-6 col-md-4">
                                            <button type='button' className='btn btn-danger' onClick={() => { setSelected(name); showModal(true) }}>DELETE PRODUCT</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <Modal title="Product Delete Warning" open={isModalOpen} onOk={handleDelete} onCancel={handleCancel}>
                                {deleting ? <Loading /> : (
                                    <>
                                        <p>You are about to delete this product - "{selected}" </p>
                                        <p>   <b><i>Are you sure?</i></b></p>
                                    </>
                                )}
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default UpdateProduct