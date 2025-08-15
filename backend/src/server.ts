import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors';
import patientRouter from './routes/patient';
import recordRouter from './routes/record';
import testRouter from "./routes/test";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
export const baseUrl = process.env.PUBLIC_BASE_URL || `http://127.0.0.1:${port}`;


app.use(express.json());
app.use(cors())
app.use(errorHandler)
app.use(express.static('public'))


app.use("/api/patient", patientRouter);
app.use("/api/record", recordRouter);
app.use("/test", testRouter)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dr Trang Clinic API is running.' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});