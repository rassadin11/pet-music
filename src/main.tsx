import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutMenu from './layout/Menu/LayoutMenu.tsx'
import MainPage from './pages/MainPage/MainPage.tsx'
import TopPage from './pages/TopPage/TopPage.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import AlbumsPage from './pages/AlbumsPage/AlbumsPage.tsx'
import MusiciansPage from './pages/MusiciansPage/MusiciansPage.tsx'
import SongPage from './pages/SongPage/SongPage.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <LayoutMenu />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/songs',
				element: <TopPage />,
			},
			{
				path: '/songs/song',
				element: <SongPage />,
			},
			{
				path: '/musicians',
				element: <MusiciansPage />,
			},
			{
				path: '/albums',
				element: <AlbumsPage />,
			},
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<App />
		</Provider>
	</StrictMode>
)
