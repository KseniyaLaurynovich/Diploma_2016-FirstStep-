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

         {props.roles.indexOf('Teacher') != -1
         ? (<NavItem eventKey={2} href="#">Tasks</NavItem>)
         : null}


         {!props.isAuthenticated
         ?(<NavItem eventKey={1} href="#" onClick={props.login}>Login</NavItem>)
         :(<NavItem eventKey={3} href="#" onClick={props.logout}>Logout</NavItem>)}
       </Nav>
     </Navbar>
     <main className="container">
      {props.children}
     </main>
    </div>
  );
}
