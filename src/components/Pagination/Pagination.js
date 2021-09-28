import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, currentPage, setCurrentPage, deleteSelected, isDisabled }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
		pageNumbers.push(i);
	}

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	//Handle next pagination
	const handleNext = () => {
		setCurrentPage(currentPage + 1);
	};

	//Handle previous pagination
	const handlePrev = () => {
		setCurrentPage(currentPage - 1);
	};

	return (
		<>
			<div className="row">
				<div className="col-3">
					<button className="btn btn-danger " onClick={deleteSelected} disabled={isDisabled}>
						Delete Selected
					</button>
				</div>
				<div className="col-9">
					<ul className="pagination justify-content-end">
						<li className={currentPage === pageNumbers[0] ? 'page-item disabled' : 'page-item '}>
							<a onClick={() => paginate(1)} href="!#" className="page-link">
								First
							</a>
						</li>
						<li className={currentPage === pageNumbers[0] ? 'page-item disabled' : 'page-item '}>
							<a onClick={handlePrev} href="!#" disabled={currentPage === pageNumbers[0] ? true : false} className="page-link">
								Prev
							</a>
						</li>
						{pageNumbers.map((number) => (
							<li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
								<a onClick={() => paginate(number)} href="!#" id={number} className={currentPage === number ? 'page-link active' : 'page-link'}>
									{number}
								</a>
							</li>
						))}
						<li className={currentPage === pageNumbers[pageNumbers.length - 1] ? 'page-item disabled' : 'page-item '}>
							<a onClick={handleNext} href="!#" className="page-link">
								Next
							</a>
						</li>
						<li className={currentPage === pageNumbers[pageNumbers.length - 1] ? 'page-item disabled' : 'page-item '}>
							<a
								onClick={() => paginate(pageNumbers.length)}
								href="!#"
								disabled={currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
								className="page-link"
							>
								Last
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Pagination;
