import { useMemo, useEffect, useState } from "react";
import { useMegaStore } from "./useMegaStore";
import cn from "classnames";
import { produce } from "immer";

export default function MegaStoreLabelDisplay({ label }) {
  console.log('🚀🚀 whole label rerender', label, Date.now());
  const [sliceTimeout, setSliceTimeout] = useState(undefined);

  const [num] = useMegaStore(s => [s.nestedObj.labelToNum[label]]);

  //// This style also works
  // const [num] = useMegaStore(s => [s.labelToNum[label]]);

  //// This produces undesired rerenders
  // const [labelToNum] = useMegaStore(s => [s.labelToNum]);
  // const num = labelToNum[label];

  //// This produces undesired rerenders
  // const [labelToNum] = useMegaStore(s => [s.labelToNum]);
  // const num = useMemo(() => {
  //   return labelToNum[label]
  // }, [label, labelToNum]);

  useEffect(() => {
    setSliceTimeout(prevTimeout => {
      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }

      return window.setTimeout(() => {
        setSliceTimeout(undefined);
      }, 1000);
    });
  }, [num]);



  const handleChange = e => {
    useMegaStore.setState(state => ({
      nestedObj: produce(state.nestedObj, draft => {
        draft.labelToNum[label] = Number(e.target.value);
      }),

      labelToNum: produce(state.labelToNum, draft => {
        draft[label] = Number(e.target.value);
      }),
    }));
  };

  return (
    <tr>
      <td>{label}</td>

      <td>{JSON.stringify(num)}</td>

      <td>
        <input
          type="number"
          value={num}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleChange}
        />
      </td>

      <td
        className={cn("p-4 transition-opacity duration-300 opacity-0", {
          "opacity-100": sliceTimeout,
        })}
      >
        <div className="bg-blue-300 rounded p-2 w-fit h-fit">
          Slice subscribe rerender!
        </div>
      </td>
    </tr>
  );
}
