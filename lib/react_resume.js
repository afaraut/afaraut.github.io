"use strict";

var language = "fr";

var data = { "fr": fr, "en": en, "de": de };

var About = React.createClass({
  displayName: "About",
  propTypes: {
    aboutData: React.PropTypes.object
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.aboutData.summary.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement(
      "section",
      { className: "about" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-user" }),
        this.props.aboutData.title
      ),
      React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawMarkup() })
    );
  }
});

var Education = React.createClass({

  displayName: "Education",

  propTypes: {
    educationData: React.PropTypes.object
  },

  render: function render() {
    var getEducation = this.props.educationData.items.map(function (item) {

      var startDate = item.startDate;
      if (item.endDate != "") {
        startDate += " - ";
      }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-sm-2" },
            React.createElement(
              "a",
              { href: item.link, target: "_blank" },
              React.createElement("img", { className: "width-picture-items", src: "images/schools/" + item.picture })
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-10" },
            React.createElement(
              "strong",
              null,
              item.studyType
            ),
            " - ",
            item.area,
            " - ",
            React.createElement(
              "strong",
              null,
              React.createElement(
                "a",
                { href: item.link, target: "_blank" },
                item.institution
              )
            ),
            " / ",
            item.place,
            React.createElement(
              "div",
              { className: "dates" },
              React.createElement(
                "strong",
                null,
                startDate,
                item.endDate
              )
            )
          )
        ),
        React.createElement("div", { className: "divider-items" })
      );
    });
    return React.createElement(
      "section",
      { className: "education" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-mortar-board" }),
        this.props.educationData.title
      ),
      getEducation
    );
  }

});

var Profile = React.createClass({

  displayName: "Profile",

  propTypes: {
    profileData: React.PropTypes.object
  },

  rawInformation: function rawInformation() {
    var rawInformation = marked(this.props.profileData.information.toString(), { sanitize: false });
    return { __html: rawInformation };
  },

  getProfileDetails: function getProfileDetails() {

    var profile = this.props.profileData;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "profileImg" },
        React.createElement("img", { className: "img-circle center-block", src: "images/" + profile.picture })
      ),
      React.createElement(
        "h1",
        { className: "text-center" },
        profile.name
      ),
      React.createElement(
        "h2",
        { className: "text-center" },
        profile.label
      ),
      React.createElement("div", { className: "divider" }),
      React.createElement(
        "ul",
        { className: "list-unstyled contact-links text-center" },
        React.createElement(
          "li",
          null,
          React.createElement("i", { className: "fa fa-lg fa-location-arrow" }),
          React.createElement(
            "a",
            { href: "http://www.altivue360.com/sphere.html?fich=beaulieu.xml", target: "_blank" },
            profile.location.city
          ),
          ", ",
          profile.location.region,
          ", ",
          profile.location.countryCode
        ),
        React.createElement(
          "li",
          null,
          React.createElement("i", { className: "fa fa-lg fa-envelope" }),
          React.createElement(
            "a",
            { href: "mailto:" + profile.email },
            profile.email
          )
        )
      ),
      React.createElement("div", { className: "divider" }),
      React.createElement(
        "ul",
        { className: "profileLinks list-inline text-center" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-linkedin-square fa-2x tooltips", href: profile.profiles[0].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[0].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-github fa-2x tooltips", href: profile.profiles[1].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[1].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-stack-overflow fa-2x tooltips", href: profile.profiles[2].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[2].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-skype fa-2x tooltips", href: profile.profiles[3].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[3].network
            )
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "fa fa-file-pdf-o fa-2x tooltips", href: profile.profiles[4].url, target: "_blank" },
            React.createElement(
              "span",
              null,
              profile.profiles[4].network
            )
          )
        )
      ),
      React.createElement("div", { className: "divider" }),
      React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawInformation() })
    );
  },

  render: function render() {
    if (this.props.profileData !== null) {
      return React.createElement(
        "div",
        { className: "profile" },
        this.getProfileDetails()
      );
    } else {
      return React.createElement(
        "p",
        null,
        "Loading"
      );
    }
  }
});

var Skills = React.createClass({

  displayName: "Skills",

  propTypes: {
    skillsData: React.PropTypes.object
  },

  render: function render() {

    var getItems = function getItems(skill) {
      var keywordsLength = skill.keywords.length - 1;
      return skill.keywords.map(function (item, index) {
        if (index != keywordsLength) {
          return React.createElement(
            "span",
            null,
            item,
            ", "
          );
        } else {
          return React.createElement(
            "span",
            null,
            item
          );
        }
      });
    };
    var getSkills = this.props.skillsData.items.map(function (skill) {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "strong",
            null,
            skill.name
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          getItems(skill)
        )
      );
    });
    return React.createElement(
      "section",
      { className: "skills" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-code" }),
        this.props.skillsData.title
      ),
      getSkills
    );
  }
});

var Work = React.createClass({

  displayName: "Work",

  propTypes: {
    workData: React.PropTypes.object
  },

  getWorkExperience: function getWorkExperience() {
    var workItems = [];
    this.props.workData.items.forEach(function (val) {
      workItems.push(React.createElement(WorkItem, { workItemData: val }));
    });
    return workItems;
  },

  render: function render() {
    return React.createElement(
      "section",
      { className: "work" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-cubes" }),
        this.props.workData.title
      ),
      this.getWorkExperience()
    );
  }

});

