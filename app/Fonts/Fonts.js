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
      groupSize: Math.max(24, Math.ceil(window.innerHeight / 150) * 4),
      matchCount: 1,
      suggestions: {
        paragraphs: ['Alegreya', 'Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans Pro', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans'],
        headings: ['Abel', 'Arvo', 'Bitter', 'Bree Serif', 'Cabin', 'Droid Sans', 'Droid Serif', 'Gudea', 'Istok Web', 'Lato', 'Lobster', 'Merriweather', 'Montserrat', 'Muli', 'Nunito', 'Open Sans', 'Oswald', 'Pacifico', 'Playfair Display', 'PT Sans', 'PT Serif', 'Quicksand', 'Raleway', 'Roboto', 'Roboto Slab', 'Rokkitt', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans']
      }
    }
  },
  componentDidMount: function() {
    this.loadFontData();
  },
  loadFontData: function() {
    var url = 'https://www.googleapis.com/webfonts/v1/webfonts?';
    var key = 'key=AIzaSyDrwscy04xGYMeRyeWOnxXilRnyCafwqHA';
    var sort = this.props.settings.sort;
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
    } else {
      return true;
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    var sort = this.props.settings.sort;
    var category = this.props.settings.category;
    var search = this.props.settings.search;

    if ((sort !== prevProps.settings.sort) || (category !== prevProps.settings.category) || (search !== prevProps.settings.search)) {
      this.setState({elements: []});
      this.loadFontData();
    }
  },
  checkCategory: function(font) {
    var category = this.props.settings.category;
    var filterType = this.props.settings.filterType;

    if (category == 'all') {
      return true;
    }

    if (category === 'stars') {
      var stars = this.props.stars;
      return ($.inArray(font.family, stars) > -1);
    } else if (filterType === 'category') {
      return (font.category == category);
    } else if (filterType === 'suggestion') {
      var suggestions = this.state.suggestions[category];
      return ($.inArray(font.family, suggestions) > -1);
    } else if (filterType === 'subset') {
      return ($.inArray(category, font.subsets) > -1);
    }
  },
  setModal: function(value) {
    this.props.setModal(value);
  },
  setStars: function(value) {
    this.props.onChange(value);
  },
  buildElements: function(start, end) {
    var elements = [];

    if (end == 0) {
      return elements;
    }

    var fonts = [];
    var sort = this.props.settings.sort;
    var category = this.props.settings.category;
    var filterType = this.props.settings.filterType;
    var text = this.props.settings.text;
    var search = $.trim(this.props.settings.search.toLowerCase())
    var data = this.state.data[sort];
    var stars = this.props.stars;
    var that = this;

    if ((category !== "all") || search.length > 0) {
      data = data.filter(function(elem, i, arr) {
        var isCategory = true,
            isMatch = true;

        isCategory = that.checkCategory(elem);

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
      var hasRegular = ($.inArray('regular', font.variants) !== -1);
      var hasLatin = ($.inArray('latin', font.variants) !== -1);
      var subsets = '';

      if (filterType === 'subset' && category !== 'latin') {
        if ($.inArray('latin', font.subsets) !== -1) {
          subsets = ':latin,' + category;
        } else {
          subsets = ':' + category;
        }
      }

      if (hasRegular) {
        fonts.push(font.family + subsets);
      } else {
        fonts.push(font.family + ':' + font.variants[0] + subsets);
      }
    }

    this.setState({matchCount: fonts.length});

    if (fonts.length > 0) {
      WebFont.load({
        classes: false,
        google: {
          families: fonts
        }
      });

      elements.push(<Batch setModal={this.setModal} key={start} start={start} end={end} data={data} text={text} stars={stars} onChange={this.setStars} />)
    }

    return elements;
  },
  handleInfiniteLoad: function() {
    var that = this;
    this.setState({
      isInfiniteLoading: true
    });
    setTimeout(function() {
      var groupSize = that.state.groupSize;
      var elemLength = that.state.elements.length * groupSize;
      var newElements = that.buildElements(elemLength, elemLength + groupSize);

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
    return (
      <Infinite className="fonts"
        elementHeight={this.props.settings.groupSize}
        containerHeight={window.innerHeight}
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
