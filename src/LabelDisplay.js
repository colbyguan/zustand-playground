import { useEffect, useState } from 'react'
import { useLabelStore } from './useLabelStore'
import cn from 'classnames';

export default function LabelDisplay({ label }) {
  const [flashTimeout, setFlashTimeout] = useState(undefined);

  const labelInfo = useLabelStore((state) => state[label])

  useEffect(() => {
    console.log(label, '🚀🚀 rerendered', labelInfo)
    setFlashTimeout(prevTimeout => {
      if (prevTimeout) {
        clearTimeout(prevTimeout)
      }

      return window.setTimeout(() => {
        setFlashTimeout(undefined)
      }, 1000)
    });
    // Non exhaustive deps cuz "label" is just used in the console log
  }, [labelInfo])


  const handleChange = (e) => {
    useLabelStore.setState({ [label]: { ...labelInfo, num: Number(e.target.value) } })
  }

  return (
    <tr >
      <td >{label}</td>

      <td>{JSON.stringify(labelInfo)}</td>

      <td ><input type="number" value={labelInfo.num} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleChange} /></td>

      <td className={cn("p-4 flex items-center justify-center transition-opacity duration-300 opacity-0", { 'opacity-100': flashTimeout })}>
        <div className="bg-blue-300 rounded p-2">Rerendered!</div>
      </td>
    </tr>
  )
}