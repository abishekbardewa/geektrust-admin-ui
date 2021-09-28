import { useState, useEffect, useRef } from 'react';
import Search from './components/Search/Search';
import User from './components/Users/Users';
import Pagination from './components/Pagination/Pagination';
import { BASE_URL, ROW_SIZE } from './config/config';

function App() {
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(ROW_SIZE);
	const [update, setUpdate] = useState(false);
	const selectAllRef = useRef(null);
	const [isDisabled, setDisabled] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	// Get Data From Api Url
	const getData = () => {
		fetch(BASE_URL)
			.then((res) => res.json())
			.then((response) => {
				const reviseUsers = response.map((user) => {
					user.selected = false;
					user.edit = false;
					user.show = true;
					return user;
				});
				setUsers(reviseUsers);
			});
	};

	//Handle Search
	const handleSearch = (event) => {
		setSearchText(event);
		searchUsers(event, users);
	};

	//Search users
	const searchUsers = (searchTerm, users) => {
		let tempSearch = searchTerm.toLowerCase();
		return users.map((user) => {
			if (
				user.name.toLowerCase().includes(tempSearch) ||
				user.email.toLowerCase().includes(tempSearch) ||
				user.role.toLowerCase().includes(tempSearch)
			) {
				user.show = true;
				return user;
			}
			user.show = false;
			return user;
		});
	};

	//Handle Selection
	const handleSelect = (e) => {
		const { name, id, checked } = e.target;
		if (checked) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}

		if (name === 'allSelect') {
			const currentUserId = users
				.filter((user) => user.show)
				.slice(index, index + ROW_SIZE)
				.map((user) => user.id);

			let tempUsers = users.map((user) => {
				if (currentUserId.includes(user.id)) {
					user.selected = checked;
					return user;
				}
				return user;
			});
			setUsers(tempUsers);
			setUpdate(!update);
		} else {
			singleSelect(id);
		}
	};

	//Single Selection of Row
	const singleSelect = (id) => {
		let tempUsers = users;
		const index = tempUsers.findIndex((user) => user.id === id);
		tempUsers[index].selected = !tempUsers[index].selected;
		setUsers(tempUsers);
		setUpdate((prevState) => !prevState);
	};

	//Delete Selected Data
	const deleteSelected = (event) => {
		event.preventDefault();
		if (window.confirm('Selected users will be deleted')) {
			setUsers((prevState) => prevState.filter((user) => !user.selected));
			selectAllRef.current.checked = false;
			if (currentPage !== 1) {
				setCurrentPage(currentPage - 1);
			}
			setDisabled(true);
		}
	};

	//Delete Single Row
	const handleDelete = (id) => {
		console.log(update);
		if (window.confirm('Users will be deleted')) {
			let tempUsers = users.filter((user) => user.id !== id);
			setUsers(tempUsers);
			setUpdate((prevState) => !prevState);
		}
	};

	//Edit User
	const handleEdit = (id) => {
		let tempUsers = users;
		const index = tempUsers.findIndex((user) => user.id === id);
		console.log(tempUsers[index]);
		tempUsers[index].edit = true;
		setUsers(tempUsers);
		console.log(setUpdate);
		setUpdate((prevState) => !prevState);
	};

	//Save User
	const handleSave = (id, name, email, role) => {
		console.log(id, name, email, role);
		let tempUsers = users;
		const index = tempUsers.findIndex((user) => user.id === id);
		tempUsers[index].name = name.current.value;
		tempUsers[index].email = email.current.value;
		tempUsers[index].role = role.current.value;
		tempUsers[index].edit = false;
		window.alert('User Saved');
		setUsers(users);
		setUpdate((prevState) => !prevState);
	};

	//Cancel Saving user
	const handleCancel = (id) => {
		let tempUsers = users;
		const index = tempUsers.findIndex((user) => user.id === id);
		tempUsers[index].edit = false;
		setUsers(tempUsers);
		setUpdate((prevState) => !prevState);
	};

	const index = (currentPage - 1) * ROW_SIZE;
	const currentUser = users.filter((user) => user.show).slice(index, index + ROW_SIZE);
	const usersLength = users.filter((user) => user.show).length;

	return (
		<div className="container mt-3">
			<h3 className="text-center">Geektrust Admin UI Challenge</h3>
			<div className="col-md-8 offset-md-2">
				<Search handleSearch={handleSearch} searchText={searchText} />

				{usersLength === 0 && currentPage === 1 ? (
					<div className="col-md-8 offset-md-2 text-center  mt-5">
						<h3>
							<span className="alert alert-warning p-2">No records found to display!</span>
						</h3>
					</div>
				) : (
					<>
						<User
							users={currentUser}
							handleSelect={handleSelect}
							handleEdit={handleEdit}
							handleSave={handleSave}
							handleCancel={handleCancel}
							handleDelete={handleDelete}
							selectAllRef={selectAllRef}
						/>
					</>
				)}
				<Pagination
					usersPerPage={usersPerPage}
					totalUsers={usersLength}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					deleteSelected={deleteSelected}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
}

export default App;
