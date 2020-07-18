import React from 'react';
import { menuKeys } from "../constants";


class Landing extends React.Component {

	componentDidMount() {
        localStorage.setItem('menuKey', menuKeys.LIST)
	}

	render() {

		return(


			<div> 

				Hello, Dan 

			</div>
			)

	}




}


export default Landing;