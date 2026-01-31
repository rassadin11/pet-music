import {MouseEvent, useEffect, useRef, useState} from 'react'
import Input from '../Input/Input'
import Title from '../Title/Title'
import s from './SearchByArtist.module.scss'
import cn from 'classnames'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../../store/store'
import {searchArtistByInput} from '../../store/global/global.thunks'
import {validateListeners} from '../../utils/TrackValidation'
import Loading from '../Loading/Loading'
import {Link} from 'react-router-dom'
import {bodyHidden} from '../../utils/BodyHidden'
import {globalActions} from '../../store/global/global.slice'

const SearchByArtist = () => {
  // масштабируемый и статичный инпуты и взаимодействие с ними
  const [value, setValue] = useState<string>('')
  const [fakeValue, setFakeValue] = useState<string>('')
  const [coords, setCoords] = useState<DOMRect | undefined>()
  const [isFocus, setFocus] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const realInputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const scrollWidth = useSelector(
    (s: RootState) => s.global.scrollBarWidth,
  )
  const {isLoading, artistMatches} = useSelector(
    (s: RootState) => s.global,
  )

  // осуществляем анимацию инпута
  useEffect(() => {
    if (!coords || !realInputRef.current || !inputRef.current) return
    const isMobile = document.body.clientWidth <= 768

    const setInitialFocusStyles = () => {
      Object.assign(realInputRef.current!.style, {
        transition: 'none',
        width: `${coords.width}px`,
        top: `${coords.top}px`,
        left: `calc(50% - ${scrollWidth / 2}px)`,
        transform: 'translate(-50%, 0)',
        opacity: '1',
        visibility: 'visible',
      })

      Object.assign(inputRef.current!.style, {
        opacity: '0',
        visibility: 'hidden',
      })
    }

    const animateToFocused = () => {
      Object.assign(realInputRef.current!.style, {
        transition: 'all 0.75s cubic-bezier(.22,-0.42,.31,1.51)',
        width: '95vw',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: isMobile ? '2rem 20px' : '60px 20px',
        fontSize: isMobile ? '24px' : '40px',
      })
    }

    const resetStyles = () => {
      Object.assign(realInputRef.current!.style, {
        width: `${coords.width}px`,
        top: `${coords.top}px`,
        left: `calc(50% - ${scrollWidth / 2}px)`,
        transform: 'translate(-50%, 0)',
        padding: '0 15px',
        fontSize: '20px',
      })
    }

    const hideRealInput = () => {
      Object.assign(realInputRef.current!.style, {
        transition: 'none',
        opacity: '0',
        visibility: 'hidden',
      })
      Object.assign(inputRef.current!.style, {
        opacity: '1',
        visibility: 'visible',
      })
    }

    if (isFocus) {
      setInitialFocusStyles()
      bodyHidden(true)
      setTimeout(() => {
        if (!realInputRef.current) return
        animateToFocused()
      }, 50)
    } else {
      resetStyles()
      bodyHidden(false)
      setTimeout(() => {
        if (!realInputRef.current) return
        hideRealInput()
      }, 750)
    }
  }, [coords, isFocus, scrollWidth])

  const handleFocus = () => {
    setFocus(true)
    setCoords(inputRef.current?.getBoundingClientRect())

    setTimeout(() => {
      if (realInputRef.current) realInputRef.current.focus()
    }, 750)
  }

  const closeFocus = (e: MouseEvent<HTMLElement>) => {
    if (e.target !== realInputRef.current) {
      setFocus(false)
    }
  }

  useEffect(() => {
    setFakeValue(value)

    if (value) {
      dispatch(searchArtistByInput(value))
    } else {
      dispatch(globalActions.resetArtistSearch())
    }
  }, [dispatch, value])

  return (
    <>
      <div className={cn(s.centerWrapper, isFocus ? s.focus : '')}>
        <div className={cn(s.center, isFocus ? s.focus : '')}>
          <Title className={s.title}>
            Can't find your favorite musician? Try to find it via this
            amazing search!
          </Title>
          <Input
            type='text'
            placeholder={"Type musician's name"}
            className={cn(s.input)}
            value={fakeValue}
            ref={inputRef}
            setValue={setFakeValue}
            onFocus={handleFocus}
          />

          <div
            className={cn(s.inputWrapper, isFocus ? s.focus : '')}
            onClick={closeFocus}
          >
            <Input
              type='text'
              placeholder={"Type musician's name"}
              className={cn(s.realInput, isFocus ? s.focus : '')}
              ref={realInputRef}
              value={value}
              setValue={setValue}
            />

            {isLoading ? (
              <div className={s.searchLoading}>
                <Loading type='small' />
              </div>
            ) : (
              <div
                className={cn(
                  s.searchResults,
                  isFocus && artistMatches?.length ? '' : s.hide,
                )}
              >
                {artistMatches?.map(item => (
                  <Link
                    to={'/musicians/' + item.name}
                    className={s.result}
                    onClick={() => bodyHidden(false)}
                    key={item.name}
                  >
                    <p>{item.name}</p>
                    <p>{validateListeners(item.listeners)} listens</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchByArtist
