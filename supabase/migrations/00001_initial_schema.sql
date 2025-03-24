-- Create extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  full_name text,
  avatar_url text,
  department text,
  role text,
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create issues table
create table if not exists public.issues (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status text default 'Open',
  priority text default 'Medium',
  assignee text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert sample data for testing
insert into public.users (email, full_name, department, role) values
('admin@schoolgle.com', 'Admin User', 'IT', 'Admin'),
('teacher@schoolgle.com', 'Teacher User', 'Teaching', 'Teacher'),
('staff@schoolgle.com', 'Staff User', 'Maintenance', 'Staff');

insert into public.issues (title, description, status, priority, assignee) values
('Broken Window in Room 204', 'Window needs immediate repair', 'Open', 'High', 'Maintenance Team'),
('Flickering Lights in Hallway', 'Lights in main hallway need checking', 'In Progress', 'Medium', 'Electrical Team'),
('Leaking Tap in Staff Room', 'Kitchen tap is dripping constantly', 'Open', 'Low', 'Plumbing Team');