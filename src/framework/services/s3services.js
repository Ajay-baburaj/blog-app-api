import crypto from 'crypto'
import sharp from 'sharp'
import env from 'dotenv'
env.config()
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_LOCATION = process.env.BUCKET_LOCATION
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
const S3_SECRET_KEY = process.env.S3_SECRET_KEY



const s3 = new S3Client({
    credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY
    },
    region: BUCKET_LOCATION
})



export const s3services = () => {
    const uploadTos3 = async (file) => {
        return new Promise(async (resolve, reject) => {
            const randomImagName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
            const imageName = randomImagName()
            const buffer = await sharp(file.buffer)
                .toBuffer()
            const params = {
                Bucket: BUCKET_NAME,
                Key: imageName,
                Body: buffer,
                ContentType: file.mimetype
            }
            const command = new PutObjectCommand(params)
            await s3.send(command)
            resolve(imageName)
        }).catch((err) => {
            reject(err)
        })

    }

    const getFromS3 = async (image) => {
        const getObjectParams = {
            Bucket: BUCKET_NAME,
            Key: image
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 10000 })
        return url;
    }

    const deleteFromS3 = async (imageName) => {
        console.log(imageName)
        const params = {
            Bucket: BUCKET_NAME,
            Key: imageName
        }
        const command = new DeleteObjectCommand(params)
        return await s3.send(command)
    }
    return {
        uploadTos3,
        getFromS3,
        deleteFromS3
    }

}