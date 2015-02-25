var React = require('react/addons');
var Firebase = require('firebase');

var ROOT_URL = "https://matts-game.firebaseio.com/";
var rootRef = new Firebase(ROOT_URL);
var gamesRef = rootRef.child('games');
var usersRef = rootRef.child('users');
var myUid;

var StatusAlert = React.createClass({
  render: function() {
    return (
      <h1>{this.props.statusMessage}</h1>
    );
  }
});

var CreateRoomButton = React.createClass({
  render:function(){
    var style = {backgroundColor:"lightcoral"};
    var disabled = !this.props.loggedIn;
    return (
      <button style={style} onClick={this.props.createRoom} disabled={disabled}>
        Create Room!
      </button>
      );
    }
});

var Game = React.createClass({
  componentWillMount: function() {
    // Try authenticating
    rootRef.onAuth(onAuth.bind(this));

    // Handle authentication attempt
    function onAuth(authData) {
      if (authData) {
        myUid = authData.uid;
        this.setState({loggedIn: true, statusMessage: "Recognized logged in user:" + authData.uid});
      } else {
        rootRef.authAnonymously(onAuthAnonymously.bind(this));
      }
    }

    // Auth as new anonymous user
    function onAuthAnonymously(error, authData) {
      if (error) {
        this.setState({loggedIn: false, statusMessage:"Login Failed!"});
      } else {
        myUid = authData.uid;
        this.setState({loggedIn: true, statusMessage:"Auth Success: " + authData.uid});
      }
    }
  },
  getInitialState: function() {
    return {
      loggedIn: false,
      statusMessage: "Logging in..."
    };
  },
  handleCreateRoom: function() {
    gamesRef.push({players:1});
    this.setState({statusMessage:"Tried to create game..."})
  },
  render: function() {
    return (
      <div>
        <StatusAlert statusMessage={this.state.statusMessage}/>
        <CreateRoomButton loggedIn={this.state.loggedIn} createRoom={this.handleCreateRoom}/>
      </div>
    );
  }
});

module.exports = Game;
