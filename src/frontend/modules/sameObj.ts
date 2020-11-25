type Obj = {
  [key: string]: any;
};

const sameObj = (base: Obj, target: Obj): boolean => {
  const baseKeyArr = Object.keys(base);

  return baseKeyArr.every((key) => {
    if (typeof base[key] !== 'object') {
      return base[key] === target[key];
    } else {
      return sameObj(base[key], target[key]);
    }
  });
};

export default sameObj;
