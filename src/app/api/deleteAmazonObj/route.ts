import { DeleteObjectCommand, S3Client, S3ServiceException } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  }
});

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${data.fileName}`,
  });

  try {
    const response = await s3Client.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof S3ServiceException) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}