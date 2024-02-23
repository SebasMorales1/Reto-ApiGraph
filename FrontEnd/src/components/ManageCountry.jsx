import { useState } from 'react';
import axios from 'axios';
import './ManageCountry.css';

const ManageCountry = () => {
  const [data, setData] = useState({
    code: "",
    name: "",
    capital: "",
    language: "",
    continent: "",
    currency: "", 
    consulta: "",
    _id: ""
  });

  const [ok, setOk] = useState("");
  const [error, setError] = useState("");

  const consultar = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/countryByCode/${data.consulta}`);
      const countryData = response.data;
      setData({
        code: countryData.code,
        name: countryData.name,
        continent: countryData.continent,
        language: countryData.language,
        capital: countryData.capital ,
        currency: countryData.currency ,
        consulta: countryData.code,
        _id: countryData._id
      });
      setOk("");
      setError("");
    } catch (error) {
      setError("Error al consultar el país");
      console.error(error);
    }
  };

  const deleteCountry = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3000/countries/${data._id}`);
      setOk("País eliminado correctamente");
      setData({
        code: "",
        name: "",
        continent: "",
        capital: "",
        currency: "",
        language: "",
        consulta: "",
        _id: ""
      });
      setError("");
    } catch (error) {
      setError("Error al eliminar el país");
      console.error(error);
    }
  };

  const update = async () => {
    try {
      const newData = {
        code: data.code,
        name: data.name,
        continent: data.continent,
        capital: data.capital,
        currency: data.currency,
        language: data.language
      };
      await axios.put(`http://127.0.0.1:3000/countries/${data._id}`, newData);
      setOk("País actualizado correctamente");
      setData({
        code: "",
        name: "",
        continent: "",
        capital: "",
        currency: "",
        language: "",
        consulta: "",
        _id: ""
      });
      setError("");
    } catch (error) {
      setError("Error al actualizar el país");
      console.error(error);
    }
  };

  return (
    <div className="containerManage">
      <div className='codigo'>
        <label htmlFor="miInput">Código del País:</label>
        <input type="text" id="miInput" name="miInput" value={data.consulta} onChange={e => setData({ ...data, consulta: e.target.value })} />
        <button type="button" id='quer' onClick={consultar}>Consultar</button>
      </div>

      <div className='inputts'>
        {error && <p>{error}</p>}
        {ok && <p>{ok}</p>}
        <div className='language'>
          <form>
            <label htmlFor="codigo">Código:</label>
            <input type="text" id="codigo" name="codigo" value={data.code} onChange={e => setData({ ...data, code: e.target.value })} />
          </form>

          <form>
            <label htmlFor="miInput">Lengua:</label>
            <input type="text" id="miInput" name="miInput" value={data.language} onChange={e => setData({ ...data, language: e.target.value })} />
          </form>

          <form>
            <label htmlFor="miInput">Capital:</label>
            <input type="text" id='Conti' name="miInput" value={data.capital} onChange={e => setData({ ...data, capital: e.target.value })} />
          </form>
        </div>

        <div className='name'>
          <form>
            <label htmlFor="miInput">Nombre:</label>
            <input type="text" id="miInput" name="miInput" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
          </form>

          <form>
            <label htmlFor="miInput">Continente:</label>
            <input type="text" id="miInput" name="miInput" value={data.continent} onChange={e => setData({ ...data, continent: e.target.value })} />
          </form>

          <form>
            <label htmlFor="miInput">Moneda:</label>
            <input type="text" id='money' name="miInput" value={data.currency} onChange={e => setData({ ...data, currency: e.target.value })} />
          </form>
        </div>
      </div>

      <div className='updates'>
        <div>
          <button id='buton1' onClick={deleteCountry}>Eliminar</button>
          <button id='buton2' onClick={update}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};

export default ManageCountry;
