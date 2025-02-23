import { Request, Response } from 'express';
import { ResourceModel } from '../models/resource';

export class ResourceController {
  // Create a new resource
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const resource = new ResourceModel({ name, description });
      const created = await resource.save();
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create resource' });
    }
  }

  // List resources with optional filtering by name
  async list(req: Request, res: Response): Promise<void> {
    try {
      const filter: any = {};
      if (req.query.name) {
        filter.name = { $regex: req.query.name, $options: 'i' };
      }
      const resources = await ResourceModel.find(filter);
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  }

  // Get resource details by ID
  async get(req: Request, res: Response): Promise<void> {
    try {
      const resource = await ResourceModel.findById(req.params.id);
      if (!resource) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resource' });
    }
  }

  // Update resource details by ID
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const updatedResource = await ResourceModel.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
      );
      if (!updatedResource) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.json(updatedResource);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update resource' });
    }
  }

  // Delete a resource by ID
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedResource = await ResourceModel.findByIdAndDelete(req.params.id);
      if (!deletedResource) {
        res.status(404).json({ error: 'Resource not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete resource' });
    }
  }
}
