/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const wrapper = css`
  align-items: center;
  background-color: #333;
  bottom: 0;
  color: #fff;
  display: flex;
  flex-shrink: 0;
  height: 5rem;
  justify-content: center;
  position: sticky;
`;

const footerText = css`
  font-size: 1.6rem;
  margin: 0;
`;

const Footer = (): JSX.Element => {
  return (
    <footer css={wrapper}>
      <p css={footerText}>
        <small>&copy; 2019 OKA TECHNOLOGY</small>
      </p>
    </footer>
  );
};

export default Footer;
