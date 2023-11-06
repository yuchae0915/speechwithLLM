
import { ApiClient } from 'vtubestudio'
import { useEffect, useState } from 'react'
import { setupSpeechRecognition } from './chat.js';
import './App.css';

function App() {
  const [apiClient, setApiClient] = useState(null)
  const [yourTestMessage, setYourTestMessage] = useState('')
  const [counter, setCounter] = useState(0)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelID, setModelID] = useState('')
  const [modelName, setModelName] = useState('')
  const [availableModels, setAvailableModels] = useState([])

  useEffect(() => {
    const apiClient = new ApiClient({
      authTokenGetter: () => localStorage.getItem('VTS.JS_TEST_AUTH_TOKEN'),
      authTokenSetter: (authenticationToken) => localStorage.setItem('VTS.JS_TEST_AUTH_TOKEN', authenticationToken),
      pluginDeveloper: 'yuchae',
      pluginName: 'speechwithLLaMa',
    })

    setApiClient(apiClient)

    apiClient.on('connect', async () => {
      const { availableModels } = await apiClient.availableModels()
      setAvailableModels(availableModels)

      await apiClient.events.modelLoaded.subscribe(({ modelLoaded, modelID, modelName }) => {
        setModelLoaded(modelLoaded)
        setModelID(modelID)
        setModelName(modelName)
      })

      await apiClient.events.test.subscribe(({ yourTestMessage, counter }) => {
        setYourTestMessage(yourTestMessage)
        setCounter(counter)
      }, {
        testMessageForEvent: 'Echo test'
      })

      const { modelLoaded, modelID, modelName } = await apiClient.currentModel()
      setModelLoaded(modelLoaded)
      setModelID(modelID)
      setModelName(modelName)
    })

    return () => {
      apiClient.disconnect()
    }
  }, [])

  return (
    <div className="App">
      <ul>
        <li>Test Event: {yourTestMessage} - {counter}</li>
        <li>Model Loaded: {modelLoaded ? 'Yes' : 'No'}</li>
        <li>Model ID: {modelID}</li>
        <li>Model Name: {modelName}</li>
        <li>Available Models:</li>
        <ul>
          {availableModels.map(m => <li key={m.modelID}>
            <button onClick={() => apiClient?.modelLoad({ modelID: m.modelID })}>{m.modelName}</button>
          </li>)}
        </ul>

      </ul>
      <div className="row px-4 pt-4">
        <div className="col-4 d-flex align-items-stretch">

          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Chat with Bot</h1>
            </div>
            <div className="card-body">
              <div id="chat-history"></div>
            </div>
            <button id="startButton" onClick={setupSpeechRecognition}>
              Start Recognition
            </button>
            <div className="card-footer">
              <div className="words"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default App;
