import { Injectable } from '@nestjs/common';
import { Tree } from '../entities/tree.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/tree.dto';
import { ObjectId } from 'mongodb';
import { S3Provider } from '../providers/s3/s3.provider';

@Injectable()
export class InventaryService {
  constructor(
    @InjectModel(Tree.name) private treeModel: Model<Tree>,
    private s3Provider: S3Provider,
  ) {}

  async getAll(filter: {}) {
    return await this.treeModel.find(filter);
  }

  async findOne(id: string) {
    const tree = await this.treeModel.findById(id);
    if (!tree) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return tree;
  }

  async create(body: CreateTreeDto) {
    const url = await this.s3Provider.uploadFile(body);
    const tree = {
      location: body.location,
      commonName: body.commonName,
      scientificName: body.scientificName,
      neighborhood: body.neighborhood,
      locality: body.locality,
      physicalDescription: body.physicalDescription,
      photo: url,
      state: body.state,
    };
    const newTree = await this.treeModel.insertMany([tree]);
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

  async getFilterTrees(filter: { id: [string] }) {
    const arr = filter.id.map((elem) => new ObjectId(elem));

    return await this.treeModel.find({
      _id: { $in: arr },
    });
  }
}
