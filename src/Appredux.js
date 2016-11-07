import React form 'react'
import ReactDOM form 'react-dom'
import {createStore} from 'redux'


// store///////////////////////?


var Store = createStore(reducer)


var defaultState = {
	lines:[],
	words:'',
	syn:[],
	sylls:0,
	indx:0,
	limit:null,
	select:'',
	definition:'',
	meaning:'',
	background:''

}


var Reducer = ( oldState = defaultState, actions)=>{
	// switch(action.type){
	// 	case ' ':
	// 		return 
	// }
}


// Actions/////////

var 