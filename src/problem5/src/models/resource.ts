import { Schema, model, Document } from 'mongoose';

export interface IResource extends Document {
  name: string;
  description?: string;
}

const resourceSchema = new Schema<IResource>({
  name: { type: String, required: true },
  description: { type: String, default: '' }
});

export const ResourceModel = model<IResource>('Resource', resourceSchema);
