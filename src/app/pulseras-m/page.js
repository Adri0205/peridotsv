import { getPulseras } from "@/services/get-pulseras";

export default async function PulserasM() {
  const pulseras = await getPulseras({ sexo: "Mujer" });

  return (
    <main>
      <h1> Pulseras de mujer </h1>
      <pre>
        <code>{JSON.stringify(pulseras, null, 2)}</code>
      </pre>
    </main>
  );
}
