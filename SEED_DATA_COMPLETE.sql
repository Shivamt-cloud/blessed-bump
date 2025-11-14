-- ============================================
-- Village Voice Community Seed Data
-- Complete SQL Script for Supabase
-- ============================================
-- 
-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Get your topic IDs: SELECT id, name, slug FROM topics;
-- 3. Replace all 'TOPIC_ID_*' placeholders with actual IDs
-- 4. Get a user ID: SELECT id FROM auth.users LIMIT 1;
-- 5. Replace 'SEED_USER_ID' with actual user ID (or create system user below)
-- 6. Run this script
--
-- ============================================

-- OPTIONAL: Create a system user for seed data
-- Uncomment and run this first if you want a dedicated system user
/*
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'community@blessedbump.in',
  crypt('seed_password_change_me', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "BlessedBump Community", "is_seed_user": true}'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (
  user_id,
  email,
  display_name,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'community@blessedbump.in',
  'BlessedBump Community',
  now(),
  now()
) ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================
-- PREGNANCY JOURNEY - Ask & Wonder (Questions)
-- ============================================
-- Replace 'TOPIC_ID_PREGNANCY' with actual topic ID

-- Thread 1
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'First trimester fatigue - is this normal?',
    'Hi everyone! I''m 8 weeks along and I''ve been feeling so exhausted lately. I can barely get through the day without needing a nap. Is this normal? When does the energy come back?',
    'question',
    'TOPIC_ID_PREGNANCY', -- REPLACE THIS
    'SEED_USER_ID', -- REPLACE THIS
    now() - interval '5 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Yes, this is completely normal! Your body is working overtime to create the placenta and support baby''s growth. The fatigue usually improves in the second trimester. Rest as much as you can - your body needs it! 💕', 'SEED_USER_ID', now() - interval '4 days'
FROM new_thread
UNION ALL
SELECT id, 'I felt the same way! I was napping 2-3 times a day in my first trimester. Around week 14-16, I started feeling more energetic. Listen to your body and rest when you need to!', 'SEED_USER_ID', now() - interval '3 days'
FROM new_thread;

-- Thread 2
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Morning sickness remedies that actually work?',
    'I''m 10 weeks and the nausea is really getting to me. I''ve tried ginger tea and crackers, but nothing seems to help much. What worked for you all?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '7 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Vitamin B6 and Unisom (doxylamine) worked wonders for me! Also, eating small snacks every 2 hours helped keep the nausea at bay. Sea bands (acupressure wristbands) helped too!', 'SEED_USER_ID', now() - interval '6 days'
FROM new_thread
UNION ALL
SELECT id, 'Cold foods helped me - smoothies, popsicles, cold fruit. Something about warm food made it worse. Also, don''t let your stomach get empty!', 'SEED_USER_ID', now() - interval '5 days'
FROM new_thread;

-- Thread 3
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When did you first feel baby move?',
    'I''m 18 weeks and haven''t felt anything yet. When did you all start feeling those first flutters? I''m getting anxious!',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '3 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'I felt my first flutters around 19 weeks! It felt like tiny bubbles or butterflies. Don''t worry - it''s different for everyone, especially first-time moms. You''ll feel it soon!', 'SEED_USER_ID', now() - interval '2 days'
FROM new_thread
UNION ALL
SELECT id, 'I was 20 weeks with my first! It''s totally normal to not feel anything until 18-22 weeks, especially if this is your first pregnancy. The placenta position can also affect when you feel movements.', 'SEED_USER_ID', now() - interval '1 day'
FROM new_thread;

-- Thread 4
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Safe exercises for second trimester?',
    'I''m 22 weeks and want to stay active. What exercises are safe? I used to run and do HIIT workouts, but I''m not sure what''s okay now.',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '6 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Walking, swimming, and prenatal yoga are all great! If you were active before, you can usually continue with modifications. Avoid anything that involves lying flat on your back after the first trimester. Always check with your doctor!', 'SEED_USER_ID', now() - interval '5 days'
FROM new_thread
UNION ALL
SELECT id, 'I switched from running to brisk walking and added prenatal yoga. It''s been perfect! Listen to your body and don''t push too hard. Stay hydrated!', 'SEED_USER_ID', now() - interval '4 days'
FROM new_thread;

-- Thread 5
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Can''t sleep - any tips?',
    'I''m 28 weeks and sleep is getting impossible. Between the frequent bathroom trips, back pain, and just being uncomfortable, I''m barely sleeping. Help!',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '4 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Pregnancy pillow was a game changer! Also, try sleeping on your left side with a pillow between your knees. Limit fluids 2 hours before bed to reduce bathroom trips. Warm baths before bed help too!', 'SEED_USER_ID', now() - interval '3 days'
FROM new_thread
UNION ALL
SELECT id, 'I use a U-shaped pregnancy pillow and it made such a difference! Also, try some gentle stretches before bed. The sleep gets better after baby arrives (eventually 😊).', 'SEED_USER_ID', now() - interval '2 days'
FROM new_thread;

-- Thread 6
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Weirdest pregnancy craving?',
    'I''ve been craving pickles with ice cream! What''s the weirdest thing you''ve craved during pregnancy?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '8 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Haha! I craved hot sauce on everything, even fruit! My husband thought I was crazy. The cravings are so real!', 'SEED_USER_ID', now() - interval '7 days'
FROM new_thread
UNION ALL
SELECT id, 'I wanted nothing but cold, crunchy things - ice, frozen grapes, cold cucumbers. The texture was everything!', 'SEED_USER_ID', now() - interval '6 days'
FROM new_thread;

-- Thread 7
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Preventing stretch marks - what works?',
    'I''m 24 weeks and starting to see some stretch marks. Is there anything I can do to minimize them?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '10 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Keeping your skin moisturized helps! I use cocoa butter and vitamin E oil daily. But honestly, genetics play a big role. They fade over time and are a beautiful reminder of this journey!', 'SEED_USER_ID', now() - interval '9 days'
FROM new_thread
UNION ALL
SELECT id, 'I''ve been using shea butter and staying hydrated. Some marks are inevitable, but keeping skin moisturized can help with elasticity. Remember, they''re your tiger stripes!', 'SEED_USER_ID', now() - interval '8 days'
FROM new_thread;

-- Thread 8
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Braxton Hicks vs real contractions?',
    'I''m 32 weeks and feeling tightening in my belly. How do I know if it''s Braxton Hicks or real labor?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '2 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Braxton Hicks are usually irregular and don''t get stronger. Real contractions get more frequent, longer, and stronger over time. If you''re unsure, call your doctor! Better safe than sorry.', 'SEED_USER_ID', now() - interval '1 day'
FROM new_thread
UNION ALL
SELECT id, 'Braxton Hicks often stop if you change positions or walk around. Real contractions continue and get more intense. When in doubt, always call your provider!', 'SEED_USER_ID', now() - interval '12 hours'
FROM new_thread;

-- Thread 9
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When did you switch to maternity clothes?',
    'I''m 16 weeks and my regular pants are getting tight. When did you all make the switch? Any favorite brands?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '9 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'I switched around 18 weeks! Maternity leggings are the best investment. So comfortable and you''ll wear them postpartum too. Don''t wait - comfort is everything!', 'SEED_USER_ID', now() - interval '8 days'
FROM new_thread
UNION ALL
SELECT id, 'I started wearing maternity jeans at 14 weeks - no shame! The stretchy panel is amazing. You''ll be so much more comfortable.', 'SEED_USER_ID', now() - interval '7 days'
FROM new_thread;

-- Thread 10
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Third trimester heartburn - help!',
    'I''m 30 weeks and the heartburn is unbearable. Tums help a little but not enough. Any suggestions?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '5 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Smaller, more frequent meals help! Also, avoid spicy and acidic foods. I sleep propped up on pillows. Talk to your doctor about safe antacids - some are pregnancy-safe!', 'SEED_USER_ID', now() - interval '4 days'
FROM new_thread
UNION ALL
SELECT id, 'I found that eating dinner earlier and staying upright for 2-3 hours after eating helped. Also, milk or almond milk can help neutralize the acid!', 'SEED_USER_ID', now() - interval '3 days'
FROM new_thread;

-- Thread 11
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Swelling in feet and ankles',
    'I''m 34 weeks and my feet are so swollen. Is this normal? Any tips to reduce swelling?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '11 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Yes, swelling is very common in the third trimester! Elevate your feet when possible, stay hydrated, and avoid standing for long periods. Compression socks can help too!', 'SEED_USER_ID', now() - interval '10 days'
FROM new_thread
UNION ALL
SELECT id, 'I found that putting my feet up and doing ankle circles helped. Also, try to avoid salty foods. The swelling usually goes down after delivery.', 'SEED_USER_ID', now() - interval '9 days'
FROM new_thread;

-- Thread 12
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Nesting instinct is real!',
    'I''m 35 weeks and suddenly I want to clean and organize everything! Is this normal?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '12 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Yes! The nesting instinct is totally normal. Your body is preparing for baby. Just don''t overdo it - rest when you need to!', 'SEED_USER_ID', now() - interval '11 days'
FROM new_thread
UNION ALL
SELECT id, 'I went through the same thing! I organized the entire house at 36 weeks. It''s your body''s way of preparing. Just pace yourself!', 'SEED_USER_ID', now() - interval '10 days'
FROM new_thread;

-- Thread 13
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Back pain in third trimester',
    'My lower back is killing me at 31 weeks. Any suggestions for relief?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '13 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Prenatal massage, warm baths, and gentle stretches help! Also, make sure you have good posture and supportive shoes. A belly support band can also help!', 'SEED_USER_ID', now() - interval '12 days'
FROM new_thread
UNION ALL
SELECT id, 'I found that cat-cow stretches and pelvic tilts really helped. Also, try sleeping with a pillow between your knees. Heat packs work wonders too!', 'SEED_USER_ID', now() - interval '11 days'
FROM new_thread;

-- Thread 14
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Hospital bag checklist?',
    'I''m 36 weeks and starting to pack my hospital bag. What should I definitely bring?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '14 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Comfortable clothes for you and baby, phone charger, snacks, lip balm, and your own pillow! Also bring your birth plan and insurance info.', 'SEED_USER_ID', now() - interval '13 days'
FROM new_thread
UNION ALL
SELECT id, 'Don''t forget comfy going-home outfit, nursing bras if planning to breastfeed, and something for baby to wear home. Pack it early - you never know!', 'SEED_USER_ID', now() - interval '12 days'
FROM new_thread;

-- Thread 15
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby''s position - head down?',
    'I''m 32 weeks and wondering when baby should be head down. When did your baby turn?',
    'question',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '15 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Most babies turn head down between 32-36 weeks. Some don''t until later. Your doctor will check at appointments. There are exercises that can help encourage baby to turn!', 'SEED_USER_ID', now() - interval '14 days'
FROM new_thread
UNION ALL
SELECT id, 'My baby turned at 34 weeks! Don''t worry if it hasn''t happened yet - there''s still time. Your provider will monitor the position.', 'SEED_USER_ID', now() - interval '13 days'
FROM new_thread;

-- ============================================
-- PREGNANCY JOURNEY - Share & Uplift (Celebrations)
-- ============================================

-- Thread 16
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Saw baby''s heartbeat today! 💓',
    'Just had my first ultrasound at 8 weeks and saw the heartbeat! I''m so emotional and happy. This is really happening!',
    'feedback',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '6 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Congratulations! That first heartbeat is so magical. Enjoy every moment of this journey! 💕', 'SEED_USER_ID', now() - interval '5 days'
FROM new_thread
UNION ALL
SELECT id, 'Aww, that''s amazing! The first ultrasound is such a special moment. So happy for you!', 'SEED_USER_ID', now() - interval '4 days'
FROM new_thread;

-- Thread 17
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'It''s a girl! 🌸',
    'Found out today we''re having a baby girl! I''m over the moon. Can''t wait to meet our little princess!',
    'feedback',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '4 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Congratulations! Little girls are so special. Enjoy shopping for all the cute outfits!', 'SEED_USER_ID', now() - interval '3 days'
FROM new_thread
UNION ALL
SELECT id, 'Yay! So exciting! Girls are amazing. Wishing you a healthy and happy pregnancy!', 'SEED_USER_ID', now() - interval '2 days'
FROM new_thread;

-- Thread 18
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Felt baby kick for the first time!',
    'Just felt my first real kick at 20 weeks! It was the most amazing feeling. My partner felt it too and we both cried happy tears!',
    'feedback',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '3 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'That''s such a beautiful moment! Feeling those kicks is one of the best parts of pregnancy. Enjoy every flutter!', 'SEED_USER_ID', now() - interval '2 days'
FROM new_thread
UNION ALL
SELECT id, 'Aww, that''s so special! The kicks will get stronger and more frequent. It''s such a magical connection!', 'SEED_USER_ID', now() - interval '1 day'
FROM new_thread;

-- Thread 19
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Baby shower was perfect!',
    'Had my baby shower yesterday and it was everything I dreamed of. So much love and support from family and friends. Feeling so blessed!',
    'feedback',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '8 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'So happy for you! Baby showers are such a special celebration. Enjoy all the love and support!', 'SEED_USER_ID', now() - interval '7 days'
FROM new_thread
UNION ALL
SELECT id, 'That sounds wonderful! It''s so nice to feel all that love and support. You''re going to be an amazing mom!', 'SEED_USER_ID', now() - interval '6 days'
FROM new_thread;

-- Thread 20
WITH new_thread AS (
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Made it to third trimester! 🎉',
    'Just hit 28 weeks and officially in the third trimester! Can''t believe we''re in the home stretch. So excited to meet our little one!',
    'feedback',
    'TOPIC_ID_PREGNANCY',
    'SEED_USER_ID',
    now() - interval '2 days'
  )
  RETURNING id
)
INSERT INTO posts (thread_id, body, author_id, created_at)
SELECT id, 'Congratulations! You''re in the home stretch now. The final trimester goes by so fast. You''ve got this!', 'SEED_USER_ID', now() - interval '1 day'
FROM new_thread
UNION ALL
SELECT id, 'Yay! Third trimester is exciting. You''re so close to meeting your baby! Enjoy these last weeks!', 'SEED_USER_ID', now() - interval '12 hours'
FROM new_thread;

-- Continue with more threads for other topics...
-- (I'll create separate files for each topic to keep it manageable)

