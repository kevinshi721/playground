import React from 'react';
import {Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Input, NavLink} from 'reactstrap';
import { Form, FormGroup, Label} from 'reactstrap';
import SignUpModal from './SignUpModal';

import './RegisterView.css'

export default class RegisterView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.updateAccountInfo = this.updateAccountInfo.bind(this);
        this.updatePasswordInfo = this.updatePasswordInfo.bind(this);

      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    updateAccountInfo(e) {
        this.props.onupdateAccountInfo(e.target.value);
    }

    updatePasswordInfo(e){
        this.props.onupdatePasswordInfo(e.target.value);
    }


    // {<Button className="nav-signup" color="secondary" outline onClick={this.props.onsignUp}>Sign up</Button>}


    render() {
        return(
            <div>
                <div className="nav-bar-div">
                    <Navbar color="white" light expand="md">
                      <NavLink className="site-icon"/>
                      <NavbarBrand className="site-name">NEU Insta</NavbarBrand>
                      <NavbarToggler onClick={this.toggle}/>
                      <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                          <NavItem>
                            <SignUpModal onSignUp={this.props.onsignUp}
                                         onupdateAccountInfo={this.updateAccountInfo}
                                         onupdatePasswordInfo={this.updatePasswordInfo}/>
                          </NavItem>
                        </Nav>
                      </Collapse>
                    </Navbar>
                </div>

                <hr className="register-view-hr"/>

                <main className="main-body-register">
                    <div className="login-form">
                        <Form>
                            <Label className="login-title">Please enter UserName and Password</Label>
                            <FormGroup>
                              <Input placeholder="UserName"
                                     onChange={this.updateAccountInfo}/>
                            </FormGroup>
                            <FormGroup>
                              <Input placeholder="Password" 
                                     type="password"
                                     onChange={this.updatePasswordInfo}/>
                            </FormGroup>
                            
                            <div className="main-login-div">
                                <Button className="main-login" onClick={this.props.onsignIn}>Log in</Button>
                            </div>
                            <div className="main-signup-div">
                                <SignUpModal onSignUp={this.props.onsignUp}
                                         onupdateAccountInfo={this.updateAccountInfo}
                                         onupdatePasswordInfo={this.updatePasswordInfo}/>
                            </div>
                            <label className="signup-fail-alert"
                                   hidden = {this.props.hasResgistedSuccess ? false: true}> Sign up-fail</label>
                        </Form>
                    </div>
                </main>
            </div>
        );
    }
}
