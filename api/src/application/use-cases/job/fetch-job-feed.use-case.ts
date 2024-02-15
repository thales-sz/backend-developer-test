import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FetchJobFeedUseCase {
  protected logger: Logger = new Logger(FetchJobFeedUseCase.name);

  private readonly s3Client: S3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async execute(): Promise<void> {
    this.logger.log('Fetching job feed from S3 bucket...');

    const s3Output = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
        Key: 'job-feed.json',
      }),
    );

    const jsonString = await s3Output.Body.transformToString();

    const feed = JSON.parse(jsonString ?? '');

    return feed;
  }
}
