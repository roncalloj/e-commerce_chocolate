import 'boxicons';
import React, { useContext } from 'react';
import '../../styles/index.css';
import { Carousel } from '../component/Carousel';
import { Carrito } from '../component/Carrito/Carrito';
import { Barras } from '../component/Products/Barras';
import { ProductosPrivados } from '../component/Products/ProductosPrivados';
import { ReviewsCarousel } from '../component/ReviewsCarousel';
import { Context } from '../store/appContext';

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Carousel />
			<Carrito />
			<ProductosPrivados products={store.products.result} />
		</>
	);
};
