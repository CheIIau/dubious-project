export function addQueryParams(params: Partial<Record<string, string>>) {
    window.history.pushState(null, '', getQueryParams(params))
}

export function getQueryParams(params: Partial<Record<string, string>>) {
    if (!params) {
        return ''
    }
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value)
        }
    })
    return `?${searchParams.toString()}`
}
