import { Project } from 'ts-morph'

const project = new Project({})

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')

const files = project.getSourceFiles()
const folderNames = [ //layer names
    'app',
    'shared',
    'entities',
    'widgets',
    'features',
    'pages',
] as const

function isAbsolute(value: string) {
    return folderNames.some((folderName) => value.startsWith(folderName))
}

// if import value start with layer name adds src/ to it
files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations()
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()

        if (isAbsolute(value)) {
            console.log(value)
            importDeclaration.setModuleSpecifier('src/' + value)
        }
    })
})

project.save()
//npx ts-node scripts/updateImports/updateImports.ts
