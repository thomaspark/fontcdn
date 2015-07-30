// jshint ignore: start

var App = React.createClass({
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
        this.setState({groupSize: 3600})
      } else {
        this.setState({groupSize: 900})
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
  render: function() {
    return (
      <div>
        <Settings onChange={this.getSettings} />
        <Modal font={this.state.font} onClose={this.closeModal} />
        <InfiniteList sort={this.state.sort} category={this.state.category} display={this.state.display} search={this.state.search} text={this.state.text} suggestions={this.state.suggestions} groupSize={this.state.groupSize} setModal={this.modal} />
      </div>
    );
  }
});

var FontGroup = React.createClass({
  modal: function(value) {
    this.props.setModal(value);
  },
  render: function() {
    var text = $('.text input').val();
    var num = this.props.num;
    var start = this.props.start;
    var end = this.props.end;
    var fonts = this.props.data.slice(start, end);
    var children = [];

    while (fonts.length > 0) {
      var font = fonts.shift();
      children.push(<Font font={font} text={text} setModal={this.modal} />);
    }

    return (
      <div className="fontgroup">
        {children}
      </div>
    );
  }
});

var Font = React.createClass({
  modal: function() {
    this.props.setModal(this.props.font);
  },
  render: function() {
    var text = this.props.text;

    return (
      <div className="font">
        <div className="content" onClick={this.modal} >
          <FontPreview font={this.props.font} text={text} />
          <FontMeta font={this.props.font} num={this.props.num} />
        </div>
      </div>
    );
  }
});

var FontPreview = React.createClass({
  render: function() {
    var text = this.props.text;
    var fontFamily = this.props.font.family;
    var style = {
      fontFamily: "'" + fontFamily + "'"
    };

    if (text == "Font Name") {
      text = fontFamily;
    }

    return (
      <div className="preview" style={style}>
        <div><span>{text}</span></div>
      </div>
    );
  }
});

var FontMeta = React.createClass({
  render: function() {
    var variants = this.props.font.variants.length;
    var text = this.props.font.family + ' - ' + variants;

    if (variants == 1) {
      text = text + ' Style';
    } else {
      text = text + ' Styles';
    }

    return (
      <div className="meta">
        <span className="family">
           {text}
        </span>
      </div>
    );
  }
});

var Modal = React.createClass({
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
  render: function() {

    if (this.props.show == false) {
      return false;
    }

    var that = this;
    var font = this.props.font;
    var family = font.family.replace(/ /g, '+');
    var url = 'https://fonts.googleapis.com/css?family=' + family;
    var category = font.category;
    var value =  '\'' + font.family + '\', ' + category;

    if (category == 'display' || category == 'handwriting') {
      category = 'cursive';
    }

    if (this.state.variants.length > 0) {
      url = url + ':' + this.state.variants;
    }

    if (this.state.subsets.length > 0) {
      url = url + '&subset=' + this.state.subsets;
    }

    var html = '<link href=\'' + url + '\' rel=\'stylesheet\' type=\'text/css\'>';
    var css = '@import url(' + url + ');';
    var rule = 'font-family: ' + value + ';';
    var title = {fontFamily: value};

    var variants = font.variants.map(function(variant, i) {
      var slug = variant;
      var style = '';
      var fontStyle = 'normal';
      var fontWeight = '400';
      var css;
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
          <h1 style={title}>{font.family}</h1>
          <div>
            <p><input type="text" onClick={this.select} value={html} /></p>
            <p><input type="text" onClick={this.select} value={css} /></p>
            <p><input type="text" onClick={this.select} value={rule} /></p>
          </div>
          <div className="variants">
            <h2>Styles</h2>
            {variants.map(function(variant, i) {
              return  <div>
                        <input type="checkbox" key={i} id={variant.slug} value={variant.slug} onClick={that.setVariants} />
                        <label htmlFor={variant.slug} style={variant.css} >{variant.label} {variant.weight} {variant.style}</label>
                      </div>;
            })}
          </div>
          <div className="subsets">
            <h2>Subsets</h2>
            {font.subsets.sort().map(function(subset, i) {
              return  <div>
                        <input type="checkbox" key={i} id={subset} value={subset} onClick={that.setSubsets} />
                        <label htmlFor={subset}>{subset}</label>
                      </div>
            })}
          </div>
        </div>
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

        elements.push(<FontGroup key={start} start={start} end={end} data={data} text={this.props.text} display={this.props.display} setModal={this.modal} />)
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