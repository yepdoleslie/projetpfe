import mongoose, { Schema, Document } from 'mongoose';

export interface Question extends Document {
  text: string;
  correctAnswer: string;
}

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  correctAnswer: { type: String, required: true },
});

export default mongoose.model<Question>('Question', QuestionSchema);
