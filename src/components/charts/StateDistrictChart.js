import React from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

const keys = ["Active", "Confirmed", "Deceased", "Recovered"];

const CoronaCasesStateDistrictBar = ({ data }) => (
	<div className="chart">
		<ResponsiveBar
	        data={data}
	        keys={keys}
	        indexBy="district"
	        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
	        padding={0.3}
	        defs={[
	            {
	                id: 'dots',
	                type: 'patternDots',
	                background: 'inherit',
	                color: '#38bcb2',
	                size: 4,
	                padding: 1,
	                stagger: true
	            },
	            {
	                id: 'lines',
	                type: 'patternLines',
	                background: 'inherit',
	                color: '#f1e15a',
	                rotation: -45,
	                lineWidth: 6,
	                spacing: 10
	            }
	        ]}
	        fill={[
	            {
	                match: {
	                    id: 'Recovered'
	                },
	                id: 'dots'
	            },
	            {
	                match: {
	                    id: 'Active'
	                },
	                id: 'lines'
	            }
	        ]}
	        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
	        axisTop={null}
	        axisRight={null}
	        axisBottom={{
	            tickSize: 0,
	            tickPadding: 5,
	            tickRotation: 0,
	            legend: '',
	            tickRotation: -45,
	            legendPosition: 'middle',
	            legendOffset: 32
	        }}
	        axisLeft={{
	            tickSize: 0,
	            tickPadding: 5,
	            tickRotation: 0,
	            legend: '',
	            legendPosition: 'middle',
	            legendOffset: -40
	        }}
	        labelSkipWidth={12}
	        labelSkipHeight={12}
	        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
	        legends={[
	            {
	                dataFrom: 'keys',
	                anchor: 'top-right',
	                direction: 'column',
	                justify: false,
	                translateX: 120,
	                translateY: 0,
	                itemsSpacing: 2,
	                itemWidth: 100,
	                itemHeight: 20,
	                itemDirection: 'left-to-right',
	                itemOpacity: 0.85,
	                itemTextColor: '#bfc9d4',
	                symbolShape: 'circle',
	                symbolSize: 20,
	                effects: [
	                    {
	                        on: 'hover',
	                        style: {
	                            itemOpacity: 0.5
	                        }
	                    }
	                ]
	            }
	        ]}
	        animate={true}
	        motionStiffness={90}
	        motionDamping={15}
	        groupMode="stacked"
	        colors={['#ff9f43', '#ea5455', '#28c76f', '#61cdbb']} // #28c76f-green, #ea5455-red, #ff9f43-yellow
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
	                    <div style={{ paddingBottom: '5px' }}>
	                    	<b>{tooltipDate}</b>
	                    </div>
	                    <hr/>
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
		        },
		        grid: {
			        line: {
			            stroke: "#303242",
			            strokeWidth: 2
			        }
		        }
		    }}
	    />
	</div>
);

class StateDistrictChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stateDistrictData: []
		}
	}

	componentDidMount() {
		axios.get(`https://api.covid19india.org/state_district_wise.json`)
	      	.then(res => {
	      		var stateDistrictData = [];
				var districtBarData = [];
				var individualStateDistrictData = {};
				var districtData = []
				Object.keys(res.data).forEach((stateName, index) => {
					var stateData = res.data[stateName];
					individualStateDistrictData = {};
					districtBarData = [];
					individualStateDistrictData.name = stateName;
					Object.keys(stateData.districtData).forEach((districtName, index) => {
						districtData = stateData.districtData[districtName];
						districtBarData.push({
							"district": districtName,
						    "Confirmed": districtData.confirmed,
						    "ConfirmedColor": "hsl(267, 70%, 50%)",
						    "Deceased": districtData.deceased,
						    "DeceasedColor": "hsl(7, 70%, 50%)",
						    "Recovered": districtData.recovered,
						    "RecoveredColor": "hsl(92, 70%, 50%)",
						    "Active": districtData.active,
						    "ActiveColor": "hsl(183, 70%, 50%)",
						});
					})
					individualStateDistrictData.districtData = districtBarData;
					stateDistrictData.push(individualStateDistrictData);
				})
		        this.setState({ stateDistrictData });
      		})
	}

	render() {
		return (
				<div className="mb-5 mt-5">
					{(this.state.stateDistrictData && this.state.stateDistrictData.length > 0) &&
						<div>
							<h4>Covid-19 Cases - District Wise - {this.state.stateDistrictData[0].name}</h4>
							<CoronaCasesStateDistrictBar data={this.state.stateDistrictData[0].districtData} />
						</div>
					}

				</div>
				
		)
	}
}

export default StateDistrictChart;