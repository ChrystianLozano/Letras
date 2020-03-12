import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cancion from "./components/Cancion";
import axios from 'axios'

function App() {

  //definir el State
  const [busquedaLetra, guardarBusquedaLetra] = useState({})
  const [letra, guardarLetra] = useState('')

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return
    
    const consultarApiLetra = async () => {
      const {artista, cancion} = busquedaLetra
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ])

      console.log(letra);
      console.log(informacion);
      guardarLetra(letra.data.lyrics)
    }
    consultarApiLetra()
  }, [busquedaLetra])

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          {letra.length === 0 ? null
          : <Cancion letra = {letra}/>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
