import { useEffect, useRef, useState } from "react";
import { getRandomColor } from "../helpers";

export default function PieChart({ classNames, data, titleData }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState(100);
  const [ctx, setCtx] = useState(null);

  // tying into the state hook here ensures that the canvas gets re-rendered on page reload and ANY props updates
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // the canvas needs to be square to avoid distortion. Attempt to fill the parent container
    let canvasSize = canvas.parentNode.clientWidth;
    if (canvas.parentNode.clientWidth > canvas.parentNode.clientHeight) {
      canvasSize = canvas.parentNode.clientHeight;
    }

    setCanvasSize(canvasSize);
    setCtx(ctx);
  }, [canvasRef, classNames, data, titleData]);

  // this re-draws the pie chart any time relevant props or state values update
  useEffect(() => {
    if (!ctx || !canvasSize) return;

    // helpful function for drawing on the canvas
    function drawRect(x, y, w, h, color) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    // helpful function for drawing on the canvas
    function drawText(
      text,
      x,
      y,
      fontSize,
      fontFamily,
      color,
      textAlign = "left"
    ) {
      if (!ctx) return;
      ctx.textAlign = textAlign;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }

    // this makes sure to draw text using the (x, y) position as the top left corner
    ctx.textBaseline = "top";

    // clear drawings from previous renders
    drawRect(0, 0, canvasSize, canvasSize, "#fff");

    // by default the chart can take up 80% of the canvas size, the borders can be 20% (10% on eadch side). If labels are requested, the chart can shrink to be 50% and the right side will house the labels and will be 40%
    let chartDiameter = canvasSize * 0.8;
    const drawLabels = data.some((section) => section.label);
    if (drawLabels) chartDiameter = canvasSize * 0.5;
    const chartBorders = canvasSize - chartDiameter;
    const chartRadius = chartDiameter / 2;

    // draw title if requested
    if (titleData && titleData.text) {
      const titleX = canvasSize / 2;
      const titleY = 10;
      const size = titleData.fontSize || canvasSize / 20;
      const font = titleData.fontFamily || "Arial";
      const color = titleData.color || "black";
      ctx.textAlign = "center";
      drawText(titleData.text, titleX, titleY, size, font, color, "center");
    }

    // add up the total of all of the values for each section of the chart
    let total = 0;
    data.forEach((section) => (total += section.value || 0));

    // the left border will always be 10%, the top/bottom borders will be centered
    const xStart = canvasSize * 0.1;
    const yStart = chartBorders / 2;
    const xCenter = xStart + chartRadius;
    const yCenter = yStart + chartRadius;
    let startAngle = 0;

    // section labels height will a percentage of the chart size, unless there are too many, then they start to get smaller
    let sectionLabelHeight = chartDiameter / 8;
    let sectionLabelFontSize = chartDiameter / 15;
    if (chartDiameter / data.length < sectionLabelHeight) {
      sectionLabelHeight = chartDiameter / data.length;
      sectionLabelFontSize = sectionLabelHeight * (8 / 15);
    }

    // data is an array of objects, each object represents one section of the pie chart
    data.forEach((section, i) => {
      // figure out what angle to draw for this section
      const sectionValue = section.value || 0;
      const sectionPercentage = sectionValue / total;
      const endAngle = 2 * Math.PI * sectionPercentage + startAngle;
      // draw the section
      const sectionColor = section.color || getRandomColor(50, 200);
      ctx.fillStyle = sectionColor;
      ctx.beginPath();
      ctx.moveTo(xCenter, yCenter);
      ctx.arc(xCenter, yCenter, chartRadius, startAngle, endAngle);
      ctx.fill();
      // the end angle of this section is the start angle of the next section
      startAngle = endAngle;
      // if any of the sections has a label, we'll draw labels for all of them on the right side of the canvas (right 40%)
      if (drawLabels) {
        const rectX = canvasSize * 0.65;
        const rectY = chartBorders / 2 + i * sectionLabelHeight;
        const rectW = canvasSize * 0.065;
        const rectH = sectionLabelHeight * 0.8;
        drawRect(rectX, rectY, rectW, rectH, sectionColor);
        // if the section has a label, add the text. Otherwise leave it blank
        if (section.label) {
          const labelX = rectX + canvasSize * 0.071;
          const labelY = rectY;
          drawText(
            section.label,
            labelX,
            labelY,
            sectionLabelFontSize,
            "Arial",
            "black"
          );
        }
      }
    });
  }, [ctx, canvasSize, data, titleData]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        width: canvasSize,
        height: canvasSize,
        position: "relative",
      }}
      className={`chartCanvas ${classNames}`}
    ></canvas>
  );
}
