// jshint ignore: start

var React = require('react');
var WebFont = require('webfontloader');
var $ = require('jquery');
var Settings = require('./Settings/Settings.js');
var Fonts = require('./Fonts/Fonts.js');
var Modal = require('./Modal/Modal.js');

module.exports = React.createClass({
  getInitialState: function() {
    var stars = localStorage.getItem('stars');

    return {
      search: '',
      category: 'all',
      filterType: 'category',
      sort: 'popularity',
      display: 'grid',
      text: 'The quick brown fox jumps over the lazy dog.',
      data: [],
      font: {family: '', variants: [], subsets: []},
      stars: stars ? JSON.parse(stars) : [],
      groupSize: 900
    };
  },
  getSetting: function(setting) {
    this.setState(setting);
  },
  setStars: function(stars) {
    this.setState(stars);
    localStorage.setItem('stars', JSON.stringify(stars));
  },
  setModal: function(font) {
    var that = this;
    var fonts = [];
    fonts.push(font.family + ':' + font.variants.join(',') + ':' + font.subsets.join(','));

    WebFont.load({
      classes: false,
      google: {
        families: fonts,
        text: 'acdedghilmnortuxBEILMNSTU0123456789-'
      },
      active: function() {
        that.setState({font: font});
        $('.modal')
          .addClass('show')
          .find('input[type="checkbox"]').attr('checked', false);
      }
    });
  },
  render: function () {
    var settings = {
          search: this.state.search,
          category: this.state.category,
          filterType: this.state.filterType,
          sort: this.state.sort,
          text: this.state.text,
          groupSize: this.state.groupSize,
          stars: this.state.stars
        };

    return (
      <div id="app">
        <Settings onChange={this.getSetting} />
        <Fonts setModal={this.setModal} settings={settings} stars={this.state.stars} onChange={this.setStars} />
        <Modal font={this.state.font} stars={this.state.stars} onChange={this.setStars} />
      </div>
    );
  }
});
