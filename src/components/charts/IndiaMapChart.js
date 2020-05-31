import React from 'react';
import { Chart } from "react-google-charts";
import featuresData from './mapsJson/india-states.json'
import Title from '../common/Title';

function getRandomVal() {
    return Math.ceil(Math.random()*100);
}

const createDataset = (dataset) => {
    if(dataset.length > 0) {
        var stateData = [];
        dataset.map((item,index) => {
            stateData[item.name] = item.cases;
        });
        dataset.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
        return ([
            ['State Code', 'State', 'Population'],
            ['IN-AP', 'Andhra Pradesh', stateData['Andhra Pradesh']],
            ['IN-AR', 'Arunachal Pradesh', stateData['Arunachal Pradesh']],
            ['IN-AS', 'Assam', stateData['Assam']],
            ['IN-BR', 'Bihar', stateData['Bihar']],
            ['IN-CT', 'Chhattisgarh', stateData['Chhattisgarh']],
            ['IN-GA', 'Goa', stateData['Goa']],
            ['IN-GJ', 'Gujarat', stateData['Gujarat']],
            ['IN-HR', 'Haryana', stateData['Haryana']],
            ['IN-HP', 'Himachal Pradesh', stateData['Himachal Pradesh']],
            ['IN-JH', 'Jharkhand', stateData['Jharkhand']],
            ['IN-KA', 'Karnataka', stateData['Karnataka']],
            ['IN-KL', 'Kerala', stateData['Kerala']],
            ['IN-MP', 'Madhya Pradesh', stateData['Madhya Pradesh']],
            ['IN-MH', 'Maharashtra', stateData['Maharashtra']],
            ['IN-MN', 'Manipur', stateData['Manipur']],
            ['IN-ML', 'Meghalaya', stateData['Meghalaya']],
            ['IN-MZ', 'Mizoram', stateData['Mizoram']],
            ['IN-NL', 'Nagaland', stateData['Nagaland']],
            ['IN-OR', 'Odisha', stateData['Odisha']],
            ['IN-PB', 'Punjab', stateData['Punjab']],
            ['IN-RJ', 'Rajasthan', stateData['Rajasthan']],
            ['IN-SK', 'Sikkim', stateData['Sikkim']],
            ['IN-TN', 'Tamil Nadu', stateData['Tamil Nadu']],
            ['IN-TG', 'Telangana', stateData['Telangana']],
            ['IN-TR', 'Tripura', stateData['Tripura']],
            ['IN-UT', 'Uttarakhand', stateData['Uttarakhand']],
            ['IN-UP', 'Uttar Pradesh', stateData['Uttar Pradesh']],
            ['IN-WB', 'West Bengal', stateData['West Bengal']],
            ['IN-AN', 'Andaman and Nicobar Islands', stateData['Andaman and Nicobar Islands']],
            ['IN-CH', 'Chandigarh', stateData['Chandigarh']],
            ['IN-DN', 'Dadra and Nagar Haveli', stateData['Dadra and Nagar Haveli']],
            ['IN-DD', 'Daman and Diu', stateData['Daman and Diu']],
            ['IN-DL', 'Delhi', stateData['Delhi']],
            ['IN-JK', 'Jammu and Kashmir', stateData['Jammu and Kashmir'] + stateData['Ladakh']],
            ['IN-LD', 'Lakshadweep', stateData['Lakshadweep']],
            ['IN-PY', 'Puducherry', stateData['Puducherry']]
        ]);
    }
    return []
}

export default function IndiaMapChoropleth (props) {
    var data = createDataset(props.stateCasesData);
    return(
        <React.Fragment>
            <Title>Geographical distribution of Covid-19 Cases</Title>
            {data &&
                <div className={"gchartindia"}>
                <Chart
                    chartType="GeoChart"
                    data={data}
                    options={{
                        region: 'IN',
                        displayMode: 'regions',
                        resolution: 'provinces',
                    }}
                    mapsApiKey="AIzaSyBRmSzsW2FHC7VKdI_DDfBSUhzzDAsiwd0"
                    rootProps={{ 'data-testid': '1' }}
                    chartEvents={[
                        {
                          eventName: "ready",
                          callback: ({ chartWrapper, google }) => {
                            const chart = chartWrapper.getChart();
                            chart.container.addEventListener("click", (e) => {
                                console.log(e);
                            })
                          }
                        }
                    ]}
                />
            </div>
            }
            
            </React.Fragment>
    )
}