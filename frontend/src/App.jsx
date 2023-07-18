import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import TopBar from './components/TopBar'
import HomeScreen from './screens/HomeScreen'
import SharedFilesScreen from './screens/SharedFilesScreen'
import AllFilesScreen from './screens/AllFilesScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import PrivateFilesScreen from './screens/PrivateFilesScreen'
import DeletedFilesScreen from './screens/DeletedFilesScreen'
import FileInfo from './components/FileInfo'
import { useSelector } from 'react-redux'
import AuthenticationScreen from './screens/AuthenticationScreen'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className="bg-quaternary h-screen overflow-hidden font-gladiora">
      <div className="flex items-start">
        {!userInfo ? (
          <AuthenticationScreen className={'w-full'} />
        ) : (
          <Router>
            <NavBar />
            <div className="w-4/5">
              <TopBar />

              <div className="flex items-start">
                <Routes>
                  <Route
                    path="/"
                    element={<HomeScreen className="w-[75%]" />}
                  />
                  <Route
                    path="/shared"
                    element={<SharedFilesScreen className="w-[75%]" />}
                  />
                  <Route
                    path="/all-files"
                    element={<AllFilesScreen className="w-[75%]" />}
                  />
                  <Route
                    path="/favorites"
                    element={<FavoritesScreen className="w-[75%]" />}
                  />
                  <Route
                    path="/private-files"
                    element={<PrivateFilesScreen className="w-[75%]" />}
                  />
                  <Route
                    path="/deleted-files"
                    element={<DeletedFilesScreen className="w-[75%]" />}
                  />
                </Routes>

                <FileInfo />
              </div>
            </div>
          </Router>
        )}
      </div>
    </div>
  )
}

export default App