var WorkItem = React.createClass({

  displayName: "WorkItem",

  propTypes: {
    workItemData: React.PropTypes.object
  },
  rawMarkup: function rawMarkup() {
    var rawMarkup = marked(this.props.workItemData.summary.toString(), { sanitize: true });
    return { __html: rawMarkup };
  },
  getWorkDates: function getWorkDates() {
    return React.createElement(
      "div",
      { className: "dates" },
      this.props.workItemData.startDate,
      " - ",
      this.props.workItemData.endDate
    );
  },

  getWorkPicture: function getWorkPicture() {
    return React.createElement(
      "div",
      null,
      React.createElement("img", { className: "width-picture-workitem", src: "images/" + item.picture })
    );
  },

  render: function render() {
    var getHighlights = this.props.workItemData.highlights.map(function (item) {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "label" },
          item
        )
      );
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "a",
            { href: this.props.workItemData.website, target: "_blank" },
            React.createElement("img", { className: "width-picture-items", src: "images/companies/" + this.props.workItemData.picture })
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          React.createElement(
            "strong",
            null,
            this.props.workItemData.position,
            ", ",
            React.createElement(
              "a",
              { href: this.props.workItemData.website, target: "_blank" },
              this.props.workItemData.company
            ),
            " / ",
            this.props.workItemData.place,
            this.getWorkDates()
          ),
          React.createElement("div", { className: "justify-align", dangerouslySetInnerHTML: this.rawMarkup() }),
          React.createElement(
            "ul",
            { className: "skills-list list-inline" },
            getHighlights
          )
        )
      ),
      React.createElement("div", { className: "divider-items" })
    );
  }
});

var Languages = React.createClass({
  displayName: "Languages",
  propTypes: {
    languagesData: React.PropTypes.object
  },
  render: function render() {
    var getLanguages = this.props.languagesData.items.map(function (item) {
      return React.createElement(
        "div",
        { className: "col-md-3" },
        React.createElement("img", { className: "width-full", src: "images/" + item.link }),
        React.createElement(
          "h3",
          { className: "text-center language-title-text" },
          item.language
        ),
        React.createElement(
          "p",
          { className: "text-center language-text" },
          item.fluency
        )
      );
    });
    return React.createElement(
      "section",
      { className: "languages" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-globe" }),
        this.props.languagesData.title
      ),
      React.createElement(
        "div",
        { className: "row" },
        getLanguages
      )
    );
  }
});

var Interests = React.createClass({

  displayName: "Interests",

  propTypes: {
    interestsData: React.PropTypes.object
  },

  render: function render() {

    var getItems = function getItems(interest) {
      var keywordsLength = interest.keywords.length - 1;
      return interest.keywords.map(function (item, index) {
        if (index != keywordsLength) {
          return React.createElement(
            "span",
            null,
            item,
            ", "
          );
        } else {
          return React.createElement(
            "span",
            null,
            item
          );
        }
      });
    };

    var getInterests = this.props.interestsData.items.map(function (interest) {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "strong",
            null,
            interest.name
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-10" },
          getItems(interest)
        )
      );
    });
    return React.createElement(
      "section",
      { className: "skills" },
      React.createElement(
        "h2",
        { className: "text-uppercase" },
        React.createElement("i", { className: "fa fa-lg fa-heartbeat" }),
        this.props.interestsData.title
      ),
      getInterests
    );
  }
});

var Langue = React.createClass({
  displayName: "Langue",

  render: function render() {
    return React.createElement(
      "div",
      { className: "text-center" },
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this.props.handleClick_fr },
        React.createElement("img", { src: "images/DrapeauFrancais.jpg", className: "drap", alt: "fr_FR" })
      ),
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this.props.handleClick_en },
        React.createElement("img", { src: "images/DrapeauAnglais.jpg", className: "drap", alt: "en_US" })
      ),
      React.createElement(
        "a",
        { href: "javascript:void(0)", onClick: this.props.handleClick_de },
        React.createElement("img", { src: "images/DrapeauAllemand.jpg", className: "drap", alt: "de_DE" })
      )
    );
  }
});

var Resume = React.createClass({

  displayName: "Resume",

  getInitialState: function getInitialState() {
    return { jsonObj: data[language], data: data, language: language };
  },
  handleClick_de: function handleClick_de(param) {
    this.setState({ language: "de" });
  },
  handleClick_en: function handleClick_en(param) {
    this.setState({ language: "en" });
  },
  handleClick_fr: function handleClick_fr(param) {
    this.setState({ language: "fr" });
  },

  render: function render() {

    this.state.jsonObj = this.state.data[this.state.language];

    if (this.state.jsonObj) {
      //console.log(this.state.jsonObj.basics);
      var profile = this.state.jsonObj.basics;
      var about = { "title": profile.title, "summary": profile.summary };
      var work = this.state.jsonObj.work;
      var education = this.state.jsonObj.education;
      var skills = this.state.jsonObj.skills;
      var languages = this.state.jsonObj.languages;
      var interests = this.state.jsonObj.interests;
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "aside",
            { className: "col-md-3" },
            React.createElement(
              "div",
              { className: "inner" },
              React.createElement(Profile, { profileData: profile }),
              React.createElement(Langue, { handleClick_en: this.handleClick_en, handleClick_de: this.handleClick_de, handleClick_fr: this.handleClick_fr })
            )
          ),
          React.createElement(
            "main",
            { className: "col-md-9" },
            React.createElement(
              "div",
              { className: "inner" },
              React.createElement(About, { aboutData: about }),
              React.createElement(Work, { workData: work }),
              React.createElement(Skills, { skillsData: skills }),
              React.createElement(Education, { educationData: education }),
              React.createElement(Languages, { languagesData: languages }),
              React.createElement(Interests, { interestsData: interests })
            )
          )
        )
      );
    } else {
      return React.createElement(
        "p",
        null,
        "Loading"
      );
    }
  }
});
ReactDOM.render(React.createElement(Resume, { data: data, language: language }), document.getElementById('reactjson'));