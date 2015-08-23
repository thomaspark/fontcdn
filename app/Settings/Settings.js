// jshint ignore: start

var React = require('react');
var Search = require('./Search.js');
var Categories = require('./Categories.js');
var Sort = require('./Sort.js');
var Display = require('./Display.js');
var Sample = require('./Sample.js');
var About = require('./About.js');

module.exports = React.createClass({
  changeSetting: function(setting) {
    this.props.onChange(setting);
  },
  closeDropdown: function(e) {
    var target = $(e.target);

    if (target.hasClass('dropdown-toggle') || target.closest('.dropdown').length === 1) {
      return;
    }

    $('.dropdown-menu').hide();
  },
  render: function() {
    return (
      <div onClick={this.closeDropdown} className="settings">
        <h1><a href="./">FontCDN</a></h1>
        <Search onChange={this.changeSetting} />
        <Categories onClick={this.changeSetting} />
        <hr/>
        <Sort onClick={this.changeSetting} />
        <Display onClick={this.changeSetting} />
        <Sample onChange={this.changeSetting} />
        <hr/>
        <About />
      </div>
    );
  }
});
