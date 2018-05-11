// jshint ignore: start

var React = require('react');
var Preview = require('./Preview.js');
var Meta = require('./Meta.js');

module.exports = React.createClass({
  modal: function() {
    this.props.setModal(this.props.font);
  },
  setStar: function(e) {
    e.stopPropagation();

    var target = $(e.target);
    var stars = this.props.stars;
    var family = this.props.font.family;

    var index = stars.indexOf(family);

    if (index < 0) {
      stars.push(family);
      target.addClass('fa-star').removeClass('fa-star-o');
    } else {
      stars.splice(index, 1);
      target.addClass('fa-star-o').removeClass('fa-star');
    }

    this.props.onChange(stars);
  },
  render: function() {
    var font = this.props.font;
    var text = this.props.text;
    var stars = this.props.stars;
    var starred = stars.includes(font.family) ? 'fa star fa-star' : 'fa star fa-star-o';

    return (
      <div className="font">
        <div className="content" onClick={this.modal} >
          <Preview font={this.props.font} text={text} />
          <span onClick={this.setStar} className={starred}></span>
          <Meta font={this.props.font} num={this.props.num} />
        </div>
      </div>
    );
  }
});