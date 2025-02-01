import { dbClient } from "../../database/db-client";
export class StatusRepository {
    create(createStatusDto) {
        return dbClient `
        INSERT INTO "Status" (name)
        VALUES (${createStatusDto.name})
        RETURNING *
        `;
    }
    async findById(id) {
        const [status] = await dbClient `SELECT * FROM "Status" WHERE id=${id}`;
        return status;
    }
    async findAll() {
        const statuses = await dbClient `SELECT * FROM "Status"`;
        return statuses;
    }
}
