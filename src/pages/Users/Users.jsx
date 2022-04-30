import { useEffect, useState } from 'react';
import { getAllUsers } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './Users.module.scss';
import Sidebar from '../../components/SideBar/Sidebar';

//COMPONENTES
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

import baseURL from '../../config/baseUrl';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { notifyError, notifySuccess } from '../../utils/notifications';

/*
Traer todos los usuarios 
Mostrar los primeros 10 nuevos usuarios, y luego un boton para desplegar más 
Con un páginado de 20 por página
*/

const pageSize = 10; // Para cambiar el tamaño del paginado

const Users = () => {
	const [page, setPage] = useState(0);
	const dispatch = useDispatch();
	const users = useSelector((state) => state.allUsers);
	const adminToken = useSelector((state) => state.currentUser.accessToken);

	const toggleMenu = (id) => {
		console.log(document.querySelector(`#${id}`));
		document.querySelector(`#${id}`).classList.toggle(style.enable);
	};

	useEffect(() => {
		dispatch(getAllUsers(adminToken));
	}, [dispatch]);

	return (
		<Sidebar title='List user'>
			<div className={style.tableContainer}>
				<h1 className={style.title}>List Users</h1>

				<div className={style.titleTable}>
					<h4>Email</h4>
					<h4>Name</h4>
					<h4>Creation date</h4>
					<h4>User type</h4>
				</div>

				<div className={style.usersContainer}>
					{users.slice(page * pageSize, (page + 1) * pageSize).map((e, i) => {
						let date = new Date();
						let time = e.createdAt.split('T')[0].split('-').reverse();
						let yearsDiff = date.getFullYear() - time[2];
						let monthsDiff = date.getMonth() + 1 - time[1];
						return (
							<div className={style.userElement} key={e.id}>
								<p>{e.email}</p>
								<p>{e.username}</p>
								<p>
									{time.join('/')}
									{yearsDiff + monthsDiff
										? ', ' +
										  (yearsDiff
												? yearsDiff + ' year' + (yearsDiff === 1 ? '' : 's')
												: '') +
										  ' ' +
										  (monthsDiff
												? monthsDiff + ' month' + (monthsDiff === 1 ? '' : 's')
												: '') +
										  ' ago'
										: ''}
								</p>
								<p>{e.isAdmin ? 'Admin' : 'Employee'}</p>

								<div className={style.menu}>
									<button onClick={() => toggleMenu(`m${e.id}`)}>
										<MoreVertIcon />
									</button>
									<div className={style.menuContainer} id={`m${e.id}`}>
										<List>
								
											<button
												component='button'
												onClick={() => {
													baseURL
														.put(
															`/user/role/${e.id}`,
															{},
															{ headers: { token: adminToken } }
														)
														.then((res) => {notifySuccess(res.data.message); dispatch(getAllUsers(adminToken));})
														.catch((err) =>
															notifyError(err.response.data.error)
														);
												}}
											>
												<ListItemText primary='Cambiar privilegios' />
											</button>

											<button
												component='button'
												onClick={() => {
													baseURL
														.put(
															`/user/ban/${e.id}`,
															{},
															{ headers: { token: adminToken } }
														)
														.then((res) =>{notifySuccess(res.data.message);dispatch(getAllUsers(adminToken));})
														.catch((err) =>
															notifyError(err.response.data.error)
														);
												}}
											>
												<ListItemText primary='Banear usuario' />
											</button>
										</List>
									</div>
								</div>
							</div>
						);
					})}

					<div className={style.pag}>
						<button
							type='button'
							onClick={() => {
								if (page > 0) setPage(page - 1);
							}}
						>
							Previous
						</button>
						<button
							type='button'
							onClick={() => {
								if ((page + 1) * pageSize < users.length) setPage(page + 1);
							}}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</Sidebar>
	);
};
export default Users;
