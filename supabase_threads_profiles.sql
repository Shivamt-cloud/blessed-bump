alter table threads
  add constraint threads_author_id_fkey foreign key (author_id) references auth.users(id);

create view threads_with_profiles as
select
  t.*, p.display_name, p.baby_nickname, p.avatar_url
from threads t
left join profiles p on p.user_id = t.author_id;

