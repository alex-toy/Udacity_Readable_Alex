import {
  ADD_CATEGORY
} from '../actions/types'


const categoryReducer = (categories={}, action) => {

	const { name, path} = action
	
	switch(action.type) {
		
		case ADD_CATEGORY:
			return [ ...categories, { name : name, path : path } ]
	
		default:
			return categories
	}
}



export default categoryReducer

























