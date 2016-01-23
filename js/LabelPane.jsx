"use strict";

var React = require("react");

var Label = require("./Label.jsx");

var LabelPane = React.createClass({

    propTypes: {
        labels: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        addHiddenLabel: React.PropTypes.func.isRequired
    },

    _genLabelElems: function() {
        var hlFunc = this ? this.props.addHiddenLabel : function() {};
        return this.props.labels.map(function(label, i) {
            return <Label ref={label} key={i} label={label}
                          addHiddenLabel={hlFunc} />;
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
