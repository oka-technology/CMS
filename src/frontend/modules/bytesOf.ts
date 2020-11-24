const bytesOf = (str: string): number => {
  return encodeURIComponent(str).replace(/%../g, 'x').length;
};
export default bytesOf;
