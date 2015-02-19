'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ReactgameApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactgameApp = require('../../../src/scripts/components/ReactgameApp.js');
    component = React.createElement(ReactgameApp);
  });

  it('should create a new instance of ReactgameApp', function () {
    expect(component).toBeDefined();
  });
});
