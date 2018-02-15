import {ADD_ENTRY, RECEIVE_ENTRIES} from '../actions'

const entries = (state={}, action) => {
	switch (action.type){
		case RECEIVE_ENTRIES:
			return {
				...state,
				...action.entries
			}
		case ADD_ENTRY:
			console.log("action.entry", action.entry)
			return {
				...state,
				...action.entry
			}
		default:
			return state
	}
}

export default entries
