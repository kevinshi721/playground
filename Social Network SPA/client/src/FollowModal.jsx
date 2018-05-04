import React from 'react';
import {Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem } from 'reactstrap';

class DeleteModal extends React.Component {

  constructor(props) {
    
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.getFollowList = this.getFollowList.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  async redirectToFriendProfilePage (userAccount) {
        await this.props.onUpdateFriendAccountInfo(userAccount);
        this.props.onRedirectToFriendProfilePage();
    };

  getFollowList () {
      let FollowList = [];
      this.props.follow.map((userAccount,index) => {
          FollowList.push(
              <ListGroupItem key = {index++} onClick = {() => this.redirectToFriendProfilePage(userAccount)}>{userAccount}</ListGroupItem>
         )
      });
      return (
          <ListGroup>
              {FollowList}
          </ListGroup>
      );
  }

  render() {

    return (
      <div className="follow-modal" >
        <span onClick={this.toggle}>{this.props.spanName}</span>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>       
            <ListGroup>
              {this.getFollowList()}
            </ListGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  };
}

export default DeleteModal;