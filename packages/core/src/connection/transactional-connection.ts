import {Injectable} from "@nestjs/common";
import {EntityManager} from "@mikro-orm/core";

@Injectable()
export class TransactionalConnection {
    constructor(
        private entityManager: EntityManager
    ) {
    }

}
