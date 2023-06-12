import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../../images/eshop-logo.png';
import './header.css';

const Header = (props: any) => {
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
                    <Link to="/sign-up">Sign Up</Link>
                    <Link to="/sign-in">Sign In</Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;