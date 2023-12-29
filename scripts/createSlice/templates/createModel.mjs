import { mkdir, writeFile } from 'fs/promises'
import resolveRoot from '../resolveRoot.mjs'
import reduxSliceTemplate from './reduxSliceTemplate.mjs'
import schemaTypeTemplate from './schemaTypeTemplate.mjs'

export default async (layer, sliceName) => {
    const resolveModelPath = (...segments) =>
        resolveRoot('src', layer, sliceName, 'model', ...segments)

    const createModelStructure = async () => {
        try {
            await mkdir(resolveModelPath())
            await mkdir(resolveModelPath('types'))
            await mkdir(resolveModelPath('slices'))
            await mkdir(resolveModelPath('selectors'))
            await mkdir(resolveModelPath('services'))
        } catch (e) {
            console.log(
                `Не удалось создать model сегмент для слайса ${sliceName}`,
                e,
            )
        }
    }

    const createReduxSlice = async () => {
        try {
            await writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName),
            )
        } catch (e) {
            console.log('Не удалось создать редакс слайс', e)
        }
    }

    const createSchemaType = async () => {
        try {
            await writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName),
            )
        } catch (e) {
            console.log('Не удалось создать тип схемы стейта', e)
        }
    }

    await createModelStructure()
    await createReduxSlice()
    await createSchemaType()
}
