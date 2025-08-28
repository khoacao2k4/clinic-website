import { Router } from "express";
import prisma from "../lib/prisma";
import { Patient } from "../../generated/prisma/client";

const router = Router();

// Create a new patient
router.post("/", async (req, res) => {
  const { name, phoneNumber, gender, yearOfBirth }: Patient = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        name,
        phoneNumber,
        gender,
        yearOfBirth,
      },
      select: { id: true, name: true, phoneNumber: true, gender: true, yearOfBirth: true, isActive: true },
    });
    res.status(201).json(newPatient);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Could not create patient." });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    console.log("get all patients")
    const patients = await prisma.patient.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: { id: true, name: true, phoneNumber: true, gender: true, yearOfBirth: true },
    }); //currently get all, maybe add pagination
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch patients." });
  }
});

// Update a patient's information
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, gender, yearOfBirth, isActive }: Patient = req.body;
  try {
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        phoneNumber: phoneNumber ?? null, // set phoneNumber to null if not provided
        gender,
        yearOfBirth,
        isActive,
      },
      select: { id: true, name: true, phoneNumber: true, gender: true, yearOfBirth: true, isActive: true },
    });
    res.status(200).json(updatedPatient);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Could not update patient." });
  }
});

// Get a specific patient information (records included)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const includeSummary = req.query.summary === "true"; // ?summary=true
  try {
    const data = await prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        gender: true,
        phoneNumber: true,
        yearOfBirth: true,
        isActive: true,
        ...(includeSummary
        ? {
            _count: { select: { records: true } }, // number of records
            records: {
              orderBy: { visitDate: "desc" },
              take: 1, // only the latest record
              select: { visitDate: true },
            },
          }
        : {}),
      },
    });
    
    if (!data || !data.isActive) {
      res.status(404).json({ error: "Patient not found." });
    } else {
      const patientInfo = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        yearOfBirth: data.yearOfBirth,
        isActive: data.isActive,
        ...(includeSummary
        ? {
            recordCount: data._count.records,
            latestVisitDate: data.records[0]?.visitDate ?? null,
          }
        : {}),
       };
      res.status(200).json(patientInfo);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch patient." });
  }
});

export default router;