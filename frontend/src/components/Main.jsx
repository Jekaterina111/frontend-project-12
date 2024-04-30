import { Container, Wrapper } from './theme';


export const Main = ({ children }) => {
    return (
        <Wrapper>
            <Container>{children}</Container>
        </Wrapper>
    )
}