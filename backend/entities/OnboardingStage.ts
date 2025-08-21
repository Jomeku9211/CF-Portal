import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RoleLevel } from './RoleLevel';

@Entity('onboarding_stages')
export class OnboardingStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // e.g., "profile_setup", "skills_assessment", "portfolio_creation"

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 36 }) // UUID length
  roleLevelId: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'varchar', length: 50 })
  stageType: string; // "required", "optional", "conditional"

  @Column({ type: 'json', nullable: true })
  requirements: any; // What needs to be completed to move to next stage

  @Column({ type: 'json', nullable: true })
  formFields: any; // Dynamic form configuration for this stage

  @Column({ type: 'varchar', length: 100, nullable: true })
  nextStage: string; // ID of the next stage

  @Column({ type: 'varchar', length: 100, nullable: true })
  previousStage: string; // ID of the previous stage

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => RoleLevel, roleLevel => roleLevel.onboardingStages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleLevelId' })
  roleLevel: RoleLevel;
}
