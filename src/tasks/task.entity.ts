import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';  

export enum TaskStatus {  
  Pending = 'Pending',  
  Selesai = 'Selesai',  
}  

@Entity('tasks')  
export class Task {  
  @PrimaryGeneratedColumn()  
  id: number;  

  @Column()  
  task: string;  

  @Column()  
  dimulai: Date;  

  @Column()  
  selesai: Date;  

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.Pending })  
  status: TaskStatus;  
}