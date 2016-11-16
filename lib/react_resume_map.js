'use strict';

var prev_infowindow = false;
var GoogleMap = React.createClass({

  displayName: "GoogleMap",

  getDefaultProps: function getDefaultProps() {
    return {
      markers: [],
      initialZoom: 3,
      mapCenterLat: 43.6425569,
      mapCenterLng: -9.4073126
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;
    var markers = this.props.markers;
    var mapOptions = {
      center: new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng),
      zoom: this.props.initialZoom
    },
        map = new google.maps.Map(ReactDOM.findDOMNode(this), mapOptions);
    points.map(function (point) {
      _this.createMarker(map, point);
    });
    var mcOptions = { gridSize: 40, maxZoom: 15 };
    var markerCluster = new MarkerClusterer(map, markers, mcOptions);
    this.setState({ map: map });
  },
  createMarker: function createMarker(map, point) {
    var _this = this;
    var markers = this.props.markers;
    var marker = new google.maps.Marker({ position: new google.maps.LatLng(point.latitude, point.longitude), title: point.title, map: map /*, animation: google.maps.Animation.BOUNCE, icon: "./test2.svg"*/ });

    google.maps.event.addListener(marker, 'click', function () {
      var div = document.createElement('div');
      ReactDOM.render(_this.renderInfoWindow(point.content), div);
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(div);

      if (prev_infowindow) {
        prev_infowindow.close();
      }

      prev_infowindow = infowindow;
      infowindow.open(map, this);
    });
    markers.push(marker);
  },
  renderInfoWindow: function renderInfoWindow(content) {
    return React.createElement(
      'div',
      { className: 'ee' },
      ' ',
      content,
      ' !'
    );
  },
  render: function render() {
    return React.createElement('div', { id: 'map-canvas' });
  }
});

var Resume = React.createClass({

  displayName: "Resume",

  getInitialState: function getInitialState() {
    return { jsonObj: data[language], data: data, language: language };
  },
  handleClick_de: function handleClick_de(param) {
    this.setState({ language: "de" });
    setCookie("language", "de", 30);
  },
  handleClick_en: function handleClick_en(param) {
    this.setState({ language: "en" });
    setCookie("language", "en", 30);
  },
  handleClick_fr: function handleClick_fr(param) {
    this.setState({ language: "fr" });
    setCookie("language", "fr", 30);
  },

  render: function render() {

    this.state.jsonObj = this.state.data[this.state.language];

    if (this.state.jsonObj) {
      var profile = this.state.jsonObj.basics;
      var project = this.state.jsonObj.project;
      var menu = profile.menu;
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(MenuItem, { menuItemData: menu }),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'aside',
            { className: 'col-md-3' },
            React.createElement(
              'div',
              { className: 'inner' },
              React.createElement(Profile, { profileData: profile, handleClick_en: this.handleClick_en, handleClick_de: this.handleClick_de, handleClick_fr: this.handleClick_fr })
            )
          ),
          React.createElement(
            'main',
            { className: 'col-md-9' },
            React.createElement(
              'div',
              { className: 'inner' },
              React.createElement(
                'h2',
                { id: 'quote-map' },
                '"If we were meant to stay in one place, we\u2019d have roots instead of feet." -',
                React.createElement(
                  'span',
                  { id: 'quote-map-author' },
                  ' Rachel WOLCHIN'
                )
              ),
              React.createElement(GoogleMap, null)
            )
          )
        )
      );
    } else {
      return React.createElement(
        'p',
        null,
        'Loading'
      );
    }
  }
});

ReactDOM.render(React.createElement(Resume, { data: data }), document.getElementById('reactjson'));