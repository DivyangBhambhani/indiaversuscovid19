import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import LinearGradient from './LinearGradient';
import QuickInformationDrawer from '../dashboard/QuickInformationDrawer';
import {
	INDIA_TOPO_JSON,
	INDIA_PROJECTION_CONFIG,
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
				if(item.name == 'Jammu and Kashmir') {
					var ladakhIndex = dataset.stateCasesData.findIndex(element => element.name == 'Ladakh')
					mapData[index].value = item.confirmed + dataset.stateCasesData[17].confirmed;
					mapData[index].recovered = item.recovered + dataset.stateCasesData[17].recovered;
					mapData[index].deaths = item.deaths + dataset.stateCasesData[17].deaths;
				} else {
					mapData[index].value = item.confirmed;
					mapData[index].recovered = item.recovered;
					mapData[index].deaths = item.deaths;
				}
			}
		})
		return mapData;
	}
	return [];
};

export default function IndiaHeatmapChoroplethChart(props) {
	const [tooltipStateName, setTooltipStateName] = useState('');
	const [tooltipConfirmCases, setTooltipConfirmCases] = useState('');
	const [tooltipRecoverCases, setTooltipRecoverCases] = useState('');
	const [tooltipDeceasedCases, setTooltipDeceasedCases] = useState('');
	const [data, setData] = useState([]);
	const [geoClicked, setGeoClicked] = useState(false);
	const [geoFetch, setGeoFetch] = useState('');

	useEffect(() => {
	    setData(getHeatMapData(props));
	}, [props]);

	const gradientData = {
		fromColor: COLOR_RANGE[0],
		toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
		min: 0,
		max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
	};

	const colorScale = scaleQuantize()
		.domain([0,data.reduce((max, item) => (item.value > max ? item.value : max), 0)])
		.range(COLOR_RANGE);

	const onMouseEnter = (geo, current = { value: 'NA' }) => {
		return () => {
		  setTooltipStateName(geo.properties.name);
		  setTooltipConfirmCases(current.value);
		  setTooltipRecoverCases(current.recovered);
		  setTooltipDeceasedCases(current.deaths);
		  setGeoClicked(false)
		  setGeoFetch('')
		};
	};

	const onMouseLeave = () => {
		setTooltipStateName('');
		setTooltipConfirmCases('');
	};

	const onClickMapGeography = (geo, current = { value: 'NA' }) => {
		return (e) => {

			if (!e) var e = window.event
		    e.cancelBubble = true;
		    if (e.stopPropagation) e.stopPropagation();

			// setGeoFetch(geo);
			// setGeoClicked(true);
			props.fnStateClicked(geo);
		};
	};
	return (
		<div className="full-width-height container">
		  	<ReactTooltip>
		  		{tooltipStateName &&
		  			<ul className="list-group" id="tooltipList">
		  			  <li className="list-group-item d-flex justify-content-between align-items-center bg-danger text-light lead">
					    {tooltipStateName}
					    <span className="p-1 badge badge-primary badge-pill"></span>
					  </li>
					  <li className="list-group-item d-flex justify-content-between align-items-center">
					    <span>Confirm</span>
					    <span className="p-1 badge badge-primary badge-pill">{tooltipConfirmCases}</span>
					  </li>
					  <li className="list-group-item d-flex justify-content-between align-items-center">
					    Recover 
					    <span className="p-1 badge badge-success badge-pill">{tooltipRecoverCases}</span>
					  </li>
					  <li className="list-group-item d-flex justify-content-between align-items-center">
					    Deaths 
					    <span className="p-1 badge badge-danger badge-pill">{tooltipDeceasedCases}</span>
					  </li>
					</ul>
		  		}
		  	</ReactTooltip>
		    <ComposableMap
		      projectionConfig={INDIA_PROJECTION_CONFIG}
		      projection="geoMercator"
		      width={450}
		      height={470}
		      data-tip=""
		    >
		    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
		      <Geographies geography={INDIA_TOPO_JSON}>
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
		                onClick={onClickMapGeography(geo, current)}
		              />
		            );
		          })
		        }
		      </Geographies>
		    </ComposableMap>
		    <LinearGradient data={gradientData} />
		</div>
	);
}