import { dbClient } from "../../database/db-client";
export class StatusRepository {
    create(entity) {
        throw new Error("Method not implemented.");
    }
    async findById(id) {
        const [status] = await dbClient `SELECT * FROM Status WHERE id=${id}`;
        return status;
    }
    async findAll() {
        const statuses = await dbClient `SELECT * FROM Status`;
        return statuses;
    }
}
