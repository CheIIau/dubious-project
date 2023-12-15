import { getQueryParams } from 'src/shared/lib/url/addQueryParams/addQueryParams'

describe('addQueryParams', () => {
    it('returns the right string with defined params', () => {
        const resultString = '?test=value&foo=bar'

        const params = getQueryParams({ test: 'value', foo: 'bar' })

        expect(params).toBe(resultString)
    })

    it('returns the empty string if param is undefined', () => {
        const resultString = ''
        
        //@ts-expect-error
        const params = getQueryParams(undefined)

        expect(params).toBe(resultString)
    })

    it('doesn`t include the undefined value in object', () => {
        const resultString = '?foo=bar'

        const params = getQueryParams({ baz: undefined, foo: 'bar' })

        expect(params).toBe(resultString)
    })
})
