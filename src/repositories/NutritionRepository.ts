export interface IReadRepository<T> {
    findById(id: string): Promise<T>;
}