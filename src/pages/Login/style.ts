import styled from "styled-components";
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

  ${media.greaterThan("medium")`
    width:400px;
  `}
`;

export const Button = styled.button`
  background: var(--color-secundary-dark);
  padding: 18px;
  border: none;
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 40px;
  align-self: center;
`;
