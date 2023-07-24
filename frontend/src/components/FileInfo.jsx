import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Icons/Loader'
import Message from './Message'
import AddButton from './Buttons/AddButton'
import { BACKEND_URL } from '../main'
import { deleteFile } from '../redux/actions/fileActions'

function FileInfo() {
  const [starred, setStarred] = useState(false)
  // const [bookmarked, setBookmarked] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, fileInfo } = useSelector((state) => state.getFile)
  const { message } = useSelector((state) => state.deleteFile)

  const fileTypes = {
    image: ['png', 'jpeg', 'jpg'],
    document: ['docx', 'doc'],
    excel: ['xlsx', 'xls'],
    design: ['fig'],
    code: ['cpp', 'c', 'js', 'py', 'java'],
  }
  // for fileInfo.file = '/media/email_folder/file.ext -> ['', 'media', 'enail_folder', 'file.ext'] -> file.ext -> ['file', 'ext'] -> ext[is what we are accessing]'
  const fileType = fileInfo ? fileInfo.file.split('/')[3].split('.')[1] : ''

  const fileTags = fileInfo ? fileInfo.tags.split(',') : []
  const file_size = fileInfo ? fileInfo.file_size : 0

  const KB = 1000
  const MB = KB * 1000
  const GB = MB * 1000

  function handleClick(event) {
    if (event.target.name === 'starBtn') {
      setStarred(!starred)
    }
    if (event.target.name === 'deleteBtn') {
      dispatch(deleteFile(fileInfo.id))
    }
    // if (event.target.name === 'bookmarkBtn') {
    //   setBookmarked(!bookmarked)
    // }
  }

  //Trigger a re render when fileInfo in getFile state changes
  useEffect(() => {
    // console.log('Rendered')
  }, [fileInfo, message])

  return (
    <div className="flex h-[87.4vh] w-[25%] items-center justify-center overflow-y-auto bg-quinary shadow-md">
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <i className="far fa-exclamation-circle block text-center text-4xl text-yellow-400"></i>
          <Message
            message={error}
            variant={'warning'}
            className="mx-4 text-center text-base"
          />
        </div>
      ) : fileInfo ? (
        // parent container
        <div className="h-full w-full px-5 py-7">
          {/* Thumbnail Image or Icon */}
          <div className="h-1/4 w-[98%] rounded-2xl">
            {fileTypes.image.indexOf(fileType) > -1 ? (
              <img
                src={BACKEND_URL + fileInfo.file}
                alt={fileInfo.name}
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="h-full w-full rounded-2xl bg-black"></div>
            )}
          </div>

          {/* Button Container */}
          <div className="mt-4 flex w-full items-center justify-evenly">
            <button
              name="downloadBtn"
              className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
              onClick={handleClick}
            >
              <i className="fas fa-download"></i>
            </button>
            <button
              name="starBtn"
              className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
              onClick={handleClick}
            >
              <i className={`${starred ? 'fas' : 'fal'} fa-star`}></i>
            </button>
            <button
              name="deleteBtn"
              className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
              onClick={handleClick}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            {/* <button
              name="bookmarkBtn"
              className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
              onClick={handleClick}
            >
              <i className={`${bookmarked ? 'fas' : 'fal'} fa-bookmark`}></i>
            </button> */}
          </div>

          {/* File Name and File type */}
          <div className="mt-2">
            <h1 className="text-lg font-bold">{fileInfo.name}</h1>
            <h3 className="text-xs font-bold text-gray-400">
              <span className="uppercase">{fileType}</span> Type
            </h3>
          </div>

          {/* Tags */}
          <div className="mt-1 flex w-full flex-wrap items-center justify-start">
            {fileTags.map(
              (tag, idx) =>
                tag.trim() !== '' && (
                  <span
                    key={idx}
                    className="mr-1 mt-2 flex items-center justify-center rounded-lg bg-gray-300 bg-opacity-25 px-3 py-2 font-bold hover:bg-gray-400 hover:bg-opacity-20"
                  >
                    {tag}
                  </span>
                ),
            )}
          </div>

          {/* File Info */}
          {/* Size and Date Added */}
          <div className="mt-3">
            <h1 className="text-xl font-bold">Info</h1>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-400">Size</h2>
                <p className="text-sm font-bold">
                  {file_size / KB >= KB
                    ? Math.round((file_size / MB + Number.EPSILON) * 100) /
                        100 +
                      ' MB'
                    : file_size / MB >= MB
                    ? Math.round((file_size / GB + Number.EPSILON) * 100) /
                        100 +
                      ' GB'
                    : Math.round((file_size / KB + Number.EPSILON) * 100) /
                        100 +
                      ' KB'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-400">Date</h2>
                <p className="text-sm font-bold tracking-wider">
                  {fileInfo.date_added.slice(0, 12)}
                </p>
              </div>
            </div>
          </div>

          {/* Share With section */}
          <div className="mt-3 pb-3">
            <h1 className="text-xl font-bold">Share With</h1>
            {/* There is going to be a single button, i.e., add button in the start */}
            {/* As the user starts to share the file with his users list, they will
            begin to appear with a maximum of 3 people will be shown with which the user has recently shared file with   */}
            <div className="flex w-full items-center justify-start">
              <AddButton />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-7">
          <i className="far fa-info-circle block text-center text-4xl text-black"></i>
          <h1 className="text-center text-base text-gray-400">
            Select a File to display it&apos;s information here
          </h1>
        </div>
      )}
    </div>
  )
}

export default FileInfo
