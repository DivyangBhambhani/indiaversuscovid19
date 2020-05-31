/**
 * [Heatmaps - IndiaHeatmapChoroplethChart, IndiaZonemapChoroplethChart]
 */
export const INDIA_TOPO_JSON = require('./components/charts/mapsJson/india.topo.json');
export const INDIA_UPDATED_TOPO_JSON = require('./components/charts/mapsJson/india_updated.topo.json');

export const ANDAMAN_NICOBAR_TOPO_JSON = require('./components/charts/mapsJson/andamannicobarislands.topo.json');
export const ANDHRA_PRADESH_TOPO_JSON = require('./components/charts/mapsJson/andhrapradesh.topo.json');
export const ARUNACHAL_PRADESH_TOPO_JSON = require('./components/charts/mapsJson/arunachalpradesh.topo.json');
export const ASSAM_TOPO_JSON = require('./components/charts/mapsJson/assam.topo.json');
export const BIHAR_TOPO_JSON = require('./components/charts/mapsJson/bihar.topo.json');
export const CHANDIGARH_TOPO_JSON = require('./components/charts/mapsJson/chandigarh.topo.json');
export const CHHATTISGARH_TOPO_JSON = require('./components/charts/mapsJson/chhattisgarh.topo.json');
export const DELHI_TOPO_JSON = require('./components/charts/mapsJson/delhi.topo.json');
export const DNH_AND_DD_TOPO_JSON = require('./components/charts/mapsJson/dnh-and-dd.topo.json');
export const GOA_TOPO_JSON = require('./components/charts/mapsJson/goa.topo.json');
export const GUJARAT_TOPO_JSON = require('./components/charts/mapsJson/gujarat.topo.json');
export const HARYANA_TOPO_JSON = require('./components/charts/mapsJson/haryana.topo.json');
export const HIMACHAL_PRADESH_TOPO_JSON = require('./components/charts/mapsJson/himachalpradesh.topo.json');
export const JAMMU_KASHMIR_TOPO_JSON = require('./components/charts/mapsJson/jammukashmir.topo.json');
export const JHARKHAND_TOPO_JSON = require('./components/charts/mapsJson/jharkhand.topo.json');
export const KARNATAKA_TOPO_JSON = require('./components/charts/mapsJson/karnataka.topo.json');
export const KERALA_TOPO_JSON = require('./components/charts/mapsJson/kerala.topo.json');
export const LADAKH_TOPO_JSON = require('./components/charts/mapsJson/ladakh.topo.json');
export const LAKSHADWEEP_TOPO_JSON = require('./components/charts/mapsJson/lakshadweep.topo.json');
export const MADHYA_PRADESH_TOPO_JSON = require('./components/charts/mapsJson/madhyapradesh.topo.json');
export const MAHARASHTRA_TOPO_JSON = require('./components/charts/mapsJson/maharashtra.topo.json');
export const MANIPUR_TOPO_JSON = require('./components/charts/mapsJson/manipur.topo.json');
export const MEGHALAYA_TOPO_JSON = require('./components/charts/mapsJson/meghalaya.topo.json');
export const MIZORAM_TOPO_JSON = require('./components/charts/mapsJson/mizoram.topo.json');
export const NAGALAND_TOPO_JSON = require('./components/charts/mapsJson/nagaland.topo.json');
export const ODISHA_TOPO_JSON = require('./components/charts/mapsJson/odisha.topo.json');
export const PUDUCHERRY_TOPO_JSON = require('./components/charts/mapsJson/puducherry.topo.json');
export const PUNJAB_TOPO_JSON = require('./components/charts/mapsJson/punjab.topo.json');
export const RAJASTHAN_TOPO_JSON = require('./components/charts/mapsJson/rajasthan.topo.json');
export const SIKKIM_TOPO_JSON = require('./components/charts/mapsJson/sikkim.topo.json');
export const TAMILNADU_TOPO_JSON = require('./components/charts/mapsJson/tamilnadu.topo.json');
export const TELANGANA_TOPO_JSON = require('./components/charts/mapsJson/telangana.topo.json');
export const TRIPURA_TOPO_JSON = require('./components/charts/mapsJson/tripura.topo.json');
export const UTTARAKHAND_TOPO_JSON = require('./components/charts/mapsJson/uttarakhand.topo.json');
export const UTTAR_PRADESH_TOPO_JSON = require('./components/charts/mapsJson/uttarpradesh.topo.json');
export const WEST_BENGAL_TOPO_JSON = require('./components/charts/mapsJson/westbengal.topo.json');

