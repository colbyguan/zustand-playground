import './App.css';
import { useState } from 'react'
import { useLabelStore } from './useLabelStore'
import { useMegaStore } from './useMegaStore'
import LabelDisplay from './LabelDisplay'
import StoreDisplay from './StoreDisplay'
import MegaStoreLabelDisplay from './MegaStoreLabelDisplay'
import MegaStoreDisplay from './MegaStoreDisplay';
import { produce } from 'immer'

function App() {
  const [labelInput, setLabelInput] = useState("")
  const [showLabelStore, setShowLabelStore] = useState(false)
  const [showMegaStore, setShowMegaStore] = useState(true)
  const [labels, setLabels] = useState([])


  const handleMainKeyDown = (e) => {
    if (e.key === "Enter") {
      const randInt = Math.floor(Math.random() * 100)
      useLabelStore.setState({ [labelInput]: { num: randInt } })
      useMegaStore.setState(prevState => ({
        labelToNum: produce(prevState.labelToNum, draft => {
          draft[labelInput] = randInt
        }),
        nestedObj: produce(prevState.nestedObj, draft => {
          draft.labelToNum[labelInput] = randInt
        })
      }))

      const newLabels = ([...labels, labelInput])
      setLabels(newLabels)
      setLabelInput("")
    }
  }

  const handleClear = () => {
    setLabels([])
    useLabelStore.setState({}, true)
    useMegaStore.setState({ labelToNum: {} })
  }

  return (
    <div className="bg-white w-screen p-8 flex flex-col gap-16">
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

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Show dynamic keys store</span>
              <input type="checkbox" checked={showLabelStore} className="checkbox" onChange={e => setShowLabelStore(e.target.checked)} />
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Show nested object store</span>
              <input type="checkbox" checked={showMegaStore} className="checkbox" onChange={e => setShowMegaStore(e.target.checked)} />
            </label>
          </div>
        </div>

        {showLabelStore && <StoreDisplay />}

        {showMegaStore && <MegaStoreDisplay />}
      </div>

      {showLabelStore && <div className="overflow-x-auto flex flex-col gap-2 p-2 border border-neutral-200 rounded-md">
        <div className="font-semibold">Using top-level keys</div>
        <table className="table">
          <thead>
            <tr>
              <th>Label name</th>
              <th>Label body</th>
              <th>Update body</th>
              <th>Direct sub rerender?</th>
              <th>Slice sub rerender?</th>
            </tr>
          </thead>

          <tbody>
            {labels.map(label => (
              <LabelDisplay key={label} label={label} />
            ))}
          </tbody>
        </table>
      </div>}


      {showMegaStore && <div className="overflow-x-auto p-2 flex flex-col gap-2 border border-neutral-200 rounded-md">
        <div className="font-semibold">Using nested object</div>
        <table className="table">
          <thead>
            <tr>
              <th>Label name</th>
              <th>Label body</th>
              <th>Update body</th>
              <th>Slice sub rerender?</th>
            </tr>
          </thead>

          <tbody>
            {labels.map(label => (
              <MegaStoreLabelDisplay key={label} label={label} />
            ))}
          </tbody>
        </table>
      </div>}
    </div >
  );
}

export default App;
