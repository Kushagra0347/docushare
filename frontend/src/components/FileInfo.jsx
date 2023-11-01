import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Icons/Loader'
import Message from './Message'
import AddButton from './Buttons/AddButton'
import { BACKEND_URL } from '../main'
import {
  changeFile,
  deleteFile,
  downloadFile,
} from '../redux/actions/fileActions'
import CustomModal from './Modal'
import Figma from './Icons/Figma'

function FileInfo() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, fileInfo } = useSelector((state) => state.getFile)
  const { message } = useSelector((state) => state.deleteFile)
  const { loading: downloadLoading, error: downloadError } = useSelector(
    (state) => state.downloadFile,
  )

  const fileTypes = {
    image: ['png', 'jpeg', 'jpg'],
    video: ['mp4'],
    audio: ['wav', 'm4a', 'mp3'],
    document: ['docx', 'doc', 'pdf'],
    excel: ['xlsx', 'xls', 'csv'],
    design: ['fig'],
    code: ['cpp', 'c', 'js', 'py', 'java'],
  }
  // for fileInfo.file = '/media/files/email_folder/file.ext -> ['', 'media', 'files', 'enail_folder', 'file.ext'] -> file.ext -> ['file', 'ext'] -> ext[is what we are accessing]'
  const fileType = fileInfo ? fileInfo.file.split('/')[4].split('.')[1] : ''

  const fileTags = fileInfo ? fileInfo.tags.split(',') : []
  const file_size = fileInfo ? fileInfo.file_size : 0

  const KB = 1000
  const MB = KB * 1000
  const GB = MB * 1000

  function handleClick(event) {
    if (event.target.name === 'downloadBtn') {
      if (!downloadLoading) {
        const fileName =
          fileInfo.file.split('/')[3] === fileInfo.name
            ? fileInfo.name
            : fileInfo.name + `.${fileType}`

        dispatch(downloadFile(fileInfo.id, fileName))
      }
    }
    if (event.target.name === 'starBtn') {
      dispatch(changeFile(fileInfo.id))
    }
    if (event.target.name === 'deleteBtn') {
      dispatch(deleteFile(fileInfo.id))
    }
  }

  //Trigger a re render when fileInfo in getFile state changes
  useEffect(() => {}, [fileInfo, message])

  return (
    <div className="flex h-[87.4vh] w-[25%] items-center justify-center overflow-y-auto bg-quinary shadow-md">
      {loading ? (
        <Loader className={'mx-5 h-7 w-7 text-white'} />
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
          <div className="flex h-1/4 w-[98%] items-center justify-center rounded-2xl shadow-lg">
            {fileTypes.image.indexOf(fileType) > -1 ? (
              <img
                src={BACKEND_URL + fileInfo.file}
                alt={fileInfo.name}
                className="h-full w-full rounded-2xl object-cover"
              /> // Show Image
            ) : fileTypes.video.indexOf(fileType) > -1 ? (
              <i className="far fa-video text-8xl text-primary"></i> // Show Video Icon
            ) : fileTypes.audio.indexOf(fileType) > -1 ? (
              <i className="far fa-headphones-alt text-8xl text-primary"></i> // Show Audio Icon
            ) : fileTypes.document.indexOf(fileType) > -1 ? (
              <i className="far fa-file-word text-8xl text-secondary"></i> // Show Document Icon
            ) : fileTypes.excel.indexOf(fileType) > -1 ? (
              <i className="far fa-file-excel text-8xl text-green-600"></i> // Show Excel Icon
            ) : fileTypes.design.indexOf(fileType) > -1 ? (
              <Figma /> // Show Figma Icon
            ) : fileTypes.code.indexOf(fileType) > -1 ? (
              <i className="far fa-code text-8xl text-primary"></i> // Show Code Icon
            ) : (
              <i className="far fa-file text-8xl text-gray-400 opacity-40"></i> // Show File Icon
            )}
          </div>

          {downloadError && (
            <Message
              message={downloadError}
              variant={'error'}
              className="mx-4 mt-4 text-left text-base font-bold"
            />
          )}

          {/* Button Container */}
          <div className="mt-4 flex w-full items-center justify-evenly">
            <button
              name="downloadBtn"
              className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
              onClick={handleClick}
            >
              {downloadLoading ? (
                <Loader className={'h-5 w-5 text-black'} />
              ) : (
                <i className="fas fa-download"></i>
              )}
            </button>
            {fileInfo.uploaded_by_user.email ===
              (userInfo && userInfo.email) && (
              <>
                <button
                  name="starBtn"
                  className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
                  onClick={handleClick}
                >
                  <i
                    className={`${fileInfo.starred ? 'fas' : 'fal'} fa-star`}
                  ></i>
                </button>
                <button
                  name="deleteBtn"
                  className="flex items-center justify-center rounded-xl bg-gray-300 bg-opacity-25 p-3 hover:bg-gray-400 hover:bg-opacity-20"
                  onClick={handleClick}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>{' '}
              </>
            )}
          </div>

          {/* File Name and File type */}
          <div className="mt-2">
            <h1 className="w-full break-words text-lg font-bold">
              {fileInfo.name}
            </h1>
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
                  {file_size / MB >= 1000
                    ? Math.round((file_size / GB + Number.EPSILON) * 100) /
                        100 +
                      ' GB'
                    : file_size / KB >= 1000
                    ? Math.round((file_size / MB + Number.EPSILON) * 100) /
                        100 +
                      ' MB'
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
              <AddButton targetModalID={'shareFileModal'} />
              <CustomModal
                id="shareFileModal"
                details={{ title: 'Share File' }}
              />
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
