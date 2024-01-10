import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFileAtPath('src/**/*.ts')
project.addSourceFileAtPath('src/**/*.tsx')

const files = project.getSourceFiles()

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations()
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()
    })
})

project.save()