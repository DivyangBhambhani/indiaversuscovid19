import React from 'react';
import {VictoryChart, VictoryLine, VictoryBar, VictoryTheme, VictoryAxis} from 'victory';

export default function LockdownFiveDaysMovingAverageChart (props){
  const [data, setData] = React.useState([]);
  const [movingAverageConfirmData, setMovingAverageConfirmData] = React.useState([]);
  const [movingAverageDeceaseData, setMovingAverageDeceaseData] = React.useState([]);
  const [movingAverageRecoverData, setMovingAverageRecoverData] = React.useState([]);
  const [dataConfirmColor, setDataConfirmColor] = React.useState([]);
  const [dataDeceaseColor, setDataDeceaseColor] = React.useState([]);
  const [dataRecoverColor, setDataRecoverColor] = React.useState([]);

  React.useEffect(() => {
    if(props.data !== undefined) {
      props.data.then(res => {
        console.log(res,'res');
        setDataConfirmColor('orange');
        setDataDeceaseColor('red');
        setDataRecoverColor('green');
        setData(res.result[0]);
        setMovingAverageConfirmData(res.movingAvg[0]);
        setMovingAverageDeceaseData(res.movingAvg[1]);
        setMovingAverageRecoverData(res.movingAvg[2]);
      })
    }
  },[props]);


  return (
    <React.Fragment>
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={{y:0}}
      >
        <VictoryBar
          style={{
            data: { stroke: dataConfirmColor }
          }}
          data={data}
        />
        <VictoryLine
          style={{
            data: { stroke: dataConfirmColor, strokeWidth: 5 }
          }}
          data={movingAverageConfirmData}
        />
        <VictoryLine
          style={{
            data: { stroke: dataDeceaseColor, strokeWidth: 5 }
          }}
          data={movingAverageDeceaseData}
        />
        <VictoryLine
          style={{
            data: { stroke: dataRecoverColor, strokeWidth: 5 }
          }}
          data={movingAverageRecoverData}
        />
        <VictoryAxis style={{ 
            ticks: {stroke: "transparent"},
            tickLabels: { fill:"transparent"} 
        }} />
      </VictoryChart>
    </React.Fragment>
  )
}