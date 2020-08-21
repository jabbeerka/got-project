import React, { useState } from 'react';
import {NavLink, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
// import { getData } from '../API/Api';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    // getData.getCharacters(583)
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="light" light expand="md" className="mb-4">
                <NavbarBrand href="/">Game of Thrones DB</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Characters</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Houses</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Books</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;