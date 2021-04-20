import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 200, nullable: false })
    firstName: string;

    @Column({ type: "varchar", length: 200, nullable: false })
    lastName: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

}
