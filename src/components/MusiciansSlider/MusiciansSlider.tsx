import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import {
	getArtistInfoAndAlbum,
	getMusicians,
} from '../../store/musicians.slice'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import s from './MusiciansSlider.module.scss'
import { Navigation, Pagination } from 'swiper/modules'
import ArtistCard from '../ArtistCard/ArtistCard'
import arrow from '../../assets/arrow-for-slider.svg'
import 'react-loading-skeleton/dist/skeleton.css'

const MusiciansSlider = () => {
	const [index, setIndex] = useState<number>(0)
	const dispatch = useDispatch<AppDispatch>()

	// получаем первые 5 самых популярных музыкантов, для отображения их в слайдере
	const { musicians } = useSelector((s: RootState) => s.musicians)

	useEffect(() => {
		if (musicians.length) return
		dispatch(getMusicians(5))
	}, [dispatch, musicians.length])

	useEffect(() => {
		if (!musicians[index] || musicians[index].detInfo.albums[0]) return
		// делаем запрос только если о данном исполнители нет инфомации
		dispatch(getArtistInfoAndAlbum({ name: musicians[index].name, limit: 1 }))
	}, [dispatch, index, musicians])

	return (
		<div className={s.swiperWrapper}>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					prevEl: `.${s.prevArrow}`,
					nextEl: `.${s.nextArrow}`,
				}}
				pagination={{
					clickable: true,
					el: '.s-pagination',
				}}
				spaceBetween={20}
				slidesPerView={1}
				onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
			>
				{musicians.length &&
					musicians.map((item, idx) => {
						if (idx <= 4) {
							return (
								<SwiperSlide key={item.name} className={s.slide}>
									<ArtistCard item={item} />
								</SwiperSlide>
							)
						}
					})}
			</Swiper>

			<div className={s.arrows}>
				<button className={s.button}>
					<img src={arrow} alt='Предыдущий слайд' className={s.prevArrow} />
				</button>

				<div className='s-pagination'></div>

				<button className={s.button}>
					<img src={arrow} alt='Следующий слайд' className={s.nextArrow} />
				</button>
			</div>
		</div>
	)
}

export default MusiciansSlider
