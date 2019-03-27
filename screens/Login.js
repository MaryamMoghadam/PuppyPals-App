import React from 'react';
import styles from '../styles'
import RootNavigator from '../navigation/RootNavigator';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase';
import { Facebook, Permissions } from 'expo';
firebase.initializeApp(firebaseConfig);

import { 
  Text, 
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

class Login extends React.Component {
  state = {}
  render() {
    return (
      <view style={style.container>
      <TextInput
        placeholder="Username or Email"
        returnKeyType="next"
        onSubmitEditing={()=> this.passwordInput.focus()}
        KeyboardType={()}
      }
    )
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(user))
      }
    });
  }

  login = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2318947118391052', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);

        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(credential) {

        }).catch((error) => {
            console.log("\n\nerror logging in: " + JSON.stringify(error));
            Alert.alert("Try again!");
        });

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    if(this.props.loggedIn){
      return (
        <RootNavigator/>
      )
    } else {
      return (
        <View style={[styles.container, styles.center]}>
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text>Login!</Text>
          </TouchableOpacity>
        </View>
      )      
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);