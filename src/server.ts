import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config';
import uploadRoutes from './routes/upload.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api', uploadRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});








// import express from 'express';
// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import config from "./config";

// const app = express();

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: config.aws.accessKeyId,
//     secretAccessKey: config.aws.secretAccessKey,
//   },
//   region: config.aws.region,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "onlinestaff", 
//     acl: "public-read",
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       cb(null, Date.now().toString() + "-" + file.originalname); 
//     },
//   }),
// });

// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({
//     message: "File uploaded successfully!",
//     fileUrl: (req.file as Express.MulterS3.File).location,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
