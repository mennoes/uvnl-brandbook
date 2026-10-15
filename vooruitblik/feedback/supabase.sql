-- Feedback & reacties voor De Vooruitblik — plak dit in Supabase: SQL Editor → New query → Run.

create table if not exists public.comments (
  id         bigint generated always as identity primary key,
  page       text        not null check (char_length(page) between 1 and 200),
  name       text                 check (name is null or char_length(name) <= 60),
  body       text        not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now(),
  -- pins op een exacte plek (leeg = algemene reactie) en antwoorden (parent_id = de eerste reactie van de pin)
  sel        text                 check (sel is null or char_length(sel) <= 600),
  ox         real,
  oy         real,
  xp         real,
  yp         real,
  parent_id  bigint               references public.comments (id) on delete cascade
);

-- Had je het eerdere schema al uitgevoerd? Voer dan deze regels uit om pins toe te voegen:
alter table public.comments add column if not exists sel text check (sel is null or char_length(sel) <= 600);
alter table public.comments add column if not exists ox real;
alter table public.comments add column if not exists oy real;
alter table public.comments add column if not exists xp real;
alter table public.comments add column if not exists yp real;
alter table public.comments add column if not exists parent_id bigint references public.comments (id) on delete cascade;

create index if not exists comments_page_created_idx on public.comments (page, created_at desc);

-- Row Level Security: bezoekers (rol "anon") mogen alleen lezen en toevoegen.
-- Wijzigen en verwijderen kan niet via de website; dat doe je zelf in het Supabase-dashboard.
alter table public.comments enable row level security;

drop policy if exists "iedereen mag lezen"    on public.comments;
drop policy if exists "iedereen mag plaatsen" on public.comments;
create policy "iedereen mag lezen"    on public.comments for select to anon using (true);
create policy "iedereen mag plaatsen" on public.comments for insert to anon with check (true);

grant select, insert on public.comments to anon;
