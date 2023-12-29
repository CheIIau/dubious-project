import { mkdir } from 'fs/promises'
import resolveRoot from '../resolveRoot.mjs'
import createModel from './createModel.mjs'
import createUI from './createUI.mjs'
import createPublicApi from './createPublicApi.mjs'

export default async (layer, sliceName) => {
    try {
        await mkdir(resolveRoot('src', layer, sliceName))
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`)
    }

    await createModel(layer, sliceName)
    await createUI(layer, sliceName)
    await createPublicApi(layer, sliceName)
}
