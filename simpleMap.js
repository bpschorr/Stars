var width = 700,
    height = 500;

var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var districts = svg.append('g').attr('id', 'districts');

var albersProjection = d3.geoAlbers()
  .scale(190000)
  .rotate([71.057, 0])
  .center([0, 42.313])
  .translate([width/2, height/2]);

var geoPath = d3.geoPath()
    .projection(albersProjection);

districts.selectAll('path')
  .data(districts_json.features)
  .enter()
  .append('path')
  .attr('d', geoPath);

var stars = svg.append('g').attr('id', 'stars');

stars.selectAll('image')
    .data(stars_json.features)
    .enter()
    .append('svg:image')
    .attr('xlink:href', 'star.png')
    .attr('x', function(d) {
        return albersProjection(d.geometry.coordinates)[0] - 30;
    })
    .attr( "y", function(d){
        return albersProjection(d.geometry.coordinates )[1] - 25;
    })
    .attr("width",20)
    .attr("height",15)
    .on('click', function() {
        d3.select(this)
        .attr('opacity', 1)
        .transition()
        .duration(1000)
        .attr('x', width * Math.round(Math.random()))
        .attr('y', height * Math.round(Math.random()))
        .attr('opacity', 0)
        .on('end', function() {
            d3.select(this).remove();
        })
    });