import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="light" light expand="md" className="mb-4">
                <Link className="navbar-brand" to="/"> Game of Thrones DB </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/characters/">Characters</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/houses/">Houses</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/books/">Books</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;