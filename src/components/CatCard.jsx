import React, { Fragment } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../components/CatCard.css';

const CatCard = ({ title, imageUrl, content, onVote }) => {
  const handleVote = () => {
    onVote(title);
  };

  return (
    <Fragment>
      <div className="cat-card">
        <Card style={{ width: '14rem'}}>
          <Card.Img variant="top" src={imageUrl} alt="Gato" className="cat-imagen" />
          <Card.Body className="card">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
            <Button variant="info" onClick={handleVote}>Votar</Button>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};


export default CatCard;
