"use strict";

var React = require("react");

var Label = require("./Label.jsx");

var LabelPane = React.createClass({

    propTypes: {
        labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        addHiddenLabel: React.PropTypes.func.isRequired,
        sortAsc: React.PropTypes.func.isRequired,
        sortDesc: React.PropTypes.func.isRequired
    },

    _genLabelElems: function() {
        var func = function() {}
        var hlFunc = this ? this.props.addHiddenLabel : func;
        var sortAsc = this ? this.props.sortAsc : func;
        var sortDesc = this ? this.props.sortDesc : func;
        return this.props.labels.map(function(label, i) {
            return <Label ref={label} key={i} label={label}
                          addHiddenLabel={hlFunc}
                          sortAsc={sortAsc.bind(null, label)}
                          sortDesc={sortDesc.bind(null, label)} />;
        });
    },

    render: function() {
        return (
            <div className="labelPane block">
                {this._genLabelElems()}
            </div>
        );
    }

});

module.exports = LabelPane;
