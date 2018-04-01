import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { removeComment } from '../actions/actions'
import CommentItem from './CommentItem'





class CommentList extends Component {

  
  
  formattedPostdate = (timestamp) => {
  	var a = new Date(timestamp);
  		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec ;
		return time;
  }
  
  
  DeleteComment = (id_post) => {
		fetch( 
			'http://localhost:3001/comments/' + id_post, 
			{ headers: { 
				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
			},
			method: "DELETE",
		 })
		 .then( rep => rep.json() )
		 .then( data => this.props.RemoveComment(data.id) )
	}
	
	
	handleDeleteComment = (id_post) => {
		this.DeleteComment(id_post)
	}
	
  
  
  
  render() {
    
    
    const { comments, postId} = this.props
    
    
  	
  	
  	var commentArray = Object.keys(comments).filter( key => comments[key].parentId === postId )
  	
  	
    return (
	<div>
		
		<h2>Number of comments : {commentArray.length}</h2>
    	
    	<ol>{commentArray.map((key) => 
    	
    		
    		<li key={key} >
    		
    			<CommentItem 
    				author = {comments[key].author}
    				body = {comments[key].body}
    				last_modification_on = {this.formattedPostdate(comments[key].timestamp)}
    				commentId={key}
    				voteScore={comments[key].voteScore}
    			/><br />
    			
    			
        
    		</li>)}
    		
    		
    		
    		
    	</ol>
    	
    	
    	
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
	
	
	RemoveComment: (id) => { 
  		
  		dispatch(removeComment({ id : id }))
	}
	
	
	
	
});


export default connect(
  mapStateToProps, mapDispatchToProps
)(CommentList)








