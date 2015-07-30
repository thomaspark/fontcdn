var React = require('react');
var WebFont = require('webfontloader');
var $ = require('jquery');
var _ = require('underscore');
var Settings = require('./Settings/Settings.js');
var Fonts = require('./Fonts/Fonts.js');
var Modal = require('./Modal/Modal.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      search: '',
      font: {family: '', variants: [], subsets: []},
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
        this.setState({groupSize: 3600});
      } else {
        this.setState({groupSize: 900});
      }
    }
  },
  closeModal: function() {
    $('.modal').removeClass('show');
  },
  modal: function(font) {
    var that = this;
    var fonts = [];
    fonts.push(font.family + ':' + font.variants.join(','));

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
    return (
      <div id="app">
        <Settings onChange={this.getSettings} />
        <Fonts sort={this.state.sort} category={this.state.category} display={this.state.display} search={this.state.search} text={this.state.text} suggestions={this.state.suggestions} groupSize={this.state.groupSize} setModal={this.modal} />
        <Modal font={this.state.font} onClose={this.closeModal} />
      </div>
    );
  }
});