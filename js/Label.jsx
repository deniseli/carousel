"use strict";

var React = require("react");

var NONE = 0;
var ASC = 1;
var DESC = 2;

var Label = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        addHiddenLabel: React.PropTypes.func.isRequired,
        sortAsc: React.PropTypes.func.isRequired,
        sortDesc: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            highlightedLabel: false,
            highlightedToggle: NONE,
            hidden: false
        };
    },

    _onMouseOverLabel: function() {
        this.setState({highlightedLabel: true});
    },

    _onMouseOutLabel: function() {
        this.setState({highlightedLabel: false});
    },

    _hide: function() {
        this.setState({hidden: true});
        this.props.addHiddenLabel(this.props.label);
    },

    _onMouseOverAscToggle: function() {
        this.setState({highlightedToggle: ASC});
    },

    _onMouseOverDescToggle: function() {
        this.setState({highlightedToggle: DESC});
    },

    _onMouseOutSortToggle: function() {
        this.setState({highlightedToggle: NONE});
    },

    _getToggleClassNames: function(toggle) {
        return "sortToggle" + (this.state.highlightedToggle === toggle ? " highlightedToggle" : "");
    },

    render: function() {
        return this.state.hidden ? (<div/>) : (
            <div className="label row">
                <span className={this.state.highlightedLabel ? " highlightedLabel" : ""}
                      onMouseOver={this._onMouseOverLabel}
                      onMouseOut={this._onMouseOutLabel}
                      onClick={this._hide}>
                    {this.props.label}
                </span>
                <span ref="sortDesc"
                      className={this._getToggleClassNames(DESC)}
                      onMouseOver={this._onMouseOverDescToggle}
                      onMouseOut={this._onMouseOutSortToggle}
                      onClick={this.props.sortDesc}>
                    <i className="fa fa-caret-up"></i>
                </span>
                <span ref="sortAsc"
                      className={this._getToggleClassNames(ASC)}
                      onMouseOver={this._onMouseOverAscToggle}
                      onMouseOut={this._onMouseOutSortToggle}
                      onClick={this.props.sortAsc}>
                    <i className="fa fa-caret-down"></i>
                </span>
            </div>
        );
    }

});

module.exports = Label;
