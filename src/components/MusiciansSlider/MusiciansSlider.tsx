import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect, useRef, useState } from 'react'
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

const MusiciansSlider = () => {
	const [index, setIndex] = useState<number>(0)
	const dispatch = useDispatch<AppDispatch>()
	const { musicians } = useSelector((s: RootState) => s.musicians)
	const swiperRef = useRef<SwiperType>()

	useEffect(() => {
		if (musicians.length) return
		dispatch(getMusicians(5))
	}, [dispatch, musicians.length])

	useEffect(() => {
		if (!musicians[index]) return
		if (musicians[index].detInfo.albums.length) return
		dispatch(getArtistInfoAndAlbum({ name: musicians[index].name, limit: 1 }))
	}, [dispatch, index, musicians])

	return (
		<div className={s.swiperWrapper}>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					prevEl: `.${s.prev}`,
					nextEl: `.${s.next}`,
				}}
				pagination={{ clickable: true }}
				spaceBetween={20}
				slidesPerView={1}
				onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
				onBeforeInit={(swiper) => {
					swiperRef.current = swiper
				}}
			>
				{musicians.length &&
					musicians.map((item) => (
						<SwiperSlide key={item.name} className={s.slide}>
							<ArtistCard item={item} />
						</SwiperSlide>
					))}
			</Swiper>

			<div>
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					className={s.button}
				>
					<img src={arrow} alt='Предыдущий слайд' className={s.prevArrow} />
				</button>
				<button
					onClick={() => swiperRef.current?.slideNext()}
					className={s.button}
				>
					<img src={arrow} alt='Следующий слайд' className={s.nextArrow} />
				</button>
			</div>
		</div>
	)
}

export default MusiciansSlider
