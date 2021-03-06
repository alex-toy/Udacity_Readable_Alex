import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { addComment, removePost } from '../actions/actions'
import CommentList from './CommentList'
import VoteScoreForm from './VoteScoreForm'
import AddCommentModal from './AddCommentModal'
import EditPostModal from './EditPostModal'
import Prompt from './Prompt'

import { Button } from 'reactstrap';
import {Card, CardTitle, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class PostList extends Component {

	
	state = {
		postid : "",
		commentModalOpen: false
	}
	
	
	formattedPostdate = (timestamp) => {
  		var a = new Date(timestamp * 1);
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
	
	
	
	storeComment = (data) => {
		fetch('http://localhost:3001/comments', {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method: "POST",
  			body: data
		})
	}
	
	
	
	handleSubmit = (e, postId) => {
		e.preventDefault()
		const values = Object.assign( {}, serializeForm(e.target, { hash: true }), postId )
		this.storeComment({
			id: '786565484',
			timestamp: Date.now(),
			body: values.body,
			author: values.author,
			parentId: values.key
		})
		this.props.AddComment(values.key, values.author, values.body)
	}
	

	
	handleSelectSortMethod = (e) => {
		
		this.setState({sortmethod : e})
	}
	
	
	DeletePost = (id_post) => {
		fetch( 
			'http://localhost:3001/posts/' + id_post, 
			{ headers: { 
				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
			},
			method: "DELETE",
		 }
		).then( rep => console.log(rep) )
	}
	
	
	handleDeletePost = (id_post) => {
		this.DeletePost(id_post)
		this.props.RemovePost(id_post)
	}
	
  
  render() {
    
    
    const {posts, postId} = this.props
    
  	var arrayposts = Object.entries(posts).filter( id_post => id_post[0].toString() ===  postId.toString())
  	
  	if(arrayposts.length !== 0){
  	return (
      <div>
      
    	
    	<ul>{arrayposts.map((id_post) => 
    		

    		<li key={id_post[0]}>
    		
    		
    		
    		
    		
    		
    		 <div className="post">
    		 
    		
    			<MuiThemeProvider>
				<Card>
		
					<CardTitle title={id_post[1].title} subtitle={'by ' + id_post[1].author + ' on ' + this.formattedPostdate(id_post[1].timestamp) + ' ; Category :  ' + id_post[1].category} />
		
					<CardText color="blue">
						{id_post[1].body}
					</CardText>
		
		
					<VoteScoreForm postId={postId} voteScore={id_post[1].voteScore} />
				
					<EditPostModal postId={id_post[0]} />
		
		
					<Button onClick={() => this.handleDeletePost(id_post[0])} color="danger">Delete Post</Button>
				
				</Card>  
				</MuiThemeProvider>
				
				
				<CommentList postId={id_post[0]} />
				
				
				<AddCommentModal postId={id_post[0]} />
				
			</div>
    		</li>
    		

    		)}
    	</ul>
    	 
	</div>
        
    )
  	} else {
  	return (
      <div>
      
    	<Prompt />
    	Sorry, that post doesnt exist
    		
	</div>
        
    )
  	}
  	
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
	
	AddComment: (newparentId, newauthor, newbody) => { 
  		
  		dispatch(addComment({ newid : 876654, newparentId : newparentId, newauthor : newauthor, newbody : newbody }))
	},
	
	
	RemovePost: (id) => { 
  		
  		dispatch(removePost({ id : id }))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(PostList)












