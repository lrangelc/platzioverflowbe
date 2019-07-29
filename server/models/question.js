import mongoose, { Schema } from 'mongoose';

const QuestionSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer', default: [] }],
    answers_count: { type: Number, required: false, default: 0 }
}, { usePushEach: true });

export default mongoose.model('Question', QuestionSchema);