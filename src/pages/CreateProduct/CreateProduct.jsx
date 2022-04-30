import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import baseURL from '../../config/baseUrl';
import style from './CreateProduct.module.scss';
import Sidebar from '../../components/SideBar/Sidebar';

//COMPONENTES

import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CreateProduct = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const token = useSelector((state) => state.currentUser.accessToken);
	const userId = useSelector((state) => state.currentUser.user.id);
	const [status, setStatus] = useState({});
	const [product, setProduct] = useState({
		title: '',
		description: '',
		price: '',
		stock: '',
	});

	const handlerChange = (event) => {
		switch (event.target.name) {
			case 'category':
				setProduct({
					...product,
					categories: [...product.categories, event.target.value],
				});
				return;
			default:
				setProduct({
					...product,
					[event.target.name]: event.target.value,
				});
		}
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		console.log(product);
		baseURL
			.post(
				'product',
				{
					title: product.title,
					description: product.description,
					price: product.price,
					stock: product.stock,
					ownerId: userId,
				},
				{
					headers: {
						token,
					},
				}
			)
			.then((res) => notifySuccess(res.data.success))
			.catch((err) => notifyError(err.response.data.error));
	};

	return (
		<Sidebar title='Crear producto'>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box
						component='form'
						noValidate
						onSubmit={handlerSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Title'
									name='title'
									onChange={handlerChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Price'
									name='price'
									type='number'
									onChange={handlerChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label='Stock'
									name='stock'
									type='number'
									onChange={handlerChange}
								/>
								<Grid item xs={12} sm={12}>
									<TextField
										fullWidth
										label='Description'
										id='fullWidth'
										productss={15}
										cols={80}
										name='description'
										placeholder='Description'
										onChange={handlerChange}
									/>
								</Grid>
							</Grid>
							<Button
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								color='primary'
								onClick={handleClickOpen}
							>
								Create product
							</Button>
							<Dialog
								open={open}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleClose}
								aria-describedby='alert-dialog-slide-description'
							>
								<DialogTitle>
									{'Create product termins and condition'}
								</DialogTitle>
								<DialogContent>
									<DialogContentText id='alert-dialog-slide-description'>
										Sure to create product ?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose}>Not Create</Button>
									<Button type='submit' onClick={handlerSubmit}>
										Yes Create
									</Button>
								</DialogActions>
							</Dialog>
							<Grid container justifyContent='flex-end'>
								<Grid item>
									<Link href='#' variant='body2'>
										Promote your product here !
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</Sidebar>
	);
};

export default CreateProduct;
