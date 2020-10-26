import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap';


const NavBar=()=>{
  return(
    <Navbar collapseOnSelect bg="dark" expand="md" variant="dark" sticky="top">
      <Navbar.Brand href="/">Dian CHEN</Navbar.Brand>           
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>      
      <Navbar.Collapse id="responsive-navbar-nav" >
        <Nav className="mr-auto" style={{textAlign:"right"}}>
          <Nav.Item><Nav.Link href="#about">About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="#blog">Blog</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="#contact">Contact</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar

