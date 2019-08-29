/** @jsx jsx */
import { jsx, css } from '@emotion/core';

type ButtonProps = {
  as?: string,
  color: string,
  children: string
}

const Button = ({as, children, color}: ButtonProps): JSX.Element => {
  return (
    jsx(
      as === undefined ? 'button' : as,
      {
        css: css`
          align-items: center;
          background-color: ${color};
          border-radius: 0.5rem;
          color: #fff;
          display: flex;
          font-size: 1.6rem;
          height: 4.0rem;
          justify-content: center;
          margin-top: 2.0rem;
          text-decoration: none;
          width: 10.0rem;
        `
      },
      children,
    )
  )
}

export default Button;
