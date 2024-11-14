import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Tree } from '../entities/tree.entity';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/arbol.dto';
import { find } from 'rxjs';

@Injectable()
export class InventaryService {
  private trees: Tree[] = [];
  constructor() {
    this.generateRandomTreeData();
  }

  getAll() {
    return this.trees;
  }

  generateRandomTreeData() {
    for (let i = 0; i < 20; i++) {
      this.trees.push({
        id: i + 1,
        location: `${faker.location.latitude()} ${faker.location.longitude()}`,
        commonName: faker.animal.dog(),
        scientificName: faker.animal.insect(),
        neighborhood: faker.location.country(),
        locality: faker.string.alphanumeric(),
        physicalDescription: faker.lorem.lines(),
        photo: faker.system.filePath(),
        state: true,
      });
    }
  }

  update(id: number, body: UpdateTreeDto) {
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

  findOne(id: number) {
    return this.trees.find((el) => {
      return id == el.id;
    });
  }

  create(body: CreateTreeDto) {
    this.trees.push({
      id: this.trees.length + 1,
      ...body,
    });
    return body;
  }
}
