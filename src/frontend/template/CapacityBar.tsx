import styled from 'styled-components';

const MAX_BYTES = 2240;

const colorBP = {
  r: [0, 50, 255, 255],
  g: [200, 220, 220, 0],
  b: [255, 205, 0, 0],
};
const colorNum = (BP: number[], time: number, percentInScope: number) => {
  return BP[time - 1] + (BP[time] - BP[time - 1]) * percentInScope;
};

const color = (bytes: number) => {
  const percent = (100 * bytes) / MAX_BYTES;
  if (percent < 80) {
    const percentInScope = (percent / 100) * (10 / 8);
    return `rgb(${colorNum(colorBP.r, 1, percentInScope)}, ${colorNum(
      colorBP.g,
      1,
      percentInScope,
    )}, ${colorNum(colorBP.b, 1, percentInScope)})`;
  } else if (percent < 90) {
    const percentInScope = ((percent - 80) / 100) * 10;
    return `rgb(${colorNum(colorBP.r, 2, percentInScope)}, ${colorNum(
      colorBP.g,
      2,
      percentInScope,
    )}, ${colorNum(colorBP.b, 2, percentInScope)})`;
  } else if (percent < 100) {
    const percentInScope = ((percent - 90) / 100) * 10;
    return `rgb(${colorNum(colorBP.r, 3, percentInScope)}, ${colorNum(
      colorBP.g,
      3,
      percentInScope,
    )}, ${colorNum(colorBP.b, 3, percentInScope)})`;
  } else {
    return `rgb(${colorNum(colorBP.r, 3, 1)}, ${colorNum(
      colorBP.g,
      3,
      1,
    )}, ${colorNum(colorBP.b, 3, 1)})`;
  }
};

interface BarProps {
  bytes: number;
}

const Bar = styled.div<BarProps>`
  background-color: ${({ bytes }) => color(bytes)};
  height: 0.3rem;
  margin-top: 1.5rem;
  max-width: 100%;
  width: ${({ bytes }) => (100 * bytes) / MAX_BYTES}%;
`;

export default Bar;
