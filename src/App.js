import { useEffect, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';

//COMPONENTI
import RequestBar from './componenti/RequestBar/RequestBar';
import RequestContainer from './componenti/RequestContainer/RequestContainer';
import RoundedAnalysisBar from './componenti/RoundedAnalysisBar/RoundedAnalysisBar';
import StatusCode from './componenti/StatusCode/StatusCode';
import TimingAnalysis from './componenti/TimingAnalysis/TimingAnalysis';

function App() {
  const [windowSize, setWindowSize] = useState(1920);
  const [timingAnalysisDisp, setTimingAnalysisDisp] = useState('none');
  const [appHeight, setAppHeight] = useState('100vh');
  const [statusDisp, setStatusDisp] = useState('none');

  const reqData = useSelector(state => state.request);

    useEffect(() => {
        if(reqData.domain) {
            setTimingAnalysisDisp('block');
            setStatusDisp('block');
        }
        else {
            setTimingAnalysisDisp('none');
            setStatusDisp('none');
        }

    }, [reqData]);

  useEffect(() => {
    setWindowSize(window.innerWidth);

    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if(timingAnalysisDisp === 'none')
    {
      setAppHeight('100vh');
    } 
    else
    {
      setAppHeight('95vh');
    }
  }, [timingAnalysisDisp]);

  if(windowSize > 740)
  {
    return (
      <div className="App" id="AppDesktop" style={{height: "100%"}}>
        <StatusCode code={400} display={statusDisp}/>
        <RequestBar />
        <RequestContainer />
        <div className="timing_analysis_container" style={{display: (timingAnalysisDisp === 'none')? 'none' : 'flex'}}>
          <div className="timing_analysis_container_dx">
            <RoundedAnalysisBar px={150} second={0.45} paragone={0.4} text={"Page Load"}/>
          </div>
          <div className="timing_analysis_container_sx">
            <RoundedAnalysisBar px={150} second={1.5} paragone={0.9} text={"First Interaction"}/>
          </div>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="App" style={{height: appHeight}} id="appMobile">
        <RequestBar />
        <StatusCode code={400} display={statusDisp}/>
        <RequestContainer />
        <TimingAnalysis display={timingAnalysisDisp}/>
      </div>
    );
  }
}

export default App;
