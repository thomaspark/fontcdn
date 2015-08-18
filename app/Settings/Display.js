// jshint ignore: start

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  changeDisplay: function(event) {
    var btn = $(event.target);

    if (!btn.hasClass("active")) {
      var value = event.target.getAttribute('data-value').toLowerCase();
      var groupSize = (value == 'grid') ? 900 : 3600;

      this.props.onClick({display: value});
      this.props.onClick({groupSize: groupSize});

      $(".btn[data-value]").removeClass("active");
      btn.addClass("active");
      $('body').toggleClass('row');
    }
  },
  changeSize: function(event) {
    var size = $(event.target).val() + 'px';
    $('.fonts').css('font-size', size);
    $('.size').text(size);
  },
  invert: function(event) {
    $(event.target).toggleClass("active");
    $("body").toggleClass("invert");
  },
  render: function() {
    return (
      <div className="display">
        <div>
          <h2>Display</h2>
          <span onClick={this.changeDisplay} data-value="grid" className="btn btn-grid active" title="Switch to Grid">
            <i className="fa fa-th"></i>
          </span>
          <span onClick={this.changeDisplay} data-value="row" className="btn btn-row" title="Switch to List">
            <i className="fa fa-align-justify"></i>
          </span>
          <span onClick={this.invert} className="btn" title="Invert Colors">
            <i className="fa fa-adjust"></i>
          </span>
        </div>
        <div>
          <span className="size">30px</span>
          <h2>Preview Size</h2>
          <input type="range" defaultValue="30" min="10" max="80" onChange={this.changeSize} />
        </div>
      </div>
    );
  }
});
