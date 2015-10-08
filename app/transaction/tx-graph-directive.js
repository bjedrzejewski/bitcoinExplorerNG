/**
 * Created by bjedrzejewski on 07/10/2015.
 */
angular.module('txDirectives', []).directive('txGraph', [
    function () {
        return {
            restrict: 'E',
            scope: {
                nodes: '@',
                links: '@'
            },
            link: function (scope, element) {

                function draw(inNodes, inLinks) {
                    if(inLinks.length == 0)
                        return;

                    //clear it first
                    d3.select(element[0]).html("");

                    //drawing of the chart
                    var width = 640,
                        height = 480;

                    var nodes = inNodes,
                        links = inLinks;

                    var svg = d3.select(element[0]).append("svg")
                        .attr('width', width)
                        .attr('height', height);

                    var force = d3.layout.force()
                        .size([width, height])
                        .nodes(nodes)
                        .links(links);

                    force.linkDistance(width / 15).charge(-50);

                    var link = svg.selectAll('.link')
                        .data(links)
                        .enter().append('line')
                        .attr('class', 'link');

                    var node = svg.selectAll('.node')
                        .data(nodes)
                        .enter().append('circle')
                        .attr('class', 'node');

                    force.on('tick', function () {

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

                    force.start();
                };

                scope.$watch('links', function () {
                   // if (scope.links && scope.links.length > 0) {
                        draw(JSON.parse(scope.nodes), JSON.parse(scope.links));
                   // }
                }, true);
            }
        };
    }])
;
