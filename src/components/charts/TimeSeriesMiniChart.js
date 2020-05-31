import React from 'react';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';
import { getDailyCasesSummary } from '../../utils/api';

const CustomFlyout = ({x, y, orientation}) => {
    const newY = orientation === "bottom" ? y - 35 : y + 35;
    return (
      <g>
        <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none"/>
        <circle cx={x} cy={newY} r="25" stroke="orange" fill="none"/>
        <circle cx={x} cy={newY} r="30" stroke="gold" fill="none"/>
      </g>
    );
}

export default function TimeSeriesMiniChart (props){
  const [timeSeriesData, setTimeSeriesData] = React.useState([]);
  const [dataColor, setDataColor] = React.useState([]);

  React.useEffect(() => {
    if(props.index){
      
      if (props.index == 'dailyconfirmed')
        setDataColor('orange')
      else if (props.index == 'dailyrecovered')
        setDataColor('green')
      else if (props.index == 'dailydeceased')
        setDataColor('tomato')

      getDailyCasesSummary(props.index).then(res => {
        var result = [];
        if(res.status == 'success') {
          res.data.data.map((item,index) => {
            result.push({
              x: new Date(item.x),
              y: parseInt(item.y)
            })
          })
          setTimeSeriesData(result);
        }
      })
    }
  },[]);

  React.useEffect(() => {
     handleDateCount(timeSeriesData)
  }, [timeSeriesData]);

  const handleDateCount = (data) => {
    if(data.length > 0) {
      let maxObject = data.reduce(function(prev, current) {
        return (prev.x > current.x) ? prev : current
      });
      props.fnHandleDateCount(maxObject);
    }
  }

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        minDomain={{y:0}}
      >
        <VictoryLine
          style={{
            data: { stroke: dataColor }
          }}
          data={timeSeriesData}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    </div>
  )
}