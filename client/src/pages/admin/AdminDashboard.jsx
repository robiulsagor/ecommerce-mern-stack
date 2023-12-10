import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/AdminMenu'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
    const user = useSelector(state => state.auth.user)
    console.log(user);

    return (
        <Layout title={"Admin Dashboard"}>
            <div className="container-fluid">
                <div className="row  px-2 py-5">
                    <div className="col-sm-4 col-md-3 col-xxl-2 ">
                        <AdminMenu />
                    </div>
                    <div className="col-12  col-sm-8 col-md-9 my-2 my-sm-0">
                        <div className="card p-3">
                            <h2 className='mb-3'>Hello Admin!</h2>
                            <h4>Admin Name: <i>{user.name} </i></h4>
                            <h4>Admin Email: <i>{user.email} </i></h4>
                            <h4>Admin Phone: <i>{user.phone} </i></h4>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard