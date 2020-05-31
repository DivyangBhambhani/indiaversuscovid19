import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient';
import {
	ANDAMAN_NICOBAR_TOPO_JSON,
	ANDHRA_PRADESH_TOPO_JSON,
	ARUNACHAL_PRADESH_TOPO_JSON,
	ASSAM_TOPO_JSON,
	BIHAR_TOPO_JSON,
	CHANDIGARH_TOPO_JSON,
	CHHATTISGARH_TOPO_JSON,
	DELHI_TOPO_JSON,
	DNH_AND_DD_TOPO_JSON,
	GOA_TOPO_JSON,
	GUJARAT_TOPO_JSON,
	HARYANA_TOPO_JSON,
	HIMACHAL_PRADESH_TOPO_JSON,
	JAMMU_KASHMIR_TOPO_JSON,
	JHARKHAND_TOPO_JSON,
	KARNATAKA_TOPO_JSON,
	KERALA_TOPO_JSON,
	LADAKH_TOPO_JSON,
	LAKSHADWEEP_TOPO_JSON,
	MADHYA_PRADESH_TOPO_JSON,
	MAHARASHTRA_TOPO_JSON,
	MANIPUR_TOPO_JSON,
	MEGHALAYA_TOPO_JSON,
	MIZORAM_TOPO_JSON,
	NAGALAND_TOPO_JSON,
	ODISHA_TOPO_JSON,
	PUDUCHERRY_TOPO_JSON,
	PUNJAB_TOPO_JSON,
	RAJASTHAN_TOPO_JSON,
	SIKKIM_TOPO_JSON,
	TAMILNADU_TOPO_JSON,
	TELANGANA_TOPO_JSON,
	TRIPURA_TOPO_JSON,
	UTTARAKHAND_TOPO_JSON,
	UTTAR_PRADESH_TOPO_JSON,
	WEST_BENGAL_TOPO_JSON,
	STATE_PROJECTION_CONFIG,
	COLOR_RANGE,
	DEFAULT_COLOR,
	GEOGRAPHY_STYLE,
	INDIA_STATES_NAME_CODE_ARRAY } from '../../constants.js';

const getHeatMapData = (dataset) => {
	var mapData = INDIA_STATES_NAME_CODE_ARRAY;
	if (dataset.stateCasesData.length > 0) {
		dataset.stateCasesData.map((item,i) => {
			var searchTerm = (item.name == 'Dadra and Nagar Haveli and Daman and Diu') ? 'Dadra and Nagar Haveli' : item.name;
			var index = mapData.findIndex(element => element.state == searchTerm);
			if (index !== -1) {
				mapData[index].value = item.cases;
			}
		})
		return mapData;
	}
	return [];
};

