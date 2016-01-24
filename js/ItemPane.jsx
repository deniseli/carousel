"use strict";

var React = require("react");

var ItemPane = React.createClass({

    propTypes: {
        item: React.PropTypes.object.isRequired,
        hiddenLabels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState: function() {
        return {
            highlighted: false
        };
    },

    _onMouseOver: function() {
        this.setState({
            highlighted: true
        });
    },

    _onMouseOut: function() {
        this.setState({
            highlighted: false
        });
    },

    /** @return {string} string, wUnits, or number */
    getValueType: function(label) {
        var value = this.props.item[label];
        var type = typeof value;

        // Check split for units
        if (type === "string") {
            var split = value.split(" ");
            if (split.length === 2 &&
                !isNaN(parseFloat(split[0])) &&
                isNaN(parseFloat(split[1]))) {
                    return "wUnits";
            }
        }
        
        return type;
    },

    _genValueElems: function() {
        var item = this.props.item;
        var elems = [];
        for (var label in item) {
            if (this.props.hiddenLabels.indexOf(label) !== -1) continue;
            var className = "itemValue row " + this.getValueType(label);
            elems.push(
                <div key={label} className={className}>
                    {item[label]}
                </div>
            );
        }
        return elems;
    },

    _getClassName: function() {
        return "itemPane block" + (this.state.highlighted ? " highlightedItem" : "");
    },

    render: function() {
        return (
            <div className={this._getClassName()}
                 onMouseOver={this._onMouseOver}
                 onMouseOut={this._onMouseOut}>
                {this._genValueElems()}
            </div>
        );
    }

});

module.exports = ItemPane;
