"use strict";

var React = require("react");

var ItemPane = require("./ItemPane.jsx");

var ItemsScrollPane = React.createClass({

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        hiddenLabels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    _genItemPanes: function() {
        var hiddenLabels = this ? this.props.hiddenLabels : [];
        return this.props.items.map(function(item, i) {
            return <ItemPane
                       key={i}
                       item={item}
                       hiddenLabels={hiddenLabels} />;
        });
    },

    render: function() {
        return (
            <div className="itemsScrollPane">
                {this._genItemPanes()}
            </div>
        );
    }

});

module.exports = ItemsScrollPane;
