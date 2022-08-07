import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false,
    },
    profilePicture: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    coverPicture: {
      type: String,
      default: "https://smhttp-ssl-68416.nexcesscdn.net/media/catalog/product/cache/dcb84c912e761f272cb8740e50e23c2f/s/o/solid_black_futon_cover.jpeg",
    },
    friends: {
      type: Array, //[user1ID, user2ID, user3ID]
      default: [],
    },
    onlineStatus: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    studiedAt: {
      type: String,
      default: "ABC Instutitue ",
    },
    worksAt: {
      type: String,
      max: 50,
      default: "ABC company",
    },
    city: {
      type: String,
      max: 50,
      default: "Mumbai",
    },
    from: {
      type: String,
      max: 50,
      default: "Mumbai",
    },
    relationship: {
      type: String,
      enum: ["Single", "Married", "Dating"],
      default: "Single",
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//s/ encrypting password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

// followers: {
//   type: Array, //[user1ID, user2ID, user3ID]
//   default: [],
// },
// followings: {
//   type: Array, //[user1ID, user2ID, user3ID]
//   default: [],
// },
