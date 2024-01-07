import { fireEvent, render, screen } from '@testing-library/react'
import { renderWrapper } from 'test/helpers/renderWrapper'
import type { Profile } from 'src/entities/Profile/profileIndex'
import { ProfileCard } from 'src/entities/Profile/profileIndex'
import { $api } from 'src/shared/api/api'

const SPINNER = 'Spinner'

vi.mock('src/shared/ui/Spinner/Spinner', () => ({
    Spinner: () => <p>{SPINNER}</p>,
}))

const profileCardCallbacks = {
    onChangeFirstname: vi.fn(),
    onChangeLastname: vi.fn(),
    onChangeAge: vi.fn(),
    onChangeCity: vi.fn(),
    onChangeAvatar: vi.fn(),
    onChangeUsername: vi.fn(),
    onChangeCurrency: vi.fn(),
    onChangeCountry: vi.fn(),
} as const

describe('ProfileCard', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })
    const ERROR_MESSAGE = 'error'
    const FIRSTNAME_TEST_ID = 'firstname'

    const USER_DATA = {
        firstname: 'John',
        lastname: 'Doe',
        age: 31,
        currency: 'USD',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'admin',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    } as const satisfies Profile

    it('shows spinner if component is loading', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    loading={true}
                />,
            ),
        )

        expect(renderResult.container.innerText).toContain(SPINNER)
    })

    it('does not show spinner if component is not loading', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    loading={false}
                />,
            ),
        )

        expect(renderResult.container.innerText).not.toContain(SPINNER)
    })

    it('shows error message if component error prop is not null', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    error={ERROR_MESSAGE}
                />,
            ),
        )

        expect(renderResult.container.innerText).toContain(ERROR_MESSAGE)
    })

    it('does not show error message if component error prop is null', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    error={null}
                />,
            ),
        )

        expect(renderResult.container.innerText).not.toContain(ERROR_MESSAGE)
    })

    it('sets readonly on every input if component has readonly prop', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    readonly={true}
                />,
            ),
        )
        const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]

        inputs.forEach((input, i) => {
            expect(input.readOnly).toBe(true)
        })
    })

    it('sets readonly on every input if component has readonly prop', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    readonly={true}
                />,
            ),
        )
        const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]

        inputs.forEach((input, i) => {
            expect(input.readOnly).toBe(true)
        })
    })

    it('sets firstname value to input from props', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    data={USER_DATA}
                />,
            ),
        )
        const firstnameInput = screen.getByTestId(
            FIRSTNAME_TEST_ID,
        ) as HTMLInputElement

        expect(firstnameInput.value).toBe(USER_DATA.firstname)
    })

    it('invokes callback on change firstname input value', () => {
        const renderResult = render(
            renderWrapper(
                <ProfileCard
                    {...profileCardCallbacks}
                    data={USER_DATA}
                />,
            ),
        )
        const firstnameInput = screen.getByTestId(
            FIRSTNAME_TEST_ID,
        ) as HTMLInputElement
        expect(profileCardCallbacks.onChangeFirstname).not.toBeCalled()

        fireEvent.change(firstnameInput, { target: { value: 'Johnny' } })
        
        expect(profileCardCallbacks.onChangeFirstname).toBeCalledTimes(1)
    })
})
