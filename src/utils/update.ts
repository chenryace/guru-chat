export interface ObjectWithID {
    id: string | number;
}

export const appendById = <T extends ObjectWithID>(container: T[], object: T): T[] => {
    if (container.some(element => element.id === object.id)) {
        return container;
    }

    return [...container, object];
};
