import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';

// Components
import Button from '../Button';
import Message from '../Message';
import useEndpoint from '../../Hooks/useEndpoints';

const AddCarForm = () => {
  // States
  // -- Local state
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [carGearbox, setCarGearbox] = useState('');
  const [carFuel, setCarFuel] = useState('');
  const [carDescription, setCarDescription] = useState('');
  const [carCity, setCarCity] = useState('');
  const [message, setMessage] = useState({
    message: '',
    type: '',
  });
  const [images, setImages] = useState([]);

  // -- Global state
  const { dispatch, state } = useContext(UserContext);

  // hooks
  const addCarAPI = useEndpoint('addCar');

  // Custom functions
  const sendCarHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append('img', images[i]);
    }
    data.append('make', carMake);
    data.append('model', carModel);
    data.append('year', +carYear);
    data.append('price', +carPrice);
    data.append('fuelType', carFuel);
    data.append('city', carCity);
    data.append('gearbox', carGearbox);
    data.append('mileage', +carMileage);
    data.append('description', carDescription);
    if (+carYear && +carPrice) {
      axios.put(addCarAPI + state.data._id, data).then((res) => {
        dispatch({ type: 'CAR_ADDED', payload: res });
        setMessage({ message: 'Car added', type: 'success' });
        setCarMake('');
        setCarYear('');
        setCarModel('');
        setCarPrice('');
        setCarCity('');
        setCarGearbox('');
        setCarDescription('');
        setCarMileage('');
        setCarFuel('');
      });
    } else {
      setMessage({
        message: 'Year price and mileage must be a number',
        type: 'error',
      });
    }
  };

  const imageHandler = (e) => {
    setImages([...images, e.target.files[0]]);
    if (e.target.files[0]) {
      e.target.value = '';
    }
  };

  return (
    <div>
      <h6>Have car for sale?</h6>
      <h2>Enter Information</h2>
      <form onSubmit={sendCarHandler}>
        <div>
          <label>Make</label>
          <input
            type='text'
            onChange={(e) => setCarMake(e.target.value)}
            value={carMake}
            required
          />
        </div>

        <div>
          <label>Model</label>
          <input
            type='text'
            onChange={(e) => setCarModel(e.target.value)}
            value={carModel}
            required
          />
        </div>

        <div>
          <label>Year</label>
          <input
            type='text'
            onChange={(e) => setCarYear(e.target.value)}
            value={carYear}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type='text'
            onChange={(e) => setCarPrice(e.target.value)}
            value={carPrice}
            required
          />
        </div>
        <div>
          <label>Fuel Type</label>
          <select
            value={carFuel}
            onChange={(e) => setCarFuel(e.target.value)}
            name='Select'
            id=''
            required
          >
            <option disabled hidden value=''>
              Select your fuel type
            </option>
            <option value='diesel'>Diesel</option>
            <option value='petrol'>Petrol</option>
            <option value='electric'>Electric</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div>
          <label>City</label>
          <input
            value={carCity}
            onChange={(e) => setCarCity(e.target.value)}
            type='text'
            required
          />
        </div>
        <div>
          <label>Mileage</label>
          <input
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
            type='text'
            required
          />
        </div>
        <div>
          <label>Gearbox</label>
          <select
            value={carGearbox}
            onChange={(e) => setCarGearbox(e.target.value)}
            name=''
            id=''
            required
          >
            <option disabled hidden value=''>
              Select your gearbox
            </option>
            <option value='manual'>Manual</option>
            <option value='automatic'>Automatic</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={carDescription}
            onChange={(e) => setCarDescription(e.target.value)}
            cols='30'
            rows='10'
            required
          ></textarea>
        </div>

        <div>
          <label>Photos</label>
          <input
            name='img'
            accept='image/*'
            onChange={imageHandler}
            type='file'
          />
          {images ? images.map((image) => <p>{image.name}</p>) : null}
        </div>

        <div>
          <Button text='Add Car' />
        </div>
      </form>
      {message.message && (
        <Message type={message.type}>{message.message}</Message>
      )}
    </div>
  );
};

export default AddCarForm;
