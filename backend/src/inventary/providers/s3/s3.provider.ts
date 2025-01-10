import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CreateTreeDto } from 'src/inventary/dtos/tree.dto';

@Injectable()
export class S3Provider {
  s3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
  }

  async uploadFile(file: CreateTreeDto) {
    const { img, imgName } = file;

    const decodedImage = Buffer.from(img, 'base64');

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `/file/${imgName}`,
      ACL: 'public-read',
      Body: decodedImage,
    };

    try {
      const responseS3 = await this.s3.upload(params).promise();
      return responseS3.Location;
    } catch (err) {
      throw new Error(`Error uploading file: ${err.message}`);
    }
  }
}
