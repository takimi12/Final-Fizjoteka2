import { NextResponse } from "next/server";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
  },
  region: process.env.AWS_S3_REGION
});

export async function GET() {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
    });

    const listResponse = await s3.send(listCommand);

    if (!listResponse.Contents) {
      throw new Error("No contents found in the bucket.");
    }

    const urls = await Promise.all(listResponse.Contents.map(async (item) => {
      if (!item.Key) {
        throw new Error("Item key is undefined.");
      }
      
      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: item.Key,
      });

      return getSignedUrl(s3, getObjectCommand);
    }));

    console.log('urls:', urls);

    return NextResponse.json({ urls });

  } catch (error) {
    console.error('Error fetching objects from S3:', error);
    return new Response('Error fetching objects from S3', { status: 500 });
  }
}
