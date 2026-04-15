"use client";

import { MapPin } from "lucide-react";

export default function PlacesPage() {
  return (
    <div className="px-6 pt-14 text-center">
      <MapPin size={40} className="text-coral mx-auto mb-4" />
      <h1 className="font-serif text-2xl mb-2">Lugares</h1>
      <p className="text-sm text-text-dim">
        Directorio de cafés, bibliotecas y espacios para trabajar en Denver.
        Pronto vas a poder agregar y evaluar lugares.
      </p>
    </div>
  );
}
