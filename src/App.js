import './App.css';
import { useState } from 'react'
import { useLabelStore } from './useLabelStore'
import LabelDisplay from './LabelDisplay'
import StoreDisplay from './StoreDisplay'


function App() {
  const [labelInput, setLabelInput] = useState("")
  const [labels, setLabels] = useState([])


  const handleMainKeyDown = (e) => {
    if (e.key === "Enter") {
      useLabelStore.setState({ [labelInput]: { num: Math.random() } })

      const newLabels = ([...labels, labelInput])
      setLabels(newLabels)
      setLabelInput("")
    }
  }

  const handleClear = () => {
    setLabels([])
    useLabelStore.setState({}, true)
  }

  return (
    <div className="bg-white w-screen h-screen p-8 flex flex-col gap-16">
      <div className="flex gap-8">
        <div className="p-4 rounded-md border border-gray-200 flex flex-col gap-2 w-fit">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Label name (Press ENTER to add)</span>
            </label>
            <input type="text" value={labelInput} placeholder="Type here" className="input input-md input-bordered w-full max-w-xs"
              onChange={e => setLabelInput(e.target.value)} onKeyDown={handleMainKeyDown} />
          </div>

          <button className="btn btn-sm bg-blue-400" onClick={handleClear}>Clear</button>
        </div>

        <StoreDisplay />
      </div>

      <div className="overflow-x-auto p-2 border border-neutral-200 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Label name</th>
              <th>Label body</th>
              <th>Update body</th>
              <th>Rerendered?</th>
            </tr>
          </thead>

          <tbody>
            {labels.map(label => (
              <LabelDisplay key={label} label={label} />
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default App;
