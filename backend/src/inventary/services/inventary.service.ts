import { Injectable } from '@nestjs/common';
import { Tree } from '../entities/tree.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/arbol.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class InventaryService {
  private trees: Tree[] = [];
  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  async getAll() {
    return await this.treeModel.find();
  }

  async findOne(id: string) {
    const tree = await this.treeModel.findById(id);
    if (!tree) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return tree;
  }

  async create(body: CreateTreeDto) {
    const newTree = await this.treeModel.insertMany([body]);
    return newTree;
  }

  async update(id: string, body: UpdateTreeDto) {
    await this.treeModel.updateOne({ _id: new ObjectId(id) }, { $set: body });
    return await this.treeModel.findById(id);
  }

  async disable(id: string) {
    await this.treeModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: { state: false } },
    );
    return await this.treeModel.findById(id);
  }
}
