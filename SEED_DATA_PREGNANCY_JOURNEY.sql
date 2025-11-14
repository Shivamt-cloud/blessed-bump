-- Seed Data for Pregnancy Journey Topic
-- Replace 'TOPIC_ID_PREGNANCY' with your actual topic ID
-- Replace 'SEED_USER_ID' with actual user IDs (you can use multiple different IDs for variety)

-- ============================================
-- ASK & WONDER Threads (Questions)
-- ============================================

-- Thread 1: First Trimester Questions
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'First trimester fatigue - is this normal?',
  'Hi everyone! I''m 8 weeks along and I''ve been feeling so exhausted lately. I can barely get through the day without needing a nap. Is this normal? When does the energy come back?',
  'question',
  'TOPIC_ID_PREGNANCY', -- Replace with actual topic ID
  'SEED_USER_ID', -- Replace with actual user ID
  now() - interval '5 days'
) RETURNING id;

-- Get the thread ID and insert replies
-- Thread 1 Replies
INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'First trimester fatigue - is this normal?' LIMIT 1),
  'Yes, this is completely normal! Your body is working overtime to create the placenta and support baby''s growth. The fatigue usually improves in the second trimester. Rest as much as you can - your body needs it! 💕',
  'SEED_USER_ID',
  now() - interval '4 days'
),
(
  (SELECT id FROM threads WHERE title = 'First trimester fatigue - is this normal?' LIMIT 1),
  'I felt the same way! I was napping 2-3 times a day in my first trimester. Around week 14-16, I started feeling more energetic. Listen to your body and rest when you need to!',
  'SEED_USER_ID',
  now() - interval '3 days'
);

-- Thread 2: Morning Sickness Tips
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Morning sickness remedies that actually work?',
  'I''m 10 weeks and the nausea is really getting to me. I''ve tried ginger tea and crackers, but nothing seems to help much. What worked for you all?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '7 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Morning sickness remedies that actually work?' LIMIT 1),
  'Vitamin B6 and Unisom (doxylamine) worked wonders for me! Also, eating small snacks every 2 hours helped keep the nausea at bay. Sea bands (acupressure wristbands) helped too!',
  'SEED_USER_ID',
  now() - interval '6 days'
),
(
  (SELECT id FROM threads WHERE title = 'Morning sickness remedies that actually work?' LIMIT 1),
  'Cold foods helped me - smoothies, popsicles, cold fruit. Something about warm food made it worse. Also, don''t let your stomach get empty!',
  'SEED_USER_ID',
  now() - interval '5 days'
);

-- Thread 3: Baby Movement Questions
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'When did you first feel baby move?',
  'I''m 18 weeks and haven''t felt anything yet. When did you all start feeling those first flutters? I''m getting anxious!',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '3 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'When did you first feel baby move?' LIMIT 1),
  'I felt my first flutters around 19 weeks! It felt like tiny bubbles or butterflies. Don''t worry - it''s different for everyone, especially first-time moms. You''ll feel it soon!',
  'SEED_USER_ID',
  now() - interval '2 days'
),
(
  (SELECT id FROM threads WHERE title = 'When did you first feel baby move?' LIMIT 1),
  'I was 20 weeks with my first! It''s totally normal to not feel anything until 18-22 weeks, especially if this is your first pregnancy. The placenta position can also affect when you feel movements.',
  'SEED_USER_ID',
  now() - interval '1 day'
);

-- Thread 4: Exercise During Pregnancy
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Safe exercises for second trimester?',
  'I''m 22 weeks and want to stay active. What exercises are safe? I used to run and do HIIT workouts, but I''m not sure what''s okay now.',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '6 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Safe exercises for second trimester?' LIMIT 1),
  'Walking, swimming, and prenatal yoga are all great! If you were active before, you can usually continue with modifications. Avoid anything that involves lying flat on your back after the first trimester. Always check with your doctor!',
  'SEED_USER_ID',
  now() - interval '5 days'
),
(
  (SELECT id FROM threads WHERE title = 'Safe exercises for second trimester?' LIMIT 1),
  'I switched from running to brisk walking and added prenatal yoga. It''s been perfect! Listen to your body and don''t push too hard. Stay hydrated!',
  'SEED_USER_ID',
  now() - interval '4 days'
);

