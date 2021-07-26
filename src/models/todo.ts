import { model, Schema } from 'mongoose';

export const TodoModelName = 'Todo';
export const TodoModel = model(
  TodoModelName,
  new Schema(
    {
      text: String,
    },
    {
      timestamps: true,
    },
  ),
);
