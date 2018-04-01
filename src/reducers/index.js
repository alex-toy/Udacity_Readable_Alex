import { combineReducers } from 'redux'
import postReducer from './post'
import commentsReducer from './comment'
import categoryReducer from './category'


export default combineReducers({
	posts : postReducer,
	comments : commentsReducer,
	categories : categoryReducer
})


























