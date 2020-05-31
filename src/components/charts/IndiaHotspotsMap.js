import React, { useEffect, useState } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Graticule, Marker } from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import QuickInformationDrawer from '../dashboard/QuickInformationDrawer';
import { getZoneMapData } from '../../utils/api';
import {
	INDIA_UPDATED_TOPO_JSON,
	INDIA_PROJECTION_CONFIG,
	COLOR_RANGE,
	DEFAULT_COLOR,
	GEOGRAPHY_STYLE,
	INDIA_STATES_NAME_CODE_ARRAY } from '../../constants.js';

const markers = [
  { markerOffset: -15, name: 'India', coordinates: [78.3981028599547, 32.52514620626397] },
];

export default function IndiaHotpotsMap(props) {
	const [tooltipStateName, setTooltipStateName] = useState('');
	const [tooltipConfirmCases, setTooltipConfirmCases] = useState('');
	const [tooltipRecoverCases, setTooltipRecoverCases] = useState('');
	const [tooltipDeceasedCases, setTooltipDeceasedCases] = useState('');
	const [data, setData] = useState([]);
	const [current, setCurrent] = useState([]);
	const [hotspots, setHotspots] = useState([]);

	useEffect(() => {
		getZoneMapData().then(res => {
			setData(res.data.zones)
		})
	}, []);

	const onMouseEnter = (geo, current = { value: 'NA' }) => {
		return () => {
			if(current.zone == 'Red') {
				setCurrent(current);
				setTooltipStateName(geo.properties.district+' ('+geo.properties.st_nm+")");
				setTooltipConfirmCases(current.value);
				setTooltipRecoverCases(current.recovered);
				setTooltipDeceasedCases(current.deaths);
			}
		};
	};

	const onMouseLeave = () => {
		setTooltipStateName('');
		setTooltipConfirmCases('');
		setTooltipRecoverCases('');
		setTooltipDeceasedCases('');
	};

	const onClickMapGeography = (geo, current = { value: 'NA' }) => {
		return (e) => {
			if (!e) var e = window.event
		    e.cancelBubble = true;
		    if (e.stopPropagation) e.stopPropagation();
		};
	};
	return (
		<div className="full-width-height container">
			<ReactTooltip>
		  		{tooltipStateName &&
		  			<ul className="list-group" id="tooltipList">
		  			  <li className="list-group-item d-flex justify-content-between align-items-center text-light bg-danger">
					    {tooltipStateName}
					    <div className="p-1 badge badge-primary badge-pill"></div>
					  </li>
					</ul>
		  		}
			</ReactTooltip>
			<ComposableMap
			      projectionConfig={INDIA_PROJECTION_CONFIG}
			      projection="geoMercator"
			      width={450}
			      height={470}
			      data-tip="" >
			    <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
			    <ZoomableGroup zoom={1}>
			      <Geographies geography={INDIA_UPDATED_TOPO_JSON}>
			        { 
			        	({ geographies }) => 
			        		geographies.map(geo => {
				            	const current = data.find(s => s.district === geo.properties.district);
				            	return (
					              	<Geography
										key={geo.rsmKey}
										geography={geo}
										fill={(current && current.zone == 'Red') ? current.zone : "#EAEAEC"}
										stroke="#D6D6DA"
										fillOpacity="1"
										style={GEOGRAPHY_STYLE}
										onMouseEnter={onMouseEnter(geo, current)}
										onMouseLeave={onMouseLeave}
										onClick={onClickMapGeography(geo, current)}
					              	/>
				            	);
		          		})
			        }
			      	</Geographies>
			      </ZoomableGroup>
		    </ComposableMap>
		</div>
	)	
}