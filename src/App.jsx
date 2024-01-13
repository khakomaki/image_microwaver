import './App.css'
import info from './components/Page/info';
import InfoBox from './components/Page/InfoBox'
import Microwave from './components/Microwave/Microwave'

function App() {

return (
    <>
      <div className='header'>
        <h1>Image Microwaver</h1>
      </div>
      <div className='main'>
        <div id='left-panel'>

        </div>
        <div className='main-content'>
          <Microwave></Microwave>
          <div className='info-boxes'>
            {info.map((item, index) => (
              <InfoBox key={index} title={item.title} text={item.text} images={item.images} />
            ))}
          </div>
        </div>
        <div id='right-panel'>

        </div>
      </div>
      <div className='footer'>

      </div>
    </>
  )
}

export default App
