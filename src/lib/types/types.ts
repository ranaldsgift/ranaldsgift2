type Pojo<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
