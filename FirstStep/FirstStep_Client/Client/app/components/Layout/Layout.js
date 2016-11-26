import React from 'react'
import styles from './styles.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default function(props){
  return(
    <div>
      <Navbar>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#">First Step</a>
         </Navbar.Brand>
       </Navbar.Header>
       <Nav>
         <NavItem eventKey={1} href="#">Login</NavItem>
         <NavItem eventKey={2} href="#">Tasks</NavItem>
         <NavItem eventKey={3} href="#">Logout</NavItem>
       </Nav>
     </Navbar>
     <main className="container">
      {props.children}
     </main>
    </div>
  );
}
