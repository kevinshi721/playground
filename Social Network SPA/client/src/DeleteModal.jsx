import React from 'react';
import { CardLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './DeleteModal.css';

class DeleteModal extends React.Component {

  constructor(props) {
    
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteHandler(){
    this.props.onDelete();
    this.toggle();
  }

  render() {
    return (
      <div className="delete-btn" >
        <CardLink id="delete-btn" onClick={this.toggle}></CardLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
          <ModalBody>
          This post will be deleted and you won't be able to find it anymore. Are you sure you want to DELETE this post?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteHandler}>Delete</Button>{' '}
            <Button color="secondary" outline onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;