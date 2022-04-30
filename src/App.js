import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import Product from './pages/Product/Product';
import EditUser from './pages/Users/EditUser';
import CreateProduct from './pages/CreateProduct/CreateProduct';


const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/edit/:id' element={<EditUser />} />
				<Route path='/product/:sku' element={<Product />} />
				<Route path='/create/product' element={<CreateProduct />} />
			</Routes>
		</>
	);
};


export default App;
