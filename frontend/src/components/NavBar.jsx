import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
import { FILE_DATA_RESET } from '../redux/constants/file'

function NavBar() {
  const [currPathName, setCurrentPathName] = useState(window.location.pathname)
  const pathName = window.location.pathname
  const dispatch = useDispatch()

  const links = {
    mainLinks: [
      { id: 'm-1', icon: 'fas fa-folder', name: 'My Cloud', to: '/' },
      { id: 'm-2', icon: 'fas fa-share', name: 'Shared', to: '/shared' },
      { id: 'm-3', icon: 'fas fa-file', name: 'All Files', to: '/all-files' },
      { id: 'm-4', icon: 'fas fa-star', name: 'Favorites', to: '/favorites' },
      // {
      //   id: 'm-5',
      //   icon: 'fas fa-lock',
      //   name: 'Private Files',
      //   to: '/private-files',
      // },
      // {
      //   id: 'm-6',
      //   icon: 'fas fa-trash',
      //   name: 'Deleted Files',
      //   to: '/deleted-files',
      // },
    ],
    footerLinks: [
      {
        id: 'f-2',
        icon: 'fas fa-right-from-bracket',
        name: 'Logout',
        onClick: handleClick,
      },
    ],
  }

  const [currPathId, setCurrentPathId] = useState(
    links.mainLinks.find((link) => link.to == pathName).id,
  )

  function handleLinkClick(link) {
    setCurrentPathName(link.to)
    setCurrentPathId(link.id)
    dispatch({ type: FILE_DATA_RESET })
  }

  function handleClick(event) {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div className="h-screen flex flex-col justify-between w-1/5 bg-tertiary text-white">
      {/* Logo */}
      <div className="py-7">
        <h1 className="text-center text-4xl">DocuShare</h1>
      </div>

      {/* Links */}
      <div className="text-2xl h-3/5">
        {links.mainLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            onClick={() => handleLinkClick(link)}
            className={`inline-block w-full rounded-2xl py-3 ${
              pathName === currPathName && link.id === currPathId
                ? 'bg-primary hover:text-white'
                : 'text-gray-400 hover:bg-primary hover:text-white'
            } transition-colors`}
          >
            <i className={`${link.icon} mx-10 w-1 text-lg`}></i>
            <span className="text-lg">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="flex h-1/6 items-center">
        {links.footerLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            onClick={link.onClick}
            className="inline-block w-full rounded-2xl py-3 text-gray-400 transition-colors hover:bg-primary hover:text-white"
          >
            <i className={`${link.icon} mx-10 w-1 text-lg`}></i>
            <span className="text-lg">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar
