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
  try {
    const response = await fetch(`${API_URL}/api/patient/${patientId}?summary=true`);

    if (!response.ok) 
      throw new Error("Internal server error. Please try again.");
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch patient. Please try again.");
  }
}

export async function fetchRecordsByPatient(patientId: string, fromDate: string, toDate: string) {
  const res = await fetch(`${API_URL}/api/record/patient/${patientId}?from=${fromDate}&to=${toDate}`);
  if (!res.ok) 
    throw new Error("Failed to fetch records. Please try again.");
  return res.json();
}

export async function createRecord(input: { patientId: string; visitDate: string }) {
  try {
    const res = await fetch(`${API_URL}/api/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      let message = "Internal server error. Please try again.";
      const data = await res.json();
      if (data?.error) message = data.error; // use backend error
      throw new Error(message);
    }
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to create record. Please try again.");
  }
}

export async function deleteRecord(recordId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/record/${recordId}`, { method: "DELETE" });

    if (!response.ok) 
      throw new Error("Internal server error. Please try again.");
    return response.json();
  } catch (error) {
    throw new Error("Failed to delete record. Please try again.");
  }
}