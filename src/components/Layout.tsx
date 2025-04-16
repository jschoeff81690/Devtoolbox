import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header
          className="border-b px-6 py-4 flex items-center justify-between"
          style={{ backgroundColor: 'rgb(4, 44, 68)' }}
        >
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-100">
              <img src={`${import.meta.env.BASE_URL}devtoolbox-logo.png`} alt="Devtoolbox logo" className="h-8 w-8 rounded" />
              Devtoolbox
            </Link>
            <Link to="/tools" className="text-blue-100 hover:text-white text-sm font-medium">
              Tools
            </Link>
          </div>
        </header>
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Left Sidebar (ads or nav) */}
        <aside className="w-1/6 hidden lg:block border-r p-4 text-sm text-gray-500">
          <p>Ad space</p>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>

        {/* Right Sidebar (ads) */}
        <aside className="w-1/6 hidden lg:block border-l p-4 text-sm text-gray-500">
          <p>Ad space</p>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Devtoolbox. All rights reserved.
      </footer>
    </div>
  )
}

