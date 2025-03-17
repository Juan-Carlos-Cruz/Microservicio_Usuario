// src/app/api/register/route.ts

import { NextResponse } from "next/server"

// Función que maneja POST /api/register
export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      )
    }

    // Simulación de creación de usuario
    const newUser = { id: Date.now(), username, email, password }

    // Devuelve 201 Created
    return NextResponse.json(
      { message: "Usuario registrado con éxito", user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error en el servidor:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "GET no implementado aún" }, { status: 200 })
}
