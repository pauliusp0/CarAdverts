import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useEndpoint from '../Hooks/useEndpoints';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 15px;
  h1 {
    text-align: center;
    font-size: 1.7em;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  section {
    display: flex;
    flex-wrap: wrap;
  }
  div {
    width: calc(100% / 4 - 15px);
    margin: 0 7.5px;
    padding: 20px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
  }
  div > h4 {
    margin-bottom: 10px;
    font-size: 1.4em;
    border-bottom: 1px solid #ededed;
  }
  div > p {
    padding-bottom: 5px;
  }
  img {
    width: 100%;
    height: 130px;
  }
`;

const HomeScreen = () => {
  // State
  // -- Local state
  const [allCars, setAllCars] = useState([]);
  const history = useHistory();

  // hooks
  const allCarsAPI = useEndpoint('allCars');
  const getFileAPI = useEndpoint('getFile');

  // Custom functions
  const clickHandler = (id) => {
    history.push('/car/' + id);
  };

  useEffect(() => {
    axios.get(allCarsAPI).then((res) => setAllCars(res.data));
  }, [allCarsAPI]);

  return (
    <main>
      <Container>
        <section>
          <h1>Latest Cars for Sale</h1>
        </section>
        <section>
          {allCars.map((user) =>
            user.cars.map((car) => (
              <div key={car._id} onClick={() => clickHandler(car._id)}>
                <img src={getFileAPI + car.img[0].filename} alt='' />
                <h4>{car.make + ' ' + car.model}</h4>
                <p>Year: {car.year}</p>
                <p>Price: ${car.price}</p>
              </div>
            ))
          )}
        </section>
      </Container>
    </main>
  );
};

export default HomeScreen;
