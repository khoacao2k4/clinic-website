import nunjucks from "nunjucks";
import { chromium, Browser } from "@playwright/test";
import { presignGet, uploadPdf } from "../lib/s3";
import { Router } from "express";
import { baseUrl } from "../server";



const router = Router();


nunjucks.configure("views", { autoescape: true });
// Keep a browser alive for speed
let browserPromise: Promise<Browser> | null = null;
async function getBrowser() {
  if (!browserPromise) browserPromise = chromium.launch({ args: ["--no-sandbox"] });
  return browserPromise;
}

const MOCK_DATA = {
  "name": "bun cha~",
  "YOB": "2008",
  "gender": "Male",
  "address": "13 Đào Duy Từ, P5, Q10, TP.HCM,",
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

router.get("/test-pdf", async (req, res, next) => {
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

    const safeName = (name || "patient").toString().replace(/\s+/g, "_");
    const key = `records/${safeName}/${Date.now()}.pdf`;
    await uploadPdf(process.env.S3_BUCKET!, key, pdf);
    const url = await presignGet(process.env.S3_BUCKET!, key,);
    res.status(200).json({ key, url });
  } catch (err) {
    next(err);
  }
});

export default router;