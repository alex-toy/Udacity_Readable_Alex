import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import headers from '../helper/config'
import  { changePost } from '../actions/actions'





class EditPostForm extends Component {

	
	editPost = (id, data) => {
		fetch('http://localhost:3001/posts/' + id, {
  			headers: headers,
  			method: "PUT",
  			body: JSON.stringify(data)
		})
		.then( rep => rep.json())
		.then( data => this.props.UpdatePost(data.id, data.title, data.body))
		.catch(error =>  console.log(error));
	}
	
	
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		this.editPost(this.props.postId, {
			title: values.title,
			body: values.body,
		})
		
	}
	
	
	
  
  render() {
  
	const { posts } = this.props
	console.log(posts[this.props.postId])
    
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSubmit(e)} className='create-contact-form'>
		<label>Edit that post</label>
		  <div className='create-contact-details'>
		  	<input className='postInput' type='text' name='title' placeholder={posts[this.props.postId].title}/><br />
			<textarea 
				name="body"
   				rows="10" cols="50"
  				placeholder={posts[this.props.postId].body}
			/><br />
			<button className='postInputButton'>Edit post</button>
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
	
	UpdatePost: (id, newtitle, newbody) => {
  		dispatch(changePost ({ id : id, param : 'title', newValue : newtitle}))
  		dispatch(changePost ({ id : id, param : 'body', newValue : newbody}))
	}
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(EditPostForm)












