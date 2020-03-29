import React, { useMemo, useState } from "react";
import { Expression, toTex } from "algebra.js";

import logo from "./logo.svg";
import "./App.css";

import styled from "@emotion/styled";

import Chart from "./Chart";
import RangeSlider from "./RangeSlider";

import * as colors from "./colors";

const CenteredDiv = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10rem;
  margin-bottom: 10rem;
  flex-direction: row;
  justify-content: space-between;
`;

const ExplanationSection = styled.section`
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
`;

const ChartSection = styled.section`
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

const TitleH1 = styled.h1`
  margin-top: 1.6rem;
  text-align: center;
  font-size: 2rem;
  color: grey;
  font-weight: 500;
  margin-bottom: 4rem;
`;

const Paragraph = styled.p`
  font-size: 1.8rem;
  font-weight: 300;

  & a,
  a:visited,
  a:active {
    color: inherit;
  }

  & a:hover {
    color: grey;
  }

  & b {
    font-weight: 500;

    & blue {
      color: #185bf1;
    }
  }
`;

const StyledChart = styled(Chart)`
  border-radius: 1rem;
  padding: 1.5rem;
  background: ${colors.element};
  box-shadow: 0.4rem 0.4rem 0.4rem rgba(55, 84, 170, 0.15) inset,
    -0.4rem -0.4rem 0.4rem 0 ${colors.light} inset;
`;

const PiEstimatorH2 = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: grey;
  font-weight: 300;
  max-width: 30rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DEFAULT_POINTS_SAMPLE_COUNT = 10;
const CIRCLE_RADIUS = 0.5;
const PLOT_DIMENSION = 300;
const SLIDER_MIN = 10;
const SLIDER_MAX = 10000;

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
      <ExplanationSection>
        <TitleH1>Estimating the value of PI</TitleH1>
        <Paragraph>
          In this experiment, you will estimate the mathematical constant 𝜋 by
          using the Monte Carlo method in the web browser.
          <br />
          <br />
          In the plot demonstration, we have a circle of radius 0.5 inside a a 1
          x 1 square plot.
          <br />
          <br />
          Using the{" "}
          <a href="https://en.wikipedia.org/wiki/Dimensional_analysis">
            dimensional analysis
          </a>{" "}
          approach, we know that the dimensions of the area of the circle must
          be L
          <sup>
            <small>2</small>
          </sup>
          , where L stands for the length dimension.
          <br />
          <br />
          Thus, we arrive at the following formula for the area of the circle:
          cr
          <sup>
            <small>2</small>
          </sup>
          , where c is a secret constant. It turns out that mathmaticians
          decided to call this constant PI!
          <br />
          <br />
          We know that the area of the plot is 1 and the area of the circle is
          𝜋r
          <sup>
            <small>2</small>
          </sup>
          . If we divide the area of the circle by the area of the square we get
          0.25𝜋.
          <br />
          <br />
          We then generate <b>{selectedPointsCount}</b> uniformly distributed
          random points and plot them.
          <br />
          <br />
          If we divide the number of points{" "}
          <b>
            <blue>inside</blue>
          </b>{" "}
          the circle by the total number of generated points we get a value that
          is an approximation of the 0.25𝜋 ratio calculated previously.
          <br />
          <br />
          Multiplying this value by 4, we obtain an approximation value for the
          PI constant of {piEstimate}.
        </Paragraph>
      </ExplanationSection>
      <ChartSection>
        <PiEstimatorH2>{`π = ${piEstimate}`}</PiEstimatorH2>
        <StyledChart
          pointsData={pointsData}
          width={PLOT_DIMENSION}
          height={PLOT_DIMENSION}
        />
        <RangeSlider
          value={pointsCount}
          onChange={handleRangeChange}
          onMouseUp={handleOnMouseUp}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
        />
      </ChartSection>
    </CenteredDiv>
  );
};

export default App;
