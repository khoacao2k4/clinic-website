import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler)

app.get('/', (_req, res) => {
  res.send('Backend listening on port ' + port)
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});