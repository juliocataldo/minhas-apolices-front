import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 6;
  width: 100%;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const Modal = styled.div`
  display: flex;
  background: white;
  max-width: 600px;
  height: 30vh;
`;
