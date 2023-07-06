import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Contactanos</Nav.Link>
          <Nav.Link href="https://cataas.com/#/">Conoce más gatos...</Nav.Link>
        </Nav>
        <Form onSubmit={handleSearch} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Buscar gato..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className='buscar' variant="outline-info" type="submit">Buscar</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
