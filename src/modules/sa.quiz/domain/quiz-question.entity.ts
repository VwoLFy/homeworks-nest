import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateQuestionDto } from '../application/dto/CreateQuestionDto';
import { randomUUID } from 'crypto';

@Entity('QuizQuestions')
export class QuizQuestion {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  body: string;
  @Column('json')
  correctAnswers: string[];
  @Column()
  published: boolean;
  @Column()
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;

  constructor({ ...dto }: CreateQuestionDto) {
    this.id = randomUUID();
    this.body = dto.body;
    this.correctAnswers = dto.correctAnswers;
    this.published = false;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}
