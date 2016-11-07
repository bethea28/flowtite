import React from 'react'
// import Actions from './Actions.js'


var skinNames=["Tupac", "Biggie", "Jay-Z", "Nas",'Lil-Wayne',"Kanye West"]

var Process = React.createClass({
render(){

  return (
      <div>

      <button onClick = {this.props.definition}>Define </button>
          <input style ={{width:40}} id = 'limit setter' type="text" name='hidden' placeholder="limit" onChange={this.props.setLim} /> 
        

    	<select  onChange={this.props.appBack} >
				{skinNames.map(function(a,indx){
					return <option value={a} key = {indx}> {a} </option>
				})}
		</select>

		<button onClick={this.props.reset}>Syllable Reset </button>

      
      </div>

    )

  }


})

export default Process
