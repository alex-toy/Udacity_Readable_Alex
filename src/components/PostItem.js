import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addComment, removePost } from '../actions/actions'

import {Card, CardTitle, CardText} from 'material-ui/Card'
import { Button } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import VoteScoreForm from './VoteScoreForm'
import EditPostModal from './EditPostModal'


class PostItem extends Component {


	DeletePost = (id_post) => {
		fetch( 
			'http://localhost:3001/posts/' + id_post, 
			{ headers: { 
				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
			},
			method: "DELETE",
		 })
		 .then( rep => rep.json() )
		 .then( data => this.props.RemovePost(data.id) )
	}
	
	
	handleDeletePost = (id_post) => {
		this.DeletePost(id_post)
	}
	
  
  render() {
    
    
    const {title, body, author, category, posted_on, number_of_comments, voteScore, postId} = this.props
  	
  	
    return (
	<MuiThemeProvider>
    <Card>
		
		<CardTitle title={title} subtitle={'By ' + author + ' on ' + posted_on + ' ; Category :  ' + category} />
		<CardTitle subtitle={'number of comments : ' + number_of_comments} />
		
		<CardText color="blue">
      		{body}
		</CardText>
		
		
		<VoteScoreForm postId={postId} voteScore={voteScore} />
    			
		<EditPostModal postId={postId} />
		
		
		<Button onClick={() => this.handleDeletePost(postId)} color="danger">Delete Post</Button>
                
        
        <Button color="primary" href={'/'+ category +'/' + postId}>See that post</Button>
        
		
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
	
	AddComment: (newparentId, newauthor, newbody) => { 
  		
  		dispatch(addComment({ newid : 876654, newparentId : newparentId, newauthor : newauthor, newbody : newbody }))
	},
	
	
	RemovePost: (id) => { 
  		
  		dispatch(removePost({ id : id }))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(PostItem)












