import mongoose, { Schema, Document } from 'mongoose';

export interface Quiz extends Document {
  title: string;
  questions: Schema.Types.ObjectId[];
}

const QuizSchema = new Schema({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

export default mongoose.model<Quiz>('Quiz', QuizSchema);