import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// import Hub
import { Auth, Hub } from 'aws-amplify'

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err));
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function App(props) {
  // in useEffect, we create the listener
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
       if(payload.event === "customOAuthState"){
         console.log(payload.data)
       }
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={() => Auth.federatedSignIn({customState:`http://localhost:3000?test`})}>Sign In with custom State</button>

        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>

        <button onClick={() => Auth.federatedSignIn({ provider: "Auth0",})}>Sign In with Auth0</button>
        <button onClick={() => Auth.federatedSignIn({ provider: "Auth0", customState: window.location.href})}>Sign In with Auth0 and custom state</button>

        <button onClick={() => Auth.federatedSignIn({customProvider: 'Auth0'})}>Sign In with Auth0 custom IdP</button>
        <button onClick={() => Auth.federatedSignIn({customProvider: 'Auth0', customState: ""})}>Sign In with Auth0 custom IdP and state</button>

        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Sign In with Google</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google', customState:""})}>Sign In with Google and custom state</button>
      </header>
    </div>
  );
}

export default App