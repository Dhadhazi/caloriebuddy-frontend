import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

import { selectWeight } from "../store/user/selectors";

export default function WeightChart() {
  const reduxWeight = useSelector(selectWeight);

  let weights = reduxWeight.map((w) => {
    let copy = {};
    Object.assign(copy, w);
    copy.date = new Date(w.date);
    delete copy._id;
    return copy;
  });

  weights.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1;
  });

  useEffect(() => {
    const minWeight = d3.min(weights, (d) => d.weight);
    const maxWeight = d3.max(weights, (d) => d.weight);
    let minDate = new Date(d3.min(weights, (d) => d.date));
    minDate.setDate(minDate.getDate() - 1);
    let maxDate = new Date(d3.max(weights, (d) => d.date));
    maxDate.setDate(maxDate.getDate() + 1);

    const parentBox = document.getElementById("weightchart").parentNode;

    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = parentBox.clientWidth - margin.left - margin.right,
      height = parentBox.clientWidth / 2 - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([minDate, maxDate])
      .range([0, width]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.timeFormat("%m-%d"))
      .ticks(weights.length);

    const yScale = d3
      .scaleLinear()
      .domain([minWeight, maxWeight])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(weights.length);

    const line = d3
      .line()
      .x(function (d, i) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.weight);
      })
      .curve(d3.curveMonotoneX);

    const removeChilds = document.getElementById("weightchart");
    removeChilds.innerHTML = "";

    const svg = d3
      .select("#weightchart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g").attr("class", "yaxis").call(yAxis);

    svg.append("path").datum(weights).attr("class", "line").attr("d", line);

    svg
      .selectAll(".dot")
      .data(weights)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function (d, i) {
        return xScale(d.date);
      })
      .attr("cy", function (d) {
        return yScale(d.weight);
      })
      .attr("r", 5);
  }, [weights]);

  return <div id="weightchart"></div>;
}
