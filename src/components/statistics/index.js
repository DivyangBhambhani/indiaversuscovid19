import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../common/Header';

export default function Statistics() {
	return (
		<Header>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12} lg={12}>
						Statistics
					</Grid>
	        	</Grid>
        	</div>
		</Header>
	)
}