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
ALTER TABLE reactions 
  ADD CONSTRAINT key_reaction_user_tweet 
    UNIQUE ("user", tweet),
  ADD CONSTRAINT fk_reaction_tweet 
    FOREIGN KEY (tweet)
    REFERENCES public.tweet(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT fk_reaction_user 
    FOREIGN KEY ("user")
    REFERENCES public.user(id)
    ON DELETE CASCADE;
ALTER TABLE share 
  ADD CONSTRAINT fk_share_tweet 
    FOREIGN KEY (tweet)
    REFERENCES public.tweet(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT fk_share_user 
    FOREIGN KEY ("user")
    REFERENCES public.user(id)
    ON DELETE CASCADE;
ALTER TABLE theme_posts__tweet_themes 
  ADD CONSTRAINT fk_theme_tweet_tweet
    FOREIGN KEY (tweet_themes)
    REFERENCES public.tweet(id)
    ON DELETE CASCADE,
  ADD CONSTRAINT fk_theme_tweet_theme
    FOREIGN KEY (theme_posts)
    REFERENCES public.theme(id)
    ON DELETE CASCADE;
CREATE OR REPLACE FUNCTION update_reactions ()
  RETURNS TRIGGER AS $$
  BEGIN
    UPDATE tweet
      SET reaction = 
        reaction + 
        (CASE WHEN TG_OP = 'DELETE' THEN 0 ELSE NEW.reaction END) -
        (CASE WHEN TG_OP = 'INSERT' THEN 0 ELSE OLD.reaction END)
      WHERE id = (CASE WHEN TG_OP = 'DELETE' THEN OLD.tweet ELSE NEW.tweet END);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
CREATE TRIGGER update_reactions_trigger 
  AFTER INSERT OR UPDATE OR DELETE ON reactions
  FOR EACH ROW EXECUTE PROCEDURE update_reactions();