import React, { Fragment } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../components/CatCard.css';

const CatCard = ({ title, imageUrl, content, onAdopt }) => {
  const handleAdopt = () => {
    onAdopt(title); // Llama a la función onAdopt y pasa el nombre del gato
  };

  return (
    <Fragment>
      <div className="cat-card">
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src={imageUrl} alt="Gato" className="cat-imagen" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
            <Button variant="info" onClick={handleAdopt}>Adoptar</Button>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};


export default CatCard;
