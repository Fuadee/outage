create type outage_job_status as enum (
  'DRAFT',
  'CENTER_CONFIRMED',
  'DOC_GENERATED',
  'APPROVED',
  'POSTED',
  'ON_SITE',
  'COMPLETED'
);

create table if not exists job_area_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists outage_jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status outage_job_status not null default 'DRAFT',
  area_group text not null,
  start_time timestamptz,
  end_time timestamptz,
  created_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

create table if not exists job_time_windows (
  id uuid primary key default gen_random_uuid(),
  outage_job_id uuid not null references outage_jobs(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz not null
);

create table if not exists job_documents (
  id uuid primary key default gen_random_uuid(),
  outage_job_id uuid not null references outage_jobs(id) on delete cascade,
  file_url text not null,
  created_at timestamptz default now()
);

create table if not exists job_posts (
  id uuid primary key default gen_random_uuid(),
  outage_job_id uuid not null references outage_jobs(id) on delete cascade,
  channel text not null,
  posted_at timestamptz
);

create table if not exists job_logs (
  id uuid primary key default gen_random_uuid(),
  outage_job_id uuid not null references outage_jobs(id) on delete cascade,
  message text not null,
  created_at timestamptz default now(),
  created_by uuid references auth.users(id)
);
