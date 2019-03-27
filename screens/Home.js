import React from 'react';
import styles from '../styles'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { getCards } from '../redux/actions'
import SwipeCards from 'react-native-swipe-cards'
import Cards from '../components/Cards.js'
import NoCards from '../components/NoCards.js'

import { 
  Text, 
  View,
  Image
} from 'react-native';

class Home extends React.Component {

  componentWillMount() {
    this.props.dispatch(getCards(this.props.user.geocode));
  }

  handleYup (card) {
    console.log('handleYup');
    firebase.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: true });
    this.checkMatch(card);
  }

  handleNope (card) {
    firebase.database().ref('cards/' + this.props.user.id + '/swipes').update({ [card.id]: false });
  }

  checkMatch(card) {
    console.log('setting match');
    firebase.database().ref('cards/' + card.id + '/swipes/' + this.props.user.id).once('value', (snap) => {
      console.log('/cards/'+card.id+'/swipes'+this.props.user.id);
      console.log("snap: " + JSON.stringify(snap));
        if(snap.val() == true) {
          console.log('true!');
          var me = { 
            id: this.props.user.id,
            photoURL: this.props.user.photoURL,
            name: this.props.user.name
          }
          var user = {
            id: card.id,
            photoURL: card.photoURL,
            name: card.name
          }
          firebase.database().ref('cards/' + this.props.user.id + '/chats/' + card.id).set({user: user}).then(result => {
            console.log('set user in chat');
          }).catch(result => {
            console.log('could not set user in chat');
          });
          firebase.database().ref('cards/' + card.id + '/chats/' + this.props.user.id).set({user: me}).then(result => {
            console.log('set me in chat');
          }).catch(result => {
            console.log('could not set me in chat');
          })
        }
      }
    )
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        stack={false}
        renderCard={(cardData) => <Cards {...cardData} />}
        renderNoMoreCards={() => <NoCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    cards: state.cards,
    user: state.user
  };
}

export default connect(mapStateToProps)(Home);