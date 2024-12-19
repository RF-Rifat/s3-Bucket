import { Router } from 'express';
import { uploadFile, getFileUrl } from '../controllers/upload.controller';
import upload from '../middleware/upload.middleware';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files/:fileName', getFileUrl);

export default router;