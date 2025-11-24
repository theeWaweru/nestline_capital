// lib/aws-s3.js
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File content as buffer
 * @param {string} fileName - Name for the file in S3
 * @param {string} mimeType - MIME type (e.g., 'image/jpeg', 'application/pdf')
 * @param {string} folder - Folder in bucket (e.g., 'plots', 'projects', 'title-deeds')
 * @returns {Promise<string>} - Public URL of uploaded file
 */
export async function uploadToS3(
  fileBuffer,
  fileName,
  mimeType,
  folder = "uploads"
) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  // Generate unique filename to avoid collisions
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `${folder}/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    // ACL: "public-read",
  });

  try {
    await s3Client.send(command);

    // Return public URL
    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return publicUrl;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

/**
 * Delete file from S3
 * @param {string} fileUrl - Public URL of the file
 * @returns {Promise<void>}
 */
export async function deleteFromS3(fileUrl) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  // Extract key from URL
  const urlParts = fileUrl.split(".amazonaws.com/");
  if (urlParts.length !== 2) {
    throw new Error("Invalid S3 URL");
  }

  const key = urlParts[1];

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete file from S3");
  }
}

/**
 * Delete multiple files from S3
 * @param {string[]} fileUrls - Array of public URLs
 * @returns {Promise<void>}
 */
export async function deleteManyFromS3(fileUrls) {
  const deletePromises = fileUrls.map((url) => deleteFromS3(url));
  await Promise.all(deletePromises);
}
