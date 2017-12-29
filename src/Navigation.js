import React, { PureComponent } from "react"
import {
    Navbar,
    NavItem,
    Nav,
    Button
} from "react-bootstrap"

class Navigation extends PureComponent {
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Github Resume v1.0</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <ul className="nav navbar-nav">
                        <li><a href="#root">Profile</a></li>
                        <li><a href="#site">Website</a></li>
                        <li><a href="#language">Languages</a></li>
                        <li><a href="#repo">Popular Repositories</a></li>
                        <li><a href="#contributions">Contributions</a></li>
                        <li><a href="#organizations">Organizations</a></li>
                    </ul>
                    <Nav pullRight>
                        <NavItem href="#">{' '}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation