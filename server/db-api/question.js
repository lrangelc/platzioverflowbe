import Debug from 'debug';
import { Question, Answer } from '../models';
import mongoose from 'mongoose';

const debug = new Debug('platzioverflowbe:db-api:question');

async function findAnswerById  (id)  {
    const mongoId = mongoose.mongo.ObjectId(id);

    return await Answer
        .findOne({ _id: mongoId })
        .populate({
            path: 'user',
            select: '-password'
          })
}

export default {
    findAll: async (sort = '-createdAt') => {
        return await Question.find().populate('answers').sort(sort);
    },

    findById: async (id) => {
        const mongoId = mongoose.mongo.ObjectId(id);

        return await Question
            .findOne({ _id: mongoId })
            .populate({
                path: 'user',
                select: '-password'
              })
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User',
                    select: '-password'
                  }
            })
    },

    create: async (q) => {
        const question = new Question(q);
        return question.save();
    },

    createAnswer: async (q, a) => {
        const answer = new Answer(a);
        const savedAnswer = await answer.save();

        q.answers.push(answer);
        q.answers_count = q.answers_count + 1;
        await q.save();
        
        return await findAnswerById(savedAnswer._id);
    }
}