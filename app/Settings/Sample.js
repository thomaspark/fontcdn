// jshint ignore: start

var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      texts: [
                "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789",
                "Font Name",
                "Grumpy wizards make toxic brew for the evil Queen and Jack.",
                "Bright vixens jump dozy fowl quack",
                "Waltz bad nymph for quick jugs vex",
                "Brick quiz whangs jumpy veldt fox",
                "The quick brown fox jumps over the lazy dog."
              ]
    };
  },
  componentWillMount: function () {
    this.delayedCallback = _.debounce(function(event) {
      var value = event.target.value;
      this.props.onChange({text: value});
    }, 500);
  },
  onChange: function (event) {
    event.persist();
    this.delayedCallback(event);
  },
  refresh: function() {
    var value = this.state.texts.shift();
    this.state.texts.push(value);
    React.findDOMNode(this.refs.text).value = value;
    this.props.onChange({text: value});
  },
  render: function() {
    return (
      <div className="text">
        <h2>Preview Text</h2>
        <input type="text" ref="text" onChange={this.onChange} defaultValue="The quick brown fox jumps over the lazy dog." />
        <span className="refresh" onClick={this.refresh} title="Load Pangram"><i className="fa fa-refresh"></i></span>
      </div>
    );
  }
});
