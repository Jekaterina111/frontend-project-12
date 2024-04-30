import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`
export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: var(--shadow);
`

export const ImgContainer = styled.div`
   width: 50%;
   height: 50%;
   object-fit: cover;
`
export const Wrapper = styled.main`
    padding: 2rem 0;

    @media (min-width: 767px) {
        padding: 4rem 0;
        height: 100%;
    }
`
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Title = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: var(--colors-text);
  font-size: 2.2em;
`;

export const Button = styled.button`
  padding: 0 2rem;
  margin-top: 0.5rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 2.5;
  border-radius: var(--radii);

  border: none;
  align-items: center;

  color: var(--color-text);
  cursor: pointer;
`;

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
`;