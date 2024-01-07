export const testAttribute = 'data-testid'

export function getStringClasses(component: Element) {
    return Array.from(component.classList).join(' ')
}