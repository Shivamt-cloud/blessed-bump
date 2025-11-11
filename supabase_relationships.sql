-- Connect threads.author_id → profiles.user_id
alter table public.threads
  add constraint threads_author_id_fkey
  foreign key (author_id)
  references public.profiles(user_id);

-- Connect posts.author_id → profiles.user_id
alter table public.posts
  add constraint posts_author_id_fkey
  foreign key (author_id)
  references public.profiles(user_id);

