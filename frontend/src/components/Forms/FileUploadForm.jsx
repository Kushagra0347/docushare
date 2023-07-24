import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Ripple, initTE } from 'tw-elements'
import { addFile } from '../../redux/actions/fileActions'
import Loader from '../Icons/Loader'
import Message from '../Message'

function FileUploadForm() {
  const [file, setFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [fileName, setFileName] = useState('')
  const [tags, setTags] = useState('')

  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.addFile)

  function handleSubmit(event) {
    event.preventDefault()

    dispatch(addFile({ file, thumbnail, fileName, tags }))

    setFile(null)
    setThumbnail(null)
    setFileName('')
    setTags('')

    event.target[0].value = null // Set File to Null
    event.target[1].value = null // Set Thumbnail to Null
  }

  useEffect(() => {
    initTE({ Input, Ripple })
  }, [])
  return (
    <form className="relative w-full px-24" onSubmit={handleSubmit}>
      {error && <Message className="mb-5" message={error} variant={'error'} />}
      <div className="mb-3">
        <label
          htmlFor="file"
          className="inline-block text-base text-neutral-700"
        >
          Upload File <span className="text-3xl text-red-400">*</span>
        </label>
        <input
          className="focus:shadow-te-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:outline-none"
          type="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0])
          }}
          required
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="thumbnail"
          className="inline-block text-base text-neutral-700"
        >
          Upload Thumbnail
        </label>
        <input
          className="focus:shadow-te-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:outline-none"
          type="file"
          accept="image/png image/jpg image/jpeg"
          id="thumbnail"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>

      {/* File Name */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          id="formControlInputFileName"
        />
        <label
          htmlFor="formControlInputFileName"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          File Name
        </label>
      </div>

      {/* Tags */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          id="tags"
          required
        />
        <label
          htmlFor="tags"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          Tags (separate by commas){' '}
          <span className="font-bold text-red-400">*</span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-200 ease-in-out hover:bg-blue-900 hover:font-bold hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      >
        {loading ? <Loader /> : 'Upload'}
      </button>
    </form>
  )
}

export default FileUploadForm
