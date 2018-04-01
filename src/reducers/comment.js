import {
  ADD_COMMENT,
  CHANGE_COMMENT,
  REMOVE_COMMENT
} from '../actions/types'


const commentsReducer = (comments={}, action) => {

	const {id, param, newValue, newauthor, newbody, newid, newparentId, newscore, timestamp } = action
	
	switch(action.type) {
			
		case ADD_COMMENT:
			return Object.assign({}, comments, {[newid] :  {parentId: newparentId, author: newauthor, voteScore: newscore,  body: newbody,  timestamp: timestamp} })
			
		case CHANGE_COMMENT:
			return { ...comments, [id] : { ...comments[id], [param] : newValue } }
		
		case REMOVE_COMMENT:
			var id_commentArray = Object.entries(comments).filter( id_comment => id_comment[0] !== id )
			var updatedComment ={}
			for (let id_comment of id_commentArray) {
				Object.assign(updatedComment, {[id_comment[0]] :  
				{
				parentId: id_comment[1].parentId,
				author: id_comment[1].author, 
				body: id_comment[1].body, 
				category : id_comment[1].category, 
				timestamp : id_comment[1].timestamp, 
				voteScore : id_comment[1].voteScore} })
			}
			return updatedComment
			

		default:
			return comments
	}
}



export default commentsReducer

























