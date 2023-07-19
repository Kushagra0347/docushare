function FileCard({ margin, topMargin = true }) {
  return (
    <div
      className={`h-60 w-[30%] bg-quinary ${margin ? 'mr-6' : 'mr-0'} ${
        topMargin ? 'mt-9' : 'mt-0'
      }  rounded-xl shadow-md`}
    >
      {/* Icon Section */}
      <div className="h-2/4 rounded-t-xl bg-black"></div>

      {/* FileName/FolderName Section - shows File/Folder Name along with DateCreated/No of Files */}
      <div className="px-5 py-3">
        <p className="font-bold">File Name</p>
        <sub className="text-gray-400">dd/mm/yyyy, hh:mm </sub>
      </div>

      {/* Footer Section - Shows FileSize, Number of People Shared with  */}
      <div className="h-[20%] rounded-b-xl bg-gray-400 bg-opacity-20 px-5 py-4">
        {/* FileSize */}
        <p className="font-bold">434 MB</p>

        {/* Number of people shared with - shows their avatar, if >2 then,  show 2 avatar then number */}
        <div></div>
      </div>
    </div>
  )
}

export default FileCard