export const INDIA_PROJECTION_CONFIG = {
  scale: 800,
  center: [81.9629, 22.5937] // always in [East Latitude, North Longitude]
};
export const STATE_PROJECTION_CONFIG = {
  scale: 2800,
  center: [72.654608, 15.606125] // always in [East Latitude, North Longitude]
};
export const COLOR_RANGE = [
  '#FFE5E5',
  '#FFCCCC',
  '#FFB2B2',
  '#FF9999',
  '#FF7F7F',
  '#FF6666',
  '#FF4C4C',
  '#FF3333',
  '#FF0000'
];
export const DEFAULT_COLOR = '#EEE';
export const GEOGRAPHY_STYLE = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    stroke: '#000',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};
export const INDIA_STATES_NAME_CODE_ARRAY = [
  { id: 'AP', state: 'Andhra Pradesh', value: 0 },
  { id: 'AR', state: 'Arunachal Pradesh', value: 0 },
  { id: 'AS', state: 'Assam', value: 0 },
  { id: 'BR', state: 'Bihar', value: 0 },
  { id: 'CT', state: 'Chhattisgarh', value: 0 },
  { id: 'GA', state: 'Goa', value: 0 },
  { id: 'GJ', state: 'Gujarat', value: 0 },
  { id: 'HR', state: 'Haryana', value: 0 },
  { id: 'HP', state: 'Himachal Pradesh', value: 0 },
  { id: 'JH', state: 'Jharkhand', value: 0 },
  { id: 'KA', state: 'Karnataka', value: 0 },
  { id: 'KL', state: 'Kerala', value: 0 },
  { id: 'MP', state: 'Madhya Pradesh', value: 0 },
  { id: 'MH', state: 'Maharashtra', value: 0 },
  { id: 'MN', state: 'Manipur', value: 0 },
  { id: 'ML', state: 'Meghalaya', value: 0 },
  { id: 'MZ', state: 'Mizoram', value: 0 },
  { id: 'NL', state: 'Nagaland', value: 0 },
  { id: 'OD', state: 'Odisha', value: 0 },
  { id: 'PB', state: 'Punjab', value: 0 },
  { id: 'RJ', state: 'Rajasthan', value: 0 },
  { id: 'SK', state: 'Sikkim', value: 0 },
  { id: 'TN', state: 'Tamil Nadu', value: 0 },
  { id: 'TS', state: 'Telangana', value: 0 },
  { id: 'TR', state: 'Tripura', value: 0 },
  { id: 'UK', state: 'Uttarakhand', value: 0 },
  { id: 'UP', state: 'Uttar Pradesh', value: 0 },
  { id: 'WB', state: 'West Bengal', value: 0 },
  { id: 'AN', state: 'Andaman and Nicobar Islands', value: 0 },
  { id: 'CH', state: 'Chandigarh', value: 0 },
  { id: 'DN', state: 'Dadra and Nagar Haveli', value: 0 },
  { id: 'DD', state: 'Daman and Diu', value: 0 },
  { id: 'DL', state: 'Delhi', value: 0 },
  { id: 'JK', state: 'Jammu and Kashmir', value: 0 },
  { id: 'LA', state: 'Ladakh', value: 0 },
  { id: 'LD', state: 'Lakshadweep', value: 0 },
  { id: 'PY', state: 'Puducherry', value:0 }
];

export const STATE_POPULATIONS = [
  {name: 'Andaman and Nicobar Islands', population: 397000},
  {name: 'Andhra Pradesh', population: 52221000},
  {name: 'Arunachal Pradesh', population: 1504000},
  {name: 'Assam', population: 34293000},
  {name: 'Bihar', population: 119520000},
  {name: 'Chandigarh', population: 1179000},
  {name: 'Chhattisgarh', population: 28724000},
  {name: 'Dadra and Nagar Haveli and Daman and Diu', population: 959000},
  {name: 'Delhi', population: 19814000},
  {name: 'Goa', population: 1540000},
  {name: 'Gujarat', population: 67936000},
  {name: 'Haryana', population: 28672000},
  {name: 'Himachal Pradesh', population: 7300000},
  {name: 'Jammu and Kashmir', population: 13203000},
  {name: 'Jharkhand', population: 37403000},
  {name: 'Karnataka', population: 65798000},
  {name: 'Kerala', population: 35125000},
  {name: 'Ladakh', population: 293000},
  {name: 'Lakshadweep', population: 68000},
  {name: 'Madhya Pradesh', population: 82232000},
  {name: 'Maharashtra', population: 122153000},
  {name: 'Manipur', population: 3103000},
  {name: 'Meghalaya', population: 3224000},
  {name: 'Mizoram', population: 1192000},
  {name: 'Nagaland', population: 2150000},
  {name: 'Odisha', population: 43671000},
  {name: 'Puducherry', population: 1504000},
  {name: 'Punjab', population: 29859000},
  {name: 'Rajasthan', population: 77264000},
  {name: 'Sikkim', population: 664000},
  {name: 'Tamil Nadu', population: 75695000},
  {name: 'Telangana', population: 37220000},
  {name: 'Tripura', population: 3992000},
  {name: 'Uttar Pradesh', population: 224979000},
  {name: 'Uttarakhand', population: 11141000},
  {name: 'West Bengal', population: 96906000},
  {name: 'Total', population: 1332900000},
];