/**
 * Created by bjedrzejewski on 07/10/2015.
 */
angular.module('txDirectives', []).directive('txGraph', [
    function () {
        return {
            restrict: 'E',
            scope: {
                nodes: '=',
                links: '='
            },
            link: function (scope, element) {

                var svg;

                function draw(inNodes, inLinks) {
                    if (inLinks.length == 0)
                        return;

                    //clear it first
                    d3.select(element[0]).html("");

                    //drawing of the chart
                    var width = 640,
                        height = 480;

                    var nodes = inNodes,
                        links = inLinks;

                    svg = d3.select(element[0]).append("svg")
                        .attr('width', width)
                        .attr('height', height);

                    var force = d3.layout.force()
                        .size([width, height]);

                    force.linkDistance(20).charge(-50).chargeDistance(100).linkStrength(0.5);

                    force.on('tick', function () {

                        var node = svg.selectAll('.node');
                        var link = svg.selectAll('.link');

                        node.attr('r', width / 150)
                        node.attr('r', width / 150)
                            .attr('cx', function (d) {
                                return d.x;
                            })
                            .attr('cy', function (d) {
                                return d.y;
                            });

                        link.attr('x1', function (d) {
                            return d.source.x;
                        })
                            .attr('y1', function (d) {
                                return d.source.y;
                            })
                            .attr('x2', function (d) {
                                return d.target.x;
                            })
                            .attr('y2', function (d) {
                                return d.target.y;
                            });

                    });

                    scope.addNodes = function (inNodes, inLinks) {

                        svg.selectAll('.link')
                            .data(inLinks)
                            .enter().append('line')
                            .attr('class', 'link');

                        svg.selectAll('.node')
                            .data(inNodes)
                            .enter().append('circle')
                            .attr('class', 'node');

                        svg.selectAll('.node').each(function(d){
                            if (d.initNode) {
                                d3.select(this).classed('initNode', true)
                            }
                            else if (d.expanded) {
                                d3.select(this).classed('expanded', true)
                            }
                            else if (d.ended) {
                                d3.select(this).classed('ended', true)
                            }
                        });

                        force
                            .nodes(inNodes)
                            .links(inLinks);

                        force.start();
                    }

                    scope.addNodes(nodes, links);
                };


                scope.$watch('links', function () {
                    if (svg) {
                        scope.addNodes(scope.nodes, scope.links);
                    }
                    else {
                        draw(scope.nodes, scope.links);
                    }
                }, true);
            }
        };
    }])
;
