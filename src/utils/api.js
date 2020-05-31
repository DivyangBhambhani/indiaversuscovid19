import axios from 'axios';

export const timeSeriesChartData = () => {
	return axios.get(`https://api.covid19india.org/data.json`)
	      .then(res => {
	        const timeSeriesData = [];
	        var dailyConfirmedData = {};
	        var dailyDeceasedData = {};
	        var dailyRecoveredData = {};
	        
	        dailyConfirmedData.id = 'Confirmed';
	        dailyConfirmedData.data = [];
	        dailyDeceasedData.id = 'Deceased';
	        dailyDeceasedData.data = [];
	        dailyRecoveredData.id = 'Recovered';
	        dailyRecoveredData.data = [];

	        res.data.cases_time_series.map((item,index) => {
	        	var date = new Date(item.date+' 2020');
	        	var yyyy = date.getFullYear();
	        	var mm = ("0" + (date.getMonth() + 1)).slice(-2);
	        	var dd = ("0" + date.getDate()).slice(-2);

	        	date = yyyy+'-'+mm+'-'+dd;

	        	dailyConfirmedData.data.push({
	        		x: date,
	        		y: item.totalconfirmed
	        	});
	        	dailyRecoveredData.data.push({
	        		x: date,
	        		y: item.totalrecovered
	        	});
	        	dailyDeceasedData.data.push({
	        		x: date,
	        		y: item.totaldeceased
	        	});
	        });
	        timeSeriesData.push.apply(timeSeriesData, [dailyConfirmedData, dailyDeceasedData, dailyRecoveredData]);
	        return {
				status: 'success',
				data: timeSeriesData,
				error: []
			}
	    })
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}

export const getCasesTimeSeries = () => {
	return axios.get(`https://api.covid19india.org/state_district_wise.json`)
		.then(res => {
			var individualStateCasesData = {};
			var stateCasesData = [];
			var districtData = [];
			var confirmed = 0;
			var recovered = 0;
			var deaths = 0;
			Object.keys(res.data).forEach((stateName, index) => {
				var stateData = res.data[stateName];
				confirmed = 0;
				recovered = 0;
				deaths = 0;
				individualStateCasesData = {};
				individualStateCasesData.name = stateName;
				
				Object.keys(stateData.districtData).forEach((districtName, index) => {
				  	districtData = stateData.districtData[districtName];
				  	confirmed += districtData.confirmed;
				  	recovered += districtData.recovered;
				  	deaths += districtData.deceased;
				})
				
				individualStateCasesData.confirmed = confirmed;
				individualStateCasesData.recovered = recovered;
				individualStateCasesData.deaths = deaths;
				stateCasesData.push(individualStateCasesData);
			})
			return {
				status: 'success',
				data: stateCasesData,
				error: []
			}
	    })
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}

export const getTotalSummaryData = () => {
	return axios.get(`https://api.covid19india.org/data.json`)
		.then(res => {
			var dmydate = res.data.statewise[0].lastupdatedtime;
			var dateString = dmydate.substr(6, 4)+"-"+dmydate.substr(3, 2)+"-"+dmydate.substr(0, 2);
			var mdydate = new Date(dateString).toDateString();
			res.data.statewise[0].lastupdatedtime = mdydate;
			return {
				status: 'success',
				data: res.data.statewise[0],
				error: []
			}
	    })
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}

export const getDistrictDataByState = (stateName) => {
	console.log(stateName,'stateName');
	return axios.get('https://api.covid19india.org/state_district_wise.json')
		.then(res => {
			var confirmed = 0;
			var active = 0;
			var recovered = 0;
			var deaths = 0;
			var stateData = [];
			Object.keys(res.data[stateName].districtData).forEach((districtName, index) => {
				var districtData = res.data[stateName].districtData[districtName];
				districtData.name = districtName;
				stateData.push(districtData);
			})
			return {
				status: 'success',
				data: stateData,
				error: []
			}
		})
		.catch(err => {
			return {
				status: 'error',
				data: [],
				error: err
			}	
		})
}

export const getDailyCasesSummary = (index) => {
	return axios.get(`https://api.covid19india.org/data.json`)
	      .then(res => {
	        var dataKey = index.slice(5);

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
	        var caseTypeIndex = timeSeriesData.map((x,index) => {
	        	return x.id.toLowerCase(); 
	        }).indexOf(dataKey);
	        var finalData = timeSeriesData[caseTypeIndex];
	        return {
				status: 'success',
				data: finalData,
				error: []
			}
		})
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}

export const getZoneMapData = () => {
	return axios.get(`https://api.covid19india.org/zones.json`)
		.then(res => {
			return {
				status: 'success',
				data: res.data,
				error: []
			}
		})
		.catch(err => {
			return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}		
		})
}

export const getStateWiseData = () => {
	return axios.get(`https://api.covid19india.org/data.json`)
		.then(res => {
			var totalDataObj = res.data.statewise.shift();
			res.data.statewise.sort(function(a, b) {
			    a = new Date(a.confirmed);
			    b = new Date(b.confirmed);
			    return a>b ? -1 : a<b ? 1 : 0;
			});
			res.data.statewise.push(totalDataObj);
			return {
				status: 'success',
				data: res.data.statewise,
				error: []
			}
	    })
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}

