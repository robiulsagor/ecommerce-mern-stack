import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loading from '../../components/Loading'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photoName, setPhotoName] = useState(null)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [shipping, setShipping] = useState(0)

    const [loading, setLoading] = useState(false)

    const onChange = (value) => {
        setCategory(value)
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

    useEffect(() => {
        getAllCategories()
    }, [])

    // upload photo
    useEffect(() => {
        const uploadPhoto = () => {
            const randomName = Date.now()
            const fileName = randomName + "-" + photo.name
            const storageRef = ref(storage, `images/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, photo);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    toast.error("File upload unsuccessful")
                },
                () => {
                    toast.success("File uploaded successfully!")
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setPhotoName(fileName)
                        setPhotoUrl(downloadURL)
                    });
                }
            );

        }
        photo && uploadPhoto()
    }, [photo])

    const handleSubmit = async e => {
        e.preventDefault()
        if (!category || !photoName || !name || !description || !quantity || !price) {
            toast.error("All  field are required!")
            return;
        }

        setLoading(true)
        try {
            const saved = await axios.post("/api/product/create-product",
                {
                    name, description, price, category, quantity, photoName, photoUrl, shipping
                }
            )
            toast.success("Product added!")

            setCategory("")
            setName("")
            setDescription("")
            setPrice("")
            setQuantity("")
            setPhoto("")
            setShipping(0)
            setLoading(false)

        } catch (error) {
            console.log(error.response.data || "Error");
            toast.error(error.response.data.message || "Something went wrong")
            setLoading(false)
        }
    }


    return (
        <Layout title={"Create Product - eCommerce App"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-sm-4 col-md-3 col-xxl-2 ">
                        <AdminMenu />
                    </div>
                    <div className="col-12  col-sm-8 col-md-9 my-2 my-sm-0">
                        <div className="card p-3">
                            <h2 className='mb-3'>Create Product</h2>

                            {loading ? <Loading /> : (
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <Select
                                            showSearch
                                            placeholder="Select a category"
                                            optionFilterProp="children"
                                            size='large'
                                            onChange={onChange}
                                            filterOption={filterOption}

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

                                        <label htmlFor="productImg" className='form-control form-label mb-3'>
                                            {photo ? photo.name : " Select an Image"}
                                        </label>

                                        <input type="file" className='form-control mb-3' id='productImg'
                                            onChange={e => setPhoto(e.target.files[0])} hidden />

                                        {photo && (
                                            <>
                                                <div className='photo-cancel-container' style={{ position: "relative" }}>
                                                    <button type='button' onClick={() => setPhoto(null)}
                                                        className='btn btn-danger photo-cancel-btn'>&times; </button>
                                                </div>
                                                <label htmlFor="productImg" >

                                                    <img src={URL.createObjectURL(photo)} className='img-fluid mb-3' alt="" />
                                                </label>
                                            </>
                                        )}

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

                                        <button type='submit' className='btn btn-primary'>Add Product</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct