import mongoose from "mongoose";

// const connectToDb = async () =>
//   await mongoose.connect(
//     `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.1eexyf1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//   );

// if you want to create dbname
const connectToDb = async () => {
  const dbname = "student";
  await mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.1eexyf1.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export default connectToDb;
