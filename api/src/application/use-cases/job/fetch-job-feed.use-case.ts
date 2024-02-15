import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FetchJobFeedUseCase {
  protected logger: Logger = new Logger(FetchJobFeedUseCase.name);
  private readonly s3Client: S3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async execute(): Promise<void> {
    const s3Output = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
        Key: 'job-feed.json',
      }),
    );

    try {
      const jsonString = await s3Output.Body.transformToString();

      const feed = JSON.parse(jsonString ?? '');

      return feed;
    } catch (error) {
      this.logger.error('Error parsing job feed');
      throw new UnprocessableEntityException('Error parsing job feed');
    }
  }
}
