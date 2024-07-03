import { instanceToPlain, plainToInstance, type ClassConstructor } from "class-transformer";

export class DataHelper {
    public static serialize(object: any) {
        return JSON.stringify(instanceToPlain(object));
    }

    public static deserialize<TModel>(cls: ClassConstructor<TModel>, json: string | null): TModel | null {
        if (!json)
            return null;
        
        return plainToInstance(cls, JSON.parse(json) as TModel) as TModel;
    }

    public static deserializeArray<TModel>(cls: ClassConstructor<TModel>, json: string): TModel[] {
        return plainToInstance(cls, JSON.parse(json) as TModel[]) as TModel[];
    }
}