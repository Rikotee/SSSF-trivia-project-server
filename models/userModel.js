import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  highscore: {type: String, required: true},
  highscoreSD: {type: String, required: true},
});

export default mongoose.model('User', userSchema);