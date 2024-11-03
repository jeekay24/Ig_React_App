import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  region: 'us-east-1', // Replace with your region
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with process.env for environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with process.env for environment variables
  }),
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export const savePostToDynamoDB = async (imageURL, caption) => {
  // Your existing code
};

export const uploadImageToS3 = async (uri) => {
  // Your existing code
};

export const fetchPostsFromDynamoDB = async () => {
  // Your existing code
};
