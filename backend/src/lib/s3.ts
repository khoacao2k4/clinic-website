import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({ region: process.env.AWS_REGION! });

export async function uploadPdf(bucket: string, key: string, body: Buffer) {
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: "application/pdf",
    ServerSideEncryption: "AES256"
  }));
}

export async function presignGet(bucket: string, key: string, ttl = 300) {
  const cmd = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentType: "application/pdf"
  });
  return getSignedUrl(s3, cmd, { expiresIn: ttl });
}