"use client";
import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import { loginUser } from "../../services/authService";

export default function LoginModal() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    
    try {
      await loginUser({
        email: form.email,
        password: form.password,
      });
      setSuccess("¡Inicio de sesión exitoso!");
      setForm({
        email: "",
        password: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error en el inicio de sesión");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn}>&times;</button>
        <h2 className={styles.title}>Inicia Sesión</h2>
        <p className={styles.subtitle}>Accede a tu cuenta en XXXX.</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            value={form.password}
            onChange={handleChange}
          />
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <button type="submit" className={styles.mainBtn}>
            Iniciar Sesión
          </button>
        </form>
        <p className={styles.signup}>
          ¿No tienes cuenta? <a href="http://localhost:3000">Regístrate aquí.</a>
        </p>
      </div>
    </div>
  );
}