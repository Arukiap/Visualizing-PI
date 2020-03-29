import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Chart = ({ pointsData, width, height, margins, ...remainingProps }) => {
  const plotContainerRef = useRef(null);

  const { top = 10, right = 10, bottom = 30, left = 30 } = (margins = {});
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  useEffect(() => {
    if (plotContainerRef.current && pointsData) {
      d3.select("g").remove();

      const svgElement = d3
        .select(plotContainerRef.current)
        .append("g")
        .attr("transform", "translate(" + left + "," + top + ")");

      //Create X axis in range [0,1] and append it to plot container
      const xAxis = d3.scaleLinear().domain([0, 1]).range([0, plotWidth]);
      svgElement
        .append("g")
        .attr("transform", "translate(0," + plotHeight + ")")
        .call(d3.axisBottom(xAxis));

      //Create Y axis in range [0,1] and append it to plot container
      const yAxis = d3.scaleLinear().domain([0, 1]).range([0, plotHeight]);
      svgElement
        .append("g")
        .attr("transform", "translate(" + plotHeight + "),0)")
        .call(d3.axisLeft(yAxis));

      //Create circle path and append it to plot
      svgElement
        .append("circle")
        .style("stroke", "black")
        .style("stroke-width", "1")
        .style("fill", "transparent")
        .attr("cx", plotWidth / 2)
        .attr("cy", plotHeight / 2)
        .attr("r", plotHeight / 2.01);

      //Append points data to plot
      svgElement
        .append("g")
        .selectAll("dot")
        .data(pointsData)
        .enter()
        .append("circle")
        .attr("cx", (point) => xAxis(point.x))
        .attr("cy", (point) => xAxis(point.y))
        .attr("r", 2)
        .style("fill", ({ isInsideCircle }) =>
          isInsideCircle ? "185bf1" : "red"
        )
        .style("opacity", 0);

      //Add opacity transition to points
      svgElement
        .selectAll("circle")
        .transition()
        .duration(250)
        .ease(d3.easeCircleIn)
        .style("opacity", 0.5);
    }
  }, [height, left, plotHeight, plotWidth, pointsData, top, width]);

  return (
    <svg
      ref={plotContainerRef}
      width={width}
      height={height}
      {...remainingProps}
    />
  );
};

export default Chart;
