import React from 'react';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';
import Title from '../common/Title';

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

const CoronaCasesDailySmallLine = ({ data }) => (
	<div className="chartSmall">
	    <ResponsiveLine
	        data={data}
	        margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
	        xScale={{
	            type: 'time',
	            format: '%Y-%m-%d',
	            precision: 'day',
	        }}
	        xFormat="time:%Y-%m-%d"
	        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
	        curve="monotoneX"
	        axisTop={null}
	        axisRight={null}
	        axisBottom={null}
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
	        legends={[]}
	        sliceTooltip={({ slice }) => {
	        	var tooltipDate = new Date(slice.points[0].data.xFormatted).toDateString();
	            return (
	                <div
	                    style={{
	                    	background: 'black',
	                    	padding: '5px',
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
		    colors= {(data) => {
		    	var color = '';
		    	switch(data.id) {
				    case 'Confirmed':
				    	color = '#ff9f43';
				    	break;
				    case 'Recovered':
				    	color = '#28c76f';
				    	break;
				    case 'Deceased':
				    	color = '#ea5455';
				    	break;
				}
				return color;
		    }}
	    />
	</div>
);

class IgnoreTimeSeriesChartSmall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeSeriesData: []
		}
		this.handleDateCount = this.handleDateCount.bind(this);
	}

	handleDateCount(data) {
		var maxObject = data[0].data.reduce(function(prev, current) {
		    return (prev.x > current.x) ? prev : current
		});
		this.props.fnHandleDateCount(maxObject);
	}

	componentDidMount() {
		axios.get(`https://api.covid19india.org/data.json`)
	      .then(res => {
	        var index = this.props.index;
	        var dataKey = this.props.index.slice(5);

	        const timeSeriesData = [];
	        var dailyData = {};
	        dailyData.id = dataKey.charAt(0).toUpperCase() + dataKey.slice(1);
	        dailyData.data = [];

	        res.data.cases_time_series.map((item) => {
	        	var date = new Date(item.date+' 2020');
	        	var yyyy = date.getFullYear();
	        	var mm = ("0" + (date.getMonth() + 1)).slice(-2);
	        	var dd = ("0" + date.getDate()).slice(-2);

	        	date = yyyy+'-'+mm+'-'+dd;

	        	dailyData.data.push({
	        		x: date,
	        		y: item[index]
	        	});
	        });
	        dailyData.data.sort(function(a, b) {
			    a = new Date(a.x);
			    b = new Date(b.x);
			    return a>b ? -1 : a<b ? 1 : 0;
			});
			dailyData.data = dailyData.data.slice(0, 30);
	        timeSeriesData.push(dailyData);
	        this.setState({ timeSeriesData }, () => {
	        	this.handleDateCount(timeSeriesData);
	        });
	      })
	}

	render() {
		return (
			<React.Fragment>
				{this.state.timeSeriesData &&
					<CoronaCasesDailySmallLine data={this.state.timeSeriesData} />
				}
			</React.Fragment>
		)
	}
}

export default IgnoreTimeSeriesChartSmall;