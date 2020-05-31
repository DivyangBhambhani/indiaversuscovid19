import React from 'react';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';
import Title from '../common/Title';
import { timeSeriesChartData } from '../../utils/api';

function getMaxValue(dataset) {
	var scale = 'auto';
	if(dataset.length > 0) {
		var data = dataset[0].data;
		var max = 0, maxIndex = -1;
		for(var i=0;i<data.length;i++) {
		   if(parseInt(data[i].y,10) > max) {
		      max = data[i].y;
		      maxIndex = i;
		   }
		}
	  	scale = Math.ceil (max / 10000) * 10000
	}
	return scale;
}

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
        <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
        <circle
            r={size / 5}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={color}
            fillOpacity={0.35}
        />
    </g>
)

const CoronaCasesOverviewLine = ({ data }) => (
	<div className="chart">
	    <ResponsiveLine
	        data={data}
	        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
	        xScale={{
	            type: 'time',
	            format: '%Y-%m-%d',
	            precision: 'day',
	        }}
	        xFormat="time:%Y-%m-%d"
	        yScale={{ type: 'linear', min: 'auto', max: getMaxValue(data), stacked: false, reverse: false }}
	        curve="monotoneX"
	        axisTop={null}
	        axisRight={{ 
	        	orient: 'right', 
	        	tickSize: 0, 
	        	tickPadding: 5, 
	        	tickRotation: 0, 
	        	legend: 'Number of Cases (in thousands)',
	        	legendPosition: 'middle',
	        	legendOffset: 40,
	        	format: value => {
	        		if(value != 0) {
	        			return value/1000 + 'K'
	        		} else return value
	        	}
	        }}
	        axisBottom={{
	            orient: 'bottom',
	            tickSize: 0,
	            tickPadding: 5,
	            tickRotation: -45,
	            legend: '',
	            legendOffset: 42,
	            legendPosition: 'middle',
	            format: '%b %d',
	            tickValues: 'every 10 days'
	        }}
	        axisLeft={null}
	        enableGridX={true}
	        enableGridY={true}
	        lineWidth={5}
	        enablePoints={false}
	        pointSize={10}
	        pointColor={{ theme: 'background' }}
	        pointBorderWidth={2}
	        pointBorderColor={{ from: 'serieColor' }}
	        pointLabel="y"
	        pointLabelYOffset={-12}
	        pointSymbol={CustomSymbol}
	        enableArea={false}
	        areaOpacity={0.8}
	        enableSlices="x"
	        useMesh={true}
	        legends={[
	            {
	                anchor: 'top-left',
	                direction: 'row',
	                justify: false,
	                translateX: -42,
	                translateY: -30,
	                itemWidth: 100,
	                itemHeight: 20,
	                itemsSpacing: 4,
	                symbolSize: 20,
	                symbolShape: 'circle',
	                itemDirection: 'left-to-right',
	                itemTextColor: '#bfc9d4',
	                effects: [
	                    {
	                        on: 'hover',
	                        style: {
	                            itemBackground: 'rgba(0, 0, 0, .03)',
	                            itemOpacity: 0.5
	                        }
	                    }
	                ]
	            }
	        ]}
	        sliceTooltip={({ slice }) => {
	        	var tooltipDate = new Date(slice.points[0].data.xFormatted).toDateString();
	            return (
	                <div
	                    style={{
	                    	background: 'black',
	                    	padding: '10px',
	                    	borderRadius: '10px',
	                    	fontSize: '14px',
    						textAlign: 'left'
	                    }}
	                >
	                    <div style={{ paddingBottom: '5px', color: '#fff' }}>
	                    	<b>{tooltipDate}</b>
	                    </div>
	                    <hr style={{ marginTop:'5px', marginBottom: '5px', background:'#fff' }}/>
	                    {slice.points.map(point => (
	                        <div
	                            key={point.id}
	                            style={{
	                                color: point.serieColor,
	                                padding: '3px 0',
	                            }}
	                        >
	                            <strong>{point.serieId}: {point.data.yFormatted}</strong>
	                        </div>
	                    ))}
	                </div>
	            )
	        }}
	        theme={{
		        axis: {
		          	ticks: {
		            	text: {
		              		fill: "#bfc9d4"
		            	}
	          		},
	        		legend: {
		            	text: {
		              		fill: "#bfc9d4"
		            	}
		          	}
		        }
		    }}
		    colors= {['#ff9f43', '#ea5455', '#28c76f']} // #28c76f-green, #ea5455-red, #ff9f43-yellow

	    />
	</div>
);

class TimeSeriesChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeSeriesData: []
		}
	}

	componentDidMount() {
		timeSeriesChartData().then(res => {
			this.setState({
				timeSeriesData: res.data
			});
		});
	}

	render() {
		console.log(this.state.timeSeriesData);
		return (
			<React.Fragment>
  				<Title>Covid-19 Cases Overview - Since Inception</Title>
				{this.state.timeSeriesData &&
					<CoronaCasesOverviewLine data={this.state.timeSeriesData} />
				}
			</React.Fragment>
		)
	}
}

export default TimeSeriesChart;