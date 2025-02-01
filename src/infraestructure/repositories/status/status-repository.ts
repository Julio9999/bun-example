import { Status } from "../../../entities/status/status.entity";
import { createStatusDtoType } from "../../../modules/status/dto/create-status-dto";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class StatusRepository implements BaseRepository{

    create(createStatusDto: createStatusDtoType) {
        return dbClient`
        INSERT INTO "Status" (name)
        VALUES (${createStatusDto.name})
        RETURNING *
        `
    }

    async findById(id: number): Promise<Status | null> {
        const [status] = await dbClient`SELECT * FROM "Status" WHERE id=${id}`
        return status;
    }

    async findAll(): Promise<Status[]> {
        const statuses = await dbClient`SELECT * FROM "Status"`
        return statuses
    }


}