// Mine
import CustomModal from './Modal'

function TopBar() {
  return (
    <div className="flex items-center bg-quinary py-3 w-full shadow-sm relative">
      {/* Button */}
      <div className="mr-60 ml-12">
        <button
          type="button"
          data-te-toggle="modal"
          data-te-target="#addFileModal"
          className="w-fit flex items-center hover:text-secondary transition-colors"
        >
          <div className="h-[50px] w-[50px] mr-2 rounded-full bg-quaternary flex items-center justify-center">
            <i className="fas fa-circle-plus text-primary text-2xl"></i>
          </div>
          <span className="font-bold">Add File</span>
        </button>
        <CustomModal
          id="addFileModal"
          position="left"
          details={{ title: 'Add File' }}
        />
      </div>

      {/* Storage Indicator(Optional) */}
      <div className="flex items-center py-2 px-3 border-2 border-quaternary rounded-3xl mr-60">
        <div>
          <span className="px-2 text-primary">
            <i className="fa-solid fa-circle-notch"></i>
          </span>
          <span className="text-primary font-bold mr-2">10/140 Gb</span>
          <span className="font-bold"> Storage Usage</span>
        </div>
      </div>

      {/* Account/Settings/Notifications Section */}
      <div className="flex items-center">
        <button className="bg-quaternary hover:bg-gray-100 transition-colors w-[50px] h-[50px] rounded-full flex items-center justify-center mr-2">
          <i className="fas fa-gear text-2xl" />
        </button>
        <button className="bg-quaternary hover:bg-gray-100 transition-colors w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4">
          {/* Placeholder */}
          {/* TODO:Image of the user has to be attested in real */}
          <i className="fas fa-user text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default TopBar
