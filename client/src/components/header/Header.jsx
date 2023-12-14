import { Link, NavLink } from "react-router-dom"
import { SiShopee } from "react-icons/si";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/authSlice";
import SearchForm from "../form/SearchForm";
import { useCategory } from "../../hooks/useCategory";

const Header = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const categories = useCategory()

    const logoutFunction = () => {
        dispatch(logout())
        toast.success("Logout successfully!")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid custom-container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to='/' className="navbar-brand">
                            <SiShopee />
                            eCommerce App
                        </Link>

                        <SearchForm />

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" >Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul className="dropdown-menu">
                                    <NavLink to={`/category`} className="dropdown-item"> All Categories </NavLink>
                                    <li><hr className="dropdown-divider" /></li>
                                    {categories?.map((cat, i) => (
                                        <li key={i}>
                                            <NavLink to={`/category/${cat.slug}`} className="dropdown-item"> {cat.name} </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>


                            {
                                auth.user ? <>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li className="">
                                                <NavLink to={`${auth.user.role == 0 ? "/user/dashboard" : "/admin/dashboard"}`} className="dropdown-item">Dashboard</NavLink>
                                            </li>
                                            <li className="">
                                                <NavLink onClick={logoutFunction} to='/login' className="dropdown-item">Logout  </NavLink>
                                            </li>

                                        </ul>
                                    </li>
                                </> :
                                    <li className="nav-item">
                                        <NavLink to='/login' className="nav-link">Login</NavLink>
                                    </li>
                            }

                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link cart-link ">Cart <span>20</span></NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header