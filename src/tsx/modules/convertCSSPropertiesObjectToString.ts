import { CSSProperties } from 'react';

const convertCSSPropertiesObjectToString = (objCSS: CSSProperties) =>
  Object.entries(objCSS)
    .map(([name, value]: string[]) => {
      const replacedName = name.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`,
      );
      return `${replacedName}: ${value};`;
    })
    .join('');

export default convertCSSPropertiesObjectToString;
