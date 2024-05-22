import './App.css';
import Grid from './components/AlphabetGrid/Grid';
import { useState } from 'react';
import Partition from './components/Partition/Partition';
import { getRandomColor } from './utils/getRandomcolor';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      name: "Partition",
    },
    {
      id: 2,
      name: "Alphabet Grid",
    }
  ]

  let Content;
  switch (activeTab) {
    case 1:
      Content = <Partition initialColor={getRandomColor()} />
      break;
    case 2:
      Content = <Grid />
      break;
    default:
      break;
  }

  const handleTabClick = (id) => {
    setActiveTab(id)
  }
  return (
    <div className="App">
      <div className='button-container'>
        {tabs?.map((tab, index) => (
          <button key={index} onClick={() => {
            handleTabClick(tab?.id)
          }} className={`${activeTab === tab?.id ? "active" : ""} button`}>
            {tab.name}
          </button>
        ))}
      </div>
      <div className='content'>
        {Content}
      </div>
    </div>
  )
}

export default App