import { SESClient } from "@aws-sdk/client-ses";

// Upewnij się, że wartości środowiskowe nie są undefined
const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS environment variables are not properly set.");
}

const sesClient = new SESClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export { sesClient };
