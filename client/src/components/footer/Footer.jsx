import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className='footer'>
            <h4 className='text-white text-center p-3'>All Rights Reserved &copy; Robiul Islam </h4>
            <div>
                <Link to="/about">About</Link>
                <span>|</span>
                <Link to="/contact">Contact</Link>
                <span>|</span>
                <Link to="/privacy">Privacy Policy</Link>

            </div>
        </footer>
    )
}

export default Footer