import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand as={Link} to="/">Student GitHub Tracker</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link as={Link} to="/features">Features</Nav.Link>
				<Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
			</Nav>
		</Navbar>
	);
};