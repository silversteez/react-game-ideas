'use strict';

var React = require('react/addons');
//var ReactTransitionGroup = React.addons.CSSTransitionGroup;
//var FilterableProductTable = require('./FilterableProductTable.js');
var Gameboard = require('./Game01');
var FirebaseGame = require('./FirebaseGame');

// Export React so the devtools can find it
window.React = React;
window.top.React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/styles.less');

var imageURL = require('../../images/yeoman.png');

var ReactgameApp = React.createClass({
  getInitialState: function() {
    return { showImage: true };
  },
  onClick: function() {
    this.setState({ showImage: !this.state.showImage });
  },
  render: function() {
    var image = this.state.showImage ?  <img onClick={this.onClick} key="myimage" src={imageURL} /> : <p onClick={this.onClick} key="mypara">hello</p>;
    return (
      <div className='main'>
        <FirebaseGame/>
        <Gameboard/>
      </div>
    );
  }
});

React.render(<ReactgameApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactgameApp;
