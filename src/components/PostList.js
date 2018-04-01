import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addComment, removePost } from '../actions/actions'
import SelectSortMethod from './SelectSortMethod'
import AddPostModal from './AddPostModal'

import PostItem from './PostItem';


class PostList extends Component {

	
	state = {
		postid : "",
		sortmethod : "voteScore",
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
		 })
		 .then( rep => rep.json() )
		 .then( data => this.props.RemovePost(data.id) )
	}
	
	
	handleDeletePost = (id_post) => {
		this.DeletePost(id_post)
	}
	
	
	
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
	
	
  
  render() {
    
    
    const {posts, comments} = this.props
    const {sortmethod} = this.state
    
  	var arrayposts = Object.entries(posts)
  	var sortedposts
  	
  	
  	if(sortmethod === "voteScore"){
  	
		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].voteScore - b[1].voteScore;
		});
  	
  	} else if(sortmethod === "timestamp") {
  		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].timestamp - b[1].timestamp;
		});
  	}else{
  		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].voteScore - b[1].voteScore;
		});
  	}
  	
  	
    return (
      <div>
    	
    	
    	<SelectSortMethod handleSelectSortMethod={this.handleSelectSortMethod} />
    	
    	
    	
    	
    	<AddPostModal />
    	
    	
    	<ul>{sortedposts.map((id_post) => 
    		

    		<li key={id_post[0]}> 
    			
                
                <PostItem 
    				title = {id_post[1].title}
    				body = {id_post[1].body}
    				author = {id_post[1].author}
    				category = {id_post[1].category}
    				posted_on = {this.formattedPostdate(id_post[1].timestamp)}
    				number_of_comments = {Object.keys(comments).filter( key => comments[key].parentId === id_post[0] ).length}
    				postId={id_post[0]} 
    				voteScore={id_post[1].voteScore}
    			/><br />
                

    		</li>
    		
    		

    		)}
    	</ul>
    	
    	
    	
    	
    	
    
    	
        
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












