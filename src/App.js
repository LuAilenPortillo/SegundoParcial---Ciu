import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CatCard from './components/CatCard';
import Header from './components/Header';

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
    const nombres = ["Combo familiar", 'Lechuga', 'El Gemelo Bu', 'Bob Marley', 'Bebecite', 'Jisus', 'Punga', 'Kay', 'Faker','Paco', 'El Gemelo Mo', 'Desagrado', 'Le dicen Romeo', 'Dormilón', 'Michi', 'Po'];
    setNombresGatos(nombres);
  };

  const filtrarGatosPorNombre = () => {
    return nombresGatos.filter((nombre) => nombre.toLowerCase().includes(filtroNombre.toLowerCase()));
  };


  const [nombresAdoptados, setNombresAdoptados] = useState([]);

  const agregarNombreAdoptado = (nombre) => {
    setNombresAdoptados([...nombresAdoptados, nombre]);
    localStorage.setItem('nombresAdoptados', JSON.stringify(nombresAdoptados));
  };

  const eliminarGato = (index) => {
    const nuevosNombres = [...nombresAdoptados];
    nuevosNombres.splice(index, 1);
    setNombresAdoptados(nuevosNombres);
  };

  useEffect(() => {
    const nombres = JSON.parse(localStorage.getItem('nombresAdoptados'));
    if (nombres) {
      setNombresAdoptados(nombres);
    }
  }, []);

  return (
    <Fragment>
      <div className='App'>
        <Header onSearch={(searchValue) => setFiltroNombre(searchValue)} />
        <div className='presentacion'>
          <h1>Refugio Huellitas de Amor</h1>
          <p>En el Refugio Huellitas de Amor, nuestros gatos están buscando un hogar lleno de amor y cuidado. Cada uno de ellos tiene una historia única y está ansioso por encontrar a alguien especial que los adopte y les brinde una vida llena de felicidad.</p>
          <p>Te invitamos a explorar nuestra página web y conocer a nuestros adorables gatos. Estamos seguros de que encontrarás el compañero perfecto que se ajuste a tu estilo de vida y personalidad. ¡No dudes en contactarnos para obtener más información y comenzar el proceso de adopción!</p>

          <p>Recuerda que adoptar a un gato es una decisión que cambia vidas, tanto para el gato como para ti. ¡Dale a un gato del Refugio Huellitas de Amor un hogar para siempre y experimenta el amor incondicional que te brindarán!</p>
        </div>
        <div className="lista-adoptados">
          <h2>Lista de gatos adoptados:</h2>
          {nombresAdoptados.map((nombre, index) => (
            <div key={index} className="nombre-gato">
              <p>{nombre}</p>
              <button onClick={() => eliminarGato(index)}>Eliminar</button>
            </div>
          ))}
        </div>

        <div className='row row-cols-1 row-cols-md-3'>
          {gatos.map((gato, index) => {
            if (filtrarGatosPorNombre().includes(nombresGatos[index])) {
              return (
                <div className='col mb-4' key={gato._id}>  
                  <CatCard
                    title={nombresGatos[index]}
                    imageUrl={`https://cataas.com/cat/${gato._id}`}
                    onAdopt={agregarNombreAdoptado}/>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
