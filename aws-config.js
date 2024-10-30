// aws-config.js
import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
  region: 'us-east-1', // Replace with your region
  credentials: new AWS.Credentials({
    accessKeyId: 'AKIA6GBMA4MMUGJDFZ2M', // Replace with your access key
    secretAccessKey: 'MeC7XA29sX9SMYv0zmHc7L8NvQtPT7koSj3Bt0zx', // Replace with your secret key
  }),
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export const savePostToDynamoDB = async (imageURL, caption) => {
  const params = {
    TableName: 'user-post-table',
    Item: {
      postId: new Date().toISOString(),
      imageURL: imageURL,
      caption: caption,
      createdAt: new Date().toISOString(),
    },
  };

  await dynamoDB.put(params).promise();
};

export const uploadImageToS3 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const params = {
    Bucket: 'ig-clone-24', // Replace with your bucket name
    Key: `${Date.now()}.jpg`, // You can customize the filename here
    Body: blob,
    ContentType: 'image/jpeg', // Adjust based on your image type
  };

  const uploadResult = await s3.upload(params).promise();
  return {Location:uploadResult.Location}; 
};

export const fetchPostsFromDynamoDB = async () => {
  const params = {
    TableName: 'user-post-table',
  };

  const data = await dynamoDB.scan(params).promise();
  return data.Items;
};
