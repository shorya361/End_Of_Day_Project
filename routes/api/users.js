const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport'),
  auth = require('../../middleware/auth');

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: imageFilter
});

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'shorya361',
  api_key: 821848137555319,
  api_secret: 'v7Vbg37tDR424j1lgYCKkLvXJpU'
});

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
const leaves = require('../../models/Leaves'),
  Updates = require('../../models/updates'),
  daily = require('../../models/DailyUpdate');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const reqPost = req.body.POST;

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      var img = '';
      if (req.body.image.length > 0) {
        img = req.body.image;
      } else {
        img =
          'data:image/png;base64,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';
      }
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        POST: req.body.POST,
        image: img
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//IMAGE UPLOAD
// route post api/users/image
router.post('/image', upload.single('image'), async (req, res) => {
  console.log(req.body);
  res.json('reply from express');
  // cloudinary.uploader.upload(req.file.path, function(result) {
  //   console.log(result.secure_url);
  // });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          POST: user.POST
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 36000
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              POST: user.POST
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

//ROUTE '/api/users/find/:name'
router.get('/find/:name', async (req, res) => {
  const foundUsers = await User.find({ name: req.params.name })
    .populate('updates')
    .populate('dailyUpdates')
    .populate('leaves');
  res.json(foundUsers);
});

//ROUTE '/api/users/open/:id'
router.get('/open/:id', async (req, res) => {
  const sortby = { date: -1 };
  const foundUsers = await User.find({ _id: req.params.id })
    .populate('leaves')
    .populate('dailyUpdates')
    .populate('updates');
  res.json(foundUsers[0]);
});

module.exports = router;
