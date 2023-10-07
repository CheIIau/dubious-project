export function classNames(
    className: string,
    mods: Record<string, boolean> = {},
    additional: Array<string | undefined> = []
): string {
    return [
        className,
        ...additional.filter(Boolean),
        Object.entries(mods)
            .filter(([_className, flag]) => !!flag)
            .map(([className]) => className)
    ].join(' ')
}
