import { useEffect } from 'react'
// Tw-element
import { Modal, Ripple, initTE } from 'tw-elements'
import Cross from './Icons/Cross'
import FileUploadForm from './Forms/FileUploadForm'
import ShareFileForm from './Forms/ShareFileForm'
import EditUserForm from './Forms/EditUserForm'

function CustomModal({ position, id, details }) {
  useEffect(() => {
    initTE({ Modal, Ripple })
  }, [])

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id={id}
      tabIndex="-1"
      aria-labelledby="modal"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className={`pointer-events-none absolute ${
          position === 'left' ? 'left-72' : 'right-7'
        } h-auto w-full ${
          position === 'left' ? 'translate-x-[-100%]' : 'translate-x-[100%]'
        } opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]`}
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md px-6 py-4">
            <h5
              className="text-3xl font-bold text-neutral-800 dark:text-neutral-200"
              id="modalTitle"
            >
              {details.title}
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <Cross />
            </button>
          </div>

          <div
            className="relative mb-2 flex-auto px-4 py-2"
            data-te-modal-body-ref
          >
            {id === 'addFileModal' ? (
              <FileUploadForm />
            ) : id === 'shareFileModal' ? (
              <ShareFileForm />
            ) : id === 'editUserModal' ? (
              <EditUserForm />
            ) : (
              <></>
            )}
          </div>

          {/* <div className="mt-5 flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md p-4"></div> */}
        </div>
      </div>
    </div>
  )
}

export default CustomModal
