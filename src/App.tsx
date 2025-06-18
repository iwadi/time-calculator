import Header from './header/Header';
import Text from './text/Text';
import Content from './content/Content';
import './Css/Style.css';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Text />
        <Content />
      </div>
    </>
  )
}

export default App;