import { Router } from "express";
import prisma from "../lib/prisma";
import { Patient } from "../../generated/prisma/client";

const router = Router();

router.post('/', async (req, res) => {
  const { name, phoneNumber, gender, yearOfBirth } : Patient = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        name,
        phoneNumber,
        gender,
        yearOfBirth,
      },
    });
    res.status(201).json(newPatient);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Could not create patient.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany(); //currently get all, maybe add pagination
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch patients.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, gender, yearOfBirth } : Patient = req.body;
  try {
    console.log(name, phoneNumber, gender, yearOfBirth)
    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        phoneNumber: phoneNumber ?? null, // set phoneNumber to null if not provided
        gender,
        yearOfBirth,
      },
    });
    res.status(200).json(updatedPatient);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Could not update patient.' });
  }
});

export default router;