import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { removeComment } from '../actions/actions'

import {Card, CardTitle, CardText} from 'material-ui/Card'
import { Button } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import VoteCommentForm from './VoteCommentForm'
import EditCommentModal from './EditCommentModal'



class CommentItem extends Component {


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
    
    
    const {title, body, author, last_modification_on, voteScore, commentId} = this.props
    
    
  	
    return (
	<MuiThemeProvider>
    <Card>
		
		<CardTitle title={title} subtitle={'by ' + author + ' ; lastly modified on ' + last_modification_on } />
		
		<CardText color="blue">
      		{body}
		</CardText>
		
		
		<VoteCommentForm commentId={commentId} voteScore={voteScore} /><br/> 
    	<EditCommentModal commentId={commentId} />
    	<Button onClick={() => this.handleDeleteComment(commentId)} color="danger">Delete comment</Button>
        
		
	</Card>  
    </MuiThemeProvider>
        
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
)(CommentItem)












