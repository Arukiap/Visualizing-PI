import React, { useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import styled from "@emotion/styled";

import Chart from "./Chart";
import RangeSlider from "./RangeSlider";

const CenteredDiv = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 2rem;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const StyledChart = styled(Chart)``;

const PiEstimatorH2 = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: grey;
`;

const DEFAULT_POINTS_SAMPLE_COUNT = 10;
const CIRCLE_RADIUS = 0.5;

const isPointInsideCircle = (x, y) => {
  return (
    (x - CIRCLE_RADIUS) * (x - CIRCLE_RADIUS) +
      (y - CIRCLE_RADIUS) * (y - CIRCLE_RADIUS) <
    CIRCLE_RADIUS * CIRCLE_RADIUS
  );
};

const App = () => {
  const [selectedPointsCount, setSelectedPointsCount] = useState(
    DEFAULT_POINTS_SAMPLE_COUNT
  );
  const [pointsCount, setPointsCount] = useState(DEFAULT_POINTS_SAMPLE_COUNT);

  const pointsData = useMemo(() => {
    const pointsArray = new Array(selectedPointsCount).fill();
    return pointsArray.map(() => {
      const x = Math.random();
      const y = Math.random();
      return { x, y, isInsideCircle: isPointInsideCircle(x, y) };
    });
  }, [selectedPointsCount]);

  const piEstimate = useMemo(() => {
    const insideCirclePointCount = pointsData.reduce(
      (accumulator, currentValue) => {
        const toAdd = currentValue.isInsideCircle ? 1 : 0;
        return accumulator + toAdd;
      },
      0
    );
    return (
      (1 / (CIRCLE_RADIUS * CIRCLE_RADIUS)) *
      (insideCirclePointCount / selectedPointsCount)
    );
  }, [pointsData, selectedPointsCount]);

  const handleRangeChange = (e) => {
    setPointsCount(parseInt(e.target.value));
  };

  const handleOnMouseUp = (e) => {
    setSelectedPointsCount(parseInt(e.target.value));
  };

  return (
    <CenteredDiv>
      <PiEstimatorH2>{`π = ${piEstimate}`}</PiEstimatorH2>
      <StyledChart pointsData={pointsData} width={600} height={600} />
      <RangeSlider
        value={pointsCount}
        onChange={handleRangeChange}
        onMouseUp={handleOnMouseUp}
        min={10}
        max={1000}
      />
    </CenteredDiv>
  );
};

export default App;
