import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import multer from "multer";
import { PassThrough } from "stream";

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
});

// uploads a file to s3
export function uploadFile(file: Express.Multer.File) {
  try {
    console.log("i am hereee");

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    console.log("errorrrrrr", err);
  }
}

// downloads a file from s3

export async function getFileBuffer(fileKey: string): Promise<Buffer | any> {
  console.log("key", fileKey);

  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME!,
  };
  const exist = await s3.headObject(downloadParams).promise();
  if (!exist) console.log("not existttttt");

  const obj = await s3.getObject(downloadParams).promise();
  return obj.Body as Buffer;
}

// async function streamToBuffer(stream: PassThrough) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }
//   return Buffer.concat(chunks);
// }
