import { StatusRepository } from "../../infraestructure/repositories/status/status-repository";
import { createStatusDtoType } from "./dto/create-status-dto";

export class StatusService {

    private readonly statusRepository: StatusRepository;

    constructor(){
        this.statusRepository = new StatusRepository();
    }

    static getInstance(){
        return new StatusService
    }


    findAll = async() => {
        const res = await this.statusRepository.findAll();
        return res;
    }

    findById = async(id: number) => {
        const res = await this.statusRepository.findById(id);
        return res;
    }

    create = async(createStatusDto: createStatusDtoType) => {
        const res = await this.statusRepository.create(createStatusDto);
        return res;
    }


}