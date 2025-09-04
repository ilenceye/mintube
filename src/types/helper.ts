type Inc<T extends unknown[]> = [...T, unknown];

export type DeepPrettify<
  T,
  MaxDepth extends number = 3,
  Depth extends unknown[] = [],
> = Depth["length"] extends MaxDepth
  ? T // 达到最大深度，不再展开
  : T extends object
    ? { [K in keyof T]: DeepPrettify<T[K], MaxDepth, Inc<Depth>> }
    : T;
