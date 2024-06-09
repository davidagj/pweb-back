import { Response } from "express";
import Task from "../schemas/task";
import { sendResponse } from "../utils";

const create_task = async (req: any, res: Response) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      date,
      type
    } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      status,
      date,
      type,
      owner: req.user._id
    });

    await task.save();

    res.status(201).send(sendResponse({ success: true, data: task }));
  } catch (err) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

const edit_task = async (req: any, res: Response) => {
  try {
    const { id: _id } = req.params;
    const saveBody = req.body;

    const task = await Task.findOne({ _id });

    if (!task) return res.status(500).send(sendResponse({ success: false, message: 'Tarefa não encontrada.' }));

    Object.assign(task, saveBody);

    await task.save();

    res.status(201).send(sendResponse({ success: true, data: task }));
  } catch (err: any) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

const delete_task = async (req: any, res: Response) => {
  try {
    const { id: _id } = req.params;
    
    await Task.deleteOne({ _id });

    res.status(201).send(sendResponse({ success: true, message: 'Tarefa deletada com sucesso.' }));
  } catch (err: any) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

const list_task = async (req: any, res: Response) => {
  try {
    const user = req.user;

    const find = await Task.find({ owner: user._id });

    if (!find)
      return res.status(400).send(sendResponse({ success: false, message: 'Ocorreu um erro ao buscar tarefas.' }));

    if (find.length === 0)
      return res.status(400).send(sendResponse({ success: false, message: 'Não foi encontrado nenhuma tarefa.' }));

    res.status(201).send(sendResponse({ success: true, data: find }));
  } catch (err: any) {
    res.status(400).send(sendResponse({ success: false, message: String(err) }));
  }
};

export default {
  create_task,
  edit_task,
  delete_task,
  list_task,
}