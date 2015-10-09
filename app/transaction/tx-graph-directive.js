/**
 * Created by bjedrzejewski on 07/10/2015.
 */
angular.module('txDirectives', []).directive('txGraph', [
    function () {
        return {
            restrict: 'E',
            scope: {
                nodes: '=',
                links: '=',
                clickf: '&'
            },
            link: function (scope, element) {

                var svg;

                function draw(inNodes, inLinks) {

                    var zoom = d3.behavior.zoom()
                        .scaleExtent([1, 10])
                        .on("zoom", zoomed);

                    var drag = d3.behavior.drag()
                        .origin(function(d) { return d; })
                        .on("dragstart", dragstarted)
                        .on("drag", dragged)
                        .on("dragend", dragended);



                    //clear it first
                    d3.select(element[0]).html("");

                    //drawing of the chart
                    var width = 800,
                        height = 600;


                    var nodes = inNodes,
                        links = inLinks;

                    svg = d3.select(element[0]).append("svg")
                        .attr('width', width)
                        .attr('height', height)
                        .append("g")
                        ;

                    svg.append("rect")
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .attr("fill", "#DDFFFE");

                    var force = d3.layout.force()
                        .size([width, height]);

                    force.linkDistance(30).charge(-100).chargeDistance(100).linkStrength(0.5);

                    force.on('tick', function () {

                        var node = svg.selectAll('.node');
                        var link = svg.selectAll('.link');

                        node.attr('r', width / 100)
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

                    d3.select(element[0]).attr("transform", "translate(0,0)")
                        .call(zoom);

                    svg.append("g")
                        .attr("class", "x axis")
                        .selectAll("line")
                        .data(d3.range(0, width, 10))
                        .enter().append("line")
                        .attr("x1", function(d) { return d; })
                        .attr("y1", 0)
                        .attr("x2", function(d) { return d; })
                        .attr("y2", height);

                    svg.append("g")
                        .attr("class", "y axis")
                        .selectAll("line")
                        .data(d3.range(0, height, 10))
                        .enter().append("line")
                        .attr("x1", 0)
                        .attr("y1", function(d) { return d; })
                        .attr("x2", width)
                        .attr("y2", function(d) { return d; });

                    function zoomed() {
                        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    }

                    function dragstarted(d) {
                    //    force.stop();
                        force.start();
                        d3.event.sourceEvent.stopPropagation();
                        d3.select(this).classed("dragging", true);
                    }

                    function dragged(d) {
                        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
                    }

                    function dragended(d) {
                      //  force.start();
                        d3.select(this).classed("dragging", false);
                    }

                    scope.addNodes = function (inNodes, inLinks) {

                        svg.selectAll('.link')
                            .data(inLinks)
                            .enter().append('line')
                            .attr('class', 'link');

                        svg.selectAll('.node')
                            .data(inNodes)
                            .enter().append('circle')
                            .attr('class', 'node')
                            .on('click', scope.clickf(this))
                            .call(drag);


                        svg.selectAll('.node').each(function (d) {
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


                scope.$watch('nodes', function () {
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
