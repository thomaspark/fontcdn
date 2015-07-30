// jshint ignore: start

var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  changeDisplay: function(event) {
    var value = event.target.getAttribute('data-value').toLowerCase();
    var btn = $(event.target);

    if (!btn.hasClass("active")) {
      $(".btn[data-value]").removeClass("active");
      btn.addClass("active");
      $('body').toggleClass('row');
      this.props.onClick(value);
    }
  },
  handleSizeChange: function(event) {
    var size = $(event.target).val() + "px";
    $(".fonts").css("font-size", size);
  },
  invert: function(event) {
    $(event.target).toggleClass("active");
    $("body").toggleClass("invert");
  },
  componentDidMount: function() {
    this.setState({value: 30});
  },
  render: function() {
    return (
      <div className="display">
        <div>
          <h2>Display</h2>
          <span onClick={this.changeDisplay} data-value="grid" className="btn active" title="Switch to Grid"><i className="fa fa-th"></i></span>
          <span onClick={this.changeDisplay} data-value="row" className="btn" title="Switch to List"><i className="fa fa-align-justify"></i></span>
          <span onClick={this.invert} className="btn" title="Invert Colors"><i className="fa fa-adjust"></i></span>
        </div>
        <div>
          <h2>Preview Size</h2>
          <input type="range" defaultValue="30" min="10" max="80" onChange={this.handleSizeChange} />
        </div>
      </div>
    );
  }
});