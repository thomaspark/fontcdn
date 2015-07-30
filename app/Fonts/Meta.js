// jshint ignore: start

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var variants = this.props.font.variants.length;
    var text = this.props.font.family + ' - ' + variants;

    if (variants == 1) {
      text = text + ' Style';
    } else {
      text = text + ' Styles';
    }

    return (
      <div className="meta">
        <span className="family">
           {text}
        </span>
      </div>
    );
  }
});