import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading';
import styled from 'styled-components';
import useEndpoint from '../Hooks/useEndpoints';

const CarContainer = styled.section`
  max-width: 1000px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  margin: 50px auto 50px auto;

  > div:first-child {
    width: 100%;
    padding: 0 10px;
  }

  > div:first-child > h2 {
    padding: 10px 0;
  }
  > div:nth-child(2) {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 10px;
  }

  > div:last-child {
    width: 70%;
    padding: 0 10px;
  }

  > div:last-child > img {
    width: 100%;
    height: 450px;
    background-size: 100%;
  }
  > div:last-child > div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 5px;
  }
  > div:last-child > div > img {
    width: 100%;
    height: 80px;
  }

  > div:nth-child(2) > div {
    display: flex;
    justify-content: space-between;
  }

  > div:nth-child(2) > div:first-child {
    flex-direction: column;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px 0;
  }

  > div:nth-child(2) > div:nth-child(3) {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  > div:nth-child(2) > div:last-child {
    flex-direction: column;
  }

  > div:nth-child(2) > div:last-child > h4 {
    border-bottom: 1px solid black;
  }
  > div:nth-child(2) > div:last-child > p {
    margin-top: 10px;
  }
`;

const CarScreen = () => {
  // State
  // -- Local state
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [carImage, setCarImage] = useState('');
  const [loaded, setLoaded] = useState(false);

  // hooks
  const carAPI = useEndpoint('car');
  const getFileAPI = useEndpoint('getFile');

  // Custom functions
  const imageHandler = (e) => {
    setCarImage(e.target.src);
  };

  useEffect(() => {
    axios.get(carAPI + id).then((car) => {
      setCar(car.data);
      setLoaded(true);
      setCarImage(getFileAPI + car.data.img[0].filename);
    });
  }, [id, carAPI, getFileAPI]);

  return loaded ? (
    <main>
      <CarContainer>
        <div>
          <h2>
            {car.make} {car.model}
          </h2>
        </div>
        <div>
          <div>
            <p>Price</p>
            <h3>{car.price}$</h3>
          </div>
          <div>
            <h4>Location</h4>
            <p>{car.city}</p>
          </div>

          <div>
            <h4>Email</h4>
            <p>{car.user[0].email}</p>
          </div>

          <div>
            <p>Year</p>
            <p>{car.year}</p>
          </div>
          <div>
            <p>Mileage</p>
            <p>{car.mileage}km</p>
          </div>
          <div>
            <p>Fuel Type</p>
            <p>{car.fuelType}</p>
          </div>
          <div>
            <p>Gearbox</p>
            <p>{car.gearbox}</p>
          </div>
          <div>
            <h4>Description</h4>
            <p>{car.description}</p>
          </div>
        </div>

        <div>
          <img src={carImage} alt='' />
          <div>
            {car.img.map((image) => (
              <img
                key={image.filename}
                src={getFileAPI + image.filename}
                onClick={imageHandler}
                alt=''
              />
            ))}
          </div>
        </div>
      </CarContainer>
    </main>
  ) : (
    <Loading />
  );
};

export default CarScreen;
