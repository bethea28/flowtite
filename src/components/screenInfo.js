import React from 'react'
// import Actions from './Actions.js'

var ScreenInfo = React.createClass({

render(){

	return (
		<div>
		    <center>
		        <h1> Syllables:{this.props.syllables}</h1>
		        <h1> Limit:{this.props.limit}</h1>
		        <h3> Definition:{this.props.definition}: {this.props.meaning}</h3>
		        <h3> Synonyms:{this.props.syn}</h3>
		    </center>
		</div>

	)

  }

})


export default ScreenInfo