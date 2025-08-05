import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors())
app.use(errorHandler)

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dr Trang Clinic API is running.' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});