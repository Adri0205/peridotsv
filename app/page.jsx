import { getPulseras } from "@/services/get-pulseras";

export default async function Home() {
  const pulseras = await getPulseras();

  return (
    <>
      <pre>
        <code>{JSON.stringify(pulseras, null, 2)}</code>
      </pre>
    </>
  );
}
