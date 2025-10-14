import { getPulseras } from "@/services/get-pulseras";

export default async function PulserasH() {
  const pulseras = await getPulseras({ sexo: "Hombre" });

  return (
    <main>
      <h1> Pulseras de hombre </h1>
      <pre>
        <code>{JSON.stringify(pulseras, null, 2)}</code>
      </pre>
    </main>
  );
}
