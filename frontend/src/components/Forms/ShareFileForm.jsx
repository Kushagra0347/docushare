import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, initTE } from 'tw-elements'
import { getUsers } from '../../redux/actions/userActions'

// import TextField from '@mui/material/TextField'
// import Autocomplete from '@mui/material/Autocomplete'
import MultiSelect from '../MultiSelect'
import { shareFile } from '../../redux/actions/fileActions'

function ShareFileForm() {
  const [usersListToBeShared, setUsersListToBeShared] = useState([])

  const dispatch = useDispatch()
  const { loading, users } = useSelector((state) => state.getUsers)
  const { userInfo } = useSelector((state) => state.userLogin)
  const usersList =
    users && users.filter((user) => user.email != userInfo.email)
  const { fileInfo } = useSelector((state) => state.getFile)
  
  function shareWithUsers(e) {
    e.preventDefault()

    dispatch(shareFile(usersListToBeShared, fileInfo.id))
  }

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    initTE({ Input })
  }, [])
  return (
    !loading && (
      <form onSubmit={shareWithUsers}>
        <MultiSelect
          items={usersList === null ? [] : usersList}
          label={'Search users by email'}
          onChange={setUsersListToBeShared}
          limitTags={2}
        />

        <button
          type="submit"
          className="mt-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-200 ease-in-out hover:bg-blue-900 hover:font-bold hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >
          {
            // loading ? <Loader /> :
            'Share'
          }
        </button>
      </form>
    )
  )
}

export default ShareFileForm
