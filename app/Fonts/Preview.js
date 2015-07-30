// jshint ignore: start

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var text = this.props.text;
    var fontFamily = this.props.font.family;
    var style = {
      fontFamily: "'" + fontFamily + "'"
    };

    if (text == "Font Name") {
      text = fontFamily;
    }

    return (
      <div className="preview" style={style}>
        <div><span>{text}</span></div>
      </div>
    );
  }
});