import React from 'react';
import styles from '../styles'
import RootNavigator from '../navigation/RootNavigator';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import { Text, ViewTouchableOpacity, KeyboardAvoidingView} from 'react-native';

class Login extends React.Component {
  state = {}
  render() {
       <KeyboardAvoidingView behavior="padding">
        <View style={[styles.container, styles.center]}>
          <View style={styles.logoContainer}>
            <image source={require('../assets/1.png')} />
          </View>
          <TextInput
            placeholder="Username or Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={()=>this.passwordInput.focus()}
            keyboardType="email-address"
            style={styles.input}
            />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input)=>this.passwordInput=input}
            />
          <TouchableOpacity onPress={this.login.bind(this)}>
          
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>      
    }
  }

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);