import styled, { keyframes } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  ${media.greaterThan("medium")`
  
  form {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }

  `}
`;

export const ContainerInput = styled.div`
  padding: 32px;

  div:not(:first-child) {
    margin-top: 20px;
  }

  div:not(.wrapper) {
    margin-top: 20px;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  ${media.greaterThan("medium")`
    width:60vw;
  `}
`;

const spinner = keyframes`
to {
 transform: rotate(360deg)
}

`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: var(--color-secundary-dark);
    padding: 18px;
    border: none;
    color: white;
    width: 30vw;
    border-radius: 4px;
    margin-bottom: 32px;
    align-self: center;
  }

  svg {
    animation: ${spinner} 2s linear infinite;
  }
`;

export const Title = styled.h1`
  color: rgba(0, 0, 0, 0.8);
  font-size: 24px;
`;
