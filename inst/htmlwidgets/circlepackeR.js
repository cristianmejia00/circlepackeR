HTMLWidgets.widget({

  name: 'circlepackeR',

  type: 'output',

  initialize: function(el, width, height) {

    return {

    }

  },

  renderValue: function(el, x, instance) {

    // remove previous in case of dynamic/Shiny
    d3.select(el).selectAll('*').remove();

    // much of this code is based on this example by Mike Bostock
    //   https://gist.github.com/mbostock/7607535

    var margin = 20,
    // use getBoundingClientRect since width and height
    //  might not be in pixels
    diameter = Math.min(el.getBoundingClientRect().width,
                        el.getBoundingClientRect().height);

    var color = d3.scale.linear()
        .domain([-1, 5])
        .range(["#FAFAFA", "#707070"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.layout.pack()
        .padding(2)
        .size([diameter - margin, diameter - margin])
        .value(function(d) { return d[x.options.size]; })

    var svg = d3.select(el).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
    var select = document.querySelector('#selectFileInputFile');

    function createViz(root) {
      var focus = root,
          nodes = pack.nodes(root), //pack(root).descendants(), //
          view;

      console.log("testing");
      console.log(nodes);
      console.log("end");
      var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        //.attr("r", function(d) { return d.data.r; })
        .style("fill", function(d) { return d.children ? color(d.depth) : d.fill; })
        .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
        .on("mouseover", function(d){return tooltip
          .attr("dy", "0em")
          .text(d.title)
          .style("visibility", "visible")
          .style("font-weight", "bold")
          .append("div")
          .attr("dy", "1em")
          .style("font-style", "italic")
          .style("font-size", "0.7em")
          .style("padding-left", "15px")
          .text(d.biblio)
          .style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});



      var text = svg.selectAll("text")
          .data(nodes)
        .enter().append("text")
          .attr("class", "label")
          .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
          .style("display", function(d) { return d.parent === root ? null : "none"; })
          .text(function(d) { return d.name; });

      var node = svg.selectAll("circle,text");

      d3.select(el)
          .on("click", function() { zoom(root); });

      zoomTo([root.x, root.y, root.r * 2 + margin]);

      function zoom(d) {
        var focus0 = focus; focus = d;

        var transition = d3.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function(d) {
              var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
              return function(t) { zoomTo(i(t)); };
            });

        transition.selectAll("text")
          .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
            .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
      }

      function zoomTo(v) {
        var k = diameter / v[2]; view = v;
        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        circle.attr("r", function(d) { return d.r * k; });
      }
    }

    createViz(x.data)

    d3.select(self.frameElement).style("height", diameter + "px");

  },

  resize: function(el, width, height, instance) {

  }

});
