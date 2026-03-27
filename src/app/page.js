import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black font-sans">
      <main className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Imaduddin Ahmed
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          My Portfolio — Coming Soon
        </p>
      </main>
    </div>
  );
}
