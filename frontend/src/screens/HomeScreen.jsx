/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Select, initTE } from 'tw-elements'
import FileCard from '../components/FileCard'

function HomeScreen({ className }) {
  const [style, setStyle] = useState('grid')

  function handleStyle(event) {
    if (event.target.name === 'gridBtn' && style !== 'grid') {
      setStyle('grid')
    } else if (event.target.name === 'listBtn' && style !== 'list') {
      setStyle('list')
    }
  }

  useEffect(() => {
    initTE({ Select })
  }, [])

  return (
    <div
      className={`${className} pt-9 py-28 pl-14 pr-14 h-screen overflow-auto`}
    >
      {/* Container of the top part */}
      <div className="flex items-center justify-between">
        {/* Heading and sort by container */}
        <div>
          {/* Heading */}
          <h2 className="font-bold text-3xl mb-2">My Cloud</h2>

          {/* Sort By Section */}
          <div>
            <select data-te-select-init data-te-select-auto-select="true">
              <option value="alpha">Alphabetical</option>
              <option value="date_modified">Date Modified</option>
            </select>
            <label data-te-select-label-ref>Sort By</label>
          </div>
        </div>

        {/* Grid or List view Container */}
        <div className="bg-quinary shadow-md rounded-2xl flex items-center justify-evenly w-16 h-[25px] p-4 relative">
          <button
            name="gridBtn"
            className={`${
              style === 'grid'
                ? 'bg-primary text-quinary'
                : 'hover:bg-secondary hover:text-quinary text-gray-400'
            } rounded-2xl w-6 h-[25px] p-4 absolute left-0 text-center flex items-center justify-center cursor-pointer`}
            onClick={handleStyle}
          >
            <i className="fas fa-grid-2"></i>
          </button>
          <button
            name="listBtn"
            className={`${
              style == 'list'
                ? 'bg-primary text-quinary'
                : 'hover:bg-secondary hover:text-quinary text-gray-400'
            } rounded-2xl w-6 h-[25px] p-4 absolute right-0 text-center flex items-center justify-center cursor-pointer`}
            onClick={handleStyle}
          >
            <i className="fas fa-pause rotate-90"></i>
          </button>
        </div>
      </div>

      <div className="flex items-start justify-evenly mt-4 flex-wrap">
        {/* Remove Background for every 3rd card in the grid */}
        {/* Add mt-6 after 3rd  card in the grid */}
        <FileCard key={1} margin={true} topMargin={false} />
        <FileCard key={2} margin={true} topMargin={false} />
        <FileCard key={3} margin={false} topMargin={false} />
        <FileCard key={4} margin={true} />
        <FileCard key={5} margin={true} />
        <FileCard key={6} margin={false} />
      </div>
    </div>
  )
}

export default HomeScreen
