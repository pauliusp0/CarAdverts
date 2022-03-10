import React, { useContext } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { UserContext } from '../App';
import { useHistory } from 'react-router';
import styled from 'styled-components';

// Components
import Button from '../Components/Button';
import Message from '../Components/Message';
import Loading from '../Components/Loading';
import AddCarForm from '../Components/Forms/AddCarForm';
import useEndpoint from '../Hooks/useEndpoints';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 15px 50px 15px;

  section > h1 {
    margin: 40px 20px;
    text-align: center;
    font-size: 1.7em;
  }

  section:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  section:last-child > div:first-child {
    width: 25%;
    padding: 20px 20px;
    text-align: center;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
  }

  section:last-child > div:first-child > h3 {
    padding: 7px 50px;
  }

  section:last-child > div:first-child > button {
    margin-top: 15px;
  }

  section:last-child > div:first-child > div > svg {
    font-size: 2em;
    font-weight: 900;
  }
  section:last-child > div:last-child {
    width: 70%;
    margin-top: 0;
  }

  section:last-child > div:last-child > div:first-child table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    tr {
      button {
        margin: auto;
      }
    }
  }

  section:last-child
    > div:last-child
    > div:first-child
    table
    > thead
    > tr
    > th {
    background-color: var(--primary-color);
    color: var(--text-light-color);
    padding: 10px 0px;
    border-bottom: 1px solid #ddd;
  }

  section:last-child
    > div:last-child
    > div:first-child
    table
    > tbody
    > tr
    > td {
    padding: 20px 0px;
  }

  section:last-child > div:last-child > div:last-child {
    margin-top: 50px;
    padding: 30px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
  }

  section:last-child > div:last-child > div:last-child > form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  section:last-child > div:last-child > div:last-child > form > div {
    width: 45%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  section:last-child > div:last-child > div:last-child > form > div > label {
    font-size: 1.2em;
  }

  section:last-child > div:last-child > div:last-child > form > div > input,
  select {
    margin-bottom: 15px;
    padding: 5px 7px;
    font-size: 1em;
    color: #555;
  }
  section:last-child
    > div:last-child
    > div:last-child
    > form
    > div:nth-child(n + 9):nth-child(-n + 11) {
    width: 100%;
  }
  button {
    margin-top: 20px;
  }
`;

const MyAccountScreen = () => {
  // State
  // -- Global state
  const { dispatch, state } = useContext(UserContext);
  // -- redirects
  const history = useHistory();

  // hooks
  const deleteCarAPI = useEndpoint('deleteCar');

  // Custom functions
  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    history.push('/');
  };

  const deleteHandler = (e) => {
    axios
      .delete(deleteCarAPI + e.target.dataset.id, {
        carId: e.target.dataset.id,
      })
      .then((res) => {
        dispatch({ type: 'CAR_DELETED', payload: res });
      });
  };

  return state.data.name ? (
    <main>
      <Container>
        <section>
          <h1>
            Hello, <span>{state.data.name}</span>
          </h1>
        </section>
        <section>
          <div>
            <div>
              <FaUser />
            </div>
            <h3>{state.data.name + ' ' + state.data.surname}</h3>
            <p>{state.data.email}</p>
            <p>Cars for sale: {state.data.cars.length}</p>
            <Button action={logoutHandler} text='Log Out'></Button>
          </div>
          <div>
            <div>
              {state.data.cars.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Year</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.data.cars.map((car) => (
                      <tr key={car._id}>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>${car.price}</td>
                        <td>
                          <Button
                            id={car._id}
                            action={deleteHandler}
                            text='Delete'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Message type={'error'}>
                  Currently, you have 0 cars for sale.
                </Message>
              )}
            </div>
            <AddCarForm />
          </div>
        </section>
      </Container>
    </main>
  ) : (
    <Loading />
  );
};

export default MyAccountScreen;
