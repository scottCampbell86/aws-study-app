import React, { Component } from 'react';
import RandomWeighted from './RandomWeighted';
import MultiCard from './MultiCard';
import RegularCard from './RegularCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import './FlashCard.css'
library.add(faSpinner);



class FlashCard extends Component {
  static defaultProps = { 
    API: `https://aws-services.robertbunch.dev/services` 
  }

  state = { 
    flipClas: "",
    questionData: ""
}

  componentDidMount = () =>{
    //this.newCard()
  }

  flip = (e )=>{
    let newFlip = this.state.flipClass === "" ? "flip" : "";
    console.log('FLIP: YOOOOOOOOO')
    this.setState({
        flipClass: newFlip
    })
  }

  newCard = () => {
    console.log('New Card: YOOOOOOOO')
    console.log(`API: ${this.props.API}`)
    console.log(`ALL ${this.props.API}/all`)
    console.log(`WEIGHTED ${this.props.API}/weighted`)
    console.log(`MULTI ${this.props.API}/multi`)

    let path;
    const cardStyle = this.props.cardStyle;
    if((cardStyle === 'Random') || (cardStyle === 'Regular')){
        path = `${this.props.API}/all`
    }else if(cardStyle === 'Weighted'){
        path = `${this.props.API}/weighted`
    }else{
        path = `${this.props.API}/multi`
    }
    axios.get(path).then((response) => {
      
      this.setState({
        questionData: response.data,
      })
      this.props.nowReady();
    })
  }

  render() {
    //SET 57 TO FALSE!!!
    if(this.props.ready){
      this.newCard();
      return(
        <div className="spinner-wrapper">
          <FontAwesomeIcon icon="spinner" size="6x" spin/>
        </div>
      )
    }

    const cardStyle = this.props.cardStyle;
    let card;
    if(cardStyle === 'Multi'){
        card = <MultiCard questionData={this.state.questionData} />
    }else if(cardStyle === 'Regular'){
        card = <RegularCard questionData={this.state.questionData} />
    }else{
        card = <RandomWeighted questionData={this.state.questionData} />
    }
    console.log(card)

    return(
      <div>
          <div className="align-items-center card-holder block">
              <div onClick={this.flip} className={`col-sm-6 offset-sm-3 card mb-3" ${this.state.flipClass}`}>
                { card }
              </div>  
              <div className="button-div">
                <button onClick={this.newCard} className="btn btn-primary btn-lg">Next Question</button>
              </div>
          </div>
      </div>
    )
  }
}

export default FlashCard;