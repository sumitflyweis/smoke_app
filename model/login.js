const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  phone: {
    type: String,
    require: false,
    default: "",
  },
  google_id: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  Token: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
  },
  nameOfSchool: {
    type: String,
    default: "",
  },
  member: {
    type: Number,
    default: 0,
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
  contact: {
    type: String,
    default: "",
  },
  educationlevel: {
    type: String,
    default: "",
  },
  grade: {
    type: String,
    default: "",
  },
  state: {
    type: objectid,
    ref: "state",
  },
  city: {
    type: objectid,
    ref: "city",
  },
  district: {
    type: objectid,
    ref: "district",
  },
  year: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  },
});

const userModel = mongoose.model("userProfile", userSchema);

module.exports = userModel;
