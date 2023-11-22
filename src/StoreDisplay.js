import { useLabelStore } from "./useLabelStore";

export default function StoreDisplay() {
  const state = useLabelStore();

  return (
    <div className="flex flex-col gap-2 rounded-md border border-neutral-200 p-4 text-xs max-w-xs max-h-60 overflow-scroll">
      <div className="font-semibold">Store contents</div>
      <pre className="bg-neutral-200 p-2 rounded">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
