// jshint ignore: start

var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  componentWillMount: function () {
    this.delayedCallback = _.debounce(function(event) {
      var value = event.target.value;
      this.props.onChange({search: value});
    }, 500);
  },
  onChange: function (event) {
    event.persist();
    this.delayedCallback(event);
  },
  render: function() {
    return (
      <div className="search">
        <h2>Search</h2>
        <input onChange={this.onChange} type="search" />
      </div>
    );
  }
});
