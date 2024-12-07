import { Injectable } from '@nestjs/common';
import { Tree } from '../entities/tree.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTreeDto, UpdateTreeDto } from '../dtos/tree.dto';
import { ObjectId } from 'mongodb';
import { S3 } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InventaryService {
  private s3 = new S3({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  getAll() {
    return this.treeModel.find();
  }

  async findOne(id: string) {
    const tree = await this.treeModel.findById(id);
    if (!tree) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return tree;
  }

  async create(body: CreateTreeDto, file: Express.Multer.File) {
    const bucketName = 'filesstoragesforforestactg2024';
    const key = `${uuidv4()}-${file.originalname}`;

    await this.s3.putObject({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const url = `https://${bucketName}.s3.amazonaws.com/${key}`;
    body.photo = url;

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
