import { Column, Entity } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Department extends AbstractEntity {
    @Column()
    name: string;
}

export default Department;
