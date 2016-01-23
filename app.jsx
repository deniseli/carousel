"use strict";

var $ = require("jquery");

var React = require("react");
var ReactDOM = require("react-dom");

var Carousel = require("./js/Carousel.jsx");

/** main */
var sampItems = require("./data/SampleItems.js");
ReactDOM.render(
    <Carousel items={sampItems}/>,
    document.getElementById("content")
);
