import ChartBlock from '../../components/ChartBlock/ChartBlock'
import MainBlock from '../../components/MainBlock/MainBlock'
import MusiciansSlider from '../../components/MusiciansSlider/MusiciansSlider'
import Title from '../../components/Title/Title'
import s from './MainPage.module.scss'

const MainPage = () => {
	return (
		<main className={s.container}>
			<section>
				<MainBlock />
			</section>
			<section className={s.wrapper}>
				<Title>Популярные музыканты</Title>
				<MusiciansSlider />
			</section>
			<section>
				<ChartBlock />
			</section>
		</main>
	)
}

export default MainPage
