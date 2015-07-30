// jshint ignore: start

var React = require('react');
var Search = require('./Search.js');
var Categories = require('./Categories.js');
var Sort = require('./Sort.js');
var Display = require('./Display.js');
var Sample = require('./Sample.js');
var About = require('./About.js');

module.exports = React.createClass({
  changeSearch: function(value) {
    this.props.onChange("search", value);
  },
  changeDisplay: function(value) {
    this.props.onChange("display", value);
  },
  changeText: function(value) {
    this.props.onChange("text", value);
  },
  setCategory: function(value) {
    this.props.onChange("category", value);
  },
  sort: function(value) {
    this.props.onChange("sort", value);
  },
  render: function() {
    return (
      <div className="settings">
        <h1>FontCDN</h1>
        <Search onChange={this.changeSearch} />
        <Categories onClick={this.setCategory} />
        <hr/>
        <Sort onClick={this.sort} />
        <Display onClick={this.changeDisplay} />
        <Sample onChange={this.changeText} />
        <hr/>
        <About />
      </div>
    );
  }
});