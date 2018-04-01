import React from 'react';
import Modal from 'react-modal';
import { Button } from 'reactstrap';
import EditCommentForm from './EditCommentForm'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    width				  : '600px',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};





class EditCommentModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
  
  
    return (
      <div>
        <Button color="primary" onClick={this.openModal}>Edit comment</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <EditCommentForm commentId={this.props.commentId} /><br/> 
          
          
          
        </Modal>
      </div>
    );
  }
}

export default EditCommentModal







