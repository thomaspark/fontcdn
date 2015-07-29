// jshint ignore: start

var Settings = React.createClass({
  changeSearch: function(value) {
    this.props.onChange("search", value);
  },
  changeDisplay: function(value) {
    this.props.onChange("display", value);
  },
  changeText: function(value) {
    this.props.onChange("text", value);
  },
  setCategory: function(value) {
    this.props.onChange("category", value);
  },
  sort: function(value) {
    this.props.onChange("sort", value);
  },
  render: function() {
    return (
      <div className="filters">
        <h1>FontCDN</h1>
        <Search onChange={this.changeSearch} />
        <Categories onClick={this.setCategory} />
        <hr/>
        <Sort onClick={this.sort} />
        <Display onClick={this.changeDisplay} />
        <Text onChange={this.changeText} />
        <hr/>
        <About />

      </div>
    );
  }
});

var Categories = React.createClass({
  setCategory: function(event) {
    var btn = $(event.target);
    var value = event.target.textContent.toLowerCase();

    $(".categories .btn, .suggestions .btn").removeClass("active");
    btn.addClass("active");

    this.props.onClick(value);
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
        <div className="suggestions">
          <h2>Suggestions</h2>
          <span onClick={this.setCategory} className="btn">Paragraphs</span>
          <span onClick={this.setCategory} className="btn">Headers</span>
        </div>
      </div>
    );
  }
});

var Search = React.createClass({

  componentWillMount: function () {
    this.delayedCallback = _.debounce(function(event) {
      var text = event.target.value;
      this.props.onChange(text);
    }, 500);
  },
  onChange: function (event) {
    event.persist();
    this.delayedCallback(event);
  },
  render: function() {
    return (
      <div className="search">
        <h2>Search</h2>
        <input onChange={this.onChange} type="search" />
      </div>
    );
  }
});

var Views = React.createClass({
  render: function() {
    return (
      <div className="views">
        View options
      </div>
    );
  }
});

var Sort = React.createClass({
  sort: function(event) {
    var value = event.target.textContent.toLowerCase();
    var btn = $(event.target);

    if (!btn.hasClass("active")) {
      $(".sort .btn").removeClass("active");
      btn.addClass("active");
      this.props.onClick(value);
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

var Display = React.createClass({
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

var Text = React.createClass({
  getInitialState: function() {
    return {
      texts: [
                "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789",
                "Font Name",
                "Grumpy wizards make toxic brew for the evil Queen and Jack.",
                "Bright vixens jump dozy fowl quack",
                "Waltz bad nymph for quick jugs vex",
                "Brick quiz whangs jumpy veldt fox",
                "The quick brown fox jumps over the lazy dog."
              ]
    };
  },

  componentWillMount: function () {
    this.delayedCallback = _.debounce(function(event) {
      var text = event.target.value;
      this.props.onChange(text);
    }, 500);
  },

  onChange: function (event) {
    event.persist();
    this.delayedCallback(event);
  },

  refresh: function() {
    var newText = this.state.texts.shift();
    this.state.texts.push(newText);
    this.props.onChange(newText);
    React.findDOMNode(this.refs.text).value = newText;
  },

  render: function() {
    return (
      <div className="text">
        <h2>Preview Text</h2>
        <input type="text" ref="text" onChange={this.onChange} defaultValue="The quick brown fox jumps over the lazy dog." />
        <span className="refresh" onClick={this.refresh} title="Load Pangram"><i className="fa fa-refresh"></i></span>
      </div>
    );
  }
});

var About = React.createClass({
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
        <p>Made by <a href="http://thomaspark.co">Thomas Park</a></p>
        <p>Check out <a href="http://glyphsearch.com">GlyphSearch</a> &amp; <a href="https://bootswatch.com">Bootswatch</a></p>
      </div>
    );
  }
});




