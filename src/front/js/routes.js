import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Checkout } from './component/Checkout/Checkout';
import { ProductosPrivados } from './component/Products/ProductosPrivados';
import { ProductsDetails } from './component/Products/ProductsDetails';
import ScrollToTop from './component/scrollToTop';
import { Layout } from './layout';
import { Demo } from './pages/demo';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { OrdersDetail } from './pages/orders_detail';
import { Restore_Password_Request } from './pages/restore_password_request';
import { Restore_Password_Restore } from './pages/restore_password_restore';
import { Signup } from './pages/signup';
import { Single } from './pages/single';
import injectContext from './store/appContext';
import { DataProvider } from './store/Dataprovider';

const AppRoutes = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/

	const basename = process.env.BASENAME || '';

	return (
		<div>
			<DataProvider>
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						<Routes>
							<Route element={<Layout />}>
								<Route index element={<Home />} />
								<Route path="/products">
									<Route index element={<ProductosPrivados />} />
									<Route path=":productId" element={<ProductsDetails />} />
								</Route>
								<Route element={<Signup />} path="/signup" />
								<Route element={<Login />} path="/login" />
								<Route path="/restorepassword">
									<Route index element={<Restore_Password_Request />} />
									<Route
										path=":authorization"
										element={<Restore_Password_Restore />}
									/>
								</Route>
								<Route element={<OrdersDetail />} path="/orders" />
								<Route element={<Demo />} path="/demo" />
								<Route element={<Single />} path="/single/:theid" />
								<Route element={<Checkout />} path="/checkout" />
								<Route element={<h1>Not found!</h1>} />
							</Route>
						</Routes>
					</ScrollToTop>
				</BrowserRouter>
			</DataProvider>
		</div>
	);
};

export default injectContext(AppRoutes);
