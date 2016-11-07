import React from 'react'
import ReactDOM from 'react-dom'
import {Link, Route, Router, hashHistory} from 'react-router'
import $ from 'jquery'
import {editor} from './components/maincss.js' 
import {screen} from './components/maincss.js' 
import IphoneLook from './components/iphoneLook.js' 
import ScreenInfo from './components/screenInfo.js' 
import Process from './components/render.js' 


  


var App = React.createClass({

  getInitialState(){
    return ({word:'', sylls: 0, defaultSyll:0, limit:null, select:'', definition:'', meaning:''})
  },

  setLimit(event){
  event.preventDefault()
  var range = event.target.value 
  this.setState({limit: range})


  },

  handleChange(event){
    // console.log('here')
  // event.preventDefault()

  var x =event.keyCode;
  var name;

  if(x == 32){
    name  = event.target.value
    this.setState({word:name})
    this.getSyll(this.state.word) 
  }
    // console.log(x)

    // this.getSyll(event) 
    // var name  = event.target.value
    // this.setState({word:name})
    console.log(this.state.sylls)

  var max; 
  var sillyLength = this.state.sylls


  // console.log(name)


  sillyLength == this.state.limit ? max = 0 :  max = 1000

  // console.log(max)
 
  $("#texteditor").attr({maxLength:max})
  },


  finalSyll(result){
  this.setState({ sylls:parseInt(result.syllables) + 1})
  console.log(this.state.sylls)
  // console.log(this.state.stateylls.syllables)
  },

  // finalDefine(result){
  // var translation = result.list[0].definition
  // this.setState({meaning: translation})
  // // alert(translation )

  // },



  define(event){
  event.preventDefault()
  var selectedtext = window.getSelection().toString()
  this.setState({definition: selectedtext})
  // alert(selectedtext)
  var key  = "3c443f0f-94fe-4819-8b00-6e2e1e2f3cdd"
    $.ajax({
      url:"http://api.urbandictionary.com/v0/define?term=" + this.state.definition,

      success:function print(data){
        var result = data
       
        this.finalDefine(result)
       
      }.bind(this)
      

    })

  },

getSyll(word){
  event.preventDefault()

    $.ajax({
      url:'http://rhymebrain.com/talk?function=getWordInfo&word=' +  word,  
      success:function print(data){
        var result = data
        
        this.finalSyll(result)
        
      }.bind(this)
      

    })

  },
appBackLoop(){
  this.state.appSkin.map(function(a){
    return <option> {a} </option>
  })

},

resetSyll(){
  var oldSylls = this.state.sylls
  this.setState({sylls:0})
  
  var newSylls = oldSylls - this.state.sylls
  this.setState({sylls:newSylls})

  // console.log(newSylls)
  var x = event.keyCode;    

  // if(x == 13){

  // }

},

render(){

    return (

        <center>
          <h1>Flow Tite</h1> 
          <h1> Music Text Editor</h1>
       
          <IphoneLook appBack={this.appBackLoop} definition ={this.define} handleChange={this.handleChange} />


          <ScreenInfo syllables={this.state.sylls } limit={this.state.limit} select={this.state.select} definition={this.state.definition} meaning ={this.state.meaning} />
           
          <Process reset={this.resetSyll}definition = {this.state.define} setLim={this.setLimit} />

        </center>
            
    )
  }
})

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
  </Router>,  
  document.getElementById('root')

)

