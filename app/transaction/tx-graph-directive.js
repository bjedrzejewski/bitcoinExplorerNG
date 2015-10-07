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

                //drawing of the chart
                var width = 640,
                    height = 480;

                var svg = d3.select(element[0]).append("svg")
                    .attr('width', width)
                    .attr('height', height);

                var nodes = [
                    { x:   width/3, y: height/2 },
                    { x: 2*width/3, y: height/2 }
                ];

                var links = [
                    { source: 0, target: 1 }
                ];

                var force = d3.layout.force()
                    .size([width, height])
                    .nodes(nodes)
                    .links(links);

                force.linkDistance(width/2);

                var link = svg.selectAll('.link')
                    .data(links)
                    .enter().append('line')
                    .attr('class', 'link');

                var node = svg.selectAll('.node')
                    .data(nodes)
                    .enter().append('circle')
                    .attr('class', 'node');

                force.on('tick', function() {
                    node.attr('r', width/25)
                        .attr('cx', function(d) { return d.x; })
                        .attr('cy', function(d) { return d.y; });
                    link.attr('x1', function(d) { return d.source.x; })
                        .attr('y1', function(d) { return d.source.y; })
                        .attr('x2', function(d) { return d.target.x; })
                        .attr('y2', function(d) { return d.target.y; });

                });

                force.start();

                scope.$watch('links', function(){
                    if(scope.links && scope.links.length > 0){
                        //what happens when data changes
                    }
                }, true);
            }
        };
    }])
;
