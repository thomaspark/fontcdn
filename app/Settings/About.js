// jshint ignore: start

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="about">
        <p>
          <a href="http://github.com/thomaspark/fontcdn/">
            <i className="fa fa-github"></i>
          </a>
          <a href="https://twitter.com/thomashpark">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=http://fontcdn.org">
            <i className="fa fa-facebook"></i>
          </a>
        </p>
        <p>Made by <a href="http://thomaspark.co">Thomas Park</a> • <a href="https://github.com/sponsors/thomaspark/">Sponsor Me</a></p>
        <p>Check out <a href="http://glyphsearch.com">GlyphSearch</a> &amp; <a href="https://bootswatch.com">Bootswatch</a></p>
      </div>
    );
  }
});