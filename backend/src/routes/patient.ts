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
  const includeRecords = req.query.include === "records";
  try {
    const patientInfo = await prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        gender: true,
        phoneNumber: true,
        yearOfBirth: true,
        isActive: true,
        ...(includeRecords ? {
          records: {
            orderBy: { visitDate: "desc" },
            select: { id: true, visitDate: true },
          },
        } : {}),
      },
    });
    
    if (!patientInfo || !patientInfo.isActive) {
      res.status(404).json({ error: "Patient not found." });
    } else {
      res.status(200).json(patientInfo);
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch patient." });
  }
});

export default router;