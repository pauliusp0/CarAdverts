const HOST = 'http://localhost:5050';

const useEndpoint = (type) => {
  switch (type) {
    case 'userDetails':
      return `${HOST}/api/users`;
    case 'deleteCar':
      return `${HOST}/api/cars/delete/`;
    case 'addCar':
      return `${HOST}/api/cars/add/`;
    case 'allCars':
      return `${HOST}/api/cars`;
    case 'car':
      return `${HOST}/api/car/`;
    case 'file':
      return `${HOST}/api/file/`;
    case 'getFile':
      return `${HOST}/file/`;
    case 'login':
      return `${HOST}/api/users/login`;
    case 'signup':
      return `${HOST}/api/users/signup`;

    default:
      return HOST;
  }
};

export default useEndpoint;
