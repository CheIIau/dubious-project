import firstCharUpperCase from '../firstCharUpperCase.mjs'

export default (sliceName) => `export interface ${firstCharUpperCase(
    sliceName,
)}Schema {
    
}`
