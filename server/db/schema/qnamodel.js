import { Schema, model }  from 'mongoose';

const questionsSchema = new Schema({
  question_id: Number,
  product_id: {
    type: Number,
    required: [true, "Must belong to a product"]
  },
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_helpfulness: {type: Number, default: 0},
  reported: {type: Number, default: 0},
});

const Question = model('Questions', questionsSchema);

const answersSchema = new Schema({
  answer_id: Number,
  body: String,
  answer_date: String,
  answerer_name: String,
  answerer_email: String,
  helpfulness: {type: Number, default: 0},
  reported: {type: Number, default: 0},
  photos_url: [String],
  question_id: {
    type: Schema.ObjectId,
    ref: "Questions",
    required: [true, "Must belong to a question"]
  },

});

const Answers = model('Answers', answersSchema);