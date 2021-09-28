import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

const Search = ({ handleSearch, searchText }) => {
	return (
		<>
			<InputGroup className="mb-3">
				<FormControl type="text" placeholder="Search by name, email or role..." value={searchText} onChange={(e) => handleSearch(e.target.value)} />
			</InputGroup>
		</>
	);
};

export default Search;