const configProjectionAndGeo = (geo) => {
	var topoJson = '';
	var projection_config = '';
	if (geo && geo.properties.name) {
			console.log(JHARKHAND_TOPO_JSON.transform.translate,'geo');
		switch(geo.properties.name) {
			case 'Andhra Pradesh':
				topoJson = ANDHRA_PRADESH_TOPO_JSON;
				projection_config = [80.760595, 16.024077]; // 76.760595, 12.624077
				break;
			case 'Arunachal Pradesh':
				topoJson = ARUNACHAL_PRADESH_TOPO_JSON;
				projection_config = [94.546459, 28.050844]; //91.546459, 26.650844
				break;
			case 'Assam':
				topoJson = ASSAM_TOPO_JSON ;
				projection_config = [93.09860199999998, 26.136603267634122]; //89.69860199999998, 24.136603267634122
				break;
			case 'Bihar':
				topoJson = BIHAR_TOPO_JSON ;
				projection_config = [85.720238, 25.786327]; //83.320238, 24.286327
				break;
			case 'Chhattisgarh':
				topoJson = CHHATTISGARH_TOPO_JSON ;
				projection_config = [82.24647199671277, 21.08769199194691]; //80.24647199671277, 17.78769199194691
				break;
			case 'Goa':
				topoJson = GOA_TOPO_JSON ;
				projection_config = [74.076874, 15.500642000000001]; //73.676874, 14.900642000000001
				break;
			case 'Gujarat':
				topoJson = GUJARAT_TOPO_JSON ;
				projection_config = [71.594952, 22.620452]; //68.094952, 20.120452
				break;
			case 'Haryana':
				topoJson = HARYANA_TOPO_JSON ;
				projection_config = [76.47485342176886, 29.154136819668228]; //74.47485342176886, 27.654136819668228
				break;
			case 'Himachal Pradesh':
				topoJson = HIMACHAL_PRADESH_TOPO_JSON ;
				projection_config = [77.094723, 32.377701000000002]; //75.594723, 30.377701000000002
				break;
			case 'Jharkhand':
				topoJson = JHARKHAND_TOPO_JSON ;
				projection_config = [85.7301316194849, 23.574665795660215]; //83.3301316194849, 21.974665795660215
				break;
			case 'Karnataka':
				topoJson = KARNATAKA_TOPO_JSON ;
				projection_config = KARNATAKA_TOPO_JSON.transform.translate;
				break;
			case 'Kerala':
				topoJson = KERALA_TOPO_JSON ;
				projection_config = KERALA_TOPO_JSON.transform.translate;
				break;
			case 'Madhya Pradesh':
				topoJson = MADHYA_PRADESH_TOPO_JSON ;
				projection_config = MADHYA_PRADESH_TOPO_JSON.transform.translate;
				break;
			case 'Maharashtra':
				topoJson = MAHARASHTRA_TOPO_JSON ;
				projection_config = MAHARASHTRA_TOPO_JSON.transform.translate;
				break;
			case 'Manipur':
				topoJson = MANIPUR_TOPO_JSON ;
				projection_config = MANIPUR_TOPO_JSON.transform.translate;
				break;
			case 'Meghalaya':
				topoJson = MEGHALAYA_TOPO_JSON ;
				projection_config = MEGHALAYA_TOPO_JSON.transform.translate;
				break;
			case 'Mizoram':
				topoJson = MIZORAM_TOPO_JSON ;
				projection_config = MIZORAM_TOPO_JSON.transform.translate;
				break;
			case 'Nagaland':
				topoJson = NAGALAND_TOPO_JSON ;
				projection_config = NAGALAND_TOPO_JSON.transform.translate;
				break;
			case 'Odisha':
				topoJson = ODISHA_TOPO_JSON ;
				projection_config = ODISHA_TOPO_JSON.transform.translate;
				break;
			case 'Punjab':
				topoJson = PUNJAB_TOPO_JSON ;
				projection_config = PUNJAB_TOPO_JSON.transform.translate;
				break;
			case 'Rajasthan':
				topoJson = RAJASTHAN_TOPO_JSON ;
				projection_config = RAJASTHAN_TOPO_JSON.transform.translate;
				break;
			case 'Sikkim':
				topoJson = SIKKIM_TOPO_JSON ;
				projection_config = SIKKIM_TOPO_JSON.transform.translate;
				break;
			case 'Tamil Nadu':
				topoJson = TAMILNADU_TOPO_JSON ;
				projection_config = TAMILNADU_TOPO_JSON.transform.translate;
				break;
			case 'Telangana':
				topoJson = TELANGANA_TOPO_JSON ;
				projection_config = TELANGANA_TOPO_JSON.transform.translate;
				break;
			case 'Tripura':
				topoJson = TRIPURA_TOPO_JSON ;
				projection_config = TRIPURA_TOPO_JSON.transform.translate;
				break;
			case 'Uttarakhand':
				topoJson = UTTARAKHAND_TOPO_JSON ;
				projection_config = UTTARAKHAND_TOPO_JSON.transform.translate;
				break;
			case 'Uttar Pradesh':
				topoJson = UTTAR_PRADESH_TOPO_JSON ;
				projection_config = UTTAR_PRADESH_TOPO_JSON.transform.translate;
				break;
			case 'West Bengal':
				topoJson = WEST_BENGAL_TOPO_JSON ;
				projection_config = WEST_BENGAL_TOPO_JSON.transform.translate;
				break;
			case 'Andaman and Nicobar Islands':
				topoJson = ANDAMAN_NICOBAR_TOPO_JSON ;
				projection_config = ANDAMAN_NICOBAR_TOPO_JSON.transform.translate;
				break;
			case 'Chandigarh':
				topoJson = CHANDIGARH_TOPO_JSON ;
				projection_config = CHANDIGARH_TOPO_JSON.transform.translate;
				break;
			case 'Dadra and Nagar Haveli':
				topoJson = DNH_AND_DD_TOPO_JSON ;
				projection_config = DNH_AND_DD_TOPO_JSON.transform.translate;
				break;
			// case 'Daman and Diu':
			// 	topoJson = MAHARASHTRA_TOPO_JSON ;
			// 	projection_config = [76.654608, 19.006125];
			// 	break;
			case 'Delhi':
				topoJson = DELHI_TOPO_JSON ;
				projection_config = DELHI_TOPO_JSON.transform.translate;
				break;
			case 'Jammu and Kashmir':
				topoJson = JAMMU_KASHMIR_TOPO_JSON ;
				projection_config = JAMMU_KASHMIR_TOPO_JSON.transform.translate;
				break;
			case 'Ladakh':
				topoJson = LADAKH_TOPO_JSON ;
				projection_config = LADAKH_TOPO_JSON.transform.translate;
				break;
			case 'Lakshadweep':
				topoJson = LAKSHADWEEP_TOPO_JSON ;
				projection_config = LAKSHADWEEP_TOPO_JSON.transform.translate;
				break;
			case 'Puducherry':
				topoJson = PUDUCHERRY_TOPO_JSON ;
				projection_config = PUDUCHERRY_TOPO_JSON.transform.translate;
				break;
		}
		return [
			topoJson,
			projection_config
		]
	}
}

