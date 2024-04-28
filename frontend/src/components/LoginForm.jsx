import { Form, Field } from 'formik';
import avatar from '../assets/avatar.jpg';
import styled from 'styled-components';
import { Button } from './Button';

const MainContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`

const ImgContainer = styled.div`
   width: 50%;
   height: 50%;
   object-fit: cover;
`

export const LoginForm = () => {
     return (
        <MainContainer>
            <FormContainer>
                <ImgContainer>
                  <img src={avatar} alt="avatar" />
                </ImgContainer>

                <Form>
                    <h1>Vojti</h1>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                  <Button />
                </Form>
            </FormContainer>
        </MainContainer>
     )
}

