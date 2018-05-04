import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Input } from 'reactstrap';

class SignUpModal extends React.Component {

  constructor(props) {
    
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  signUpHandler(){
    this.props.onSignUp();
    this.toggle();
  }

  render() {
    return (
      <div className="sign-up-btn" >
        <Button outline onClick={this.toggle}>Sign up</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input placeholder="User Name" onChange={this.props.onupdateAccountInfo}/>
                <FormText>Please entry your user name</FormText>
              </FormGroup>
              <FormGroup>
                <Input placeholder="Password" type="password" onChange={this.props.onupdatePasswordInfo}/>
                <FormText>Please entry your password</FormText>
              </FormGroup>
              <FormGroup>
                <Input placeholder="Confirm your password" type="password" />
                <FormText>Please Re-Enter you password</FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.signUpHandler}>Sign up</Button>{' '}
            <Button color="secondary" outline onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;