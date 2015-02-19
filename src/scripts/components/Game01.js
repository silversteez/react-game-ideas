var React = require('react/addons');

// Maze Game

var CellData = function(y,x,isOpen) {
  this.y = y;
  this.x = x;
  this.isOpen = isOpen;
};

function makeBoard(gameData) {
  var board = [];
  for (var y = 0; y < gameData.boardHeight; y++) {
    for (var x = 0; x < gameData.boardWidth; x++) {
      var isOpen = (Math.random() > 0.5);
      board.push(new CellData(y,x,isOpen));
    }
  }
  return board;
}

var gameData = {
  boardWidth: 10,
  boardHeight: 10
};

gameData.board = makeBoard(gameData);

var Cell = React.createClass({
  render: function() {
    var data = this.props.data;
    var style = {
      top: data.y * 50,
      left: data.x * 50,
      backgroundColor: data.isOpen ? "lightblue" : "lightcoral"
    };
    return (
      <div
        style={style}
        className="cell"
      >
        ({data.y},{data.x})
      </div>
    );
  }
});

var Gameboard = React.createClass({
  getInitialState: function() {
    return gameData;
  },
  render: function() {
    var cells = this.state.board.map(function(cell){
      return <Cell data={cell}/>;
    });

    return (
      <div className="board">
        {cells}
      </div>
    );
  }
});

module.exports = Gameboard;
