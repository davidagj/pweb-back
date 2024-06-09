import { Schema, model, Document } from 'mongoose';

export enum TaskStatus {
  Pending = 'pending',
  Doing = 'doing',
  Done = 'done'
};

export enum TaskPriority {
  Low = 'low',
  Middle = 'middle',
  High = 'high'
};

export enum TaskType {
  Particular = 'particular',
  Professional = 'professional',
  Academic = 'academic',
}

interface ITask extends Document {
  title: String;
  description: String;
  priority: TaskPriority;
  status: TaskStatus;
  date: Date;
  type: TaskType;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: Object.values(TaskStatus), required: true, default: TaskStatus.Pending },
  priority: { type: String, enum: Object.values(TaskPriority), required: true, default: TaskPriority.Low },
  type: { type: String, enum: Object.values(TaskType), required: true, default: TaskType.Particular },
  title: { type: String, required: true },
  description: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Task = model<ITask>('Task', TaskSchema);

export default Task;
