import React from "react";

import styled from "@emotion/styled";

const StyledInput = styled.input`
  appearance: none;
  width: 100%;
  height: 1rem;
  background: lightgrey;
  opacity: 0.5;
  transition: opacity 0.2s;
  margin-top: 2rem;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 2rem;
    background: hotpink;
  }
`;

const RangeSlider = ({ min = 10, max = 1000, value, ...remainingProps }) => {
  return (
    <StyledInput
      type="range"
      min={min}
      max={max}
      value={value}
      {...remainingProps}
    />
  );
};

export default RangeSlider;
