// jshint ignore: start

var React = require('react');
var Preview = require('./Preview.js');
var Meta = require('./Meta.js');

module.exports = React.createClass({
  modal: function() {
    this.props.setModal(this.props.font);
  },
  render: function() {
    var text = this.props.text;

    return (
      <div className="font">
        <div className="content" onClick={this.modal} >
          <Preview font={this.props.font} text={text} />
          <Meta font={this.props.font} num={this.props.num} />
        </div>
      </div>
    );
  }
});