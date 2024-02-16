import {
  Injectable,
  Logger,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  protected logger: Logger = new Logger(S3Service.name);

  private readonly s3Client: S3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadToS3(bucketName: string, fileName: string, data: any) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(data),
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      this.logger.log(`File ${fileName} uploaded to ${bucketName}`);
    } catch (error) {
      this.logger.log(
        `Error uploading file ${fileName} to ${bucketName}: ${error}`,
      );
      throw new UnsupportedMediaTypeException(
        `Error uploading file ${fileName} to ${bucketName}: ${error}`,
      );
    }
  }

  async fetchFromS3(bucketName: string, fileName: string) {
    const s3Output = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }),
    );

    try {
      const jsonString = await s3Output.Body.transformToString();

      const feed = JSON.parse(jsonString ?? '');

      return feed;
    } catch (error) {
      this.logger.log('Error parsing job feed from S3 bucket');
      throw new UnprocessableEntityException(
        'Error parsing job feed from S3 bucket',
      );
    }
  }
}
