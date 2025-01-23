import { StatusRepository } from "../../infraestructure/repositories/status/status-repository";

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


}