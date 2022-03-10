import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();
import asyncHandler from 'express-async-handler';
import generateToken from './config/generateToken.js';

// Models
import User from './models/userModel.js';
import Car from './models/carModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
import protect from './auth/auth.js';

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.blue.underline.bold);
    // Starting server
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`.yellow.underline.bold)
    );
  });

// Uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// GET: all cars
app.get('/api/cars', async (req, res) => {
  let users = await User.find({});
  let cars = await Car.find({});

  let usersAndCars = users.reduce((total, user) => {
    let userCars = cars.filter((car) => car.user_id === '' + user._id);

    total.push({ ...user.toObject(), cars: [...userCars] });

    return total;
  }, []);

  res.json(usersAndCars);
});

// GET: single car by id
app.get('/api/car/:id', async (req, res) => {
  let carId = req.params.id;

  try {
    let car = await Car.findById(carId);
    let user = await User.findById(car.user_id);

    res.json({ ...car.toObject(), user: [user] });
  } catch (err) {
    res.status(401).json('user does not exsist');
    console.log(err);
  }
});

// PUT : Add car
app.put('/api/cars/add/:id', upload.array('img'), async (req, res) => {
  let userId = req.params.id;
  let carInfo = req.body;

  let images = [];

  req.files.forEach((file) => {
    let newImages = {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
    images.push(newImages);
  });

  carInfo.img = images;
  carInfo.user_id = userId;

  let newCar = new Car(carInfo);

  newCar.save();

  let user = await User.findById(userId);
  let cars = await Car.find({ user_id: userId });

  res.json({ ...user.toObject(), cars: [...cars] });
});

// GET: get single user based on id
app.get(
  '/api/users/',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    let cars = await Car.find({ user_id: req.user._id });

    if (user) {
      res.json({ ...user.toObject(), cars: [...cars] });
    } else {
      res.status(404).send('User not found');
      throw new Error('User not found');
    }
  })
);

// POST: register new user
app.post('/api/users/signup', (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    const userExists = result.some(
      (userFromDB) => userFromDB.email === user.email
    );

    if (userExists) {
      res.status(201).json({
        registrationStatus: 'failed',
        message: 'User with given email already exists',
      });
    } else {
      user.cars = [];
      const newUser = new User(user);

      newUser.save().then((result) => {
        let { _id } = result;
        res.json({
          registrationStatus: 'success',
          userId: generateToken(_id),
        });
      });
    }
  });
});

// POST: Log in existing user
app.post(
  '/api/users/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail && (await userEmail.matchPassword(password))) {
      res.status(201).json({
        loginStatus: 'success',
        userId: generateToken(userEmail._id),
      });
    } else {
      res.status(401).json({
        loginStatus: 'failed',
        message: 'Given email or password is incorrect',
      });
    }
  })
);

// DELETE: Delete single car based on it's id (for listed DB with multiple collections)
app.delete('/api/cars/delete/:id', async (req, res) => {
  const carId = req.params.id;
  const deletedCar = await Car.findByIdAndDelete(carId);

  const user = await User.findById(deletedCar.user_id);
  const cars = await Car.find({ user_id: deletedCar.user_id });

  res.json({ ...user.toObject(), cars: [...cars] });
});

// GET: Image
app.get('/file/:fileName', (req, res) => {
  const filePath = req.params.fileName;
  res.sendFile('./uploads/' + filePath, { root: __dirname });
});

// --------------------------------------------------------------------
// REST API
/*
GET:     /api/cars              | Get all cars
         /api/cars/:id          | Get single car by id
         /api/users/:id         | Get single user based on id
         /file/:filename        | Get file by his name
        

POST:    /api/users/signup      | Register new user
         /api/users/login       | Log in existing user

PUT:     /api/cars/add/:id      | Add single car to user based on his id

DELETE:  /api/cars/delete/:id   | Delete single car based on it's id (for listed DB with multiple collections)
*/
//---------------------------------------------------------------------
