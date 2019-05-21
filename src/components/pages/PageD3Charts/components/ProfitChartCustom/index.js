import React from "react";
import * as d3 from "d3";
import "./style.scss";
import { data } from "./fakeApi";
import {
  setAnimatedViewToSvgPath,
  getOldDaysChartLines,
  countDaysLeftOffsets,
  computeDayHeight
} from "./utils/utils";

class ProfitChartCustom extends React.Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
  }

  componentDidMount() {
    // const root = this.rootRef.current;
    // console.log(root);

    // Chart logic

    const maxProductsCount = 6000;

    const svgWidth = 900;
    const svgHeight = 400;

    const chartInnerOffset = 80;

    const chartWidth = svgWidth - chartInnerOffset * 2;
    const chartHeight = svgHeight - chartInnerOffset * 2;

    // Add root
    d3.select("#chart")
      .append("g")
      .attr("transform", `translate(${chartInnerOffset},${chartInnerOffset})`)
      .attr("id", "chartCanvas");

    // Add content area
    d3.select("#chartCanvas")
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .attr("id", "chartCanvasContent");

    // Add current days (vertical lines)
    const linesOffsets = countDaysLeftOffsets(data.days, chartWidth);

    linesOffsets.forEach((item, index, arr) => {
      d3.select("#chartCanvasContent")
        .append("line")
        .attr("class", "line-products-count")
        .attr("transform", `translate(${item},0)`)
        .attr("y2", computeDayHeight(data.days, chartHeight, index));
    });

    // Add old days (chart)
    const oldDaysChart = getOldDaysChartLines(
      linesOffsets,
      data.days,
      chartHeight,
      maxProductsCount
    );
    d3.select("#chart")
      .append("path")
      .attr("transform", `translate(${chartInnerOffset},${chartInnerOffset})`)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("d", oldDaysChart);
    // "M 0,200 L 82,160 L 164,120 L 246,100"

    // Set animated view for <path />
    const path = document.querySelector("#chart path");
    setAnimatedViewToSvgPath(path);
  }

  render() {
    return (
      <div
        ref={this.rootRef}
        style={{ width: "900px", height: "400px", margin: "0 auto" }}
      >
        <svg
          id="chart"
          viewBox="0 0 900 400"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    );
  }
}

export default ProfitChartCustom;
