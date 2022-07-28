
function getSvgWithMargins(id, width, height, marginLeft, marginTop = marginLeft/5) {
    return d3.select(id)
            .attr("width", width + 2*marginLeft)
            .attr("height", height + 2*marginTop)
        .append("g")
            .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
}

function addLeftAxis(svg, location, text) {
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", location.x)
        .attr("y", location.y )
        .attr("transform", "rotate(-90," + location.x + "," + location.y + ")")
        .text(text);
}

function addRightAxis(svg, location, text) {
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", location.x)
        .attr("y", location.y )
        .attr("transform", "rotate(90," + location.x + "," + location.y + ")")
        .text(text);
}

function addHorizontalAxis(svg, location, text, customClass="ax") {
    svg.append("text")
        .attr("text-anchor", "start")
        .attr("class", customClass)
        .attr("x", location.x)
        .attr("y", location.y)
        .text(text);
}

function formatXAxis(svg, height, x, ticks) {
    svg.append("g")
        .attr("transform", "translate(0," + (height*0.82) + ")")
        .call(d3.axisBottom(x)
            .tickSize(-height*0.82)
            .tickValues(ticks)
            .tickFormat(d3.format(".4")))
        .select(".domain").remove();
    svg.selectAll(".tick line").attr("stroke", "#bbbbbb");
}

function formatYAxis(svg, width, y, max = y.domain()[1]) {
    let values = []
    for (let i = 0; i <= max; i += max/10) {
        values.push(i);
    }
    let a = svg.append("g")
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickValues(values)
            .tickFormat((d) => "" + (d)/1000 + "k"))
        .select(".domain").remove();
    svg.selectAll(".tick line").attr("stroke", "#bbbbbb");
}

function formatYAxisPercent(svg, width, y, numTicks=10) {
    let percents = []
    let min = y.domain()[0],
        max = y.domain()[1];
    for (let i = min; i <= max; i += (max-min)/numTicks) {
        percents.push(i);
    }
    let a = svg.append("g")
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickValues(percents)
            .tickFormat((d) => "" + Math.round(1000*(d-min))/10 + "%"))
        .select(".domain").remove();
    svg.selectAll(".tick line").attr("stroke", "#bbbbbb");
}

function getArea(xScale, yScale, height) {
    return d3.area()
        .x(function(d) { return xScale(d.Year); })
        .y0(height * 0.8)
        .y1(function(d) { return yScale(d.Value); });
}

function plotArea(svg, data, area, color, customClass="singleArea") {
    svg.append("path")
        .datum(data)
        .attr("class", customClass)
        .attr("d", area)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("fill", color);
}