type FunctionLike = (...args: any) => any;

export type MethodLikeKeys<T> = keyof {
  [K in keyof T as Required<T>[K] extends FunctionLike ? K : never]: T[K];
};
