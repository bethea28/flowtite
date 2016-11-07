import React from 'react'


var Actions = React.createClass({

  render(){
    return (
        <div>


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

              sillyLength == this.state.limit ? max = 0 :  max = 1000;
            
              console.log(max);
           
              $("#texteditor").attr({maxLength:max});


            },

            enter(event){
              var x =event.keyCode;
             
              if(x == 13){
               
                this.setState({indx: this.state.indx +1, sylls:0, limit: this.state.limit, lines: this.state.lines.concat(' ') })
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
              console.log(this.state.syn)

            },

            finalSyn(result){
              var alts = result
              console.log(alts)

            },



            define(event){
              event.preventDefault()
              var selectedtext = window.getSelection().toString()
              this.setState({definition: selectedtext})

              $.ajax({
                var key  = "3c443f0f-94fe-4819-8b00-6e2e1e2f3cdd"
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
              this.setState({sylls:0})
              
              // var newSylls = oldSylls - this.state.sylls
              // this.setState({sylls:newSylls})

              // console.log(newSylls)
              // var x = event.keyCode;    

              // if(x == 13){

              // }

            },
        </div>
      )

  }


  
})

export default Actions
