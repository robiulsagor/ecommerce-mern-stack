import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

const SecretQuestions = () => {
    const [ques, setQues] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        console.log(ques);

        try {
            const res = await axios.post("add-secert", ques)
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    }
    const editQues = () => {

    }
    const deleteQues = () => {

    }



    return (
        <Layout>
            <div className="container">
                <div className="row py-5 ">
                    <div className="col-md-6 mx-auto ">
                        <div className='common-container-1'>

                            <h2 className='text-center  mb-3'>Secret Questions →</h2>
                            <h3 className=''>Add Question:</h3>


                            <form onSubmit={handleSubmit} className='mb-5'>
                                <input type="text" value={ques} onChange={e => setQues(e.target.value)} placeholder='Type Question'
                                    className="form-control mb-3" required disabled={loading} />

                                {loading ? <>
                                    <div className="d-flex flex-column  justify-content-center " >
                                        {/* <h2>Loading...</h2> */}
                                        <div className="spinner-border " role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </> : <button type='submit' className="btn btn-primary">Add To DB</button>}
                            </form>

                            <hr />

                            <h3>Questions: </h3>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Who is your favourite teacher?</td>
                                        <td className='text-center'>
                                            <span onClick={editQues}
                                                className='action_btn action_edit'> <FaPencil /></span>

                                        </td>
                                        <td className='text-center'>
                                            <span className='action_btn action_delete' onClick={deleteQues}>  <FaRegTrashAlt /></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th >2</th>
                                        <td>Jacob</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SecretQuestions