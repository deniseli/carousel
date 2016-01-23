"use strict";

var React = require("react");

var Label = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        addHiddenLabel: React.PropTypes.func.isRequired,
        sortAsc: React.PropTypes.func.isRequired,
        sortDesc: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            highlighted: false,
            hidden: false
        };
    },

    _onMouseOver: function() {
        this.setState({highlighted: true});
    },

    _onMouseOut: function() {
        this.setState({highlighted: false});
    },

    _onClick: function() {
        this.setState({hidden: true});
        this.props.addHiddenLabel(this.props.label);
    },

    _getClassNames: function() {
        return "label row" + (this.state.highlighted ? " highlightedLabel" : "");
    },

    render: function() {
        return this.state.hidden ? (<div/>) : (
            <div className={this._getClassNames()}>
                <span onMouseOver={this._onMouseOver}
                      onMouseOut={this._onMouseOut}
                      onClick={this._onClick}>
                    {this.props.label}
                </span>
                <span ref="sortDesc" className="sortToggle" onClick={this.props.sortDesc}>
                    <i className="fa fa-caret-up"></i>
                </span>
                <span ref="sortAsc" className="sortToggle" onClick={this.props.sortAsc}>
                    <i className="fa fa-caret-down"></i>
                </span>
            </div>
        );
    }

});

module.exports = Label;
