import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RoleCategory } from './RoleCategory';
import { OnboardingStage } from './OnboardingStage';

@Entity('role_levels')
export class RoleLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // Junior, Mid, Senior, Principal

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 36 }) // UUID length
  roleCategoryId: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  requirements: any; // Skills, experience, etc.

  @Column({ type: 'json', nullable: true })
  onboardingFlow: any; // Specific onboarding stages for this level

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => RoleCategory, roleCategory => roleCategory.levels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleCategoryId' })
  roleCategory: RoleCategory;

  @OneToMany(() => OnboardingStage, onboardingStage => onboardingStage.roleLevel)
  onboardingStages: OnboardingStage[];
}
