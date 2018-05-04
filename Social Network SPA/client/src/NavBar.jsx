import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import SearchBox from './SearchBox';

import './NavBar.css';

export default class NavBar extends React.Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="nav-bar-div">
        <Navbar color="white" light expand="md">
          <NavLink className="site-icon" onClick={this.props.onMain}/>
          <NavbarBrand className="site-name" onClick={this.props.onMain}>NEU Insta</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
          <SearchBox onSearch={this.props.onSearch}
                     searchList={this.props.searchList}
                     onRedirectToFriendProfilePage={this.props.onRedirectToFriendProfilePage}
                     onUpdateFriendAccountInfo={this.props.onUpdateFriendAccountInfo}/>
            <Nav className="ml-auto" navbar>
              <NavItem>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.account}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.props.onUserProfile}>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.onLogOut}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
