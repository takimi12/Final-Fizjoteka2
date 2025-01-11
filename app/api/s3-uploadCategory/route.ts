import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.NEXT_PUBLIC_AWS_S3_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_S3_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucket) {
	throw new Error("AWS environment variables are not properly set.");
}

const s3Client = new S3Client({
	region: region,
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	},
});

async function uploadFileToS3(file: Buffer, fileName: string, contentType: string) {
	const params = {
		Bucket: bucket,
		Key: `${fileName}`,
		Body: file,
		ContentType: contentType,
	};

	const command = new PutObjectCommand(params);
	const responseFromAws = await s3Client.send(command);

	const getObjectCommand = new GetObjectCommand({
		Bucket: bucket,
		Key: `${fileName}`,
	});

	const url = await getSignedUrl(s3Client, getObjectCommand);
	return url.split("?")[0];
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const imageFile = formData.get("image");

		if (!imageFile) {
			return NextResponse.json({ error: "Image file is required." }, { status: 400 });
		}

		let imageBuffer: Buffer;
		if (imageFile instanceof Blob) {
			const arrayBuffer = await imageFile.arrayBuffer();
			imageBuffer = Buffer.from(new Uint8Array(arrayBuffer));
		} else {
			imageBuffer = Buffer.from(new Uint8Array());
		}

		const imageFileName = imageFile instanceof File ? imageFile.name : "defaultImageFileName";
		const imageFileType = imageFile instanceof File ? imageFile.type : "";

		try {
			const imageUrl = await uploadFileToS3(imageBuffer, imageFileName, imageFileType);
			return NextResponse.json({ success: true, imageUrl });
		} catch (err) {
			console.error("Upload error:", err);
			return NextResponse.json({ error: (err as Error).message }, { status: 500 });
		}
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({ error: (error as Error).message }, { status: 500 });
	}
}
