#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1bec55cc33fd7536e45362ebbda471873ad39afeb68d04bf3db5c41cdcd03212/contract';
import endContract from '../../snapshots/1bec55cc33fd7536e45362ebbda471873ad39afeb68d04bf3db5c41cdcd03212/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'cV',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('templateId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cVAnalysis',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('overallScore', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('strengths', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('suggestions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('summary', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('weaknesses', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'certification',
        columns: [
          col('credentialUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('issueDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('organization', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'education',
        columns: [
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('degree', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('endDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('field', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('institution', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'experience',
        columns: [
          col('company', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('endDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('position', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startDate', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobDescription',
        columns: [
          col('company', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobMatch',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('jobDescriptionId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('matchScore', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('matchingSkills', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('missingSkills', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('suggestions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'language',
        columns: [
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('proficiency', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'project',
        columns: [
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('projectUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('technologies', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'skill',
        columns: [
          col('cvId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('level', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'template',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('previewImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerificationExpiresAt', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('emailVerificationTokenHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerified', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('USER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'template',
        constraint: 'template_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_emailVerificationTokenHash_key',
        columns: ['emailVerificationTokenHash'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cV',
        index: 'cV_templateId_idx_19e0d972',
        columns: ['templateId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cV',
        index: 'cV_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cVAnalysis',
        index: 'cVAnalysis_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cVAnalysis',
        index: 'cVAnalysis_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'certification',
        index: 'certification_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'education',
        index: 'education_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'experience',
        index: 'experience_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobDescription',
        index: 'jobDescription_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_jobDescriptionId_idx_027108c0',
        columns: ['jobDescriptionId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobMatch',
        index: 'jobMatch_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'language',
        index: 'language_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project',
        index: 'project_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'skill',
        index: 'skill_cvId_idx_3a2b7df3',
        columns: ['cvId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cV',
        foreignKey: {
          name: 'cV_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cV',
        foreignKey: {
          name: 'cV_templateId_fkey',
          columns: ['templateId'],
          references: { schema: 'public', table: 'template', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cVAnalysis',
        foreignKey: {
          name: 'cVAnalysis_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cVAnalysis',
        foreignKey: {
          name: 'cVAnalysis_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'certification',
        foreignKey: {
          name: 'certification_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'education',
        foreignKey: {
          name: 'education_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'experience',
        foreignKey: {
          name: 'experience_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobDescription',
        foreignKey: {
          name: 'jobDescription_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobMatch',
        foreignKey: {
          name: 'jobMatch_jobDescriptionId_fkey',
          columns: ['jobDescriptionId'],
          references: { schema: 'public', table: 'jobDescription', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'language',
        foreignKey: {
          name: 'language_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'project',
        foreignKey: {
          name: 'project_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'skill',
        foreignKey: {
          name: 'skill_cvId_fkey',
          columns: ['cvId'],
          references: { schema: 'public', table: 'cV', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
