import { BACKEND_URL } from '../main'

function FileCard({ margin, topMargin = true, file, onClick }) {
  const fileTypes = {
    image: ['png', 'jpeg', 'jpg'],
    document: ['docx', 'doc'],
    excel: ['xlsx', 'xls'],
    design: ['fig'],
    code: ['cpp', 'c', 'js', 'py', 'java'],
  }
  // for file.file = '/media/email_folder/file.ext -> ['', 'media', 'enail_folder', 'file.ext'] -> file.ext -> ['file', 'ext'] -> ext[is what we are accessing]'
  const fileType = file ? file.file.split('/')[3].split('.')[1] : ''

  const file_size = file.file_size
  const KB = 1000
  const MB = KB * 1000
  const GB = MB * 1000

  return (
    <div
      className={`h-60 w-[30%] bg-quinary ${margin ? 'mr-6' : 'mr-0'} ${
        topMargin ? 'mt-9' : 'mt-0'
      }  rounded-xl shadow-md hover:shadow-lg`}
      onClick={onClick}
    >
      {/* Icon Section */}
      {/* If the user has provided a thumbnail show that only, else */}
      {/* If the file is of image type - [jpg, jpeg, png] then show the image itself, else */}
      {/* If the file is of any other type - match their extension with the available icons and show that in place of the thumbnail */}
      <div className="h-2/4 rounded-t-xl">
        {fileTypes.image.indexOf(fileType) > -1 ? (
          <img
            src={BACKEND_URL + file.file}
            alt={file.name}
            className="h-full w-full rounded-t-2xl object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-2xl bg-black"></div>
        )}
      </div>

      {/* FileName/FolderName Section - shows File/Folder Name along with DateCreated/No of Files */}
      <div className="px-5 py-3">
        <p className="font-bold">
          {file.name ? file.name : file.file.split('/')[3]}
        </p>
        <sub className="font-bold text-gray-500">{file.date_added}</sub>
      </div>

      {/* Footer Section - Shows FileSize, Number of People Shared with  */}
      <div className="h-[20%] rounded-b-xl bg-gray-400 bg-opacity-20 px-5 py-4">
        {/* FileSize */}
        <p className="font-bold tracking-wider">
          {file_size / KB >= KB
            ? Math.round((file_size / MB + Number.EPSILON) * 100) / 100 + ' MB'
            : file_size / MB >= MB
            ? Math.round((file_size / GB + Number.EPSILON) * 100) / 100 + ' GB'
            : Math.round((file_size / KB + Number.EPSILON) * 100) / 100 +
              ' KB'}{' '}
          {/* file_size >= 1kb ? file_size / 1024 : file_size >= 1mb ? file_size / (1024 * 1024) : file_size >= 1gb ? file_size / (1024 * 1024 * 1024) : file_size */}
        </p>

        {/* Number of people shared with - shows their avatar, if >2 then,  show 2 avatar then number */}
        <div></div>
      </div>
    </div>
  )
}

export default FileCard
