import React from 'react';
import { menuKeys } from "../constants";

import { Spin } from 'antd';
import { withAuth0 } from '@auth0/auth0-react';


class Landing extends React.Component {

	componentDidMount() {
        localStorage.setItem('menuKey', menuKeys.LIST)
	}

	render() {
		const { isAuthenticated } = this.props.auth0;
		if (isAuthenticated) {
			return <div className="centerSpin"></div>
		}
		else {
			return <div>Hello, Dan</div>
		}


	}

}


export default withAuth0(Landing);