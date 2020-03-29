import React, { useRef, useMemo } from "react";

import styled from "@emotion/styled";

import * as colors from "./colors";

const InputWrapper = styled.div`
  position: relative;
  width: 33rem;
`;

const ValueIndicatorSpan = styled.span`
  position: absolute;
  top: 1.6rem;
  opacity: ${({ offsetLeft }) => (offsetLeft > 15 ? "1" : "0")};
  left: 1.5rem;
  transition: opacity 0.5s;
  z-index: 1;
  color: ${colors.light};
  font-weight: 500;
  cursor: default;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 100%;
  height: 2.4rem;
  margin-top: 1rem;
  box-sizing: border-box;

  border-radius: 1rem;
  border: 0.4rem solid #f3f4f7;
  background-color: ${colors.element};
  box-shadow: 0.7rem 0.7rem 1.5rem rgba(55, 84, 170, 0.15),
    -0.7rem -0.7rem 2rem rgba(255, 255, 255, 1),
    inset 0 0 0.4rem rgba(255, 255, 255, 0),
    inset 0.7rem 0.7rem 1.5rem rgba(55, 84, 170, 0.15),
    inset -0.7rem -0.7rem 2rem rgba(255, 255, 255, 1),
    0 0 0.4rem rgba(255, 255, 255, 0.2);

  &::-webkit-slider-thumb {
    appearance: none;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    left: ${({ offsetLeft }) => `calc(${offsetLeft}px)`};
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    top: 1.2rem;
    background-color: ${colors.element};
    box-shadow: 0.7rem 0.7rem 1.5rem rgba(55, 84, 170, 0.15),
      0 0 1rem rgba(55, 84, 170, 0.2);
  }

  &:after {
    content: "";
    position: absolute;
    top: 1.4rem;
    border-radius: 1rem;
    left: 0.5rem;
    height: 1.6rem;
    background-color: #185bf1;
    opacity: 0.4;
    width: ${({ offsetLeft }) => `calc(${offsetLeft}px + 1.5rem)`};
  }

  &:focus {
    outline: none;
  }
`;

const RangeSlider = ({ min = 10, max = 1000, value, ...remainingProps }) => {
  const inputRef = useRef();

  const offsetLeft = useMemo(() => {
    if (!inputRef.current) return 0;
    const inputWidth = inputRef.current.clientWidth;
    return (inputWidth * (value - min)) / (min + max);
  }, [max, min, value]);

  return (
    <InputWrapper>
      <ValueIndicatorSpan offsetLeft={offsetLeft}>{value}</ValueIndicatorSpan>
      <StyledInput
        type="range"
        min={min}
        max={max}
        value={value}
        ref={inputRef}
        offsetLeft={offsetLeft}
        {...remainingProps}
      />
    </InputWrapper>
  );
};

export default RangeSlider;
