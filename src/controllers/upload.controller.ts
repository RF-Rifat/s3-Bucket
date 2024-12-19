import { Request, Response } from 'express';
import s3Service from '../services/s3.service';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileName = await s3Service.uploadFile(req.file);
    const fileUrl = await s3Service.getSignedUrl(fileName);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileName,
      url: fileUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const getFileUrl = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    const url = await s3Service.getSignedUrl(fileName);
    res.status(200).json({ url });
  } catch (error) {
    console.error('Get URL error:', error);
    res.status(500).json({ error: 'Failed to generate file URL' });
  }
};