/*global d3:false, topojson:false */

'use strict';

var width = 960,
    height = 500;

var projection = d3.geo.mercator()
    .center([0, 5 ])
    .scale(900)
    .rotate([-180,0]);

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append('g');

// load and display the World
d3.json('data/world-110m2.json', function(error, topology) {
	var topologyFeatures = topojson.feature(topology, topology.objects.countries).features;

	g.selectAll('path')
		.data(topologyFeatures)
		.enter()
		.append('path')
		.attr('d', path);
});

// zoom and pan
var zoom = d3.behavior.zoom()
	.on('zoom',function() {
		g.attr('transform','translate('+
		d3.event.translate.join(',')+')scale('+d3.event.scale+')');
		g.selectAll('path')
			.attr('d', path.projection(projection));
	});

svg.call(zoom);