-- Thread 5: Sleep Issues
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Can''t sleep - any tips?',
  'I''m 28 weeks and sleep is getting impossible. Between the frequent bathroom trips, back pain, and just being uncomfortable, I''m barely sleeping. Help!',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '4 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Can''t sleep - any tips?' LIMIT 1),
  'Pregnancy pillow was a game changer! Also, try sleeping on your left side with a pillow between your knees. Limit fluids 2 hours before bed to reduce bathroom trips. Warm baths before bed help too!',
  'SEED_USER_ID',
  now() - interval '3 days'
),
(
  (SELECT id FROM threads WHERE title = 'Can''t sleep - any tips?' LIMIT 1),
  'I use a U-shaped pregnancy pillow and it made such a difference! Also, try some gentle stretches before bed. The sleep gets better after baby arrives (eventually 😊).',
  'SEED_USER_ID',
  now() - interval '2 days'
);

-- Thread 6: Food Cravings
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Weirdest pregnancy craving?',
  'I''ve been craving pickles with ice cream! What''s the weirdest thing you''ve craved during pregnancy?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '8 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Weirdest pregnancy craving?' LIMIT 1),
  'Haha! I craved hot sauce on everything, even fruit! My husband thought I was crazy. The cravings are so real!',
  'SEED_USER_ID',
  now() - interval '7 days'
),
(
  (SELECT id FROM threads WHERE title = 'Weirdest pregnancy craving?' LIMIT 1),
  'I wanted nothing but cold, crunchy things - ice, frozen grapes, cold cucumbers. The texture was everything!',
  'SEED_USER_ID',
  now() - interval '6 days'
);

-- Thread 7: Stretch Marks
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Preventing stretch marks - what works?',
  'I''m 24 weeks and starting to see some stretch marks. Is there anything I can do to minimize them?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '10 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Preventing stretch marks - what works?' LIMIT 1),
  'Keeping your skin moisturized helps! I use cocoa butter and vitamin E oil daily. But honestly, genetics play a big role. They fade over time and are a beautiful reminder of this journey!',
  'SEED_USER_ID',
  now() - interval '9 days'
),
(
  (SELECT id FROM threads WHERE title = 'Preventing stretch marks - what works?' LIMIT 1),
  'I''ve been using shea butter and staying hydrated. Some marks are inevitable, but keeping skin moisturized can help with elasticity. Remember, they''re your tiger stripes!',
  'SEED_USER_ID',
  now() - interval '8 days'
);

-- Thread 8: Braxton Hicks
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Braxton Hicks vs real contractions?',
  'I''m 32 weeks and feeling tightening in my belly. How do I know if it''s Braxton Hicks or real labor?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '2 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Braxton Hicks vs real contractions?' LIMIT 1),
  'Braxton Hicks are usually irregular and don''t get stronger. Real contractions get more frequent, longer, and stronger over time. If you''re unsure, call your doctor! Better safe than sorry.',
  'SEED_USER_ID',
  now() - interval '1 day'
),
(
  (SELECT id FROM threads WHERE title = 'Braxton Hicks vs real contractions?' LIMIT 1),
  'Braxton Hicks often stop if you change positions or walk around. Real contractions continue and get more intense. When in doubt, always call your provider!',
  'SEED_USER_ID',
  now() - interval '12 hours'
);

-- Thread 9: Maternity Clothes
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'When did you switch to maternity clothes?',
  'I''m 16 weeks and my regular pants are getting tight. When did you all make the switch? Any favorite brands?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '9 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'When did you switch to maternity clothes?' LIMIT 1),
  'I switched around 18 weeks! Maternity leggings are the best investment. So comfortable and you''ll wear them postpartum too. Don''t wait - comfort is everything!',
  'SEED_USER_ID',
  now() - interval '8 days'
),
(
  (SELECT id FROM threads WHERE title = 'When did you switch to maternity clothes?' LIMIT 1),
  'I started wearing maternity jeans at 14 weeks - no shame! The stretchy panel is amazing. You''ll be so much more comfortable.',
  'SEED_USER_ID',
  now() - interval '7 days'
);

-- Thread 10: Heartburn
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Third trimester heartburn - help!',
  'I''m 30 weeks and the heartburn is unbearable. Tums help a little but not enough. Any suggestions?',
  'question',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '5 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Third trimester heartburn - help!' LIMIT 1),
  'Smaller, more frequent meals help! Also, avoid spicy and acidic foods. I sleep propped up on pillows. Talk to your doctor about safe antacids - some are pregnancy-safe!',
  'SEED_USER_ID',
  now() - interval '4 days'
),
(
  (SELECT id FROM threads WHERE title = 'Third trimester heartburn - help!' LIMIT 1),
  'I found that eating dinner earlier and staying upright for 2-3 hours after eating helped. Also, milk or almond milk can help neutralize the acid!',
  'SEED_USER_ID',
  now() - interval '3 days'
);

