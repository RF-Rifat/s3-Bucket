import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  aws: z.object({
    region: z.string(),
    bucketName: z.string(),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
  }),
  maxFileSize: z.number().default(5 * 1024 * 1024), // 5MB
});

const config = configSchema.parse({
  port: Number(process.env.PORT),
  aws: {
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxFileSize: Number(process.env.MAX_FILE_SIZE),
});

export default config;