import React, { Component } from 'react'
import { connect } from 'react-redux'





class SelectSortMethod extends Component {

	
	
	handleSelectSortMethod = (e) => {
		this.props.handleSelectSortMethod(e.target.value)
	}
	
	
	
  
  render() {
    
    
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSelectSortMethod(e)} >
		<label>Choose the sort method : </label>
		  <div className='create-contact-details'>
			<select className='postInput' name='category' onChange={(e) => this.handleSelectSortMethod(e)}>
				<option value='voteScore'>voteScore</option>
				<option value='timestamp'>timestamp</option>
			</select><br />
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




export default connect(
  mapStateToProps
)(SelectSortMethod)












