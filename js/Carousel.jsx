"use strict";

var React = require("react");

var ItemsScrollPane = require("./ItemsScrollPane.jsx");
var LabelPane = require("./LabelPane.jsx");

var Carousel = React.createClass({

    /**
     * items {Array<Object>} Each element in items should have the same set of keys. This allows
     *     us to use the first keyset to generate Labels instead of running over all the objects,
     *     making the operation O(1) instead of O(n).
     */
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getInitialState: function() {
        return {
            hiddenLabels: [],
            items: []
        };
    },

    _getLabels: function() {
        var labels = [];
        if (this.props.items.length > 0) {
            labels = Object.keys(this.props.items[0]);
        }
        return labels;
    },

    addHiddenLabel: function(label) {
        var labels = this.state.hiddenLabels;
        labels.push(label);
        this.setState({
            hiddenLabels: labels
        });
    },

    sortAsc: function(label) {
        this._sort(label, true);
    },

    sortDesc: function(label) {
        this._sort(label, false);
    },

    _sort: function(label, isAsc) {
        var firstItem = this.refs.itemsScrollPane.refs[0];
        if (!firstItem) return;
        var comp = this._getCompFromItem(firstItem, label);
        if (isAsc) {
            var oldComp = comp;
            comp = function(a, b) {
                return -1 * oldComp(a, b);
            };
        }
        this.state.items.sort(comp);
        this.setState({items: this.state.items});
    },

    _getCompFromItem: function(item, label) {
        var valueType = item.getValueType(label);
        var simpleComp = function(a, b) {
            return a[label] - b[label];
        };
        if (valueType === "string") {
            return function(a, b) {
                return a[label].localeCompare(b[label]);
            };
        } else if (valueType === "wUnits") {
            return function(a, b) {
                var ax = a[label].split(" ");
                var bx = b[label].split(" ");
                return parseFloat(ax[0]) - parseFloat(bx[0]);
            }
        } else if (valueType === "number") {
            return simpleComp;
        }
        return simpleComp;
    },

    _getItems: function() {
        return this.state.items ? this.state.items : this.props.items;
    },

    componentWillMount: function() {
        this.setState({
            items: this.props.items
        });
    },

    render: function() {
        return (
            <div className="carousel">
                <LabelPane
                    ref="labelPane"
                    labels={this._getLabels()}
                    addHiddenLabel={this.addHiddenLabel}
                    sortAsc={this.sortAsc}
                    sortDesc={this.sortDesc} />
                <ItemsScrollPane
                    ref="itemsScrollPane"
                    items={this._getItems()}
                    hiddenLabels={this.state.hiddenLabels} />
            </div>
        );
    }

});

module.exports = Carousel;
