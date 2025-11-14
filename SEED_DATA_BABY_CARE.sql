-- ============================================
-- Village Voice Community Seed Data - BABY CARE
-- This script automatically finds topic ID and user ID
-- ============================================
-- 
-- INSTRUCTIONS:
-- Just run this entire script - no replacements needed!
-- It will automatically find the 'baby-care' topic and use the first available user
-- ============================================

DO $$
DECLARE
  topic_baby_care_id UUID;
  seed_user_id UUID;
  new_thread_id UUID;
BEGIN
  -- Get topic ID automatically
  SELECT id INTO topic_baby_care_id FROM topics WHERE slug = 'baby-care' LIMIT 1;
  
  -- Get the first available user ID automatically
  SELECT id INTO seed_user_id FROM auth.users ORDER BY created_at LIMIT 1;

  -- Check if we have the topic
  IF topic_baby_care_id IS NULL THEN
    RAISE EXCEPTION 'Baby Care topic not found. Please check your topics table.';
  END IF;

  -- Check if we have a user
  IF seed_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found in auth.users. Please create a user account first.';
  END IF;

  RAISE NOTICE 'Using user ID: %', seed_user_id;
  RAISE NOTICE 'Baby Care topic ID: %', topic_baby_care_id;

  -- ============================================
  -- BABY CARE - Ask & Wonder (Questions)
  -- ============================================

  -- Thread 1: Newborn sleep schedule
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Newborn sleep schedule - help!',
    'My 3-week-old baby sleeps all day and is awake all night. How do I help establish a better sleep schedule? I''m exhausted!',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'This is so normal! Newborns have their days and nights mixed up. Try keeping it bright and noisy during the day, and dark and quiet at night. It takes time but they''ll adjust!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'I had the same issue! What helped was exposing baby to natural light during the day and keeping night feeds quiet and dark. It took about 6 weeks but it worked!', NOW() - INTERVAL '3 days');

  -- Thread 2: Diaper rash solutions
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Diaper rash won''t go away',
    'My 2-month-old has had diaper rash for a week now. I''ve tried diaper cream but it''s not helping. Any suggestions?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Try letting baby have diaper-free time for 15-20 minutes a few times a day. Air helps heal it! Also, make sure you''re changing diapers frequently and using a barrier cream with zinc oxide.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I found that switching diaper brands helped! Some babies are sensitive to certain materials. Also, pat dry instead of wiping when possible. If it persists, check with your pediatrician.', NOW() - INTERVAL '2 days');

  -- Thread 3: Feeding schedule
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'How often should I feed my newborn?',
    'First-time mom here! My baby is 2 weeks old and I''m confused about feeding schedules. Should I feed on demand or on a schedule?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'For newborns, feed on demand! They need to eat every 2-3 hours (sometimes more). Watch for hunger cues like rooting, sucking motions, or bringing hands to mouth. Your baby will let you know!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'On demand is best for newborns. They''re growing so fast and need frequent feeds. As they get older (around 3-4 months), you might notice a more predictable pattern emerge naturally.', NOW() - INTERVAL '4 days');

  -- Thread 4: Colic and crying
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby cries for hours every evening',
    'My 6-week-old cries inconsolably every evening from 6-10 PM. Nothing seems to help. Is this colic? What can I do?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'This sounds like the "witching hour" or colic. Try the 5 S''s: swaddle, side/stomach position, shush, swing, and suck. White noise and babywearing also help. It usually peaks around 6-8 weeks and improves by 3-4 months.', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'I went through this too! What helped was a warm bath, gentle massage, and going for a walk in the stroller. Sometimes they just need to cry it out. Remember, this phase will pass!', NOW() - INTERVAL '1 day');

  -- Thread 5: Bathing frequency
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'How often should I bathe my baby?',
    'My baby is 1 month old. How often should I give baths? I''ve heard different things - daily, every few days?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'For newborns, 2-3 times a week is plenty! Too much bathing can dry out their sensitive skin. Just make sure to clean the diaper area well at each change. Sponge baths work great too!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'I bathe my baby every other day. Daily baths aren''t necessary and can strip natural oils. Focus on keeping the face, neck, and diaper area clean between baths.', NOW() - INTERVAL '5 days');

  -- Thread 6: Baby wearing
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Best baby carrier for newborns?',
    'I want to start babywearing but there are so many options! What carrier works best for a 2-month-old?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'For newborns, I love stretchy wraps like the Boba or Moby! They''re soft and supportive. Once baby has head control (around 4 months), structured carriers like Ergobaby or Tula are great.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'I used a ring sling for the first few months - so versatile and easy to adjust. Make sure baby''s face is visible and their chin is off their chest. Babywearing is amazing for bonding!', NOW() - INTERVAL '3 days');

  -- Thread 7: Tummy time
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby hates tummy time',
    'My 3-month-old screams every time I put them on their tummy. How do I make tummy time more enjoyable?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Start with very short sessions - even 30 seconds counts! Do it after diaper changes when they''re alert. Get down on the floor with them, use a mirror or toys to distract. It gets better!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'Try tummy time on your chest first - they love seeing your face! Also, a rolled towel under their chest can help. Start with 1-2 minutes and gradually increase. Consistency is key!', NOW() - INTERVAL '2 days');

  -- Thread 8: Teething
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Teething symptoms at 4 months?',
    'My baby is drooling a lot, chewing on everything, and seems fussy. Could they be teething already?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Yes, teething can start as early as 3-4 months! Cold teethers, wet washcloths, or silicone teething toys can help. Some babies also like gentle gum massage. The first tooth usually appears around 6 months.', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'My baby started showing signs at 4 months but didn''t get the first tooth until 6 months. The drooling and chewing can last a while! Frozen fruit in a mesh feeder is great for older babies.', NOW() - INTERVAL '4 days');

  -- Thread 9: Sleep regression
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    '4-month sleep regression is killing me',
    'My baby was sleeping 6-hour stretches and now at 4 months, they''re waking every 2 hours again. Is this normal?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Yes, the 4-month sleep regression is very real! It''s due to developmental changes. Stick to your routine, be consistent, and know it''s temporary. Most babies get through it in 2-6 weeks.', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'I''m going through this too! It''s exhausting but normal. Their sleep cycles are maturing. Try to maintain bedtime routine and be patient. This too shall pass!', NOW() - INTERVAL '1 day');

  -- Thread 10: Introducing solids
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When to start baby food?',
    'My baby is 5 months and showing interest in our food. When should I start introducing solids?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Most babies are ready around 6 months when they can sit up with support and have good head control. Look for signs like sitting up, reaching for food, and loss of tongue-thrust reflex. Start with single-ingredient purees!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'The AAP recommends starting around 6 months. Iron-fortified cereal, pureed fruits and veggies are great first foods. Go slow and introduce one new food at a time to watch for allergies.', NOW() - INTERVAL '3 days');

  -- Thread 11: Baby milestones
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby not rolling over yet',
    'My baby is 6 months and hasn''t rolled over yet. Should I be worried?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Babies develop at their own pace! Rolling typically happens between 4-6 months, but some babies skip it entirely and go straight to sitting or crawling. If you''re concerned, mention it at your next pediatrician visit.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'My baby didn''t roll until 7 months and is now crawling at 9 months! Every baby is different. Keep encouraging tummy time and they''ll get there when they''re ready.', NOW() - INTERVAL '2 days');

  -- Thread 12: Baby proofing
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When to start baby proofing?',
    'My baby is starting to crawl. What should I baby proof first?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Start now! Cover electrical outlets, secure furniture to walls, put safety gates on stairs, lock cabinets with cleaning supplies, and remove small objects from reach. Get down on their level to see what they can access!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'Priority: outlets, stairs, sharp corners, and anything they can pull down. Don''t forget to anchor heavy furniture like dressers and TVs. It''s better to be safe than sorry!', NOW() - INTERVAL '4 days');

  -- Thread 13: Separation anxiety
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby cries when I leave the room',
    'My 8-month-old screams every time I leave the room, even for a second. Is this separation anxiety?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Yes, this is classic separation anxiety! It usually peaks around 8-10 months. Try peek-a-boo games, practice short separations, and always say goodbye (don''t sneak away). It''s a sign of healthy attachment!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'This is totally normal! My baby went through this too. I found that talking to them from another room helped, and making sure they could see me or hear my voice. It gets better!', NOW() - INTERVAL '1 day');

  -- Thread 14: Sleep training
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Sleep training methods - what worked for you?',
    'My 6-month-old still needs to be rocked to sleep and wakes multiple times at night. I''m considering sleep training but there are so many methods. What worked?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'We did a gentle method - putting baby down drowsy but awake and checking in at increasing intervals. It took about a week but worked! Every family is different - choose what feels right for you.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'I tried the "pick up, put down" method - it was gentler than full CIO. Consistency is key whatever method you choose. Make sure baby is healthy and old enough (usually 4-6 months minimum).', NOW() - INTERVAL '3 days');

  -- Thread 15: Baby''s first cold
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby has first cold - what to do?',
    'My 3-month-old has their first cold - stuffy nose and slight fever. What can I do to help?',
    'question',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Saline drops and a bulb syringe can help clear the nose. Use a cool-mist humidifier in their room. Keep them hydrated with frequent feeds. If fever is over 100.4°F or they seem very unwell, call your pediatrician!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'Elevate the head of their mattress slightly (safely), run a steamy shower and sit in the bathroom, and lots of cuddles! Most colds resolve in 7-10 days. Watch for signs of difficulty breathing.', NOW() - INTERVAL '2 days');

  -- ============================================
  -- BABY CARE - Share & Uplift (Feedback)
  -- ============================================

  -- Thread 16: First smile
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby smiled for the first time! 😊',
    'My 6-week-old just gave me their first real smile today! I cried happy tears. This is the best feeling in the world!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '2 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Aww, congratulations! Those first smiles are magical! It only gets better from here. Enjoy every moment! 💕', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'So special! The first real smile is such a milestone. You''re doing an amazing job, mama!', NOW() - INTERVAL '12 hours');

  -- Thread 17: Sleeping through the night
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby slept 8 hours straight!',
    'My 5-month-old just slept through the night for the first time! I feel like a new person. There is hope!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Yay! That first full night is amazing! Enjoy the rest - you''ve earned it!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'So happy for you! Those full nights make such a difference. Here''s to many more!', NOW() - INTERVAL '1 day');

  -- Thread 18: First laugh
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Heard baby''s first laugh today!',
    'My 4-month-old laughed for the first time and I''m still smiling! It was the cutest sound I''ve ever heard.',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Baby laughs are the best! Nothing compares to that sound. So happy for you!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'Aww, that''s so precious! Those giggles are pure joy. Enjoy every moment!', NOW() - INTERVAL '2 days');

  -- Thread 19: First tooth
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'First tooth appeared!',
    'My 6-month-old''s first tooth just came through! After weeks of teething, it''s finally here. So proud!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Congratulations! That first tooth is such a milestone. The teething journey continues but you''ve got this!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Yay! The first tooth is so exciting. Get ready for lots more to come!', NOW() - INTERVAL '3 days');

  -- Thread 20: Crawling milestone
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby started crawling today!',
    'My 8-month-old just crawled for the first time! I''m so proud but also terrified - time to baby proof everything!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Amazing milestone! Yes, definitely time to baby proof. They move so fast once they start!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'So exciting! The crawling phase is fun but exhausting. Enjoy watching them explore!', NOW() - INTERVAL '4 days');

  -- Thread 21: First word
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby said "mama"!',
    'My 10-month-old just said "mama" for the first time and I melted! Best sound ever!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Aww, that''s so special! Hearing "mama" for the first time is unforgettable. So happy for you!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Congratulations! Those first words are magical. More words are coming soon!', NOW() - INTERVAL '1 day');

  -- Thread 22: Weaning success
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Successfully weaned from night feeds',
    'After weeks of gradual weaning, my 9-month-old is finally sleeping through without night feeds. I''m so proud of us both!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s a huge accomplishment! Enjoy those full nights of sleep. You both did great!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'So happy for you! Weaning can be challenging but you made it through. Well done!', NOW() - INTERVAL '2 days');

  -- Thread 23: First steps
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby took first steps!',
    'My 11-month-old just took their first steps today! I can''t believe how fast they''re growing up.',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Amazing! Those first steps are so exciting. Get ready for lots of walking practice!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Congratulations! Walking is such a big milestone. They''ll be running before you know it!', NOW() - INTERVAL '3 days');

  -- Thread 24: Sleep routine success
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Bedtime routine finally working!',
    'After weeks of struggle, our bedtime routine is finally working! Baby goes down without a fight. Consistency really pays off!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '2 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s wonderful! A good bedtime routine is a game changer. So happy it''s working for you!', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'Consistency is key! So glad you found what works. Enjoy those peaceful bedtimes!', NOW() - INTERVAL '12 hours');

  -- Thread 25: Baby''s first birthday
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Celebrating baby''s first birthday!',
    'My baby turns 1 tomorrow! I can''t believe how fast this year went. So grateful for this amazing journey!',
    'feedback',
    topic_baby_care_id,
    seed_user_id,
    NOW() - INTERVAL '1 day'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Happy early birthday to your little one! The first year is so special. Enjoy celebrating!', NOW() - INTERVAL '12 hours'),
    (new_thread_id, seed_user_id, 'Congratulations on making it through the first year! It''s such a milestone. Have a wonderful celebration!', NOW() - INTERVAL '6 hours');

  RAISE NOTICE 'Successfully inserted 25 Baby Care conversations!';
END $$;

