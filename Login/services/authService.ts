const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Credenciales inválidas");
  }

  return await response.json();
}