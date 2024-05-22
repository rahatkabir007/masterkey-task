import './App.css';
import LayoutBuilder from './components/LayoutBuilder/LayoutBuilder';
import Grid from './components/AlphabetGrid/Grid';

const App = () => {
  return (
    <div className="App">
      {/* <h1>Responsive Layout Builder</h1>
      <LayoutBuilder /> */}
      <h1>Alphabet Grid</h1>
      <Grid />
    </div>
  )
}

export default App