import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/actions';

//COMPONENTES
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//ESTILOS
import { indigo } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: indigo[900],
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	const handlerSubmit = (event) => {
		event.preventDefault();
		dispatch(logIn(user.username, user.password, navigate));
	};

	const handlerChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://i.ibb.co/127mK24/PANELADMIN.png)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handlerSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								type='username'
								name='username'
								label='UserName'
								onChange={handlerChange}
							/>

							<TextField
								margin='normal'
								required
								fullWidth
								type='password'
								name='password'
								label='Password'
								onChange={handlerChange}
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Submit
							</Button>
							<Grid container></Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
export default Login;
