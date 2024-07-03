import type { ClassConstructor } from "class-transformer";
import { DataHelper } from "./DataHelper";

export class FormHelper {
    public static serializeFormData(object: any) {
        const json = DataHelper.serialize(object);
        const formData = new FormData();
        formData.append('json', json);
        return formData;
    }

    public static deserializeFormData<TModel>(cls: ClassConstructor<TModel>, formData: FormData) {
        const json = formData.get('json');
        if (!json || json.toString().length === 0) {
            return;
        }
        return DataHelper.deserialize(cls, json.toString());
    }
}