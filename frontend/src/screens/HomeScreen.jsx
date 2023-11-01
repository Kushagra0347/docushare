/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Select, initTE } from 'tw-elements'
import FileCard from '../components/FileCard'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Icons/Loader'
import Message from '../components/Message'
import { getFiles } from '../redux/actions/fileActions'

function HomeScreen({ className }) {
  // const [style, setStyle] = useState('grid')
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('my-cloud-sortBy') || 0,
  )

  const dispatch = useDispatch()
  const { loading, files, error } = useSelector((state) => state.getFiles)
  const { fileInfo } = useSelector((state) => state.addFile)
  const { message } = useSelector((state) => state.deleteFile)

  // function handleStyle(event) {
  //   if (event.target.name === 'gridBtn' && style !== 'grid') {
  //     setStyle('grid')
  //   } else if (event.target.name === 'listBtn' && style !== 'list') {
  //     setStyle('list')
  //   }
  // }

  function handleSortByChange(event) {
    setSortBy(event.target.value)
    localStorage.setItem('my-cloud-sortBy', event.target.value)
  }

  useEffect(() => {
    initTE({ Select })
  }, [])

  useEffect(() => {
    dispatch(getFiles(0, sortBy))
  }, [fileInfo, message, sortBy, dispatch])

  return (
    <div
      className={`${className} h-screen overflow-auto py-28 pl-14 pr-14 pt-9`}
    >
      {/* Container of the top part */}
      <div className="flex items-center justify-between">
        {/* Heading and sort by container */}
        <div>
          {/* Heading */}
          <h2 className="mb-2 text-3xl font-bold">My Cloud</h2>
          {/* Sort By Section */}
          {/* {files.length > 1 ? ( */}
          <div>
            <select
              data-te-select-init
              data-te-select-auto-select="true"
              onChange={handleSortByChange}
              value={sortBy}
            >
              <option value={0}>Alphabetical</option>
              <option value={1}>Date Added</option>
            </select>
            <label data-te-select-label-ref>Sort By</label>
          </div>
          {/* ) */}
          {/* : (
            <></>
          )} */}
        </div>

        {/* Grid or List view Container */}
        {/* <div className="relative flex h-[25px] w-16 items-center justify-evenly rounded-2xl bg-quinary p-4 shadow-md">
          <button
            name="gridBtn"
            className={`${
              style === 'grid'
                ? 'bg-primary text-quinary'
                : 'text-gray-400 hover:bg-secondary hover:text-quinary'
            } absolute left-0 flex h-[25px] w-6 cursor-pointer items-center justify-center rounded-2xl p-4 text-center`}
            onClick={handleStyle}
          >
            <i className="fas fa-grid-2"></i>
          </button>
          <button
            name="listBtn"
            className={`${
              style == 'list'
                ? 'bg-primary text-quinary'
                : 'text-gray-400 hover:bg-secondary hover:text-quinary'
            } absolute right-0 flex h-[25px] w-6 cursor-pointer items-center justify-center rounded-2xl p-4 text-center`}
            onClick={handleStyle}
          >
            <i className="fas fa-pause rotate-90"></i>
          </button>
        </div> */}
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-evenly">
        {/* Remove Background for every 3rd card in the grid */}
        {/* Add mt-6 after 3rd  card in the grid */}
        {loading ? (
          <Loader className={'mx-5 h-7 w-7 text-white'} />
        ) : error ? (
          <Message
            variant={'error'}
            message={error}
            className={'mt-32 text-center text-4xl'}
          />
        ) : (
          files?.map((file, idx) => (
            <FileCard
              key={file.id}
              margin={idx % 3 < 2 ? true : false}
              topMargin={idx <= 2 ? false : true}
              file={file}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HomeScreen
