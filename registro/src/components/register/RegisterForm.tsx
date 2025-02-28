"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import Modal from "@/components/ui/Modal";
import { registerUser } from "@/services/userService";

const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      setOpen(false);
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  return (
    <div className="absolute flex-col items-center justify-center h-screen">
      <Button onClick={() => setOpen(true)} className="mb-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg">
        Registrarse
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <div 
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg 
          max-h-[85vh] overflow-auto border border-gray-700 flex flex-col gap-4"
          aria-describedby="register-description"
        >
          <h2 className="text-xl font-semibold text-center text-white">Regístrate</h2>
          <p id="register-description" className="text-sm text-gray-400 text-center">
            Crea una cuenta y únete a XXXL.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input className="w-full p-3 rounded-md border border-blue-500 bg-gray-900 text-white text-sm" placeholder="Nombre de usuario" {...register("username")} />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}

            <Input className="w-full p-3 rounded-md border border-blue-500 bg-gray-900 text-white text-sm" placeholder="Correo electrónico" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

            <Input className="w-full p-3 rounded-md border border-blue-500 bg-gray-900 text-white text-sm" type="password" placeholder="Crea una contraseña" {...register("password")} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <Input className="w-full p-3 rounded-md border border-blue-500 bg-gray-900 text-white text-sm" type="password" placeholder="Confirmar contraseña" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md text-sm font-semibold">
              Crear cuenta
            </Button>
          </form>

          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-2 text-gray-400 text-xs">o</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <Button className="w-full flex items-center justify-center gap-2 border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md text-sm">
            <FcGoogle className="text-lg" />
            <span>Regístrate con Google</span>
          </Button>

          <p className="text-center text-xs text-gray-400">¿Ya tienes una cuenta? <a href="#" className="text-blue-400 hover:underline">Inicia sesión aquí</a></p>
        </div>
      </Modal>
    </div>
  );
}
