import mongoose from "mongoose";

const uri = process.env.MONGO_DB_URL;

export const connectMongoDB = () => {
  try {
    mongoose.connect(uri);
    console.log("Database connected with mongodb");
  } catch (error) {
    console.log(error);
  }
};

// export const connectMongoDB = () => {
//     try {
//       mongoose.connect(process.env.MONGO_DB);
//       console.log("Connection success");
//     } catch (error) {
//       console.log(error);
//     }
//   };
