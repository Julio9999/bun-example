import { dbClient } from "./db-client";

// Función principal para el seed
async function seedDatabase() {
  const defaultStates = [
    { name: "Sin Empezar", disabled: false },
    { name: "En Curso", disabled: false },
    { name: "Finalizado", disabled: false },
  ];

  // Crear valores dinámicamente
  const values = defaultStates
    .map((state) => `('${state.name}', ${state.disabled})`)
    .join(", ");

  try {
    const result = await dbClient`
    INSERT INTO status (name, disabled)
    VALUES ${values}
    ON CONFLICT (name)
    DO NOTHING
    RETURNING *;
  `;
    console.log("Estados insertados:", result);
  } catch (error) {
    console.error("Error al insertar los estados:", error);
  }
}

// Ejecución del seed
seedDatabase()
  .then(() => dbClient.close())
  .catch((err) => {
    console.error("Error al hacer el seed:", err);
    dbClient.close();
    process.exit(1);
  });
