import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'

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
      {
        id: 'm-5',
        icon: 'fas fa-lock',
        name: 'Private Files',
        to: '/private-files',
      },
      {
        id: 'm-6',
        icon: 'fas fa-trash',
        name: 'Deleted Files',
        to: '/deleted-files',
      },
    ],
    footerLinks: [
      {
        id: 'f-1',
        icon: 'fas fa-question',
        name: 'Help & Support',
        to: '/help',
        onClick: () => handleLinkClick('/help'),
      },
      {
        id: 'f-2',
        icon: 'fas fa-right-from-bracket',
        name: 'Logout',
        onClick: handleClick,
      },
    ],
  }

  const [currPathId, setCurrentPathId] = useState(
    links.mainLinks.find((link) => link.to == pathName).id
  )

  function handleLinkClick(link) {
    setCurrentPathName(link.to)
    setCurrentPathId(link.id)
  }

  function handleClick(event) {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div className="w-1/5 min-h-screen bg-tertiary text-white">
      {/* Logo */}
      <div className="py-7">
        <h1 className="text-center text-4xl">Drive</h1>
      </div>

      {/* Links */}
      <div className="mt-2 text-2xl">
        {links.mainLinks.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            onClick={() => handleLinkClick(link)}
            className={`inline-block w-full py-3 rounded-2xl ${
              pathName === currPathName && link.id === currPathId
                ? 'bg-primary hover:text-white'
                : 'text-gray-400 hover:bg-primary hover:text-white'
            } transition-colors`}
          >
            <i className={`${link.icon} text-lg w-1 mx-10`}></i>
            <span className="text-lg">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="mt-9">
        {links.footerLinks.map((link) => (
          <>
            {/* {console.log(link.onClick)} */}
            <Link
              key={link.id}
              to={link.to}
              onClick={link.onClick}
              className="inline-block w-full py-3 rounded-2xl text-gray-400 hover:bg-primary hover:text-white transition-colors"
            >
              <i className={`${link.icon} text-lg w-1 mx-10`}></i>
              <span className="text-lg">{link.name}</span>
            </Link>
          </>
        ))}
      </div>
    </div>
  )
}

export default NavBar
