import { IoMdMail } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Layout from "../components/layout/Layout";

const Contact = () => {
    return (
        <Layout>
            <div className='row row-header'>
                <div className="col-md-7" >
                    <img src="./images/contactus.jpeg" alt="" style={{ width: '100%' }} />
                </div>
                <div className="col-md-5" style={{ paddingLeft: "30px" }}>
                    <h1 className='text-center bg-dark text-white p-2 mb-4'>Contact Us</h1>
                    <p>Any query and info about products feel free to call anytime we are 24X7 available </p>
                    <p><IoMdMail /> : help@ecommerceapp.com</p>
                    <p><MdPhone /> : 123-3456789</p>
                    <p><BiSupport /> : 1620-0000-0000 (toll free)</p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact