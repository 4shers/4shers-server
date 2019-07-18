const GoogleCloudStorage = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT
const GOOGLE_CLOUD_KEYFILE = process.env.KEYFILE_PATH

const storage = GoogleCloudStorage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.getPublicUrl = (bucketName, fileName) => {
  `https://storage.googleapis.com/${bucketName}/${fileName}`};