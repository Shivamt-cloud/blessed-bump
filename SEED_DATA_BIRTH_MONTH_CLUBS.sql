-- ============================================
-- Village Voice Community Seed Data - BIRTH MONTH CLUBS
-- This script automatically finds topic ID and user ID
-- ============================================
-- 
-- INSTRUCTIONS:
-- Just run this entire script - no replacements needed!
-- It will automatically find the 'birth-month-clubs' topic and use the first available user
-- ============================================

DO $$
DECLARE
  topic_birth_month_id UUID;
  seed_user_id UUID;
  new_thread_id UUID;
BEGIN
  -- Get topic ID automatically
  SELECT id INTO topic_birth_month_id FROM topics WHERE slug = 'birth-month-clubs' LIMIT 1;
  
  -- Get the first available user ID automatically
  SELECT id INTO seed_user_id FROM auth.users ORDER BY created_at LIMIT 1;

  -- Check if we have the topic
  IF topic_birth_month_id IS NULL THEN
    RAISE EXCEPTION 'Birth Month Clubs topic not found. Please check your topics table.';
  END IF;

  -- Check if we have a user
  IF seed_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found in auth.users. Please create a user account first.';
  END IF;

  RAISE NOTICE 'Using user ID: %', seed_user_id;
  RAISE NOTICE 'Birth Month Clubs topic ID: %', topic_birth_month_id;

  -- ============================================
  -- BIRTH MONTH CLUBS - Ask & Wonder (Questions)
  -- ============================================

  -- Thread 1: January babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'January 2024 babies - who else?',
    'Anyone else due in January 2024? Let''s connect and share our journey! I''m due January 15th with my first.',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '10 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I''m due January 8th! So excited to connect with other January mamas. How are you feeling?', NOW() - INTERVAL '9 days'),
    (new_thread_id, seed_user_id, 'January 22nd here! First baby too. The holidays are going to be interesting this year!', NOW() - INTERVAL '8 days'),
    (new_thread_id, seed_user_id, 'January 3rd - starting the year with a baby! Can''t wait to meet our little one.', NOW() - INTERVAL '7 days');

  -- Thread 2: February babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'February 2024 birth month club',
    'Looking for other February 2024 mamas! I''m due February 10th. Let''s support each other through these final weeks!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '8 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'February 14th here - Valentine''s Day baby! So romantic. How are you all preparing?', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'February 5th! Getting so close now. Hospital bag is packed and ready to go!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'February 20th - second baby for me. Excited but nervous about managing two!', NOW() - INTERVAL '5 days');

  -- Thread 3: March babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'March 2024 babies unite!',
    'March 2024 mamas - how are we all doing? I''m 32 weeks and starting to feel the countdown!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'March 8th here! Spring baby. The nursery is almost done and I''m so excited!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'March 15th - Ides of March baby! First time mom and getting nervous but excited.', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'March 25th! Third trimester is hitting hard but we''re almost there!', NOW() - INTERVAL '4 days');

  -- Thread 4: April babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'April 2024 birth month club',
    'April showers bring... babies! Anyone else due in April? I''m due April 12th.',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'April 1st - April Fool''s baby! Hope they don''t come early and make us think it''s a joke!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'April 18th here! Spring baby, perfect timing for nice weather walks with the stroller.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'April 30th - last day of April! Second baby, so excited to complete our family.', NOW() - INTERVAL '3 days');

  -- Thread 5: May babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'May 2024 mamas - where are you?',
    'May babies unite! I''m due May 5th (Cinco de Mayo baby!). Let''s connect!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'May 15th here! Perfect spring weather for bringing baby home. So excited!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'May 22nd - Memorial Day weekend baby potentially! First time mom, nervous but ready.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'May 8th! Mother''s Day might be extra special this year if baby comes on time!', NOW() - INTERVAL '2 days');

  -- Thread 6: June babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'June 2024 summer babies!',
    'June 2024 mamas - we''re having summer babies! I''m due June 20th. Who else?',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '9 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'June 1st - first day of summer! Perfect timing for outdoor activities with baby.', NOW() - INTERVAL '8 days'),
    (new_thread_id, seed_user_id, 'June 15th here! Summer baby means lots of cute summer outfits. Can''t wait!', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'June 30th - last day of June! Third baby, so this will be interesting!', NOW() - INTERVAL '6 days');

  -- Thread 7: July babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'July 2024 birth month club',
    'July 2024 babies! I''m due July 4th - Independence Day baby! Anyone else?',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '8 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'July 10th here! Mid-summer baby. The heat is going to be interesting while pregnant!', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'July 20th! Summer baby means lots of pool time and outdoor adventures. So excited!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'July 31st - end of July! First baby, can''t wait to meet our little one.', NOW() - INTERVAL '5 days');

  -- Thread 8: August babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'August 2024 mamas connect here!',
    'August 2024 birth month club! I''m due August 15th. Let''s share our experiences!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'August 1st! Late summer baby. Perfect timing before school starts for older siblings.', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'August 25th here! Second baby, so excited to see how big sibling reacts!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'August 10th! Summer baby means lots of cute summer photos. Can''t wait!', NOW() - INTERVAL '4 days');

  -- Thread 9: September babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'September 2024 babies!',
    'September 2024 birth month club! I''m due September 5th. Fall baby coming!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'September 15th here! Perfect fall weather for bringing baby home. So excited!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'September 22nd - first day of fall! Autumn baby, perfect for cozy newborn snuggles.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'September 1st! Labor Day baby potentially! First time mom, nervous but ready.', NOW() - INTERVAL '3 days');

  -- Thread 10: October babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'October 2024 spooky season babies!',
    'October 2024 mamas! Halloween babies potentially! I''m due October 18th. Who else?',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'October 31st - Halloween baby! That would be so fun. First baby, can''t wait!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'October 10th here! Fall baby, perfect for pumpkin patch photos next year!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'October 25th! Second baby, so excited to complete our family this fall.', NOW() - INTERVAL '2 days');

  -- Thread 11: November babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'November 2024 birth month club',
    'November 2024 babies! I''m due November 12th. Thanksgiving baby potentially!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'November 1st! Fall baby, perfect timing. First time mom, so excited!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'November 25th - Thanksgiving baby! That would be the best Thanksgiving ever!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'November 15th here! Second baby, nervous about managing two but excited!', NOW() - INTERVAL '1 day');

  -- Thread 12: December babies
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'December 2024 holiday babies!',
    'December 2024 mamas! Holiday season babies! I''m due December 15th. Let''s connect!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'December 25th - Christmas baby! That would be the best Christmas present ever!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'December 10th here! Holiday baby, perfect for festive newborn photos.', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'December 31st - New Year''s Eve baby! What a way to end the year!', NOW() - INTERVAL '12 hours');

  -- Thread 13: Planning meetups
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Anyone interested in local meetups?',
    'Would anyone be interested in organizing local meetups for our birth month club? I think it would be great to connect in person once babies arrive!',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That sounds amazing! I''d love to meet other mamas in my area. Maybe we could do park meetups once weather is nice?', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Great idea! Virtual meetups could work too for those far apart. Support is so important!', NOW() - INTERVAL '3 days');

  -- Thread 14: Sharing milestones
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Share your birth stories!',
    'For those who have already given birth, let''s share our birth stories! It''s so helpful to hear different experiences.',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I had a beautiful water birth at 39 weeks. It was intense but so empowering! Would do it again.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'Emergency C-section at 37 weeks due to preeclampsia. Scary but baby and I are both healthy! Every birth story is valid.', NOW() - INTERVAL '2 days');

  -- Thread 15: Baby name ideas
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby name ideas for our birth month',
    'Anyone want to share baby name ideas? I''m struggling to decide! Looking for something unique but not too out there.',
    'question',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'We''re going with nature-inspired names! Thinking River for a boy or Sage for a girl. What are your thoughts?', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'We''re keeping it a surprise! But I love classic names with a modern twist. So many options!', NOW() - INTERVAL '4 days');

  -- ============================================
  -- BIRTH MONTH CLUBS - Share & Uplift (Feedback)
  -- ============================================

  -- Thread 16: Baby arrived!
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby arrived early!',
    'My baby came 2 weeks early! Born healthy and perfect. So grateful for this birth month club support during pregnancy!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '2 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Congratulations! So happy for you and your little one. Enjoy these precious newborn days!', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'Amazing news! Wishing you all the best. Can''t wait for my turn!', NOW() - INTERVAL '12 hours');

  -- Thread 17: First month celebration
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby is one month old!',
    'Can''t believe my baby is already one month old! This birth month club has been such a great support. Thank you all!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Time flies! So happy you found support here. The first month is such a whirlwind!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Congratulations on making it through the first month! You''re doing amazing!', NOW() - INTERVAL '1 day');

  -- Thread 18: Birth month meetup success
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Had our first meetup!',
    'We organized a local meetup for our birth month club and it was amazing! So great to connect with other mamas in person.',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That sounds wonderful! I wish I could have made it. Maybe next time!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'So happy it went well! These connections are so valuable. Can''t wait for the next one!', NOW() - INTERVAL '2 days');

  -- Thread 19: Supporting each other
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Grateful for this community',
    'Just wanted to say how grateful I am for this birth month club. The support and advice has been invaluable during this journey!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I feel the same way! Having this community makes such a difference. We''re all in this together!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Absolutely! The support here is amazing. So glad we have each other!', NOW() - INTERVAL '3 days');

  -- Thread 20: Baby''s first holiday
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby''s first holiday season!',
    'My baby was born right before the holidays and it made everything so special! First holiday season with our little one.',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'How special! Holidays with a newborn are magical. Enjoy every moment!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'So beautiful! Those first holidays are unforgettable. Congratulations!', NOW() - INTERVAL '4 days');

  -- Thread 21: Birth month birthday planning
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Planning first birthday party!',
    'Can''t believe we''re already planning first birthday parties! Our birth month babies are growing up so fast!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Time really does fly! First birthdays are so special. Enjoy planning!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'I can''t believe it''s been a year already! So excited to celebrate with our birth month club!', NOW() - INTERVAL '5 days');

  -- Thread 22: Milestone sharing
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Share your baby milestones!',
    'Let''s share what milestones our birth month babies are hitting! My little one just started crawling!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Mine just said their first word! "Mama" - best sound ever!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Mine is pulling up to stand! They grow so fast. It''s amazing to watch!', NOW() - INTERVAL '1 day');

  -- Thread 23: Photo sharing
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Birth month baby photos!',
    'Anyone want to share photos of our birth month babies? I love seeing how they''re all growing!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Great idea! It''s so fun to see all our babies growing together. They''re all so beautiful!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I love this! Our birth month club babies are the cutest!', NOW() - INTERVAL '2 days');

  -- Thread 24: Advice for new mamas
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Advice for new birth month mamas',
    'For those just joining or still pregnant - you''ve got this! The birth month club is here to support you every step of the way!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Thank you! This community means so much. Excited to be on this journey with you all!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'So grateful for the support! It really does take a village.', NOW() - INTERVAL '3 days');

  -- Thread 25: Birth month traditions
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Creating birth month traditions',
    'Anyone else creating special traditions for their birth month? I''m thinking of doing a monthly photo with the same outfit to track growth!',
    'feedback',
    topic_birth_month_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Love that idea! I''m doing monthly milestone photos with a cute sign. So fun to look back!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'We''re doing a time capsule for the first year! Such a special way to remember this time.', NOW() - INTERVAL '4 days');

  RAISE NOTICE 'Successfully inserted 25 Birth Month Clubs conversations!';
END $$;

