import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import headers from '../helper/config'
import  { changeComment } from '../actions/actions'





class EditCommentForm extends Component {

	
	editComment = (id, data) => {
		fetch('http://localhost:3001/comments/' + id, {
  			headers: headers,
  			method: "PUT",
  			body: JSON.stringify(data)
		})
		.then( rep => rep.json())
		.then( data => this.props.UpdateComment(data.id, data.body, data.timestamp))
		.catch(error =>  console.log(error));
	}
	
	
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		var now = Date.now()
		this.editComment(this.props.commentId, {
			body : values.body,
			timestamp : now
		})
		
	}
	
	
	
  
  render() {
  
	const { comments } = this.props
    
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSubmit(e)} className='create-contact-form'>
		<label>Edit that comment</label>
		  <div className='create-contact-details'>
			<input className='postInput'  type='text' name='body' placeholder={comments[this.props.commentId].body}/><br />
			<button className='postInputButton'>Edit comment</button>
		  </div>
		</form>
    	</div>
        
    )
  }
}



function mapStateToProps ({
	posts,
	comments,
	categories
}) {
  
  return {
  
  	posts,
	comments,
	categories
  
  }
}




const mapDispatchToProps = dispatch => ({
	
	UpdateComment: (id, newbody, time) => {
  		dispatch(changeComment ({ id : id, param : 'body', newValue : newbody}))
  		dispatch(changeComment ({ id : id, param : 'timestamp', newValue : time}))
	}
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(EditCommentForm)












