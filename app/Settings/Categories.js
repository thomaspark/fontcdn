// jshint ignore: start

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  setCategory: function(event) {
    var target = $(event.target);
    var value = target.attr("data-val");
    var type = target.attr("data-type");
    this.props.onClick({category: value, filterType: type});

    $(".categories .btn, .dropdown-toggle").removeClass("active");
    target.addClass("active");

    if (target.attr("data-type") === 'subset') {
      target.closest(".dropdown")
        .find(".dropdown-menu").toggle().end()
        .find(".dropdown-toggle").addClass("active")
        .find(".selected").text(event.target.textContent);
    }
  },
  toggleDropdown: function(e) {
    $(e.target).closest(".dropdown").children(".dropdown-menu").toggle();
  },
  render: function() {
    return (
      <div className="categories">
        <div>
          <h2>Category</h2>
          <span onClick={this.setCategory} className="btn active" data-type="category" data-val="all">All</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="sans-serif">Sans-Serif</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="serif">Serif</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="display">Display</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="handwriting">Handwriting</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="monospace">Monospace</span>
          <span onClick={this.setCategory} className="btn" data-type="category" data-val="stars"><i className="fa fa-star"></i></span>
        </div>
        <div>
          <h2>Suggestions</h2>
          <span onClick={this.setCategory} className="btn" data-type="suggestion" data-val="paragraphs">Paragraphs</span>
          <span onClick={this.setCategory} className="btn" data-type="suggestion" data-val="headings">Headings</span>
        </div>
        <div>
          <h2>Subset</h2>
          <span className="dropdown">
            <div onClick={this.toggleDropdown} className="dropdown-toggle">
              <span className="selected">Latin</span> <i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-menu">
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="arabic">Arabic</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="cyrillic">Cyrillic</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="cyrillic-ext">Cyrillic Extended</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="devanagari">Devanagari</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="greek">Greek</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="greek-ext">Greek Extended</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="hebrew">Hebrew</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="khmer">Khmer</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="latin">Latin</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="latin-ext">Latin Extended</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="tamil">Tamil</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="telugu">Telugu</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="thai">Thai</span>
              <span onClick={this.setCategory} className="btn" data-type="subset" data-val="vietnamese">Vietnamese</span>
            </div>
          </span>
        </div>
      </div>
    );
  }
});
