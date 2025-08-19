import { Router } from "express";
import prisma from "../lib/prisma";
import { VisitRecord } from "../../generated/prisma/client";

const router = Router();

// Create a new visit record
router.post("/", async (req, res) => {
  const { patientId, visitDate }: { patientId: string; visitDate: string } = req.body;
  try {
    const newVisitRecord = await prisma.visitRecord.create({
      data: {
        visitDate: new Date(visitDate),
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
      select: { id: true, visitDate: true, patientId: true},
    });
    res.status(201).json(newVisitRecord);
  } catch (error: any) {
    // date-userId exists in database
    if (error.code === "P2002") {
      res.status(400).json({ error: "Visit record already exists." });
    }
    res.status(400).json({ error: error.message || "Could not create visit record." });
  }
});

// Get all visit records for a patient
router.get("/patient/:patientId", async (req, res) => {
  const { patientId } = req.params;
  const { from, to } = req.query;
  try {
    const visitRecords = await prisma.visitRecord.findMany({
      where: { 
        patientId,
        visitDate: {
          gte: from ? new Date(from as string) : undefined,
          lte: to ? new Date(to as string) : undefined,
        },
      },
      select: { id: true, visitDate: true },
    });
    res.status(200).json(visitRecords);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch visit records." });
  }
})

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
        ...(includePatient
          ? { patient: { select: { id: true, name: true, phoneNumber: true, yearOfBirth: true, gender: true } } }
          : {}),
      },
    });
    if (!visitRecord) {
      res.status(404).json({ error: "Visit record not found." });
    } else {
      res.status(200).json(visitRecord);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch visit record." });
  }
});

router.delete("/:recordId", async (req, res) => {
  const { recordId } = req.params;
  try {
    await prisma.visitRecord.delete({ where: { id: recordId } });
    res.status(200).json({ message: "Visit record deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not delete visit record." });
  }
})

export default router;