export const getStatewiseZoneCount = () => {
	return axios.get(`https://api.covid19india.org/zones.json`)
		.then(res => {
			const allZoneCountObj = res.data.zones.reduce((stateAcc, {state, zone}, curindex) => {
				var curState = state;
				const filterState = res.data.zones.filter(({state}) => state == curState);
			  
			  	var zoneCount = filterState.reduce((zoneAcc, {zone}) => {
			            
		            if(zone == 'Green')
		            	zoneAcc['Green'] = (zoneAcc['Green'] || 0) + 1;
		            if(zone == 'Orange')
		            	zoneAcc['Orange'] = (zoneAcc['Orange'] || 0) + 1;
		            if(zone == 'Red')
		            	zoneAcc['Red'] = (zoneAcc['Red'] || 0) + 1;
			            
		            return zoneAcc;
			    }, { Green:0, Red:0, Orange:0 });

			  	var curStateZoneCountArr = {};
			  	curStateZoneCountArr['state'] = curState;
			  	curStateZoneCountArr['zonecount'] = zoneCount;
			  	if(stateAcc.findIndex(element => element.state == curState) == -1)
			  		stateAcc.push(curStateZoneCountArr);
			  	return stateAcc;
			}, []);

			return {
				status: 'success',
				data: allZoneCountObj,
				error: []
			}
		})
		.catch(err => {
			return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}		
		})
} 

export const getZonesByState = (curState) => {
	return axios.get(`https://api.covid19india.org/zones.json`)
		.then(res => {
			var zoneData = [];
			if(curState == 'All') {
				zoneData = res.data.zones;
			} else {
				zoneData = res.data.zones.filter(({state}) => state == curState);
			}
		  	const zoneList = zoneData.map((item,index) => {
		  		return {
		  			name: item.state,
		  			district: item.district,
		  			zone: item.zone,
		  			lastUpdated: item.lastupdated
		  		}
		  	})
		    return {
				status: 'success',
				data: zoneList,
				error: []
			}
		})
		.catch(err => {
			return {
				status: 'error',
				data: [],
				error: err
			}
		})
}

export const getLockdownSummary = (startdate, enddate) => {
	return axios.get(`https://api.covid19india.org/data.json`)
	      .then(res => {
	        const timeSeriesData = [];
	        var dailyConfirmedData = {};
	        var dailyDeceasedData = {};
	        var dailyRecoveredData = {};
	        var rangeData = [];

	        dailyConfirmedData.id = 'Confirmed';
	        dailyConfirmedData.data = [];
	        dailyDeceasedData.id = 'Deceased';
	        dailyDeceasedData.data = [];
	        dailyRecoveredData.id = 'Recovered';
	        dailyRecoveredData.data = [];
	        var startIndex = res.data.cases_time_series.findIndex(element => (new Date(element.date+' 2020').toDateString() == startdate.toDateString()));
			var endIndex = res.data.cases_time_series.findIndex(element => (new Date(element.date+' 2020').toDateString() == enddate.toDateString()));
			var rangeData = res.data.cases_time_series.slice(startIndex, endIndex+1);

	        rangeData.map((item,index) => {
	        	var date = new Date(item.date+' 2020');
	        	var yyyy = date.getFullYear();
	        	var mm = ("0" + (date.getMonth() + 1)).slice(-2);
	        	var dd = ("0" + date.getDate()).slice(-2);

	        	date = yyyy+'-'+mm+'-'+dd;

	        	dailyConfirmedData.data.push({
	        		x: date,
	        		y: item.totalconfirmed
	        	});
	        	dailyRecoveredData.data.push({
	        		x: date,
	        		y: item.totalrecovered
	        	});
	        	dailyDeceasedData.data.push({
	        		x: date,
	        		y: item.totaldeceased
	        	});
	        });
	        dailyConfirmedData.data.sort(function(a, b) {
				a = new Date(a.x);
				b = new Date(b.x);
				return a<b ? -1 : a>b ? 1 : 0;
			});
			dailyRecoveredData.data.sort(function(a, b) {
				a = new Date(a.x);
				b = new Date(b.x);
				return a<b ? -1 : a>b ? 1 : 0;
			});
			dailyDeceasedData.data.sort(function(a, b) {
				a = new Date(a.x);
				b = new Date(b.x);
				return a<b ? -1 : a>b ? 1 : 0;
			});
	        timeSeriesData.push.apply(timeSeriesData, [dailyConfirmedData, dailyDeceasedData, dailyRecoveredData]);
			console.log(startdate, timeSeriesData,'timeSeriesData');
	        return {
				status: 'success',
				data: timeSeriesData,
				error: []
			}
	    })
	    .catch(err => {
	    	return {
	    		status: 'error',
	    		data: [],
	    		error: err
	    	}
	    })
}