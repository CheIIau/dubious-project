export function classNames(
    className: string,
    mods: Record<string, boolean>,
    additional: string[]
): string {
    return [
        className,
        ...additional,
        Object.entries(mods)
            .filter(([_className, flag]) => !!flag)
            .map(([flag]) => flag)
    ].join(' ')
}
