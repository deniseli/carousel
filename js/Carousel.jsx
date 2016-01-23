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
            hiddenLabels: []
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

    render: function() {
        return (
            <div className="carousel">
                <LabelPane
                    ref="labelPane"
                    labels={this._getLabels()}
                    addHiddenLabel={this.addHiddenLabel} />
                <ItemsScrollPane
                    items={this.props.items}
                    hiddenLabels={this.state.hiddenLabels} />
            </div>
        );
    }

});

module.exports = Carousel;
