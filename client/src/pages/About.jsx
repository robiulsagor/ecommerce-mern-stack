import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
    return (
        <Layout title="About - eCommerce App">
            <div className='row row-header'>
                <div className="col-md-7" >
                    <img src="./images/about.jpeg" alt="" style={{ width: '100%' }} />
                </div>
                <div className="col-md-5" style={{ paddingLeft: "30px" }}>
                    <h1 className='text-center bg-dark text-white p-2 mb-4'>About Us</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla neque aliquam est non nostrum suscipit eos provident reiciendis hic sit! Eveniet dolores corrupti quae nulla soluta facilis cumque dolorem, facere quisquam sapiente possimus deleniti ad illum velit eos eaque adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint doloremque cum dolorum. Expedita distinctio perspiciatis vel nulla omnis, eum aperiam.</p>
                </div>
            </div>
        </Layout>
    )
}

export default About