import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class StatusRepository implements BaseRepository{

    create(entity: unknown): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<unknown | null> {
        return dbClient.status.findUnique({where: {id}})
    }
    findAll(): Promise<unknown[]> {
        return dbClient.status.findMany()
    }


}