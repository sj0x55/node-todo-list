import { NextFunction, Request, Response } from 'express';
import { TodoModel } from '../../models/todo';

export const todosController = {
  async findAll(req: Request, res: Response): Promise<void> {
    const data = await TodoModel.find().sort({ createdAt: 'desc' });

    res.status(200).send({ data });
  },

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await TodoModel.findOne({ _id: req.params.id });

    if (data) {
      res.status(200).send({ data });
    } else {
      next();
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const data = await new TodoModel({
      text: req.body.text,
    }).save();

    res.status(201).send({ data, message: 'Todo was created' });
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await TodoModel.findOneAndUpdate({ _id: req.params.id }, { text: req.body.text }, { new: true });

    if (data) {
      res.status(200).send({ data, message: 'Todo was updated' });
    } else {
      next();
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data = await TodoModel.findOne({ _id: req.params.id });

    if (data) {
      await TodoModel.remove();

      res.status(200).send({ message: 'Todo was removed' });
    } else {
      next();
    }
  },
};
