export async function registerUser(data: { username: string; email: string; password: string; confirmPassword: string }) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error en el registro");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en registerUser:", error);
      throw error;
    }
  }
  