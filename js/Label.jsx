"use strict";

var React = require("react");

var ToggleConsts = require("./ToggleConsts.js");

var Label = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        addHiddenLabel: React.PropTypes.func.isRequired,
        sortAsc: React.PropTypes.func.isRequired,
        sortDesc: React.PropTypes.func.isRequired,
        clearAllSelectedSortToggles: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            highlightedLabel: false,
            highlightedToggle: ToggleConsts.NONE,
            selectedToggle: ToggleConsts.NONE,
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
        this.setState({highlightedToggle: ToggleConsts.ASC});
    },

    _onMouseOverDescToggle: function() {
        this.setState({highlightedToggle: ToggleConsts.DESC});
    },

    _onMouseOutSortToggle: function() {
        this.setState({highlightedToggle: ToggleConsts.NONE});
    },

    _onClickAscToggle: function() {
        this.props.clearAllSelectedSortToggles();
        this.setState({selectedToggle: ToggleConsts.ASC});
        this.props.sortAsc();
    },

    _onClickDescToggle: function() {
        this.props.clearAllSelectedSortToggles();
        this.setState({selectedToggle: ToggleConsts.DESC});
        this.props.sortDesc();
    },

    _getToggleClassNames: function(toggle) {
        return "sortToggle" +
             (this.state.selectedToggle === toggle ||
              this.state.highlightedToggle === toggle ?
              " highlightedToggle" : "");
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
                      className={this._getToggleClassNames(ToggleConsts.DESC)}
                      onMouseOver={this._onMouseOverDescToggle}
                      onMouseOut={this._onMouseOutSortToggle}
                      onClick={this._onClickDescToggle}>
                    <i className="fa fa-caret-up"></i>
                </span>
                <span ref="sortAsc"
                      className={this._getToggleClassNames(ToggleConsts.ASC)}
                      onMouseOver={this._onMouseOverAscToggle}
                      onMouseOut={this._onMouseOutSortToggle}
                      onClick={this._onClickAscToggle}>
                    <i className="fa fa-caret-down"></i>
                </span>
            </div>
        );
    }

});

module.exports = Label;
