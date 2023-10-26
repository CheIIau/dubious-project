// special DeepPartial for prevent arrays having undefined elements
export type DeepPartialSpecial<T> = T extends any[]
    ? T
    : T extends Record<string, any>
    ? {
          [P in keyof T]?: DeepPartialSpecial<T[P]>
      }
    : T
