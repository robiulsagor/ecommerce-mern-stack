import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/AdminMenu';

const SecretQuestions = () => {
    // single secret input value- both for add and edit
    const [secret, setSecret] = useState("")

    // loaded secrets for deleting
    const [loadedSecret, setLoadedSecret] = useState()

    // store all secret question after fetching from DB
    const [allSecrets, setAllSecrets] = useState([])
    // if any error happens
    const [error, setError] = useState("")
    // is still fetching data from DB
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(false)

    // store how many users using this question
    const [usedUser, setUsedUser] = useState()

    // refetch is to fetch data again if someting is changed, i.e added or deleted
    const [refetch, setRefetch] = useState(false)

    // mode to determine if you are in edit mode or add mode
    const [mode, setMode] = useState("add") //add, or edit 

    // ref for the input
    const inputRef = useRef(null);

    // this is just to fetch secret questions from DB
    // and store insite 'allSecrets' state
    useEffect(() => {
        const loadSecrets = async () => {
            setFetching(true)
            try {
                const res = await axios.get("/api/admin/view-secrets")
                if (res && res.data.secrets.length > 0) {
                    setAllSecrets(res.data.secrets)
                } else if (res && res.data.secrets == 0) {
                    setError("No secret questions found!")
                }
                setFetching(false)
                setRefetch(false)
            } catch (error) {
                console.log(error);
                setError("Loading Error!")
                setFetching(false)
            }
        }

        loadSecrets()
    }, [refetch])

    // add a secret question
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.post("http://localhost:8080/api/v1/admin/add-secret", { secret }, {
                signal: AbortSignal.timeout(70000) //Aborts request after 10 seconds
            })
            if (res && res.data.success) {
                toast.success(res.data.message || "Success")
                setSecret("")
                setRefetch(true)
            } else if (res && res.data.success === false) {
                toast.error(res.data.message || "Something went wrong!")
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error?.response || "Something went wrong!")
        }

    }

    // it's name suggests what is does
    const prepareToEdit = data => {
        setMode("edit")
        setSecret(data.name)
        setLoadedSecret(data)
        inputRef.current.focus()
    }

    // it's name suggests what is does
    const cancelEdit = () => {
        setMode("add")
        setSecret("")
    }

    const editSecret = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.put("/api/admin/edit-secret", { id: loadedSecret._id, secret })
            if (res?.data.success) {
                toast.success("Edited!")
                cancelEdit()
                setRefetch(true)
                setLoading(false)
            } else {
                toast.error("couldn't edit")
            }
        } catch (error) {
            console.log(error);
            toast.error("couldn't edit")
        }
    }

    const deleteSecret = async () => {
        // to do
        try {
            const res = await axios.delete(`/api/admin/delete-secret?id=${loadedSecret._id}`)
            toast.success("deleted")
            setRefetch(true)
            setLoadedSecret("")
        } catch (error) {
            console.log(error);
            toast.error("couldn't delete")
            setLoadedSecret("")
        }
    }

    // preview before deleting in Modal form
    const previewSecret = async id => {
        // first, make the loaded secret empty, so it refetches every time
        setLoadedSecret("")

        // find the users count who used this as sequrity question
        const findUser = await axios.get(`/api/admin/view-user-with-this-question?id=${id}`)
        setUsedUser(findUser.data)

        // actual question
        const question = await axios.get(`/api/admin/view-single-secret?id=${id}`)

        if (question?.data?.success) {
            setLoadedSecret(question?.data?.secret)
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row py-5 ">
                    <div className="col-3">
                        <AdminMenu />
                    </div>
                    <div className=" col-md-7  ">
                        <div className='card p-3 px-4 '>

                            <h2 className='text-center  mb-3'>Secret Questions →</h2>
                            <h3> {mode == "add" ? "Add" : "Edit"} Question :</h3>

                            <form onSubmit={mode == "add" ? handleSubmit : editSecret} className='mb-5'>
                                <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder='Type Question' ref={inputRef}
                                    className="form-control mb-3" disabled={loading} />

                                {loading ? <>
                                    <div className="d-flex flex-column  justify-content-center " >
                                        <div className="spinner-border " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </> : <div className="d-flex" style={{ gap: "10px" }}>
                                    <button type='submit' className={`btn ${mode == "add" ? "btn-primary" : "btn-outline-primary"}`} style={{ display: "inline-block" }}>
                                        {mode == "add" ? "Add To DB" : "Edit Data"}
                                    </button>

                                    {mode == "edit" && <button type='submit' className={`pl-2 btn btn-outline-danger`}
                                        onClick={cancelEdit} style={{ display: "inline-block" }}>Cancel</button>}
                                </div>}

                            </form>

                            <hr />

                            <h3>Questions: </h3>

                            {/* show the secrets  */}
                            {fetching ? <><div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            </> : <>
                                <table className="table table-bordered">
                                    <tbody>
                                        {allSecrets.map((sec, i) => {
                                            return <tr key={sec._id}>
                                                <th scope="row">{i + 1} </th>
                                                <td>{sec.name}?</td>
                                                <td className='text-center'>
                                                    <span onClick={() => prepareToEdit(sec)}
                                                        className='action_btn action_edit'> <FaPencil /></span>

                                                </td>
                                                <td className='text-center'>
                                                    <span className='action_btn action_delete' onClick={() => previewSecret(sec._id)}
                                                        data-bs-toggle="modal" data-bs-target="#deleteModal">  <FaRegTrashAlt /></span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </>}

                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Confirm Deletion
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {loadedSecret ?
                                <div>
                                    Are you sure to delete this security question: <br /> <b> {loadedSecret?.name}</b>?
                                    <br />
                                    <i>  → {usedUser > 0 ? `Used by ${usedUser} user` : 'None used it.'}</i>
                                </div> :
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" onClick={deleteSecret} data-bs-dismiss="modal"
                                disabled={!loadedSecret} >Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default SecretQuestions