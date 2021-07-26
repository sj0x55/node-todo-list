import { model, Schema } from 'mongoose';

const TodoSchema = new Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  },
);

export const TodoModel = model('Todo', TodoSchema);
