require('dotenv').config();
const express = require('express')
const app = express()
const userModel = require('./models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index.ejs')
})
app.get('/bookConsultancy', function (req, res) {
  res.render('bookCons')
})
app.get('/getInTouch', function (req, res) {
  res.render('bookCons')
})


// Handle form submission

// app.post('/register', async (req, res) => {
//   try {
//     // Create a new user based on the submitted form data
//     const user = new userModel({
//       username: req.body.username,
//       phone: req.body.phone,
//       email: req.body.email,
//       subject: req.body.subject,
//       message: req.body.message,
//     });

//     // Save the user to the database
//     const savedUser = await user.save();

//     // You can handle the success response as needed
//     res.render('success');
//   } catch (error) {
//     // Handle errors, such as duplicate email addresses
//     res.status(400).send('Error registering user');
//   }
// });


app.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    

    if (existingUser) {
      // If the email already exists, send a response to the client
      const alertScript = "<script>alert('User with this email already exists');</script>";
      return res.status(400).send(alertScript);
    }

    // If the email doesn't exist, create a new user
    const user = new userModel({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // You can handle the success response as needed
    res.render('success');
  } catch (error) {
    // Handle other errors, such as database connection issues
    console.error(error);
    res.status(500).send('Internal Server Error check');
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});