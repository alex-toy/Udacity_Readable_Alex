import {
  CHANGE_POST,
  ADD_POST,
  REMOVE_POST
} from '../actions/types'


const postReducer = (posts={}, action) => {

	const {id, param, newValue, newtitle, newauthor, newbody, newid, newcategory, voteScore, timestamp } = action
	
	switch(action.type) {
		
		case CHANGE_POST:
			return { ...posts, [id] : { ...posts[id], [param] : newValue } }
			
			
		case ADD_POST:
			return Object.assign({}, posts, {[newid] :  {title: newtitle, author: newauthor, body: newbody, category : newcategory, timestamp : timestamp, voteScore : voteScore} })
			
		
		case REMOVE_POST:
			var id_postArray = Object.entries(posts).filter( id_post => id_post[0] !== id )
			var updatedPost ={}
			for (let id_post of id_postArray) {
				Object.assign(updatedPost, {[id_post[0]] :  {title: id_post[1].title, author: id_post[1].author, body: id_post[1].body, category : id_post[1].category, timestamp : id_post[1].timestamp, voteScore : id_post[1].voteScore} })
			}
			return updatedPost
		

		default:
			return posts
	}
}





export default postReducer

























