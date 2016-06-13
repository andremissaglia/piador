ALTER TABLE public.group 
  ADD CONSTRAINT key_grupo_nome_dono 
    UNIQUE (nome, dono);
ALTER TABLE groupuser
  ADD CONSTRAINT key_grupo_user_grupo 
    UNIQUE (userid, groupid),
  ADD CONSTRAINT fk_groupuser_grupo 
    FOREIGN KEY (groupid)
    REFERENCES public.group(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT fk_groupuser_user 
    FOREIGN KEY (userid)
    REFERENCES public.user(id)
    ON DELETE CASCADE;
ALTER TABLE follow 
  ADD CONSTRAINT fk_follow_user1 
    FOREIGN KEY (follower)
    REFERENCES public.user(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT fk_follow_user2 
    FOREIGN KEY (follows)
    REFERENCES public.user(id)
    ON DELETE CASCADE;
