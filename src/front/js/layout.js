import 'boxicons';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './component/footer';
import { Navbar } from './component/navbar';

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/

	return (
		<div className="App">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

{
	/* <Navbar />
<Outlet />
<Footer /> */
}
