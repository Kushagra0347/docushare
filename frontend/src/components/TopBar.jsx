// Mine
import { useSelector } from 'react-redux'
import AddButton from './Buttons/AddButton'
import CustomModal from './Modal'
import { BACKEND_URL } from '../main'

function TopBar() {
  const { space_used } = useSelector((state) => state.getFiles)
  const { userInfo } = useSelector((state) => state.userLogin)

  return (
    <div className="relative flex w-full items-center bg-quinary py-3 shadow-sm">
      {/* Button */}
      <div className="ml-12 mr-60">
        <AddButton
          variant={'primary'}
          label={'Add File'}
          targetModalID={'addFileModal'}
        />

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
        <span className="mr-2 font-bold text-primary">{space_used}/10 Gb</span>
        <span className="font-bold"> Storage Usage</span>
        {/* </div> */}
      </div>

      {/* Account/Settings/Notifications Section */}
      <div className="flex items-center">
        <button className="mr-2 flex h-14 w-14 items-center justify-center rounded-full bg-quaternary transition-colors hover:bg-gray-100">
          <i className="fas fa-search text-2xl" />
        </button>

        <>
          <button
            data-te-toggle="modal"
            data-te-target={`#editUserModal`}
            className="group relative mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-quaternary transition-colors hover:bg-gray-100"
          >
            {/* Placeholder */}
            {/* TODO:Image of the user has to be attested in real */}
            {userInfo.avatar ? (
              <>
                <img
                  className="absolute h-full w-full rounded-full object-cover transition-all group-hover:scale-110 group-hover:border-2 group-hover:border-secondary group-hover:border-opacity-80"
                  src={BACKEND_URL + userInfo.avatar}
                  alt={userInfo.email}
                />
                <div className="absolute flex h-full w-full cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200 group-hover:scale-[1.022]">
                  <i className="fal fa-pen-nib hidden w-5 text-2xl group-hover:block"></i>
                </div>
              </>
            ) : (
              // <img
              //   src={BACKEND_URL + userInfo.avatar}
              //   alt={userInfo.email}
              //   className="h-full w-full rounded-full object-cover transition-all group-hover:scale-110
              //    group-hover:border-2 group-hover:border-secondary group-hover:border-opacity-80"
              // />
              <i className="fas fa-user text-2xl" />
            )}
          </button>

          <CustomModal
            id="editUserModal"
            position="right"
            details={{ title: 'Edit Profile' }}
          />
        </>
      </div>
    </div>
  )
}

export default TopBar
