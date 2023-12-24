export function throttle(
    callback: (...args: any[]) => void,
    delay: number = 1000,
) {
    let timer: NodeJS.Timeout | null = null

    return function perform(...args: any[]) {
        if (timer) return

        timer = setTimeout(() => {
            callback(...args)
            if (timer) {
                clearTimeout(timer)
            }
            timer = null
        }, delay)
    }
}
