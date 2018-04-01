import React from 'react';
import Modal from 'react-modal';
import { Button } from 'reactstrap';
import EditPostForm from './EditPostForm'


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




class EditPostModal extends React.Component {
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
        
        <Button onClick={this.openModal} color="primary">Edit post</Button>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >

        
        <EditPostForm postId={this.props.postId} />
          
          
        </Modal>
      </div>
    );
  }
}

export default EditPostModal







