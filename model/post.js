const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const postSchema = mongoose.Schema({
    image_vedio: {
        type: String,
        default:
          "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
      }, 
    desc:{
        type:String
    },
    userId:{
        type:objectId,
        ref:"userProfile"
    },
    like: {
        count: {
          type: Number,
          default: 0,
        },
        user: [
          {
            type: objectId,
            ref: "userProfile",
          },
        ],
       },
      comment: {
        countt: {
          type: Number,
          default: 0,
        },
        user: [
          {
            type: objectId,
            ref: "userProfile",
          },
         ],
         comment:{
          type:String,
          default:""
        }
        },
       
    })


const postmodel = mongoose.model('post', postSchema);

module.exports = postmodel;
