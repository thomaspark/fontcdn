// jshint ignore: start

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  setCategory: function(event) {
    var value = event.target.textContent.toLowerCase();
    this.props.onClick(value);

    $(".categories .btn").removeClass("active");
    $(event.target).addClass("active");
  },
  render: function() {
    return (
      <div className="categories">
        <div>
          <h2>Category</h2>
          <span onClick={this.setCategory} className="btn active">All</span>
          <span onClick={this.setCategory} className="btn">Sans-Serif</span>
          <span onClick={this.setCategory} className="btn">Serif</span>
          <span onClick={this.setCategory} className="btn">Display</span>
          <span onClick={this.setCategory} className="btn">Handwriting</span>
          <span onClick={this.setCategory} className="btn">Monospace</span>
        </div>
        <div>
          <h2>Suggestions</h2>
          <span onClick={this.setCategory} className="btn">Paragraphs</span>
          <span onClick={this.setCategory} className="btn">Headers</span>
        </div>
      </div>
    );
  }
});