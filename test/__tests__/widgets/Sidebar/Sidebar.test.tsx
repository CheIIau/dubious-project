import { fireEvent, render, screen } from '@testing-library/react'
import { Sidebar } from 'src/widgets/Sidebar/SidebarIndex'
import { getStringClasses, renderWrapper } from 'test/helpers'
// example how to mock
// vi.mock("../src/Icon", () => {
//     return {
//       __esModule: true,
//       A: true,
//       default: () => {
//         return <div></div>;
//       },
//     };
//   });

// you can render div instead
// vi.mock('src/widgets/ThemeSwitcher/themeSwitcherIndex', () => ({
//     ThemeSwitcher: 'div'
// }))
// // or do not render at all
// vi.mock('src/widgets/LangSwitcher/ui/LangSwitcher')
// // mock icon
// vi.mock('src/shared/assets/icons/menu.svg', () => ({
//     default: () => {
//         return menuIcon
//     }
// }))

describe('Sidebar.tsx', () => {
    const sidebarSelector = 'sidebar'
    const menuAttributeValue = 'menu-button'
    const collapsedClass = 'collapsed'

    it('collapses sidebar on click', async () => {
        const renderResult = render(renderWrapper(<Sidebar />, { route: '/' }))
        // можно в принципе выцепить компонент через родителя, а не через screen
        // const sidebarComponent =
        //     renderResult.container.querySelector(sidebarSelector)
        const sidebarComponent = screen.getByTestId(sidebarSelector)
        expect(sidebarComponent).not.toBe(null)
        expect(getStringClasses(sidebarComponent!)).toContain(collapsedClass)
        // const buttons = await renderResult.findAllByRole('button')
        // const menuButton = buttons.find((button) => button.getAttribute('data-testid') === menuAttributeValue)
        const menuButton = renderResult.getByTestId(menuAttributeValue)
        expect(menuButton).not.toBe(undefined)

        fireEvent.click(menuButton!)

        expect(getStringClasses(sidebarComponent!)).not.toContain(
            collapsedClass,
        )
    })
})
