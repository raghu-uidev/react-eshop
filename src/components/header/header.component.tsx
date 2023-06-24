import { Button, Container, Nav, Navbar, NavDropdown, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import logo from '../../images/eshop-logo.png';
import CartIcon from "../../modules/@cartModule/cart-icon/cart-icon.component";
import './header.css';

const Header = (props: any) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const { isUserLoggedIn } = useAppSelector(state => state.userData);
    const signOutAction = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    }
    const popover = (
        <Popover id="popover-basic">
          <Popover.Body>
            <ul className="popover-ul">
                <li key="1"><Link className="popover-link" to="/">My Profile</Link></li>
                <li key="2"><Link className="popover-link" to="/">My Orders</Link></li>
                <li key="3"><a className="popover-link" onClick={() => signOutAction()}>Sign Out</a></li>
            </ul>
          </Popover.Body>
        </Popover>
      );
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt="eshop"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/products/smartphones">Mobiles</Link>
                            <Link className="dropdown-item" to="/products/laptops">Laptops</Link>
                            <Link className="dropdown-item" to="/products/fashion">Fashion</Link>
                            <Link className="dropdown-item" to="/products/skincare">Cosmetics</Link>
                            <Link className="dropdown-item" to="/products/footware">Footware</Link>
                            <Link className="dropdown-item" to="/products/kids">Kids</Link>
                        </NavDropdown>
                        <Link to="/blog">Blog</Link>
                        <Link to="/about-us">About Us</Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    {
                        token || isUserLoggedIn ? (

                            <>
                                <OverlayTrigger
                                    key="overlay"
                                    placement="bottom"
                                    trigger="click"
                                    overlay={popover}
                                >
                                    <Button variant="secondary" className="user-icon-btn"> <FaRegUserCircle className="user-icon"></FaRegUserCircle></Button>
                                </OverlayTrigger>
                               
                                <CartIcon />
                            </>
                        ) : (
                            <>
                                <Link to="/sign-up">Sign Up</Link>
                                <Link to="/sign-in">Sign In</Link>
                            </>
                        )
                    }

                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;