-- ============================================
-- SHARE & UPLIFT Threads (Celebrations)
-- ============================================

-- Thread 11: First Ultrasound
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Saw baby''s heartbeat today! 💓',
  'Just had my first ultrasound at 8 weeks and saw the heartbeat! I''m so emotional and happy. This is really happening!',
  'feedback',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '6 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Saw baby''s heartbeat today! 💓' LIMIT 1),
  'Congratulations! That first heartbeat is so magical. Enjoy every moment of this journey! 💕',
  'SEED_USER_ID',
  now() - interval '5 days'
),
(
  (SELECT id FROM threads WHERE title = 'Saw baby''s heartbeat today! 💓' LIMIT 1),
  'Aww, that''s amazing! The first ultrasound is such a special moment. So happy for you!',
  'SEED_USER_ID',
  now() - interval '4 days'
);

-- Thread 12: Gender Reveal
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'It''s a girl! 🌸',
  'Found out today we''re having a baby girl! I''m over the moon. Can''t wait to meet our little princess!',
  'feedback',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '4 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'It''s a girl! 🌸' LIMIT 1),
  'Congratulations! Little girls are so special. Enjoy shopping for all the cute outfits!',
  'SEED_USER_ID',
  now() - interval '3 days'
),
(
  (SELECT id FROM threads WHERE title = 'It''s a girl! 🌸' LIMIT 1),
  'Yay! So exciting! Girls are amazing. Wishing you a healthy and happy pregnancy!',
  'SEED_USER_ID',
  now() - interval '2 days'
);

-- Thread 13: Feeling Baby Kick
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Felt baby kick for the first time!',
  'Just felt my first real kick at 20 weeks! It was the most amazing feeling. My partner felt it too and we both cried happy tears!',
  'feedback',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '3 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Felt baby kick for the first time!' LIMIT 1),
  'That''s such a beautiful moment! Feeling those kicks is one of the best parts of pregnancy. Enjoy every flutter!',
  'SEED_USER_ID',
  now() - interval '2 days'
),
(
  (SELECT id FROM threads WHERE title = 'Felt baby kick for the first time!' LIMIT 1),
  'Aww, that''s so special! The kicks will get stronger and more frequent. It''s such a magical connection!',
  'SEED_USER_ID',
  now() - interval '1 day'
);

-- Thread 14: Baby Shower
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Baby shower was perfect!',
  'Had my baby shower yesterday and it was everything I dreamed of. So much love and support from family and friends. Feeling so blessed!',
  'feedback',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '8 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Baby shower was perfect!' LIMIT 1),
  'So happy for you! Baby showers are such a special celebration. Enjoy all the love and support!',
  'SEED_USER_ID',
  now() - interval '7 days'
),
(
  (SELECT id FROM threads WHERE title = 'Baby shower was perfect!' LIMIT 1),
  'That sounds wonderful! It''s so nice to feel all that love and support. You''re going to be an amazing mom!',
  'SEED_USER_ID',
  now() - interval '6 days'
);

-- Thread 15: Reaching Third Trimester
INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at) VALUES
(
  'Made it to third trimester! 🎉',
  'Just hit 28 weeks and officially in the third trimester! Can''t believe we''re in the home stretch. So excited to meet our little one!',
  'feedback',
  'TOPIC_ID_PREGNANCY',
  'SEED_USER_ID',
  now() - interval '2 days'
) RETURNING id;

INSERT INTO posts (thread_id, body, author_id, created_at) VALUES
(
  (SELECT id FROM threads WHERE title = 'Made it to third trimester! 🎉' LIMIT 1),
  'Congratulations! You''re in the home stretch now. The final trimester goes by so fast. You''ve got this!',
  'SEED_USER_ID',
  now() - interval '1 day'
),
(
  (SELECT id FROM threads WHERE title = 'Made it to third trimester! 🎉' LIMIT 1),
  'Yay! Third trimester is exciting. You''re so close to meeting your baby! Enjoy these last weeks!',
  'SEED_USER_ID',
  now() - interval '12 hours'
);

-- Continue with more threads...
-- (Add 5-10 more threads for each type to reach 15-20 total)

