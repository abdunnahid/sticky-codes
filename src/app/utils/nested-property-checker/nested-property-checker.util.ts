export class NestedPropertyChecker {

    public static exists(obj: object, ...nestedProperties: string[]): boolean {
        let object = JSON.parse(JSON.stringify(obj));
        let exists = true;

        for (const property of nestedProperties) {
            if (!object.hasOwnProperty(property)) {
                exists = false;
                break;
            }
            object = object[property];
        }
        return exists;
    }

    public static existsPath(obj: object, nestedPropertyPath?: string): boolean {
        const properties: string[] = nestedPropertyPath ? nestedPropertyPath.trim().split('.') : [];
        return this.exists(obj, ...properties);
    }

    // public static existsPathAndNotFalsy(obj: object, nestedPropertyPath?: string): boolean {

    //     let object = JSON.parse(JSON.stringify(obj));
    //     let exists = true;

    //     for (const property of nestedProperties) {
    //         if (!object.hasOwnProperty(property)) {
    //             exists = false;
    //             break;
    //         }
    //         object = object[property];
    //     }
    //     if (exists) {
    //         Object.keys(object)
    //     }
    //     return exists;
    // }
}
