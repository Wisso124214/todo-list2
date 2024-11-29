import mongoose from 'mongoose';


export const connect = async (DB_URL) => {

  return await mongoose.connect(DB_URL)
  .then(() => {
    console.log(`Connected to the database`);
    return true;
  })
  .catch((error) => {
    console.log('Error connecting to the database: ', error);
    return false;
  });
}