import { Suspense } from "react";
import RegistroClienteForm from "./RegistroClienteForm";

export default function RegistroCliente() {
  return (
    <Suspense fallback={null}>
      <RegistroClienteForm />
    </Suspense>
  );
}
