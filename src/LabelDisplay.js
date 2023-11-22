import { useEffect, useState } from 'react'
import { useLabelStore } from './useLabelStore'
import cn from 'classnames';


export default function LabelDisplay({ label }) {
  const [flashTimeout, setFlashTimeout] = useState(undefined);
  const [sliceTimeout, setSliceTimeout] = useState(undefined);

  const labelInfo = useLabelStore((state) => state[label])
  const [slicedLabelInfo] = useLabelStore(
    (state) => [state[label]]
  )

  useEffect(() => {
    setFlashTimeout(prevTimeout => {
      if (prevTimeout) {
        clearTimeout(prevTimeout)
      }

      return window.setTimeout(() => {
        setFlashTimeout(undefined)
      }, 1000)
    });
  }, [labelInfo])

  useEffect(() => {
    setSliceTimeout(prevTimeout => {
      if (prevTimeout) {
        clearTimeout(prevTimeout)
      }

      return window.setTimeout(() => {
        setSliceTimeout(undefined)
      }, 1000)
    });
  }, [slicedLabelInfo])


  const handleChange = (e) => {
    useLabelStore.setState({ [label]: { ...labelInfo, num: Number(e.target.value) } })
  }

  return (
    <tr>
      <td >{label}</td>

      <td>{JSON.stringify(labelInfo)}</td>

      <td><input type="number" value={labelInfo.num} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleChange} /></td>

      <td className={cn("p-4 transition-opacity duration-300 opacity-0", { 'opacity-100': flashTimeout })}>
        <div className="bg-blue-300 rounded p-2 w-fit h-fit">Direct subscribe rerender!</div>
      </td>

      <td className={cn("p-4 transition-opacity duration-300 opacity-0", { 'opacity-100': sliceTimeout })}>
        <div className="bg-blue-300 rounded p-2 w-fit h-fit">Slice subscribe rerender!</div>
      </td>
    </tr>
  )
}