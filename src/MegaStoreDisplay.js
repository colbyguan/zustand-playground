import { useMegaStore } from "./useMegaStore";

export default function MegaStoreDisplay() {
  const state = useMegaStore();

  return (
    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-4 text-xs max-w-xs max-h-60 overflow-scroll">
      <div className="font-semibold">useMegaStore contents</div>
      <pre className="bg-neutral-200 p-2 rounded">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
