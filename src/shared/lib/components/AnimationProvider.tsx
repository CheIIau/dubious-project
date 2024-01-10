import type { FC, PropsWithChildren } from 'react'
import {
    createContext,
    useEffect,
    useRef,
    useState,
    useMemo,
    useContext,
} from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

export interface AnimationContextPayload {
    Gesture?: GestureType
    Spring?: SpringType
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

const getAsyncAnimationModules = async () => {
    const Spring = import('@react-spring/web')
    const Gesture = import('@use-gesture/react')
    return Promise.all([Spring, Gesture])
}

export const AnimationProvider: FC<PropsWithChildren> = ({ children }) => {
    const SpringRef = useRef<SpringType>()
    const GestureRef = useRef<GestureType>()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring
            GestureRef.current = Gesture
            setIsLoaded(true)
        })
    }, [])

    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    )

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    )
}

export const useAnimationLibs = () => {
    return useContext(AnimationContext)
}
