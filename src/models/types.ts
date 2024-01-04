//@todo Type Capturing
export class TimeStamps {
  public _id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export type Ref<T> = T // | string //ObjectId
