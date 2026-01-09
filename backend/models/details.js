import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({

  phoneNo: { type: Number, required: true },
  url: { type: String, required: true },
  username: { type: String, required: true },
  uuid: { type: String, required: true },
  connected_accounts: { type: Array, required: false, default: [] },

});

const UserDetails = new mongoose.model('UserS', UserSchema);
export default UserDetails;