export default function StateHeatmapChoroplethChart(props) {
	const [tooltipContent, setTooltipContent] = useState('');
	const [data, setData] = useState([]);
	const [config, setConfig] = useState([]);
	const gradientData = {
		fromColor: COLOR_RANGE[0],
		toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
		min: 0,
		max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
	};

	useEffect(() => {
		if (props.data){
			setConfig(configProjectionAndGeo(props.data));
		}	    
	}, [props]);

	const colorScale = scaleQuantize()
		.domain([0,data.reduce((max, item) => (item.value > max ? item.value : max), 0)])
		.range(COLOR_RANGE);

	const onMouseEnter = (geo, current = { value: 'NA' }) => {
		return () => {
		  setTooltipContent(`${geo.properties.district}: ${current.value}`);
		};
	};

	const onMouseLeave = () => {
		setTooltipContent('');
	};
console.log(config);
	return (
		<React.Fragment>
			{
				config.length > 0 &&
				<div className="full-width-height container">
				  <ReactTooltip>{tooltipContent}</ReactTooltip>
				    <ComposableMap
				      	projectionConfig={{
					      	scale: 2400,
		  					center: config[1]
	  					}}
					    projection="geoMercator"
					    width={450}
					    height={300}
					    data-tip=""
				    >
				      <Geographies geography={config[0]}>
				        {({ geographies }) =>
				          geographies.map(geo => {
				            const current = data.find(s => s.id === geo.id);
				            return (
				              <Geography
				                key={geo.rsmKey}
				                geography={geo}
				                fill={current ? colorScale(current.value) : DEFAULT_COLOR}
				                fillOpacity="1"
				                stroke={current ? '#fff' : '#000'}
				                style={GEOGRAPHY_STYLE}
				                onMouseEnter={onMouseEnter(geo, current)}
				                onMouseLeave={onMouseLeave}
				              />
				            );
				          })
				        }
				      </Geographies>
				    </ComposableMap>
				    <LinearGradient data={gradientData} />
				</div>
			}
		</React.Fragment>
		
	);
}