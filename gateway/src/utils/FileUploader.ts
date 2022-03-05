import { ConfigService } from 'src/config/config.service';
import { S3 } from 'aws-sdk';

export class FileUploader {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(data: Buffer, filename: string, bucket: 'fishCover') {
    const aws = new S3();
    const awsBucket = this.configService.get('aws').bucket[bucket];

    const upload = await aws
      .upload({
        Bucket: awsBucket,
        Body: data,
        Key: filename,
      })
      .promise();

    console.log('UPLOADED', upload);
  }
}
