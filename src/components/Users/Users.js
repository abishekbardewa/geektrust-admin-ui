import React, { useRef } from 'react';
import { Table } from 'react-bootstrap';
// import './Users.Style.css';
const User = ({ users, handleSelect, handleEdit, handleSave, handleCancel, handleDelete, selectAllRef }) => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const roleRef = useRef(null);
	return (
		<>
			<Table responsive bordered hover>
				<thead>
					<tr>
						<th>
							<div className="form-check">
								<input type="checkbox" className="form-check-input" name="allSelect" ref={selectAllRef} onChange={handleSelect} />
								<label>Select All</label>
							</div>
						</th>
						<th>Name</th>
						<th>Email Name</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						return !user.edit ? (
							<tr key={user.id}>
								<td>
									<div className="form-check">
										<input
											type="checkbox"
											id={user.id}
											className="form-check-input"
											name={user.name}
											onChange={handleSelect}
											checked={user.selected}
										/>
									</div>
								</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<i onClick={() => handleEdit(user.id)} className="fas fa-edit p-2"></i>
									<i onClick={() => handleDelete(user.id)} className="fas fa-trash text-danger p-2"></i>
								</td>
							</tr>
						) : (
							<tr key={user.id}>
								<td></td>
								<td>
									<input readOnly={!user.edit} type="text" ref={nameRef} name="name" defaultValue={user.name} />
								</td>
								<td>
									<input readOnly={!user.edit} type="email" ref={emailRef} name="email" defaultValue={user.email} />
								</td>
								<td>
									<input readOnly={!user.edit} type="text" ref={roleRef} name="role" defaultValue={user.role} />
								</td>
								<td>
									<i onClick={() => handleSave(user.id, nameRef, emailRef, roleRef)} className="fas fa-save text-success p-2"></i>

									<i onClick={() => handleCancel(user.id)} className="fas fa-times text-danger p-2"></i>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default User;
