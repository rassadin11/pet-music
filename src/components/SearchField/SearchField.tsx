import {useEffect, useState, useTransition, useRef} from 'react'
import s from './SearchField.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../../store/store'
import {globalActions} from '../../store/global/global.slice'
import Loading from '../Loading/Loading'
import {Link} from 'react-router-dom'
import Input from '../Input/Input'
import {searchTrackByInput} from '../../store/global/global.thunks'

const SearchField = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {trackMatches, isLoading} = useSelector(
    (s: RootState) => s.global,
  )
  const [value, setValue] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const timeoutId = useRef<NodeJS.Timeout>()

  const resetValue = () => {
    setValue('')
    dispatch(globalActions.resetSearch())
  }

  useEffect(() => {
    clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      if (value) {
        startTransition(() => {
          dispatch(searchTrackByInput(value))
        })
      }
    }, 300)

    return () => clearTimeout(timeoutId.current)
  }, [dispatch, value, startTransition])

  // testing
  useEffect(() => {
    return () => {
      dispatch(globalActions.resetSearch())
    }
  }, [dispatch])

  return (
    <div className={s.searchWrapper}>
      <div className={s.search}>
        <Input
          value={value}
          setValue={setValue}
          className={`${s.input} ${
            trackMatches?.length && value.length ? s.noBorder : ''
          }`}
          placeholder='Type whatever you want'
          type='text'
        />
        <div className={s.results}>
          {trackMatches?.length && value.length > 0 && (
            <>
              {trackMatches.map(track => (
                <Link
                  to={
                    '/songs/song?name=' +
                    track.name +
                    '&artist=' +
                    track.artist
                  }
                  key={track.url}
                  className={s.result}
                  onClick={resetValue}
                >
                  <p className={s.name}>{track.name}</p>
                  <p className={s.artist}>{track.artist}</p>
                </Link>
              ))}
            </>
          )}
          {isPending || isLoading ? (
            <div className={s.results}>
              <Loading type='small' />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchField
