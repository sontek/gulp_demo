//jest.dontMock('../MainDiv.jsx');
describe('HelloWorld', function() {
  it('does stuff', function() {
    var React = require('react/addons');
    var HelloWorld = require('../hello-world.jsx');
    var TestUtils = React.addons.TestUtils;

    var main = TestUtils.renderIntoDocument(
      <HelloWorld />
      //React.createElement(HelloWorld)
    );
    var div = TestUtils.findRenderedDOMComponentWithTag(main, 'p');
    expect(React.findDOMNode(main).textContent).toEqual('Hello, world!');
  });
});
