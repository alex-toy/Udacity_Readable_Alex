import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { removePost } from '../actions/actions'
import PostItem from './PostItem';




class OneCategoriesView extends Component {
	
	
	formattedPostdate = (timestamp) => {
  		var a = new Date(timestamp * 1000);
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
	
	
	
  
  render() {
    
    
    const {posts, choicecat, comments} = this.props
  	var arrayposts = Object.entries(posts).filter( id_post => id_post[1].category === choicecat)
    
    
  	
  	if(arrayposts.length !== 0){
  	
		return (
					<ul>{arrayposts.map((id_post) => 
						
						
						<PostItem 
							key={id_post[0]}
							title = {id_post[1].title}
							body = {id_post[1].body}
							author = {id_post[1].author}
							category = {id_post[1].category}
							posted_on = {this.formattedPostdate(id_post[1].timestamp)}
							number_of_comments = {Object.keys(comments).filter( key => comments[key].parentId === id_post[0] ).length}
							postId={id_post[0]} 
							voteScore={id_post[1].voteScore}
						/>)}
					</ul>
		)
	}else{
	return (
	  
				<div className="CategoriesView">
				
				
					Sorry, no post in that category
				
				
				</div>
		)}
	
	
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
	
	
	RemovePost: (id) => { 
  		
  		dispatch(removePost({ id : id }))
	}
	

});



export default connect(
  mapStateToProps, mapDispatchToProps
)(OneCategoriesView)










