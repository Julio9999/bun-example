import { Status } from "../../../entities/status/status.entity";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class StatusRepository implements BaseRepository{

    create(entity: unknown): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Status | null> {
        const [status] = await dbClient`SELECT * FROM Status WHERE id=${id}`
        return status;
    }

    async findAll(): Promise<Status[]> {
        const statuses = await dbClient`SELECT * FROM Status`
        return statuses
    }


}