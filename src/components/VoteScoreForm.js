import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import  { changePost } from '../actions/actions'


class VoteScoreForm extends Component {

	
	state = {
		score : 0
	}
	
	
	increaseVote = (postId) => {
		fetch('http://localhost:3001/posts/' + postId, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method : "POST",
  			body : JSON.stringify({ option : "upVote"})
		})
		.then( rep => rep.json() )
		.then( data => this.props.IncreaseVote(data.id, data.voteScore ) )
	}
	
	
	
	handleIncreaseScore = () => {
		this.increaseVote(this.props.postId)
		this.setState({ score : this.props.voteScore + 1 })
  		console.log(this.state.score)
	}
	
	
	
	decreaseVote = (postId) => {
		fetch('http://localhost:3001/posts/' + postId, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method : "POST",
  			body : JSON.stringify({ option : "downVote"})
		})
		.then( rep => rep.json() )
		.then( data => this.props.IncreaseVote(data.id, data.voteScore ) )
	}
	
	
	
	handleDecreaseScore = () => {
		this.decreaseVote(this.props.postId)
		this.setState({ score : this.props.voteScore - 1 })
	}
	
	
	
	componentDidMount() {
	
		if(this.props.voteScore !== "undefined"){
			this.setState({score : this.props.voteScore })
		} else {
			this.setState({score : 0 })
		}
		
		
	}
	
	

	
  
  
  render() {
    
    
    const {postId} = this.props
    
  	
  	
    return (

            
		<div className="encart" style={{width:250}}>
			<Button type="button" onClick={() => this.handleIncreaseScore(postId)}>+</Button>
			
				Score : {this.props.voteScore}
			
			<Button type="button" onClick={() => this.handleDecreaseScore(postId)}>-</Button>
			
			
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
	
	IncreaseVote: (id, newscore) => { 
  		
  		dispatch(changePost({ id : id, param : 'voteScore', newValue : newscore}))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(VoteScoreForm)












