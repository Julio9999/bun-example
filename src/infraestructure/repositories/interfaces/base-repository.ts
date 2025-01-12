export interface BaseRepository {
    create(entity: unknown): Promise<unknown>;
    findById(id: number): Promise<unknown | null>;
    findAll(): Promise<unknown[]>;
    update?(id: number, entity: unknown): Promise<unknown | null>;
    delete?(id: number): Promise<boolean>;
  }