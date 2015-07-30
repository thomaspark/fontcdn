// jshint ignore: start

var React = require('react');
var Infinite = require('react-infinite');
var WebFont = require('webfontloader');
var $ = require('jquery');
var Batch = require('./Batch.js');

module.exports = React.createClass({
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
          var font = data.items[i];
          fonts.push(font.family);
        }

        WebFont.load({
          classes: false,
          google: {
            families: fonts,
            text: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
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

  modal: function(value) {
    this.props.setModal(value);
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
      var hasRegular = ($.inArray('regular', font.variants) !== -1)

      if (hasRegular) {
        fonts.push(font.family);
      } else {
        fonts.push(font.family + ':' + font.variants[0]);
      }
    }

    this.setState({matchCount: fonts.length});

    if (fonts.length > 0) {
      WebFont.load({
        classes: false,
        google: {
          families: fonts,
            text: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        }
      });

      elements.push(<Batch key={start} start={start} end={end} data={data} text={this.props.text} display={this.props.display} setModal={this.modal} />)
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

  render: function() {
    var height = window.innerHeight;

    return (
      <Infinite className="fonts"
        elementHeight={900}
        containerHeight={height}
        infiniteLoadBeginBottomOffset={200}
        onInfiniteLoad={this.handleInfiniteLoad}
        loadingSpinnerDelegate={this.elementInfiniteLoad()}
        isInfiniteLoading={this.state.isInfiniteLoading}
        >
        {this.state.elements}
      </Infinite>
    );
  }
});