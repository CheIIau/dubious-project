import { mkdir, writeFile } from 'fs/promises'
import resolveRoot from '../resolveRoot.mjs'
import firstCharUpperCase from '../firstCharUpperCase.mjs'
import componentTemplate from './componentTemplate.mjs'
import storyTemplate from './storyTemplate.mjs'
import styleTemplate from './styleTemplate.mjs'

export default async (layer, sliceName) => {
    const resolveUIPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'ui', ...segments)

    const createUIDir = async () => {
        try {
            await mkdir(resolveUIPath())
        } catch (e) {
            console.log('Не удалось создать UI директорию')
        }
    }

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName)
            await mkdir(resolveUIPath(componentName))
            await writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName),
            )
            await writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName),
            )
            await writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName),
            )
        } catch (e) {
            console.log('Не удалось создать компонент')
        }
    }

    await createUIDir()
    await createComponent()
}
