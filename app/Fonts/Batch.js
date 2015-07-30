// jshint ignore: start

var React = require('react');
var $ = require('jquery');
var Font = require('./Font.js');

module.exports = React.createClass({
  modal: function(value) {
    this.props.setModal(value);
  },
  render: function() {
    var text = $('.text input').val();
    var num = this.props.num;
    var start = this.props.start;
    var end = this.props.end;
    var fonts = this.props.data.slice(start, end);
    var children = [];

    while (fonts.length > 0) {
      var font = fonts.shift();
      children.push(<Font key={font.family} font={font} text={text} setModal={this.modal} />);
    }

    return (
      <div className="fontgroup">
        {children}
      </div>
    );
  }
});