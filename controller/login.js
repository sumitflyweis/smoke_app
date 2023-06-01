var bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require("../model/login");

const axios = require('axios');
// const newOTP = require("otp-generator");

// const SECRET = "demo@1234";

const twilio = require("twilio");

// Set up Twilio client with account SID and auth token

// const accountSid = "AC1983997bded6a9d0598cba6fe51a1340";
// const authToken = "73dd260489d1c668ff513ad34102cef4";
// const client = twilio(accountSid, authToken);

// API endpoint for generating and sending an OTP

// Truecaller API configuration
const truecallerConfig = {
  apiKey: 'YOUR_TRUECALLER_API_KEY',
  apiSecret: 'YOUR_TRUECALLER_API_SECRET',
}

// POST /login
exports.login = async (req, res) => {
  const { phone } = req.body;

  try {
    // Verify the phone number using Truecaller API
    const verificationResult = await verifyPhoneNumber(phone);

    if (verificationResult.success) {
      const otp = generateOTP(); // Generate OTP (implement your own logic)

      // Store the OTP and user data in the database
      // You can use the userModel mentioned in your previous code

      // Return the OTP to the client
      res.status(200).json({ otp });
    } else {
      // Phone number verification failed
      res.status(400).json({ message: 'Phone number verification failed' });
    }
  } catch (error) {
    console.error('Error occurred during Truecaller verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Helper function to verify phone number using Truecaller API
async function verifyPhoneNumber(phone) {
  try {
    const response = await axios.post(
      'https://api4.truecaller.com/v1/keygen/verify/otp',
      {
        phone: phone,
        key: truecallerConfig.apiKey,
        secret: truecallerConfig.apiSecret,
      }
    )

    return {
      success: response.data.result === 'success',
      data: response.data,
    }
  } catch (error) {
    throw error;
  }
}


// Helper function to generate OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Implement your OTP generation logic here
  // You can use libraries like 'otp-generator' or generate a random number
  // and send it to the user via SMS or any other method
  return otp
}


exports.getUser = async (req, res) => {
  try {
  
    const user = await userSchema.find().populate("city state district")

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({msg:user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userSchema.create(userData);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userSchema.findById(userId).populate("city state district")

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({msg:user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userSchema.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.updateUser1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userSchema.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userSchema.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.matchLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    // Find colleges with matching coordinates
    const matchedColleges = await userSchema.findOne({
      longitude: longitude,
      latitude: latitude
    });

    return res.status(200).json(matchedColleges)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}




exports.getAllcollege = async (req, res) => {
  try {
    console.log("hi")
    const obj = {
      ...req.query
    }
  //   if(req.query){
  //  obj = obj == "true"?true:false
  //   }
   console.log(obj)
    const order = await userSchema.find(obj).populate("city state district")
    //const orders = await Order.find();
    res.status(200).json({
      success: true,
      total:order.length,
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: err.message,
    });
  }
};

















exports.login = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate a random 6-digit OTP
    const data = await userSchema.findOne({
      phone: phone,
    });

    if (!data || data.length == 0) {
      return res.status(400).json({ msg: "invalid phone" });
    }
    console.log(data.otp);

    const token = jwt.sign({ id: data._id.toString() }, process.env.KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    res.setHeader("x-api-key", /* "Bearer "*/ +token);

    //const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the OTP for the phone number

    //otps[phone] = otp;
    //const newUser = new userSchema({ phone: data.phone,otp:data.otp });

    // Send the OTP to the user's phone number
    // client.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: "+16205071468",
    //   to: phone,
    // });

    res
      .status(200)
      .send({ message: "OTP sent successfully", newUser: data, token: token });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { /*phone,*/ otp } = req.body;

    const verifyOtp = await userSchema.findOne({
      otp: otp,
    });

    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      // const data = { _id: verifyOtp._id, phone: verifyOtp.phone };

      // const token = jwt.sign(
      //   {id: verifyOtp._id.toString() },
      //    process.env.KEY,
      //   {
      //     expiresIn: "1d",
      //   }
      // );
      // console.log(token);
      // res.setHeader("x-api-key", /* "Bearer "*/ +token);
      return res
        .status(200)
        .json({ msg: "signIn successfull", data: verifyOtp /* Token: token*/ });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

exports.userProfile1 = async (req, res) => {
  try {
    const { phone } = req.body;

    // // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // // Store the OTP for the phone number

    // //otps[phone] = otp;
    const newUser = await userSchema.create({ phone: phone, otp: otp });

    // // Send the OTP to the user's phone number
    // // client.messages.create({
    // //   body: `Your OTP is ${otp}`,
    // //   from: "+16205071468",
    // //   to: phone,
    // // });

    res
      .status(200)
      .send({ message: "data created successfully", newUser: newUser });

    // // Check if the phone number is already in the database
    // const existingUser = await userSchema.findOne({ phone: phone,otp:otp  });

    // if (existingUser) {
    //   res.status(409).send({ message: "User already exists" });
    //   return;
    // }

    // // Create a new user profile with the phone number
    // const newUser = new userSchema({ phone: phone });

    // // Save the user profile to the database
    // const savedUser = await newUser.save();

    // res.status(201).send({
    //   message: "User profile created successfully",
    //   newUser: savedUser,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.userUpdate = async (req, res) => {
  try {
    console.log("hi");
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.body.profileImage,
      age: req.body.age,
      address: req.body.address,
      language: req.body.language,
      location: req.body.location,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
      otp: req.body.otp,
      google_id: req.body.google_id,
      Token: req.body.Token,
    }
     let userId = req.user._id
    console.log(userId);
    const user = await userSchema.findByIdAndUpdate(
      { _id: req.user._id},
      data,
      {
        new: true,
      }
    );
    console.log(user);
    return res.status(200).json({ msg: "profile details updated", user: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await userSchema.deleteOne({ _id: id });
    return res.status(200).send({ message: "data deleted " });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};



exports.socialLogin = async (req, res) => {
  try {
    const { google_id } = req.body

     const user = await userSchema.findOne({ google_id: google_id });
     console.log(user)
     if (!user ||user.length == 0 ) {
      const data1 = {
        google_id: req.body.google_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }

      const create = await userSchema.create(data1);
      console.log(create)

      const accessToken1 = jwt.sign({id: create._id }, process.env.KEY, {
        expiresIn: "1d",
      })

      res.setHeader("x-api-key", /* "Bearer "*/ +accessToken1);
      return res.status(200).send({
        message: "logged in successfully",
        accessToken: accessToken1,
        data: create,
      });
    }


    console.log("hi")
    const accessToken = jwt.sign({id: user._id }, process.env.KEY, {
      expiresIn: "1d",
    });

    res.setHeader("x-api-key", /* "Bearer "*/ +accessToken);
    return res.status(200).send({
      message: "logged in successfully",
      accessToken: accessToken,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "internal server error" + err.message });
  }
}



// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;


// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const existingUser = await userSchema.findOne({ 'facebook.id': profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const newUser = new userSchema({
//         facebook: {
//           id: profile.id,
//           displayName: profile.displayName,
//           email: profile.emails[0].value,
//           profileImage: profile.photos[0].value
//         }
//       });

//       const savedUser = await newUser.save();
//       done(null, savedUser);
//     } catch (error) {
//       done(error, false);
//     }
//   }
// ))
// catch (err) {
//   console.log(err);
//   return res
//     .status(500)
//     .send({ error: "internal server error" + err.message });
// }
// }

// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });









// exports.userProfile1 = async (req, res) => {
//   try {
//     // const data = {
//     //   name: req.body.name,
//     //   email: req.body.email,
//     //   phone: req.body.phone,
//     //   password: req.body.password,
//     //   confirmPassword: req.body.confirmPassword,
//     //   profileImage: req.body.profileImage
//     // };
//     // const userexists = await userSchema.findOne({ email: data.email });

//     // if (!userexists || userexists.length == 0) {
//     //   const userexists1 = await userSchema.findOne({ phone: data.phone });

//     //   if (!userexists1 || userexists1.length == 0) {
//     //     if (!req.body.password == req.body.confirmPassword) {
//     //       return res.status(500).json({
//     //         message: "Password Not Match  ",
//     //       });
//     //     } else {
//     //       const create = await userSchema.create({
//     //         name: req.body.name,
//     //         email: req.body.email,
//     //         phone: req.body.phone,
//     //         // password: bcrypt.hashSync(req.body.password, 8),
//     //         // confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
//     //         profileImage : req.body.profileImage
//     //       });
//     //       return res.status(200).json({
//     //         msg: "registred successfully",
//     //         create: create,
//     //       });
//     //     }
//     //   } else {
//     //     return res.status(200).json({ msg: "phone already exists" });
//     //   }
//     // } else {
//     //   return res.status(200).json({ msg: "email already exists" });
//     // }
//     const { phone } = req.body;

//     if (!phone) {
//       return res.status(400).json({ msg: "phoneNumber is  required" });
//     }

//     const phoneNumber = await userSchema.findOne({ phone: phone });
//     if (phoneNumber) {
//       return res.status(400).json({ msg: "phone number already exist" });
//     }

//     const otp = Math.floor(Math.random() * 10000 + 1);
//     console.log(otp);
//     const user = await userSchema.create({
//       phone: phone,
//       otp: otp,
//       name: req.body.name,
//       email: req.body.email,
//       profileImage: req.body.profileImage,
//       password: bcrypt.hashSync(req.body.password, 8),
//       confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),

//     });
//     console.log(user);
//     console.log(user._id.toString());
//     // const createWallet = await Wallet.create({ user: user._id.toString() });
//     // console.log(createWallet);
//     if (user) {
//       return res
//         .status(200)
//         .json({ msg: "otp has been sent to your number", otp: otp });
//     } else {
//       return res.status(400).json({ msg: "Something went wrong, try again" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: err.message });
//   }
// };

// module.exports.verifySignIn = async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const verifyOtp = await userSchema.findOne({
//       otp: otp,
//     });
//     if (!verifyOtp || verifyOtp.length == 0) {
//       return res.status(400).json({ msg: "invalid otp" });
//     } else {
//       const data = { _id: verifyOtp._id, phone: verifyOtp.phone };

//       const token = jwt.sign(
//         {id: verifyOtp._id.toString() },
//          process.env.KEY,
//         {
//           expiresIn: "1d",
//         }
//       );
//       console.log(token);
//       res.setHeader("x-api-key", /* "Bearer "*/ +token);
//       return res
//         .status(200)
//         .json({ msg: "signIn successfull", data: data, Token: token });
//     }
//   } catch (error) {
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };

// exports.loginProfile1 = async (req, res) => {
//   try {
//     const userexists = await userSchema.findOne({
//       phone: req.body.phone,
//     });
//     console.log(userexists);
//     //console.log(userexists.otp)

//     if (!userexists || userexists.length == 0) {
//       return res.status(400).json({ msg: "user does not exist" });
//     }

//     // const ispasswordValid = bcrypt.compareSync(
//     //   req.body.password,
//     //   userexists.password
//     // );
//     // console.log(ispasswordValid);

//     // if (!ispasswordValid) {
//     //   return res.status(501).json({
//     //     message: "Wrong Password",
//     //   });
//     // }
//     if (userexists.phone != req.body.phone) {
//       return res.status(400).json({
//         message: "phoneNumber Not Match  ",
//       });
//     }

//     // const token = jwt.sign({ _id: userexists._id }, SECRET, {
//     //   expiresIn: "15d",
//     // });

//     // console.log(token);
//     // res.setHeader("x-api-key", /* "Bearer "*/ +token);
//     return res.status(200).json({
//       msg: "login successfull",
//       otp: userexists.otp,
//       //  Token: token,
//       _id: userexists._id,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await userSchema.findOne({ _id: req.params.id });
//     return res.status(200).json({
//       User: user,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({
//       message: err.message,
//     });
//   }
// };

// exports.customerUpdatePassword = async (req, res) => {
//   try {
//     const UpdatedData = await userSchema
//       .findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           password: bcrypt.hashSync(req.body.password, 8),
//           // confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 8),
//         }
//       )
//       .select({ password: 1 /*confirmPassword: 1 */ })
//       .exec();
//     console.log(UpdatedData);
//     return res.status(200).send({
//       message: "user Profile Updated ",
//       data: UpdatedData,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: err.message });
//   }
// };


