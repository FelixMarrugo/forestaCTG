import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Tree } from '../entities/tree.entity';

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
}
