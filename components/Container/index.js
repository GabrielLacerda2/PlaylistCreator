
import styled from 'styled-components';
import List from '../List'
const Container = styled.div`
    background-color: #343434;
    width:50vw;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 15px;
    border-radius:4px;
    border:1px solid rgba(255,255,255,0.05);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    color:#dbdbdb;
`;

export default (props) =>{
    return (
    <Container>
        <header>
            <h3>Tracks</h3>
        </header>
        <main>
            <List {...props}/>
        </main>
    </Container>
    );
}