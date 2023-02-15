import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import multer from "multer";

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
});

// uploads a file to s3
export function uploadFile(file: Express.Multer.File) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
export function getFileStream(fileKey: string) {
  const downloadParams = {
    Key: fileKey,
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
  };

  return s3.getObject(downloadParams).createReadStream();
}
