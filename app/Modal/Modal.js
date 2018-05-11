// jshint ignore: start

var React = require('react');
var $ = require('jquery');
var ClipboardButton = require('react-clipboard.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      variants: '',
      subsets: ''
    }
  },
  componentDidMount: function() {
    var that = this;
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        that.fade();
      }
    });

    $('.modal input[type=text]').click(function() {
       $(this).select();
    });
  },
  fade: function(e) {
    if ((!e) || (e && $(e.target).hasClass('modal'))) {
      $(React.findDOMNode(this)).removeClass('show');
      this.setState({variants: '', subsets: ''});
    }
  },
  setVariants: function(e) {
    var variants = [];
    $('.variants input:checked').each(function() {
      variants.push($(this).val());
    });

    this.setState({'variants': variants.join(',')});
  },
  setSubsets: function(e) {
    var subsets = [];
    $('.subsets input:checked').each(function() {
      subsets.push($(this).val());
    });

    this.setState({'subsets': subsets.join(',')});
  },
  setStar: function(e) {
    var target = $(e.target);
    var stars = this.props.stars;
    var family = this.props.font.family;

    var index = stars.indexOf(family);

    if (index < 0) {
      stars.push(family);
      target.addClass('fa-star').removeClass('fa-star-o');
    } else {
      stars.splice(index, 1);
      target.addClass('fa-star-o').removeClass('fa-star');
    }

    this.props.onChange(stars);
  },

  render: function() {
    var that = this;
    var font = this.props.font;
    var family = font.family.replace(/ /g, '+');
    var url = 'https://fonts.googleapis.com/css?family=' + family;
    var category = font.category;
    var stars = this.props.stars;
    var starred = stars.includes(font.family) ? 'fa star fa-star' : 'fa star fa-star-o';

    if (category == 'display' || category == 'handwriting') {
      category = 'cursive';
    }

    if (this.state.variants.length > 0) {
      url = url + ':' + this.state.variants;
    }

    if (this.state.subsets.length > 0) {
      url = url + '&subset=' + this.state.subsets;
    }

    var value =  '\'' + font.family + '\', ' + category;
    var html = '<link href=\'' + url + '\' rel=\'stylesheet\' type=\'text/css\'>';
    var css = '@import url(' + url + ');';
    var rule = 'font-family: ' + value + ';';
    var google = 'https://fonts.google.com/specimen/' + family;
    var title = {fontFamily: value};

    var variants = font.variants.map(function(variant, i) {
      var slug = variant;
      var style = '';
      var fontStyle = 'normal';
      var fontWeight = '400';
      var labels = {
        100: 'Thin',
        200: 'Extra-Light',
        300: 'Light',
        400: 'Normal',
        500: 'Medium',
        600: 'Semi-Bold',
        700: 'Bold',
        800: 'Extra-Bold',
        900: 'Ultra-Bold'
      };

      if (slug == 'regular') {
        slug = '400';
      } else if (slug == 'italic') {
        slug = '400italic';
        style = 'Italic';
        fontStyle = 'italic';
      } else if (slug.length == 3) {
        fontWeight = slug;
      } else {
        style = 'Italic';
        fontStyle = 'italic';
        fontWeight = slug.substring(0, 3);
      }

      return {
        label: labels[fontWeight],
        slug: slug,
        style: style,
        weight: fontWeight,
        css: {
          fontFamily: value,
          fontStyle: fontStyle,
          fontWeight: fontWeight
        }
      };
    });

    return (
      <div className="modal" onClick={this.fade} >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <div className="modal-inner">
          <h1 style={title}><a target="_blank" href={google}>{font.family}</a><span onClick={this.setStar} className={starred}></span></h1>
          <div>
            <p>
              <ClipboardButton data-clipboard-text={html}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={html} />
            </p>
            <p>
              <ClipboardButton data-clipboard-text={css}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={css} />
            </p>
            <p>
              <ClipboardButton data-clipboard-text={rule}>
                <span className="copy" title="Copy to Clipboard"><i className="fa fa-clipboard"></i></span>
              </ClipboardButton>
              <input type="text" readOnly onClick={this.select} value={rule} />
            </p>
          </div>
          <div className="variants">
            <h2>Styles</h2>
            {variants.map(function(variant, i) {
              return  <div key={variant.slug}>
                        <input type="checkbox" id={variant.slug} value={variant.slug} onClick={that.setVariants} />
                        <label htmlFor={variant.slug} style={variant.css} >{variant.label} {variant.weight} {variant.style}</label>
                      </div>;
            })}
          </div>
          <div className="subsets">
            <h2>Subsets</h2>
            {font.subsets.sort().map(function(subset, i) {
              return  <div key={subset}>
                        <input type="checkbox" id={subset} value={subset} onClick={that.setSubsets} />
                        <label htmlFor={subset}>{subset}</label>
                      </div>
            })}
          </div>
        </div>
      </div>
    );
  }
});