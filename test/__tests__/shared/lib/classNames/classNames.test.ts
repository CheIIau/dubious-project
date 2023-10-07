import { classNames } from 'src/shared/lib/style/classNames'

describe('classNames', () => {
    const DEFAULT_CLASS = 'DEFAULT_CLASSNAME'
    const SECOND_CLASS = 'second'
    const THIRD_CLASS = 'third'
    const FOURTH_CLASS = 'fourth'

    it('returns string', () => {
        const classname = classNames(DEFAULT_CLASS)

        expect(typeof classname).toEqual('string')
    })

    it('adds first variable classes to result string', () => {
        const classname = classNames(DEFAULT_CLASS)

        expect(classname).toContain(DEFAULT_CLASS)
    })

    it('adds mods classes to result string', () => {
        const classname = classNames('', {
            [SECOND_CLASS]: true,
            [THIRD_CLASS]: false
        })

        expect(classname).toContain(SECOND_CLASS)
        expect(classname).not.toContain(THIRD_CLASS)
    })

    it('adds additional classes to result string', () => {
        const classname = classNames('', {}, [SECOND_CLASS, THIRD_CLASS])

        expect(classname).toContain(SECOND_CLASS)
        expect(classname).toContain(THIRD_CLASS)
    })

    it('concat classes with space', () => {
        const expectedString = `${DEFAULT_CLASS} ${FOURTH_CLASS} ${SECOND_CLASS}`
        const classname = classNames(
            DEFAULT_CLASS,
            { [SECOND_CLASS]: true, [THIRD_CLASS]: false },
            [FOURTH_CLASS]
        )

        expect(classname).toEqual(expectedString)
    })
})
