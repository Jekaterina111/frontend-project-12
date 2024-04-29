import { Formik, Form, Field } from 'formik';
import avatar from '../assets/avatar.jpg';
import styled from 'styled-components';
import { Button } from './Button';

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`
const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: var(--shadow);
`

const ImgContainer = styled.div`
   width: 50%;
   height: 50%;
   object-fit: cover;
`
const StyledLabel = styled.label`
    font-size: 16px;
    color: #333;
`
export const LoginForm = () => {
     return (
        <MainContainer>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    // Handle form submission here
                    console.log(values);
                    actions.setSubmitting(false);
                }}
            >
            <FormContainer>
                <ImgContainer>
                  <img src={avatar} alt="avatar" />
                </ImgContainer>

                <Form>
                    <h1>Vojti</h1>
                  <div className="form-group">
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <StyledLabel htmlFor="password">Password</StyledLabel>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                  <Button>Vojti</Button>
                </Form>
            </FormContainer>
          </Formik>
        </MainContainer>
     )
}

