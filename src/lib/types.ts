export const STATUSES = [
  "DRAFT",
  "CENTER_CONFIRMED",
  "DOC_GENERATED",
  "APPROVED",
  "POSTED",
  "ON_SITE",
  "COMPLETED"
] as const;

export type JobStatus = (typeof STATUSES)[number];

const STATUS_SET = new Set<string>(STATUSES);

export const isJobStatus = (value: unknown): value is JobStatus =>
  typeof value === "string" && STATUS_SET.has(value);

export const ROLES = ["admin", "dispatcher", "supervisor", "onsite"] as const;

export type UserRole = (typeof ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrator",
  dispatcher: "Dispatcher",
  supervisor: "Supervisor",
  onsite: "Onsite"
};

export type OutageJob = {
  id: string;
  title: string;
  status: JobStatus;
  area_group: string;
  start_time: string | null;
  end_time: string | null;
  created_at: string;
};

export type JobAreaGroup = {
  id: string;
  name: string;
  description?: string | null;
};

export type JobTimeWindow = {
  id: string;
  outage_job_id: string;
  start_time: string;
  end_time: string;
};

export type JobDocument = {
  id: string;
  outage_job_id: string;
  file_url: string;
  created_at: string;
};

export type JobPost = {
  id: string;
  outage_job_id: string;
  channel: string;
  posted_at: string | null;
};

export type JobLog = {
  id: string;
  outage_job_id: string;
  message: string;
  created_at: string;
  created_by: string;
};
