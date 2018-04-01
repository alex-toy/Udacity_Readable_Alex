import { 
	ADD_CATEGORY,
	ADD_POST,
	CHANGE_POST,
	REMOVE_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
	CHANGE_COMMENT,
} from './types';




export function addCategory ({ name, path }) {
  return {
    type: ADD_CATEGORY,
	name, 
	path
  }
}



export function addPost ({ newid, newtitle, newauthor, newbody, newcategory, timestamp, voteScore }) {
  return {
    type: ADD_POST,
	newid, 
	newtitle, 
	newauthor, 
	newbody,
	newcategory,
	timestamp,
	voteScore
  }
}




export function changePost ({ id, param, newValue }) {
  return {
    type : CHANGE_POST, 
    id, 
    param, 
    newValue
  }
}




export function removePost ({ id }) {
  return {
    type : REMOVE_POST, 
    id
  }
}





export function addComment ({ newid, newparentId, newauthor, newscore, newbody, timestamp }) {
  return {
    type: ADD_COMMENT,
	newid, 
	newparentId, 
	newauthor, 
	newscore, 
	newbody,
	timestamp
  }
}





export function changeComment ({ id, param, newValue }) {
  return {
    type: CHANGE_COMMENT,
	id, 
	param, 
	newValue 
  }
}



export function removeComment ({ id }) {
  return {
    type : REMOVE_COMMENT, 
    id
  }
}






















