import { Link, Outlet, useLocation } from 'react-router-dom'
import s from './LayoutMenu.module.scss'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { bodyHidden } from '../../utils/BodyHidden'
import TrackModal from '../../components/TrackModal/TrackModal'
import SearchField from '../../components/SearchField/SearchField'

interface IMenuItem {
	id: number
	path: string
	title: string
}

const initialValue: IMenuItem[] = [
	{
		id: 1,
		path: '/',
		title: 'Main',
	},
	{
		id: 2,
		path: '/musicians',
		title: 'Musicians',
	},
	{
		id: 3,
		path: '/albums',
		title: 'Albums',
	},
]

const LayoutMenu = () => {
	const [burger, setBurger] = useState<boolean>(false)
	const [menu, setMenu] = useState(initialValue)
	const location = useLocation()
	const handleClick = () => {
		setBurger((b) => !b)
	}

	useEffect(() => {
		setMenu(initialValue.filter((item) => item.path !== location.pathname))
	}, [location])

	useEffect(() => {
		bodyHidden(!!burger)
	}, [burger])

	return (
		<div>
			<div className={cn(s.container, burger ? s.hidden : '')}>
				<header className={s.header}>
					<div className={s.wrapper}>
						<Link to='/'>
							<div className={s.logo}>
								acous<span className={s.modern}>TI</span>cally
							</div>
						</Link>
						<SearchField />
					</div>
					<nav className={s.navList}>
						<ul className={s.list}>
							{menu.map((item) => (
								<li key={item.id}>
									<Link to={item.path}>{item.title}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className={s.burgerMenu}>
						<div
							className={`${s.burger} ${burger ? s.active : ''}`}
							onClick={handleClick}
						></div>
					</div>
				</header>
				<div>
					<Outlet />
				</div>
			</div>

			<nav className={`${s.navMobile} ${burger ? s.active : ''}`}>
				<ul className={s.list}>
					{menu.map((item) => (
						<li key={item.id}>
							<Link to={item.path} onClick={() => setBurger(false)}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<TrackModal />
		</div>
	)
}

export default LayoutMenu
