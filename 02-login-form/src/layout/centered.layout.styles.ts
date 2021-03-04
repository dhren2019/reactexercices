import { css } from '@emotion/css';

export const root = css `
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  margin-top: 14%;
  margin-left:25%;
  margin-right:25%;

  @media (max-width: 800px) {
    justify-items: center;
    margin-left:10%;
  margin-right:10%;
  }
`;