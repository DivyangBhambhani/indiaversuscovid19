import React from 'react';
import {VictoryChart, VictoryLine, VictoryBar, VictoryTheme} from 'victory';
import { getDailyCasesSummary } from '../../utils/api';

export default function FiveDaysMovingAverageChart (props){
  const [data, setData] = React.useState([]);
  const [movingAverageData, setMovingAverageData] = React.useState([]);
  const [dataColor, setDataColor] = React.useState([]);

  React.useEffect(() => {
    if(props.data !== undefined) {
      props.data.then(res => {
        setDataColor('orange');
        setData(res.result);
        console.log(res.result, 'ashkjShfk');
        setMovingAverageData(res.movingAvg);
      })
    }
  },[props]);

  const handleDateCount = (data) => {
    if(data.length > 0) {
      let maxObject = data.reduce(function(prev, current) {
        return (prev.x > current.x) ? prev : current
      });
      props.fnHandleDateCount(maxObject);
    }
  }

  return (
    <React.Fragment>
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={{y:0}}
      >
        <VictoryBar
          style={{
            data: { stroke: dataColor }
          }}
          data={data}
        />
        <VictoryLine
          style={{
            data: { stroke: dataColor, strokeWidth: 5 }
          }}
          data={movingAverageData}
        />
      </VictoryChart>
    </React.Fragment>
  )
}