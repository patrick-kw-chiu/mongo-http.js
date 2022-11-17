// Copy from https://github.com/mongodb/node-mongodb-native/blob/b67af3cd8b094218ec323b23e9950151cb91f1ef/src/sort.ts

/** @public */
export type SortDirection = 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending' | { $meta: string };

/** @public */
export type Sort =
    | string
    | Exclude<SortDirection, { $meta: string }>
    | string[]
    | { [key: string]: SortDirection }
    | Map<string, SortDirection>
    | [string, SortDirection][]
    | [string, SortDirection];

/** Below stricter types were created for sort that correspond with type that the cmd takes  */

/** @internal */
export type SortDirectionForCmd = 1 | -1 | { $meta: string };

/** @internal */
export type SortForCmd = Map<string, SortDirectionForCmd>;
