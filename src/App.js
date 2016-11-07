import React from 'react'
import ReactDOM from 'react-dom'
import {Link, Route, Router, hashHistory} from 'react-router'
import $ from 'jquery'
import {editor} from './components/maincss.js' 
import {screen} from './components/maincss.js' 
import IphoneLook from './components/iphoneLook.js' 
import ScreenInfo from './components/screenInfo.js' 
import Process from './components/render.js' 

var skins = {
  Tupac:'http://media.cleveland.com/ent_impact_home/photo/2pac-alleyezonme-diamondjpg-117c3acc8c1dd618.jpg',
  Nas:'http://images.complex.com/complex/image/upload/t_in_content_image/nas-it-was-written-cover_o9nhh4.jpg'
}

    


var App = React.createClass({

  getInitialState(){
    return ({lines:[], word:'', syn:[], pics:[] , sylls: 0, indx:0, limit:null, select:'', definition:'', meaning:'',background:''})
  },

  setLimit(event){
    event.preventDefault();
    var range = event.target.value ;
    this.setState({limit: range});


  },

  handleChange(event){

    event.preventDefault();
  
    var arrayOfLines = $('#texteditor').val().split('\n');

    this.setState({lines: arrayOfLines [this.state.indx], word:name, sylls:null});
    console.log(arrayOfLines);

    this.getSyll(this.state.lines); 

    var max; 
    var sillyLength = this.state.sylls; 

    sillyLength == this.state.limit ? max = this.state.limit + 1 :  max = 1000;
    // if(sillyLength == this.state.limit){
    //   max = 0
    //   this.setState({indx: this.state.indx +1})
    // }else{

    //   max = 1000
    // }

  
    console.log(max);
 
    $("#texteditor").attr({maxLength:max});


  },

  keyCodes(event){
    var enter =event.keyCode;
    var up =event.keyCode;
    var down =event.keyCode;
    var hyphen=event.keyCode;
   
    if(enter == 13){
     
      this.setState({indx: this.state.indx +1, sylls:this.state.sylls - this.state.sylls, limit: this.state.limit })
      // console.log('indx:'+ this.state.indx) 
      console.log("indx:"+ this.state.indx)
        
    }

    if(up == 38 && this.state.indx !==0){
     
      this.setState({indx: this.state.indx -1, limit: this.state.limit })
      console.log('indx:'+ this.state.indx) 
      // console.log('length:'+ this.state.lines[this.state.indx].length)
        
    }

    if(down == 40 && this.state.indx !== this.state.lines.length){
     
      this.setState({indx: this.state.indx +1, limit: this.state.limit, lines:this.state.lines.concat(' ') })
      // console.log('length:'+ this.state.lines[this.state.indx].length) 
      console.log('indx:'+ this.state.indx) 
        
    }

    if(hyphen== 189){
     
      this.setState({sylls:parseInt(this.state.sylls)+1})
      console.log('indx:'+ this.state.indx) 
        
    }



  },

  finalSyll(result){
    this.setState({ sylls:result.syllables});
    // console.log(this.state.sylls)
  },

  finalDefine(result){
    console.log(result)
    var translation = result.list[0].definition;
    this.setState({syn:result.tags ,meaning: translation});
    // alert(translation )
    console.log(this.state.syn)

  },

  finalSyn(result){
  var alts = result
  // this.setState({syn: translation})
  // alert(translation )
  console.log(alts)

  },



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

  synonyms(){
  this.state.syn.map(function(a,indx){
    return <span key ={indx}> {a} </span>
  })

  },

getSyll(word){
  // event.preventDefault()

    $.ajax({
      url:'http://rhymebrain.com/talk?function=getWordInfo&word=' +  word,
      success:function print(data){
        var result = data
        
        this.finalSyll(result)
        
      }.bind(this)
      

    })

  },
appBack(){
  // console.log(this.state.background)
  var select = $('select').val()
  // console.log(select)
  this.setState({background: select})
  console.log(this.state.background)
},

resetSyll(){
  // var oldSylls = this.state.sylls
  this.setState({sylls:0, indx: 0})
  
  // var newSylls = oldSylls - this.state.sylls
  // this.setState({sylls:newSylls})

  // console.log(newSylls)
  // var x = event.keyCode;    

  // if(x == 13){

  // }

},

render(){

    return (
        <center>
      {console.log(this.state.background)}
          <h1>Flow Tite</h1> 
          <h1> Music Text Editor</h1>
          <h1> {this.state.lines.length}</h1>
       
          <IphoneLook  synonyms = {this.synonyms} keyCodes = {this.keyCodes} appBack={this.appBackLoop}definition ={this.define} handleChange={this.handleChange} />


          <ScreenInfo syn = {this.synonyms} syllables={this.state.sylls} limit={this.state.limit} select={this.state.select} definition={this.state.definition} meaning ={this.state.meaning} />
           
          <Process appBack={this.appBack}reset={this.resetSyll}definition = {this.state.define} setLim={this.setLimit} />

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

