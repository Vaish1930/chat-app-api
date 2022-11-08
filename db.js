import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbURI = `mongodb+srv://root:${process.env.PASS}@cluster0.w6bvy.mongodb.net/chatAppApi?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(dbURI, { autoIndex: false });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting database ${error} `);
  }
};

export default connectDb;
