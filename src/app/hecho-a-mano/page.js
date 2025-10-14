import { getPulseras } from "@/services/get-pulseras";

export default async function HechoM() {
  const pulseras = await getPulseras();
  return (
    <main>
      <h1> Pulseras hechas a mano </h1>
      <pre>
        <code>{JSON.stringify(pulseras, null, 2)}</code>
      </pre>
    </main>
  );
}
