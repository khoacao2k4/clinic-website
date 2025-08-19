const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createPatient = async (values: any) => {
    const response = await fetch(`${API_URL}/api/patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });

    if (!response.ok)
        throw new Error("Failed to create patient. Please try again.");

    return response.json();
};

export const fetchPatients = async () => {
    const response = await fetch(`${API_URL}/api/patient`);

    if (!response.ok)
        throw new Error("Failed to fetch patients. Please try again.");
    return response.json();
}

export const updatePatient = async (id: string, values: any) => {
    const response = await fetch(`${API_URL}/api/patient/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });

    if (!response.ok)
        throw new Error("Failed to update patient. Please try again.");

    return response.json();
};

/////////// api for records

// --- Patients
export async function fetchPatientDetails(patientId: string) {
  const response = await fetch(`${API_URL}/api/patient/${patientId}?include=records`);

  if (!response.ok) 
    throw new Error("Failed to fetch patient. Please try again.");

  return response.json();
}

export async function fetchRecordsByPatient(patientId: string, fromDate: string, toDate: string) {
  const res = await fetch(`${API_URL}/api/record/patient/${patientId}?from=${fromDate}&to=${toDate}`);
  if (!res.ok) 
    throw new Error("Failed to fetch records. Please try again.");
  return res.json();
}

export async function createRecord(input: { patientId: string; visitDate: string }) {
  const res = await fetch(`${API_URL}/api/record`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) 
    throw new Error(await res.text());
  return res.json();
}

export async function deleteRecord(recordId: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/record/${recordId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}