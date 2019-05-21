import React from "react";
import * as d3 from "d3";
import "./style.scss";
import { data } from "./fakeApi";
import {
  getRandomId,
  setAnimatedViewToSvgPath,
  getOldDaysChartLines,
  countDaysLeftOffsets,
  computeDayHeight
} from "./utils/utils";

class ProfitChartCustom extends React.Component {
  constructor(props) {
    super(props);

    this.instanceSuffix = getRandomId();
    this.rootRef = React.createRef();
    this.rootSvgRef = React.createRef();
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

    // Dom nodes and selectors
    const rootChartSvgNode = this.rootSvgRef.current;
    const chartCanvasId = `chartCanvas_${this.instanceSuffix}`;
    const chartCanvasContentId = `chartCanvasContent_${this.instanceSuffix}`;
    const oldDaysChartId = `old-days-chart_${this.instanceSuffix}`;

    // Add
    d3.select(rootChartSvgNode)
      .append("g")
      .attr("transform", `translate(${chartInnerOffset},${chartInnerOffset})`)
      .attr("id", chartCanvasId);

    // Add content area
    d3.select(rootChartSvgNode.querySelector(`#${chartCanvasId}`))
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .attr("id", chartCanvasContentId);

    // Add current days (vertical lines)
    const linesOffsets = countDaysLeftOffsets(data.days, chartWidth);

    linesOffsets.forEach((item, index) => {
      d3.select(rootChartSvgNode.querySelector(`#${chartCanvasContentId}`))
        .append("line")
        .attr("class", "line-products-count")
        .attr("transform", `translate(${item},0)`)
        .attr("y2", computeDayHeight(data.days, chartHeight, index));
    });

    // Add old days (chart)
    const oldDaysChart = getOldDaysChartLines(
      linesOffsets,
      data.oldDays,
      chartHeight,
      maxProductsCount
    );
    d3.select(rootChartSvgNode)
      .append("path")
      .attr("id", oldDaysChartId)
      .attr("transform", `translate(${chartInnerOffset},${chartInnerOffset})`)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("d", oldDaysChart);
    // "M 0,200 L 82,160 L 164,120 L 246,100"

    // Set animated view for <path />
    const oldDaysChartPath = rootChartSvgNode.querySelector(
      `#${oldDaysChartId}`
    );
    setAnimatedViewToSvgPath(oldDaysChartPath);
  }

  render() {
    return (
      <div
        key={this.instanceSuffix}
        ref={this.rootRef}
        style={{ width: "900px", height: "400px", margin: "0 auto" }}
      >
        <svg
          ref={this.rootSvgRef}
          id={`root-svg_${this.instanceSuffix}`}
          viewBox="0 0 900 400"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    );
  }
}

export default ProfitChartCustom;
