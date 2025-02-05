import AWS from "aws-sdk";

const AWS_S3_REGION = process.env.AWS_S3_REGION;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const OBJECT_NAME =process.env.OBJECT_NAME!;

AWS.config.update({
	region: AWS_S3_REGION,
	accessKeyId: AWS_S3_ACCESS_KEY_ID,
	secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();
const s3 = new AWS.S3();

type GeneratePresignedUrlParams = {
	bucketName: string;
	objectName: string;
	expiration?: number;
};

const generatePresignedUrl = (
	bucketName: string,
	objectName: string,
	expiration: number = 3600,
): Promise<string> => {
	return s3.getSignedUrlPromise("getObject", {
		Bucket: bucketName,
		Key: objectName,
		Expires: expiration,
	});
};

type SendEmailParams = {
	recipientEmail: string;
	downloadUrl: string;
};

const sendEmail = async (
	recipientEmail: string,
	downloadUrl: string,
): Promise<AWS.SES.SendEmailResponse> => {
	const params: AWS.SES.SendEmailRequest = {
		Source: "Your Name <your-email@example.com>",
		Destination: {
			ToAddresses: [recipientEmail],
		},
		Message: {
			Subject: {
				Data: "Download Your File",
			},
			Body: {
				Text: {
					Data: `Hello,\n\nThank you for subscribing to our newsletter. Please download your file using the link below:\n${downloadUrl}\n\nBest regards,\nYour Company`,
				},
			},
		},
	};

	return ses.sendEmail(params).promise();
};

export async function POST(req: Request): Promise<Response> {
	try {
		const body: { email: string } = await req.json();
		const { email } = body;

		const downloadUrl = await generatePresignedUrl(AWS_S3_BUCKET_NAME, OBJECT_NAME);
		await sendEmail(email, downloadUrl);

		return new Response(
			JSON.stringify({
				message: "Subscription successful! Check your email for the download link.",
			}),
			{ status: 200 },
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Subscription failed. Please try again later." }),
			{ status: 500 },
		);
	}
}

export async function GET(): Promise<Response> {
	return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
}
