import { Link, Outlet } from 'react-router-dom'
import s from './LayoutMenu.module.scss'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import TrackModal from '../../components/TrackModal/TrackModal'

interface IMenuItem {
	id: number
	path: string
	title: string
}

const initialValue: IMenuItem[] = [
	{
		id: 1,
		path: '/musicians',
		title: 'Музыканты',
	},
	{
		id: 2,
		path: '/albums',
		title: 'Альбомы',
	},
	{
		id: 3,
		path: '/charts',
		title: 'Чарты',
	},
]

const LayoutMenu = () => {
	const [burger, setBurger] = useState<boolean>(false)

	const handleClick = () => {
		setBurger((b) => !b)
	}

	useEffect(() => {
		if (burger) {
			document.body.classList.add('hidden')
		} else {
			document.body.classList.remove('hidden')
		}
	}, [burger])

	return (
		<div>
			<div className={cn(s.container, burger ? s.hidden : '')}>
				<header className={s.header}>
					<div className={s.wrapper}>
						<Link to='/'>
							<div className={s.logo}>
								<p>
									<span>Listen</span> <span>Music</span>
								</p>
							</div>
						</Link>
						<div className={s.search}>
							<input
								type='text'
								placeholder='Введите название трека'
								className={s.input}
							/>
						</div>
					</div>
					<nav className={s.navList}>
						<ul className={s.list}>
							{initialValue.map((item) => (
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
					{initialValue.map((item) => (
						<li key={item.id}>
							<Link to={item.path}>{item.title}</Link>
						</li>
					))}
				</ul>
			</nav>

			<TrackModal />
		</div>
	)
}

export default LayoutMenu
