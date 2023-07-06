import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CatCard from './components/CatCard';
import Header from './components/Header';
import '../src/App.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [gatos, setGatos] = useState([]);
  const [nombresGatos, setNombresGatos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    consultarAPIGatos();
    asignarNombresGatos();
  }, []);

  const consultarAPIGatos = async () => {
    try {
      const api = await fetch('https://cataas.com/api/cats?limit=16&skip=0');
      const resultado = await api.json();
      setGatos(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const asignarNombresGatos = () => {
    const nombres = ["Combo familiar", 'Lechuga', 'El Gemelo Bu', 'Bob Marley', 'Bebecite', 'Jisus', 'Punga', 'Kay', 'Faker','Paco', 'El Gemelo Mo', 'Pato', 'Le dicen Romeo', 'Dormilón', 'Michi', 'Po'];
    setNombresGatos(nombres);
  };

  const filtrarGatosPorNombre = () => {
    return nombresGatos.filter((nombre) => nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
  };


  const [nombresVotados, setNombresVotados] = useState([]);

  const agregarNombreVotado = (nombre) => {
    setNombresVotados([...nombresVotados, nombre]);
    localStorage.setItem('nombresVotados', JSON.stringify(nombresVotados));
  };

  const eliminarGato = (index) => {
    const nuevosNombres = [...nombresVotados];
    nuevosNombres.splice(index, 1);
    setNombresVotados(nuevosNombres);
    localStorage.setItem('nombresVotados', JSON.stringify(nuevosNombres));
  };

  useEffect(() => {
    const nombres = JSON.parse(localStorage.getItem('nombresVotados'));
    if (nombres) {
      setNombresVotados(nombres);
    }
  }, []);

  return (
    <Fragment>
      <div className='App'>
        <Header onSearch={(searchValue) => setFiltroNombre(searchValue)} />

        <h1 className='titulo'>🐾 Invasión Gatuna: ¡El evento más adorable del año! 🐾</h1>
        <p className='invitacion'>¡Estás invitado a ser parte de la Invasión Gatuna, donde 16 finalistas están compitiendo para ganar el título del gato más querido! Después de una dura competencia, estos 16 gatos han pasado por el reprechaje entre 3000 postulantes y han demostrado tener un encanto especial.</p>
        <p className='invitacion'>Ahora es tu turno de votar y ayudar a elegir al ganador. Cada gato finalista tiene su propia belleza y personalidad única, ¡así que tu voto cuenta!</p>

        <div className='row row-cols-1 row-cols-md-3'>
          {gatos.map((gato, index) => {
            if (filtrarGatosPorNombre().includes(nombresGatos[index])) {
              return (
                <div className='col mb-4' key={gato._id}>  
                  <CatCard
                    title={nombresGatos[index]}
                    imageUrl={`https://cataas.com/cat/${gato._id}`}
                    onVote={agregarNombreVotado}/>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="lista-Votados">
          <h2> Lista de gatos Votados:</h2>
          {nombresVotados.map((nombre, index) => (
            <div key={index} className="nombre-gato">
              <span className='nombreGatoVotado'>- {nombre}</span>
              <Button className='botonEliminar' variant="outline-danger" onClick={() => eliminarGato(index)}>Eliminar Voto</Button>
            </div>
          ))}
        </div>
    </Fragment>
  );
}

export default App;
