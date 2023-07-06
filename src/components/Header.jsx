import React, { Fragment, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../components/Header.css';

const Header = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <Fragment>
      <Navbar expand="lg" className='menu'>
        <div className='form'>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              className='buscar'
              type="text"
              placeholder="Buscar finalista..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button className='boton' variant="outline-secondary" type="submit">Buscar</Button>
          </Form>
        </div>
      </Navbar>
      <img className='portada' src='Invasión gatuna.png' alt='' width='100%'/>
      
    </Fragment>
  );
};

export default Header;
