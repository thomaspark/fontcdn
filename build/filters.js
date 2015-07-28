// jshint ignore: start

var Filters = React.createClass({displayName: "Filters",
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
      React.createElement("div", {className: "filters"}, 
        React.createElement("h1", null, "FontCDN"), 
        React.createElement(Search, {onChange: this.changeSearch}), 
        React.createElement(Categories, {onClick: this.setCategory}), 
        React.createElement("hr", null), 
        React.createElement(Sort, {onClick: this.sort}), 
        React.createElement(Display, {onClick: this.changeDisplay}), 
        React.createElement(Text, {onChange: this.changeText}), 
        React.createElement("hr", null), 
        React.createElement(About, null)

      )
    );
  }
});

var Categories = React.createClass({displayName: "Categories",
  setCategory: function(event) {
    var btn = $(event.target);
    var value = event.target.textContent.toLowerCase();

    $(".categories .btn, .suggestions .btn").removeClass("active");
    btn.addClass("active");

    this.props.onClick(value);
  },
  render: function() {
    return (
      React.createElement("div", {className: "categories"}, 
        React.createElement("div", null, 
          React.createElement("h2", null, "Category"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn active"}, "All"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Sans-Serif"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Serif"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Display"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Handwriting"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Monospace")
        ), 
        React.createElement("div", {className: "suggestions"}, 
          React.createElement("h2", null, "Suggestions"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Paragraphs"), 
          React.createElement("span", {onClick: this.setCategory, className: "btn"}, "Headers")
        )
      )
    );
  }
});

var Search = React.createClass({displayName: "Search",

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
      React.createElement("div", {className: "search"}, 
        React.createElement("h2", null, "Search"), 
        React.createElement("input", {onChange: this.onChange, type: "search"})
      )
    );
  }
});

var Views = React.createClass({displayName: "Views",
  render: function() {
    return (
      React.createElement("div", {className: "views"}, 
        "View options"
      )
    );
  }
});

var Sort = React.createClass({displayName: "Sort",
  sort: function(event) {
    console.log(event.target);
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
      React.createElement("div", {className: "sort"}, 
        React.createElement("h2", null, "Sort"), 
        React.createElement("span", {onClick: this.sort, className: "btn active"}, "Popularity"), 
        React.createElement("span", {onClick: this.sort, className: "btn"}, "Alpha"), 
        React.createElement("span", {onClick: this.sort, className: "btn"}, "Date")
      )
    );
  }
});

var Display = React.createClass({displayName: "Display",
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
    var size = event.target.value + "px";
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
      React.createElement("div", {className: "display"}, 
        React.createElement("div", null, 
          React.createElement("h2", null, "Display"), 
          React.createElement("span", {onClick: this.changeDisplay, "data-value": "grid", className: "btn active", title: "Switch to Grid"}, React.createElement("i", {className: "fa fa-th"})), 
          React.createElement("span", {onClick: this.changeDisplay, "data-value": "row", className: "btn", title: "Switch to List"}, React.createElement("i", {className: "fa fa-align-justify"})), 
          React.createElement("span", {onClick: this.invert, className: "btn", title: "Invert Colors"}, React.createElement("i", {className: "fa fa-adjust"}))
        ), 
        React.createElement("div", null, 
          React.createElement("h2", null, "Preview Size"), 
          React.createElement("input", {type: "range", defaultValue: "30", min: "10", max: "80", onChange: this.handleSizeChange})
        )
      )
    );
  }
});

var Text = React.createClass({displayName: "Text",
  getInitialState: function() {
    return {
      texts: [
                "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789",
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
      React.createElement("div", {className: "text"}, 
        React.createElement("h2", null, "Preview Text"), 
        React.createElement("input", {type: "text", ref: "text", onChange: this.onChange, defaultValue: "The quick brown fox jumps over the lazy dog."}), 
        React.createElement("span", {className: "refresh", onClick: this.refresh, title: "Load Pangram"}, React.createElement("i", {className: "fa fa-refresh"}))
      )
    );
  }
});

var About = React.createClass({displayName: "About",
  render: function() {
    return (
      React.createElement("div", {className: "about"}, 
        React.createElement("p", null, 
          React.createElement("a", {href: "http://github.com/thomaspark/fontcdn/"}, 
            React.createElement("i", {className: "fa fa-github"})
          ), 
          React.createElement("a", {href: "https://twitter.com/thomashpark"}, 
            React.createElement("i", {className: "fa fa-twitter"})
          ), 
          React.createElement("a", {href: "https://www.facebook.com/sharer/sharer.php?u=http://fontcdn.org"}, 
            React.createElement("i", {className: "fa fa-facebook"})
          )
        ), 
        React.createElement("p", null, "Made by ", React.createElement("a", {href: "http://thomaspark.co"}, "Thomas Park")), 
        React.createElement("p", null, "Check out ", React.createElement("a", {href: "http://glyphsearch.com"}, "GlyphSearch"), " & ", React.createElement("a", {href: "https://bootswatch.com"}, "Bootswatch"))
      )
    );
  }
});




