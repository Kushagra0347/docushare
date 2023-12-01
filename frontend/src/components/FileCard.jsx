import { useDispatch, useSelector } from 'react-redux'
import { getFile } from '../redux/actions/fileActions'
import { BACKEND_URL } from '../main'
import { useEffect } from 'react'
import Figma from './Icons/Figma'

function FileCard({ margin, topMargin = true, file }) {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { fileInfo } = useSelector((state) => state.getFile)

  const fileTypes = {
    image: ['png', 'jpeg', 'jpg'],
    video: ['mp4'],
    audio: ['wav', 'm4a', 'mp3'],
    document: ['docx', 'doc', 'pdf'],
    excel: ['xlsx', 'xls', 'csv'],
    design: ['fig'],
    code: ['cpp', 'c', 'js', 'py', 'java', 'json', 'html', 'css', 'ts'],
  }
  // for file.file = '/media/email_folder/file.ext -> ['', 'media', 'files', 'email_folder', 'file.ext'] -> file.ext -> ['file', 'ext'] -> ext[is what we are accessing]'
  const fileType = file.file ? file.file.split('/')[4].split('.')[1] : ''

  const file_size = file.file_size
  const KB = 1000
  const MB = KB * 1000
  const GB = MB * 1000

  function showFileInfo(id) {
    dispatch(getFile(id))
  }

  useEffect(() => {}, [fileInfo])

  return (
    <div
      id={`parent-${file.id}`}
      className={`h-60 w-[30%] bg-quinary ${margin ? 'mr-6' : 'mr-0'} ${
        topMargin ? 'mt-9' : 'mt-0'
      }  rounded-b-xl rounded-t-2xl shadow-md hover:shadow-lg`}
      onClick={() => showFileInfo(file.id)}
    >
      {/* Icon Section */}
      {/* If the user has provided a thumbnail show that only, else */}
      {/* If the file is of image type - [jpg, jpeg, png] then show the image itself, else */}
      {/* If the file is of any other type - match their extension with the available icons and show that in place of the thumbnail */}
      <div className="flex h-2/4 items-center justify-center rounded-t-2xl">
        {fileTypes.image.indexOf(fileType) > -1 ? (
          <img
            src={BACKEND_URL + file.file}
            alt={file.name}
            className="h-full w-full rounded-t-2xl object-cover"
          />
        ) : fileTypes.video.indexOf(fileType) > -1 ? (
          <i className="far fa-video text-8xl text-primary"></i>
        ) : fileTypes.audio.indexOf(fileType) > -1 ? (
          <i className="far fa-headphones-alt text-8xl text-primary"></i>
        ) : fileTypes.document.indexOf(fileType) > -1 ? (
          <i className="far fa-file-word text-8xl text-secondary"></i>
        ) : fileTypes.excel.indexOf(fileType) > -1 ? (
          <i className="far fa-file-excel text-8xl text-green-600"></i>
        ) : fileTypes.design.indexOf(fileType) > -1 ? (
          <Figma />
        ) : fileTypes.code.indexOf(fileType) > -1 ? (
          <i className="far fa-code text-8xl text-primary"></i>
        ) : (
          <i className="far fa-file text-8xl text-gray-400 opacity-40"></i>
        )}
      </div>

      {/* FileName/FolderName Section - shows File/Folder Name along with DateCreated/No of Files */}
      <div className="py-3 pl-5">
        <p className="truncate pr-5 font-bold">
          {file.name ? file.name : file.file.split(' / ')[3]}
        </p>
        <div className="flex items-center">
          <sub className="my-3 mr-5 font-bold tracking-wide text-gray-500">
            {file.date_added}
          </sub>
          {file.uploaded_by_user.email === userInfo.email && file.starred && (
            <i className="fas fa-star text-yellow-300"></i>
          )}
        </div>
      </div>

      {/* Footer Section - Shows FileSize, Number of People Shared with  */}
      <div className="flex h-[20%] flex-wrap items-center rounded-b-xl bg-gray-400 bg-opacity-20 py-4 pl-5">
        {/* FileSize */}
        <p className="mr-10 font-bold tracking-wider">
          {file_size / MB >= 1000
            ? Math.round((file_size / GB + Number.EPSILON) * 100) / 100 + ' GB'
            : file_size / KB >= 1000
            ? Math.round((file_size / MB + Number.EPSILON) * 100) / 100 + ' MB'
            : Math.round((file_size / KB + Number.EPSILON) * 100) / 100 +
              ' KB'}{' '}
          {/* file_size >= 1kb ? file_size / 1024 : file_size >= 1mb ? file_size / (1024 * 1024) : file_size >= 1gb ? file_size / (1024 * 1024 * 1024) : file_size */}
        </p>

        {/* Number of people shared with - shows their avatar, if >2 then,  show 2 avatar then number */}
        {file.shared && <div>shared</div>}
      </div>
    </div>
  )
}

export default FileCard;
