import { Injectable } from '@nestjs/common';
//import { faker } from '@faker-js/faker';
import { Tree } from '../entities/tree.entity';

//import { CreateTreeDto, UpdateTreeDto } from '../dtos/arbol.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InventaryService {
  private trees: Tree[] = [];
  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  getAll() {
    return this.treeModel.find().exec();
  }

  async findOne(id: string) {
    const tree = this.treeModel.findById(id);
    if (!tree) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return tree;
  }

  /*
  update(id: string, body: UpdateTreeDto) {
    const user = this.findOne(id);
    const index = this.trees.findIndex((item) => item.id === id);
    this.trees[index] = {
      ...user,
      ...body,
    };
    return this.trees[index];
  }

  disable(id: number) {
    const tree = this.findOne(id);
    tree.state = !tree.state;
    return this.update(id, tree);
  }

  

  create(body: CreateTreeDto) {
    this.trees.push({
      id: this.trees.length + 1,
      ...body,
    });
    return body;
  }*/
}
