import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import cors from 'cors';
import patientRouter from './routes/patient';
import nunjucks from "nunjucks";
import { chromium, Browser } from "@playwright/test";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.PUBLIC_BASE_URL || `http://127.0.0.1:${port}`;


app.use(express.json());
app.use(cors())
app.use(errorHandler)
app.use(express.static('public'))

nunjucks.configure("views", { autoescape: true });

// Keep a browser alive for speed
let browserPromise: Promise<Browser> | null = null;
async function getBrowser() {
  if (!browserPromise) browserPromise = chromium.launch({ args: ["--no-sandbox"] });
  return browserPromise;
}

const MOCK_DATA = {
  "name": "Trần Văn HuY",
  "YOB": "2008",
  "gender": "Male",
  "address": "13 Đào Duy Từ, P5, Q10, TP.HCM",
  "MP": {
    "UCVA": "mẹ điền",
    "SPH": "mẹ điền",
    "CYL": "mẹ điền",
    "AX": "mẹ điền",
    "BCVA": "mẹ điền",
    "ADD": "mẹ điền"
  },
  "MT": {
    "UCVA": "mẹ điền",
    "SPH": "mẹ điền",
    "CYL": "mẹ điền",
    "AX": "mẹ điền",
    "BCVA": "mẹ điền",
    "ADD": "mẹ điền"
  },
  "current_glasses": "mẹ điền",
  "right_eye": "mẹ điền",
  "left_eye": "mẹ điền",
  "reassessmentTime": "3"
}

app.get("/test-pdf", async (req, res, next) => {
  try {
    const {
      name, YOB, gender, address, MT, MP,
      current_glasses, right_eye, left_eye, reassessmentTime
    } = MOCK_DATA;


    const html = nunjucks.render("record.njk", {
      baseUrl,name, YOB, gender, address, MT, MP,
      current_glasses, right_eye, left_eye, reassessmentTime,
      phone_number: "0913963003",
      email: "drkhanhtrang.ophth@gmail.com"
    });

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });

    const pdf = await page.pdf({
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true
    });
    await page.close();

    const filename = "test.pdf";

    res
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`
      })
      .send(pdf);
  } catch (err) {
    next(err);
  }
});


app.use("/api/patient", patientRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Dr Trang Clinic API is running.' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});