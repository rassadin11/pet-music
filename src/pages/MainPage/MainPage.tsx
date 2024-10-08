import ChartBlock from '../../components/ChartBlock/ChartBlock'
import MainBlock from '../../components/MainBlock/MainBlock'
import s from './MainPage.module.scss'

const MainPage = () => {
	return (
		<div className={s.container}>
			<MainBlock />
			<ChartBlock />
		</div>
	)
}

export default MainPage
