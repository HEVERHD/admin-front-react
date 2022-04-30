import React, { useEffect,useState } from 'react';
import {useSelector} from 'react-redux';
import style from './ProductsContainer.module.scss';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import baseURL from '../../config/baseUrl';
import { Autocomplete, TextField } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


//COMPONENTES
import { notifyError, notifySuccess } from '../../utils/notifications';




function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'title',
		numeric: false,
		disablePadding: true,
		label: 'Title',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'sku',
		numeric: true,
		disablePadding: false,
		label: 'Sku',
	},
	{
		id: 'stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock',
	},
	{
		id: 'UserID',
		numeric: true,
		disablePadding: false,
		label: 'UserID',
	},

	{
		id: 'CreationDate',
		numeric: true,
		disablePadding: false,
		label: 'CreationDate',
	},

	{
		id: 'description',
		numeric: true,
		disablePadding: false,
		label: 'description',
	},
];

function EnhancedTableHead(props) {
	const {
		order,
		orderBy,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead className={style.tablecontainer}>
			<TableRow>
				<TableCell>

				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const ProductsContainer = (props) => {
	const user = useSelector((state) => state.currentUser.user);
	let {token}=props;
	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState(["All products"]);
	useEffect(()=>{
		setProducts(props.products)
		setAllProducts([...allProducts,...props.products])
	},[props.products])
	const EnhancedTableToolbar = (props) => {
		const { numSelected } = props;
		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity
							),
					}),
				}}
			>
				
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant='h6'
						id='tableTitle'
						component='div'
					>
						Products list
					</Typography>
			

				<Autocomplete
					color='inherit'
					options={allProducts}
					isOptionEqualToValue={(option, value) => option.title === value.title}
					getOptionLabel={(option) => option.title||option}
					onChange={(event, newValue) => {
						newValue==="All products"?setProducts(allProducts.slice(1)):setProducts([newValue])
					}}
				
					sx={{ width: 300 }}
					renderInput={(params) => (
						<TextField {...params}  label='Search for products' variant='outlined'  />
					)}
				></Autocomplete>
			
			</Toolbar>
		);
	};

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired,
	};

	const deleteItem = (sku) => {
		baseURL
			.delete(`product/${sku}`, {
				headers: {
					token,
				},
			})
			.then((res) => {
				notifySuccess(res.data.success);
				setTimeout(() => {
					window.location.reload();
				}, 3500);
			})
			.catch((err) => notifyError(err.response.data.error));
	};


	const navigate = useNavigate();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('sku');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = products.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;


	const emptyProducts =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

	

	return (
		<>
	
			<Box>
				<Fab
					size='medium'
					color='primary'
					aria-label='add'
					style={{ position: 'fixed', bottom: '20px', right: '20px' }}
				>
					<AddIcon onClick={() => navigate('/create/product')} />
				</Fab>
				<Paper>
					<EnhancedTableToolbar numSelected={selected.length} />
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby='tableTitle'
							size={dense ? 'small' : 'medium'}
						>
							<EnhancedTableHead
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={products.length}
							/>
							<TableBody>
								{/* if you don't need to support IE11, you can replace the `stableSort` call with:
				   				rows.slice().sort(getComparator(order, orderBy)) */}
								{stableSort(products, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((products, index) => {
										const isItemSelected = isSelected(products.id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, products.id)}
												role='checkbox'
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={index}
												selected={isItemSelected}
											>
												<TableCell>
													
												</TableCell>
												<TableCell
													component='th'
													id={labelId}
													scope='row'
													padding='none'
												>
													{products.title}
												</TableCell>
												<TableCell className={style.price} align='right'>
													${products.price}
												</TableCell>
												<TableCell align='right'>{products.sku}</TableCell>
												<TableCell align='right'>{products.stock}</TableCell>
												<TableCell align='right'>{products.UserId}</TableCell>
												<TableCell align='right'>{`${products.createdAt}`}</TableCell>
												<TableCell align='right'>{products.description}</TableCell>
												<TableCell align='right'>
													<EditIcon
														onClick={() => navigate(`/product/${products.sku}`)}
													/>
												</TableCell>
												
												{user.isAdmin && (
												<TableCell align='right'>
													<DeleteOutlineIcon
														onClick={() => deleteItem(products.sku)}
													/>
												</TableCell>
												)}

											</TableRow>
										);
									})}
								{emptyProducts > 0 && (
									<TableRow
										style={{
											height: (dense ? 33 : 53) * emptyProducts,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={products.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</>
	);
};

export default ProductsContainer;
