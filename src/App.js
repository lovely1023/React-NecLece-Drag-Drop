import Main from './components/Main';
import OwnNecklace from './components/OwnNecklace';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftDesciption = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  background-color: rgb(247,199,199);
  justify-content: center;
  align-items: center;
  padding: 0 5rem;
`;

const MainContent = styled.div`
  width: 60%;
`;

const TopTitle = styled.p`
  font-weight: 800;
  font-size: 3.5rem;
  color: white;
`;

const Divider = styled.hr`
  border-top: none;
  border-bottom-color: white;
  border-bottom-width: 3px;
  margin-right: 60%;
`;

const Title = styled.h1`
  font-size: 3.75rem;
  color: black;
`;

const Description = styled.h5`
  font-size: 2.75rem;
  color: white;
`;

function App() {
  const eventLogger = (e, data) => {
  };
  const startHandler = (e, data) => {
    console.log('Start:', e, data)
  }
  const stopHandler = (e, data) => {
    console.log('Stop:', e, data)
  }
  return (
    <div className="App">
      {/* <header className="App-header" style={{width: "80px", height: "80px"}}>
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
        {/* <Draggable
          axis={"both"}
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[5, 5]}
          scale={1}
          onStart={startHandler}
          onDrag={eventLogger}
          onStop={stopHandler}>
          <div className="handle" style={{
            width: 100
          }}>
            <div>Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable> */}
        {/* <Main /> */}
      <Container>
        <LeftDesciption>
          <div>
            <TopTitle>ATTENTION!</TopTitle>
            <Divider />
            <Title>CENTERS <b>ONLY GO</b> IN THE CENTER</Title>
            <Description>
              Centers and Large Initials must be placed on the lowest circles for the center necklace because they would twist the chain I placed anywhere else.
            </Description>
          </div>
        </LeftDesciption>
        <MainContent>
          <OwnNecklace />
        </MainContent>
      </Container>
      
    </div>
  );
}

export default App;
