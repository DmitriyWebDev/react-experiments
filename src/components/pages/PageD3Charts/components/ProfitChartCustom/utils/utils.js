export function getOldDaysChartLines(
  xAxisOffsets,
  oldDays,
  chartHeight,
  maxProductCount
) {
  let result = "";
  const percentScale = chartHeight / maxProductCount;

  for (let i = 0; i < oldDays.length; i++) {
    const dayProductsCount = oldDays[i].productsCount;
    const xAxisOffset = xAxisOffsets[i];
    const yAxisOffset = countVerticalOffset(
      dayProductsCount,
      chartHeight,
      percentScale
    );
    result += i === 0 ? `M ` : ` L `;
    result += `${xAxisOffset},${yAxisOffset}`;
  }

  return result;

  // utils

  function countVerticalOffset(dayProductsCount, chartHeight, percentScale) {
    return `${chartHeight - dayProductsCount * percentScale}`;
  }
}

export function countDaysLeftOffsets(lines, chartWidth) {
  const result = [];
  const lineOffsetStep = Math.round((chartWidth / lines.length) * 100) / 100;

  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      result.push(0);
      continue;
    }
    result.push(result[i - 1] + lineOffsetStep);
  }

  const countedResult = result.slice();
  result.length = 0;

  const foo = chartWidth - countedResult[countedResult.length - 1];
  let bar = (foo / chartWidth) * 100;

  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      result.push(0);
      continue;
    }
    if (i === lines.length - 1) {
      result.push(chartWidth);
      continue;
    }
    const onePercent = lineOffsetStep / 100;
    result.push(
      (Math.ceil(result[i - 1] + lineOffsetStep + onePercent * bar) / 100) * 100
    );
  }

  return result;
}

export function computeDayHeight(days, chartHeight, dayIndex) {
  const maxProductsCount = days.reduce(
    (prevVal, currVal) =>
      prevVal.productsCount > currVal.productsCount
        ? prevVal.productsCount
        : currVal.productsCount,
    0
  );

  const percent = maxProductsCount / 100;
  const dayProductsCount = days[dayIndex].productsCount;
  const dayProductsPercents = dayProductsCount / percent;

  return (chartHeight / 100) * dayProductsPercents * -1;
}

export function setAnimatedViewToSvgPath(pathNode = {}) {
  if (typeof pathNode.getTotalLength === "undefined") return false;

  // Set animated view for <path />
  const path = pathNode;
  const length = path.getTotalLength();

  // Clear any previous transition
  path.style.transition = path.style.WebkitTransition = "none";

  // Set up the starting positions
  path.style.strokeDasharray = length + " " + length;
  path.style.strokeDashoffset = length;

  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();

  // Define our transition
  path.style.transition = path.style.WebkitTransition =
    "stroke-dashoffset 2s ease-in-out";

  // Go!
  path.style.strokeDashoffset = "0";
}
