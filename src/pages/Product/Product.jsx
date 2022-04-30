import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//COMPONENTES
import baseURL from '../../config/baseUrl';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button } from '@mui/material';

import style from './Product.module.scss';

const Product = () => {
	const { sku } = useParams();
	const token = useSelector((state) => state.currentUser.accessToken);
	const [product, setProduct] = useState({
		title: '',
		description: '',
		price: '',
		stock: '',
		sku: sku,
	});

	const handlerChange = (event) => {
		console.log(event.target.name, event.target.value);
		switch(event.target.name){
		      case "product":
		            console.log('Hola')
		            setProduct({
		                  ...product,
		                  categories : [...product, event.target.value]
		            })
		            return;
		      default:
		            console.log('Hola2')
		            setProduct({
		                  ...product,
		                  [event.target.name] : event.target.value
		            })
		}
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		baseURL.put(`/product/${sku}`,{...product},{
		      headers:{
		            token
		      }
		})
		.then(res => notifySuccess(res.data.success))
		.catch(err => notifyError(err.response.data.error))
	};

	useEffect(() => {
		baseURL
			.get(`/product/${sku}`, {
				headers: {
					token,
				},
			})
			.then((res) => {
				setProduct(res.data);
			})
			.catch((err) => notifyError(err.response.data.error));
	}, []);

	return (
		<div className={style.container}>
			<Button
				style={{ position: 'absolute', top: 0 }}
				variant='contained'
				onClick={() => window.history.back()}
			>
				Back
			</Button>

			<div className={style.productInfo}></div>

			<form className={style.formContainer} onSubmit={handlerSubmit}>
				<TextField
					className='textf_'
					label='Title'
					name='title'
					value={product.title}
					onChange={handlerChange}
				/>

				<TextField
					className='textf_'
					label='Price'
					name='price'
					type='number'
					value={product.price}
					onChange={handlerChange}
				/>

				<TextField
					className='textf_'
					label='Stock'
					name='stock'
					type='number'
					value={product.stock}
					onChange={handlerChange}
				/>

				<textarea
					className='text_f_'
					value={product.description}
					name='description'
					onChange={handlerChange}
				/>

				<Button type='submit' variant='contained'>
					Update
				</Button>
			</form>
		</div>
	);
};
export default Product;
