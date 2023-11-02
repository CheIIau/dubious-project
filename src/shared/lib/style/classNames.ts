export type Mods = Record<string, boolean>

export function classNames(
    className: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    return [
        className,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_className, flag]) => !!flag)
            .map(([className]) => className),
    ].join(' ')
}
