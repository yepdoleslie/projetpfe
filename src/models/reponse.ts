import mongoose, { Schema, Document } from 'mongoose';

export interface Reponse extends Document {
  questionId: Schema.Types.ObjectId;
  selectedAnswer: string;
}

const ReponseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedAnswer: { type: String, required: true },
});

export default mongoose.model<Reponse>('Reponse', ReponseSchema);