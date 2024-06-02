import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Login from './Components/Employee/Login';
import Signup from './Components/Employee/Signup';
import ManageShift from './Components/Employee/ManageShift';
import PickSchedule from './Components/Employee/ManageShift/PickSchedule';
import DropSchedule from './Components/Employee/ManageShift/DropSchedule';
import SwapSchedule from './Components/Employee/ManageShift/SwapSchedule';
import ManageProfile from './Components/Employer/ManageProfile';
import ActiveShifts from './Components/Employer/ManageShifts/ActiveShifts';
import PublishShift from './Components/Employer/ManageShifts/PublishShift';
import RemoveShift from './Components/Employer/ManageShifts/RemoveShift';
import VerifyEmployees from './Components/Employer/ManageEmployees/VerifyEmployee';
import AddEmployee from './Components/Employer/ManageEmployees/AddEmployee';
import ViewEmployees from './Components/Employer/ManageEmployees/ViewEmployees';
import Nav from './Components/Nav';
import Home from './Components/Home';

import './App.css';
import { checkUser } from './services';

const App = () => {

	const { user } = useSelector((state) => ({...state}));
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const email = localStorage.getItem('email');
		if (email) {
			checkUser(email)
				.then((res) => {
					const { id, firstName, lastName, email, dob, role } = res.data.data
					if(res.data.status === 200) {
						dispatch({
							type: 'LOGGED_IN_USER',
							payload: { id, firstName, lastName, email, dob, role }
						})
					}
				})
				.catch(e => toast.error(e))
		} else {
			navigate('/');
		}
	}, [dispatch])

	return (
		<div className='App'>
			<ToastContainer />
			<Nav />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/signup' element={<Signup />} />
				<Route exact path='/manage-shifts' element={<ManageShift />} />
				<Route exact path='/manage-profile' element={<ManageProfile />} />
				<Route exact path='/manage-shifts/pick-schedule' element={<PickSchedule />} />
				<Route exact path='/manage-shifts/drop-schedule' element={<DropSchedule />} />
				<Route exact path='/manage-shifts/swap-schedule' element={<SwapSchedule />} />
				<Route exact path='/employer/manage-shifts' element={<ActiveShifts />} />
				<Route exact path='/employer/manage-shifts/publish-shift' element={<PublishShift />} />
				<Route exact path='/employer/manage-shifts/remove-shift' element={<RemoveShift />} />
				<Route exact path='/employer/manage-profile' element={<ManageProfile />} />
				<Route exact path='/employer/manage-employees' element={<VerifyEmployees />} />
				<Route exact path='/employer/manage-employees/add-employee' element={<AddEmployee />} />
				<Route exact path='/employer/manage-employees/view-employees' element={<ViewEmployees />} />
			</Routes>
		</div>
	);
}

export default App;
