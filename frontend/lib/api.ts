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