import { Router } from "express";
import prisma from "../lib/prisma";
import { VisitRecord } from "../../generated/prisma/client";

const router = Router();

// Create a new visit record
router.post("/", async (req, res) => {
  const { patientID, visitDate } = req.body;
  try {
    const newVisitRecord = await prisma.visitRecord.create({
      data: {
        visitDate: new Date(visitDate),
        patient: {
          connect: {
            id: patientID,
          },
        },
      },
      select: { id: true, visitDate: true, patientId: true, isActive: true },
    });
    res.status(201).json(newVisitRecord);
  } catch (error: any) {
    console.log(error)
    res
      .status(400)
      .json({ error: error.message || "Could not create visit record." });
  }
});

// Get a specific visit record
router.get("/:recordId", async (req, res) => {
  const { recordId } = req.params;
  const includePatient = req.query.include === "patient"; // ?include=patient

  try {
    const visitRecord = await prisma.visitRecord.findUnique({
      where: { id: recordId },
      select: {
        id: true,
        visitDate: true,
        filledInfo: true,
        isActive: true,
        ...(includePatient
          ? { patient: { select: { id: true, name: true, phoneNumber: true, yearOfBirth: true, gender: true } } }
          : {}),
      },
    });
    if (!visitRecord || !visitRecord.isActive) {
      res.status(404).json({ error: "Visit record not found." });
    } else {
      res.status(200).json(visitRecord);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch visit record." });
  }
});

export default router;
