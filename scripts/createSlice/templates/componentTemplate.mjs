const interfaceConst = 'interface'

export default (
    componentName,
) => `import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import classes from './${componentName}.module.scss'
import {
    memo,
    type PropsWithChildren,
} from 'react'

${interfaceConst} ${componentName}Props extends PropsWithChildren {
    readonly className?: string
}

export const ${componentName} = memo<${componentName}Props>(
    function ${componentName}({ className }) {
        const { t } = useTranslation()
    
        return (
            <div className={classNames(classes.${componentName}, {}, [className])}>
               
            </div>
        )
})`
