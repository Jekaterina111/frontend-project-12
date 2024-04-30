import { Formik } from 'formik';
import avatar from '../assets/avatar.jpg';
import { 
  MainContainer, FormContainer, Title, ImgContainer, Form, Label, Input, Button 
} from './theme';


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
                    <Title>Vojti</Title>
                  <div className="form-group">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="password">Password</Label>
                    <Input
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

