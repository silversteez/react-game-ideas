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

var SharableLink = React.createClass({
  render: function() {
    return (
      <input type="text" value={this.props.roomUrl}/>
    );
  }
});

var Game = React.createClass({
  componentWillMount: function() {
    var self = this;

    // Try authenticating
    rootRef.onAuth(onAuthAttempt);

    // Handle authentication attempt
    function onAuthAttempt(authData) {
      if (authData) {
        onAuthenticated(authData);
      } else {
        rootRef.authAnonymously(onNewAuthAnonymously);
      }
    }

    // Auth as new anonymous user
    function onNewAuthAnonymously(error, authData) {
      if (error) {
        self.setState({loggedIn: false, statusMessage:"Login Failed!"});
      } else {
        onAuthenticated(authData);
        createNewUser(authData);
      }
    }

    function onAuthenticated(authData) {
      myUid = authData.uid;
      self.setState({loggedIn: true, statusMessage: "Auth Success: " + authData.uid});
      checkRoomStatus();
    }

    function createNewUser(authData) {
      usersRef.child(myUid).set({name: "guest", room:null});
    }

    // check url for room
    function checkRoomStatus() {
      usersRef.child(myUid).child('room').once("value", function(snap) {
        console.log('my room value is snap.val', snap.val());
      });
    }
  },
  getInitialState: function() {
    return {
      loggedIn: false,
      inRoom: null,
      statusMessage: "Logging in..."
    };
  },
  handleCreateRoom: function() {
    var newGame = gamesRef.push({players: {0: myUid}});
    usersRef.child(myUid).child('room').set(newGame.key());
    this.setState({inRoom: newGame.key(), statusMessage:"Tried to create game..."});
  },
  render: function() {
    var inRoom = (this.state.inRoom) ? true : false;
    var roomUrl = window.location + '?room=' + this.state.inRoom;
    var inRoomStuff = <SharableLink roomUrl={roomUrl}/>;
    var createRoomStuff = <CreateRoomButton loggedIn={this.state.loggedIn} createRoom={this.handleCreateRoom}/>;
    var body = inRoom ? inRoomStuff : createRoomStuff;

    return (
      <div>
        <StatusAlert statusMessage={this.state.statusMessage}/>
        {body}
      </div>
    );
  }
});

module.exports = Game;
