
import { ApiClient } from 'vtubestudio'
import { useEffect, useState } from 'react'
import { setupSpeechRecognition, eventsEmitter } from './chat.js';
import './App.css';




function App() {
  const [apiClient, setApiClient] = useState(null)
  const [yourTestMessage, setYourTestMessage] = useState('')
  const [counter, setCounter] = useState(0)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelID, setModelID] = useState('')
  const [modelName, setModelName] = useState('')
  const [availableModels, setAvailableModels] = useState([])
  const [expressionState, setExpressionState] = useState(null)
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const handlePitchChange = (value) => {
    setPitch(value);
  };
  const handleRateChange = (value) => {
    setRate(value);
  };
  const callSetupSpeechRecognition = () => {
    console.log('Pitch changed:', pitch);
    console.log('Rate changed:', rate);
    setupSpeechRecognition(pitch, rate);
  };

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
      //const expressionFiles = ['EyesCry.exp3.json', 'EyesLove.exp3.json','SignAngry.exp3.json','SignShock.exp3.json']
      setAvailableModels(availableModels)
      /*try {
        const currentExpressionState = await apiClient.expressionState();//表情狀態清除
        const expressionFiles = currentExpressionState.expressions.map(expression => expression.file);
        const maxlength = expressionFiles.length;
        const randomnum = Math.floor(Math.random() * maxlength)
        setExpressionState(currentExpressionState);
        console.log('Expression State:', currentExpressionState);
        for (let i = 0; i < currentExpressionState.expressions.length; i++) {
          await apiClient.expressionActivation({
            active: false,
            expressionFile: expressionFiles[i]
          }
          );
        }
        const initialExpress = await apiClient.expressionState();
        console.log('Initial State:', initialExpress);
        await apiClient.expressionActivation({
          active: true,
          expressionFile: expressionFiles[randomnum]
        });
        console.log('randomnum:', randomnum);
      } catch (error) {
        console.error('Error calling API methods:', error);
      }
      try {//熱鍵觸發動作測試
        const hotkeydata = await apiClient.hotkeysInCurrentModel();
        console.log('hotkey', hotkeydata);
        const targetType = "TriggerAnimation";
        const filteredHotkeys = hotkeydata.availableHotkeys.filter(hotkey => hotkey.type === targetType);
        const hotkeyIDs = filteredHotkeys.map(hotkey => hotkey.hotkeyID);
        const hotkeyidslength = hotkeyIDs.length;
        const hotkeyrandomnum = Math.floor(Math.random() * hotkeyidslength)
        console.log(`Hotkey IDs with type ${targetType}:`, hotkeyIDs);
        await apiClient.hotkeyTrigger({
          hotkeyID: hotkeyIDs[hotkeyrandomnum]

        });
        console.log('hotkeyrandom', hotkeyrandomnum);
      } catch (error) {
        console.error('Error calling API methods:', error);
      }*/

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

    eventsEmitter.on('trigger', () => {
      console.log('trigger event!');
      (async () => {
        try {
          const hotkeydata = await apiClient.hotkeysInCurrentModel();
          console.log('hotkey', hotkeydata);
          const targetType = "TriggerAnimation";
          const filteredHotkeys = hotkeydata.availableHotkeys.filter(hotkey => hotkey.type === targetType);
          const hotkeyIDs = filteredHotkeys.map(hotkey => hotkey.hotkeyID);
          const hotkeyidslength = hotkeyIDs.length;
          const hotkeyrandomnum = Math.floor(Math.random() * hotkeyidslength);
          console.log(`Hotkey IDs with type ${targetType}:`, hotkeyIDs);
          await apiClient.hotkeyTrigger({
            hotkeyID: hotkeyIDs[hotkeyrandomnum]
          });
          console.log('hotkeyrandom', hotkeyrandomnum);
        } catch (error) {
          console.error('Error calling API methods:', error);
        }
        try {
          const currentExpressionState = await apiClient.expressionState();//表情狀態清除
          const expressionFiles = currentExpressionState.expressions.map(expression => expression.file);
          const maxlength = expressionFiles.length;
          const randomnum = Math.floor(Math.random() * maxlength)
          setExpressionState(currentExpressionState);
          console.log('Expression State:', currentExpressionState);
          for (let i = 0; i < currentExpressionState.expressions.length; i++) {
            await apiClient.expressionActivation({
              active: false,
              expressionFile: expressionFiles[i]
            }
            );
          }
          const initialExpress = await apiClient.expressionState();
          console.log('Initial State:', initialExpress);
          await apiClient.expressionActivation({
            active: true,
            expressionFile: expressionFiles[randomnum]
          });
          console.log('randomnum:', randomnum);
        } catch (error) {
          console.error('Error calling API methods:', error);
        }
      })();
    });


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
              <div className="w3-bar-block">
                <div className="w3-bar-item">
                  <label htmlFor="pitch" className="h5"><b>Pitch</b></label>
                  <input type="range" min="0" max="2" value={pitch} step="0.1" id="pitch" className="w3-input" onChange={(e) => handlePitchChange(e.target.value)} />
                </div>
                <div className="w3-bar-item">
                  <label htmlFor="rate" className="h5"><b>Rate</b></label>
                  <input type="range" min="0.5" max="2" value={rate} step="0.1" id="rate" className="w3-input" onChange={(e) => handleRateChange(e.target.value)} />
                </div>
                <button id="startButton" onClick={callSetupSpeechRecognition}>
                  Start Recognition
                </button>
              </div>
            </div>
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
