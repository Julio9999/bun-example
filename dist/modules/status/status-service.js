import { StatusRepository } from "../../infraestructure/repositories/status/status-repository";
export class StatusService {
    statusRepository;
    constructor() {
        this.statusRepository = new StatusRepository();
    }
    static getInstance() {
        return new StatusService;
    }
    findAll = async () => {
        const res = await this.statusRepository.findAll();
        return res;
    };
    findById = async (id) => {
        const res = await this.statusRepository.findById(id);
        return res;
    };
    create = async (createStatusDto) => {
        const res = await this.statusRepository.create(createStatusDto);
        return res;
    };
}
