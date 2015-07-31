// jshint ignore: start

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  sort: function(event) {
    var value = event.target.textContent.toLowerCase();
    var btn = $(event.target);

    if (!btn.hasClass("active")) {
      $(".sort .btn").removeClass("active");
      btn.addClass("active");
      this.props.onClick({sort: value});
    }
  },
  render: function() {
    return (
      <div className="sort">
        <h2>Sort</h2>
        <span onClick={this.sort} className="btn active">Popularity</span>
        <span onClick={this.sort} className="btn">Alpha</span>
        <span onClick={this.sort} className="btn">Date</span>
        <span onClick={this.sort} className="btn">Style</span>
      </div>
    );
  }
});
