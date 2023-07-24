// Mine
import { useSelector } from 'react-redux'
import AddButton from './Buttons/AddButton'
import CustomModal from './Modal'

function TopBar() {
  const { files } = useSelector((state) => state.getFiles)

  let totalSpaceUsed = 0
  const GB = 1000 * 1000 * 1000

  files && files.forEach((file) => (totalSpaceUsed += file.file_size))

  totalSpaceUsed =
    Math.round((totalSpaceUsed / GB + Number.EPSILON) * 100) / 100

  return (
    <div className="relative flex w-full items-center bg-quinary py-3 shadow-sm">
      {/* Button */}
      <div className="ml-12 mr-60">
        <AddButton variant={'primary'} label={'Add File'} />

        <CustomModal
          id="addFileModal"
          position="left"
          details={{ title: 'Add File' }}
        />
      </div>

      {/* Storage Indicator(Optional) */}
      <div className="mr-60 flex items-center rounded-3xl border-2 border-gray-300 border-opacity-25 px-3 py-2">
        {/* <div> */}
        <span className="pr-2 text-primary">
          <i className="fa-solid fa-circle-notch"></i>
        </span>
        <span className="mr-2 font-bold text-primary">
          {totalSpaceUsed}/140 Gb
        </span>
        <span className="font-bold"> Storage Usage</span>
        {/* </div> */}
      </div>

      {/* Account/Settings/Notifications Section */}
      <div className="flex items-center">
        <button className="mr-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-quaternary transition-colors hover:bg-gray-100">
          <i className="fas fa-gear text-2xl" />
        </button>
        <button className="mr-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-quaternary transition-colors hover:bg-gray-100">
          {/* Placeholder */}
          {/* TODO:Image of the user has to be attested in real */}
          <i className="fas fa-user text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default TopBar
