// jshint ignore: start

var App = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      search: '',
      display: 'grid',
      groupSize: 900,
      sort: 'popularity',
      text: 'The quick brown fox jumps over the lazy dog.',
      category: 'all',
      suggestions: {
        paragraphs: ['Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans', 'Ubuntu', 'Varela', 'Vollkorn'],
        headers: ['Abel', 'Arvo', 'Bitter', 'Bree Serif', 'Cabin', 'Droid Sans', 'Droid Serif', 'Gudea', 'Istok Web', 'Lato', 'Lobster', 'Merriweather', 'Montserrat', 'Muli', 'Nunito', 'Open Sans', 'Oswald', 'Pacifico', 'Playfair Display', 'PT Sans', 'PT Serif', 'Quicksand', 'Raleway', 'Roboto', 'Roboto Slab', 'Rokkitt', 'Ubuntu', 'Varela', 'Vollkorn']
      }
    };
  },
  getSettings: function(prop, value) {
    var options = {};
    options[prop] = value;
    this.setState(options);

    if (prop == 'display') {
      if (value == 'row') {
        this.setState({groupSize: 3600})
      } else {
        this.setState({groupSize: 900})
      }
    }
  },
  render: function() {
    return (
      <div>
        <Filters onChange={this.getSettings} />
        <InfiniteList sort={this.state.sort} category={this.state.category} display={this.state.display} search={this.state.search} text={this.state.text} suggestions={this.state.suggestions} groupSize={this.state.groupSize} />
      </div>
    );
  }
});

var FontGroup = React.createClass({
  render: function() {
    var text = $('.text input').val();
    var num = this.props.num;
    var start = this.props.start;
    var end = this.props.end;
    var fonts = this.props.data.slice(start, end);

    var groups = [];
    var children = [];

    while (fonts.length > 0) {
      var font = fonts.shift();
      children.push(<Font font={font} text={text} />);
      if (children.length == 4) {
        groups.push(<div className="fontrow">{children}</div>);
        children = [];
      }
    }

    if (children.length > 0) {
      groups.push(<div className="fontrow">{children}</div>);
    }

    return (
      <div className="fontgroup">
        {groups}
      </div>
    );
  }
});

var Font = React.createClass({
  render: function() {
    var text = this.props.text;

    return (
      <div className="font">
        <div className="content">
          <FontPreview font={this.props.font} text={text} />
          <FontMeta font={this.props.font} num={this.props.num} />
        </div>
      </div>
    );
  }
});

var FontPreview = React.createClass({
  render: function() {
    var fontFamily = this.props.font.family;
    var text = this.props.text;

    var style = {
      fontFamily: "'" + fontFamily + "'"
    };

    return (
      <div className="preview" style={style}>
        <div><span>{text}</span></div>
      </div>
    );
  }
});

var FontMeta = React.createClass({
  render: function() {
    return (
      <div className="meta">
        <span className="family">
           {this.props.font.family}
        </span>
      </div>
    );
  }
});

var InfiniteList = React.createClass({
    getInitialState: function() {
      return {
        elements: [],
        isInfiniteLoading: false,
        matchCount: 1
      }
    },

    componentDidMount: function() {
      this.loadFontData();
    },

    loadFontData: function() {
      var url = 'https://www.googleapis.com/webfonts/v1/webfonts?',
          key = 'key=AIzaSyDrwscy04xGYMeRyeWOnxXilRnyCafwqHA';
      
      var sort = this.props.sort;
      var opt = 'sort=' + sort + '&';
      var req = url + opt + key;

      $.ajax({
        url: req,
        dataType: 'json',
        cache: true,
        success: function(data) {
          var obj = this.state.data || {};
          obj[sort] = data.items;

          this.setState({data: obj});

          var fonts = [];
          var that = this;

          for (var i = 0; i < 8; i++) {
            fonts.push(data.items[i].family);
          }

          WebFont.load({
            google: {
              families: fonts
            },
            active: function() {
              that.handleInfiniteLoad();
            }
          });

        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      if (nextState.elements.length == 0 && nextState.matchCount !== 0) {
        return false;
      }

      return true;
    },

    componentDidUpdate: function(prevProps, prevState) {
      var sort = this.props.sort;
      var category = this.props.category;
      var search = this.props.search;

      if ((sort !== prevProps.sort) || (category !== prevProps.category) || (search !== prevProps.search)) {
        this.setState({elements: []});
        this.loadFontData();
      }
    },

    checkCategory: function(category, font) {
      if (category == 'all') {
        return true;
      }

      if ((category == 'paragraphs') || (category == 'headers')) {
        var suggestions = this.props.suggestions[category];
        return ($.inArray(font.family, suggestions) > -1);
      } else {
        return (font.category == category);
      }
    },

    buildElements: function(start, end) {
      var elements = [];

      if (end == 0) {
        return elements;
      }

      var fonts = [];
      var sort = this.props.sort;
      var category = this.props.category;
      var text = this.props.text;
      var search = $.trim(this.props.search.toLowerCase())
      var data = this.state.data[sort];
      var that = this;

      if ((category !== "all") || search.length > 0) {
        data = data.filter(function(elem, i, arr) {
          var isCategory = true,
              isMatch = true;

          isCategory = that.checkCategory(category, elem);

          if (search.length > 0) {
            isMatch = (elem.family.toLowerCase().indexOf(search) !== -1);
          }

          return (isCategory && isMatch);
        });
      }

      if (data.length < end) {
        end = data.length;
      }

      for (var i = start; i < end; i++) {
        var font = data[i];
        fonts.push(font.family);
      }

      this.setState({matchCount: fonts.length})

      if (fonts.length > 0) {
        elements.push(<FontGroup key={start} start={start} end={end} data={data} text={this.props.text} display={this.props.display} />)

        WebFont.load({
          google: {
            families: fonts
          }
        });
      }

      return elements;
    },

    handleInfiniteLoad: function() {
      var that = this;
      this.setState({
        isInfiniteLoading: true
      });
      setTimeout(function() {
        var groupSize = 24;
        var elemLength = that.state.elements.length * groupSize,
          newElements = that.buildElements(elemLength, elemLength + 24);
        that.setState({
          isInfiniteLoading: false,
          elements: that.state.elements.concat(newElements)
        });
      }, 0);
    },

    elementInfiniteLoad: function() {
      return <div className="infinite-list-item"></div>;
    },

    height: function() {
      return window.innerHeight;
    },

    render: function() {
      var data = this.state.data;

      return <Infinite className="fonts"
                       elementHeight={this.props.groupSize}
                       containerHeight={this.height()}
                       infiniteLoadBeginBottomOffset={200}
                       onInfiniteLoad={this.handleInfiniteLoad}
                       loadingSpinnerDelegate={this.elementInfiniteLoad()}
                       isInfiniteLoading={this.state.isInfiniteLoading}
                       >
          {this.state.elements}
      </Infinite>;
    }
});

React.render(
  <App />,
  document.getElementById('app')
);