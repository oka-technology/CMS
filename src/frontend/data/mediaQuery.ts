const breakpoints: number[] = [1200];

const mq: string[] = breakpoints.map(
  (bp) => `@media screen and (min-width: ${bp}px)`,
);

export default mq;
