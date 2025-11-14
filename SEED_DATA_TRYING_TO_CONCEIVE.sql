-- ============================================
-- Village Voice Community Seed Data - TRYING TO CONCEIVE
-- This script automatically finds topic ID and user ID
-- ============================================
-- 
-- INSTRUCTIONS:
-- Just run this entire script - no replacements needed!
-- It will automatically find the 'trying-to-conceive' topic and use the first available user
-- ============================================

DO $$
DECLARE
  topic_ttc_id UUID;
  seed_user_id UUID;
  new_thread_id UUID;
BEGIN
  -- Get topic ID automatically
  SELECT id INTO topic_ttc_id FROM topics WHERE slug = 'trying-to-conceive' LIMIT 1;
  
  -- Get the first available user ID automatically
  SELECT id INTO seed_user_id FROM auth.users ORDER BY created_at LIMIT 1;

  -- Check if we have the topic
  IF topic_ttc_id IS NULL THEN
    RAISE EXCEPTION 'Trying to Conceive topic not found. Please check your topics table.';
  END IF;

  -- Check if we have a user
  IF seed_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found in auth.users. Please create a user account first.';
  END IF;

  RAISE NOTICE 'Using user ID: %', seed_user_id;
  RAISE NOTICE 'Trying to Conceive topic ID: %', topic_ttc_id;

  -- ============================================
  -- TRYING TO CONCEIVE - Ask & Wonder (Questions)
  -- ============================================

  -- Thread 1: How long did it take?
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'How long did it take you to conceive?',
    'We''ve been trying for 3 months now. I know it can take time, but I''m getting anxious. How long did it take you all?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '8 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'It took us 6 months! It''s totally normal for it to take up to a year. Try to stay positive and not stress too much - easier said than done, I know!', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'We got lucky on month 2, but I know many couples who took 6-12 months. Tracking ovulation really helped us!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'Took us 8 months. The waiting is so hard, but try to enjoy the process. You''ve got this!', NOW() - INTERVAL '5 days');

  -- Thread 2: Ovulation tracking
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Best ovulation tracking methods?',
    'I''m new to tracking ovulation. What methods work best? Apps, test strips, temperature?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I used OPK strips (ovulation predictor kits) and they worked great! Combined with tracking cervical mucus, I found my fertile window easily.', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'Basal body temperature tracking + OPK strips was the combo that worked for me. The apps help too, but the physical signs are most reliable.', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I love the Clearblue digital OPKs - so easy to read! Also tracking cervical position helped me understand my cycle better.', NOW() - INTERVAL '4 days');

  -- Thread 3: When to test
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When to take a pregnancy test?',
    'I think I might be pregnant but I''m only 8 DPO (days past ovulation). When is the best time to test?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Most tests are accurate from the day of your missed period. Testing too early can give false negatives. I waited until 14 DPO for accurate results!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I tested at 10 DPO and got a faint positive! But waiting until your missed period is more reliable. The wait is so hard!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Early response tests can detect as early as 6 days before missed period, but they''re more accurate closer to your period. Try to wait if you can!', NOW() - INTERVAL '3 days');

  -- Thread 4: Prenatal vitamins
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Prenatal vitamins - when to start?',
    'Should I start taking prenatal vitamins now or wait until I''m pregnant?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '9 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Start now! Folic acid is especially important in the early weeks, often before you know you''re pregnant. Most doctors recommend starting 3 months before trying.', NOW() - INTERVAL '8 days'),
    (new_thread_id, seed_user_id, 'Definitely start now! The neural tube forms very early, so having folic acid in your system is crucial. I started 6 months before!', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'I started taking them as soon as we decided to try. Better to be prepared! Look for one with at least 400mcg of folic acid.', NOW() - INTERVAL '6 days');

  -- Thread 5: Stress and conception
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Does stress affect conception?',
    'I''ve been so stressed about getting pregnant. Can stress actually prevent conception?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'High stress can affect your cycle, but try not to stress about stressing! Easier said than done. Focus on self-care and try to relax.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'It can affect your cycle timing, but many people conceive even when stressed. Don''t add "not stressing" to your stress list! Be kind to yourself.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I found that yoga and meditation helped me manage stress during TTC. Taking care of your mental health is important too!', NOW() - INTERVAL '2 days');

  -- Thread 6: Fertility apps
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Fertility apps recommendations?',
    'What fertility/pregnancy apps do you recommend for tracking?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I love Fertility Friend for detailed tracking! Also used Clue and Flo. They all have different features, so try a few!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'Premom is great for OPK tracking! It scans your test strips and predicts ovulation. Really helped me understand my cycle better.', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I use Kindara - it''s simple and effective. The community feature is nice too for support during TTC journey.', NOW() - INTERVAL '4 days');

  -- Thread 7: When to see specialist
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'When to see a fertility specialist?',
    'We''ve been trying for 8 months with no luck. When should we consider seeing a specialist?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Most doctors recommend seeing a specialist after 12 months if under 35, or 6 months if over 35. But there''s no harm in getting checked earlier if you''re concerned!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'If you''re over 35, many recommend 6 months. But trust your gut - if something feels off, it''s okay to get checked sooner.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'We saw a specialist at 10 months and found some issues. Don''t hesitate to advocate for yourself if you feel something isn''t right.', NOW() - INTERVAL '3 days');

  -- Thread 8: Best positions
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Best positions for conception?',
    'Do certain positions actually help with conception? Or is that just a myth?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '8 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'There''s no scientific evidence that positions matter! The important thing is timing - having sex during your fertile window. But if certain positions make you feel more relaxed, that can help!', NOW() - INTERVAL '7 days'),
    (new_thread_id, seed_user_id, 'It''s mostly about timing, not position! But staying lying down for 10-15 minutes after can help. Mostly just enjoy the process!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'I''ve heard keeping hips elevated helps, but honestly timing is everything. Focus on your fertile window and try to relax!', NOW() - INTERVAL '5 days');

  -- Thread 9: Irregular cycles
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Irregular cycles and TTC',
    'My cycles are really irregular (30-45 days). How do I track ovulation with irregular cycles?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Irregular cycles make it trickier! OPK strips are your best friend. Track for several cycles to see patterns. Some people find BBT helpful too.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'I have irregular cycles too. OPK strips and tracking cervical mucus helped me find my pattern. It took a few months to figure it out!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'Consider talking to your doctor about regulating your cycles. Sometimes underlying issues can cause irregularity. OPKs are still helpful though!', NOW() - INTERVAL '2 days');

  -- Thread 10: PCOS and TTC
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'PCOS and trying to conceive',
    'I have PCOS and we''re trying to conceive. Any advice from others with PCOS?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I have PCOS too! Metformin and lifestyle changes helped regulate my cycles. Tracking with OPKs is essential since cycles can be unpredictable. Don''t give up hope!', NOW() - INTERVAL '6 days'),
    (new_thread_id, seed_user_id, 'PCOS here as well. Working with a reproductive endocrinologist was key. They can help with medication to induce ovulation. You''re not alone!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I found that low-carb diet and regular exercise helped manage my PCOS symptoms. Combined with medication, I was able to conceive. Stay positive!', NOW() - INTERVAL '4 days');

  -- Thread 11: Male factor fertility
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Male fertility - what should partner do?',
    'What can my partner do to improve fertility? Are there supplements or lifestyle changes that help?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Avoiding hot tubs, tight underwear, and excessive heat helps. Supplements like CoQ10, zinc, and folic acid can improve sperm quality. Also, avoid smoking and excessive alcohol.', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'My partner took a men''s preconception vitamin and it seemed to help! Also, regular exercise (but not overdoing it) and maintaining a healthy weight is important.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'A semen analysis can give you both peace of mind. It''s a simple test and can identify any issues early. Worth checking if you''ve been trying for a while!', NOW() - INTERVAL '3 days');

  -- Thread 12: Chemical pregnancy
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Experienced chemical pregnancy - feeling lost',
    'I had a positive test but then got my period. Doctor said it was a chemical pregnancy. I''m feeling so discouraged. Anyone else been through this?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I''m so sorry for your loss. Chemical pregnancies are more common than people realize. The fact that you got a positive is actually a good sign - your body can conceive!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I had one too. It''s heartbreaking but many women go on to have successful pregnancies after. Take time to grieve, but don''t lose hope. You''re not alone.', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Sending you love. Chemical pregnancies are unfortunately common, often due to chromosomal issues. Your body did what it needed to do. Be gentle with yourself.', NOW() - INTERVAL '1 day');

  -- Thread 13: Secondary infertility
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Secondary infertility - anyone else?',
    'We have one child but having trouble conceiving #2. It''s been 18 months. Anyone else dealing with secondary infertility?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Yes, I''m in the same boat. It''s frustrating because you know you can get pregnant, but something''s different this time. We''re seeing a specialist now.', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Secondary infertility is real and valid. Age, stress, and changes in health can all play a role. Don''t hesitate to get checked out. You''re not alone!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'We struggled with secondary infertility for 2 years. Found out I had developed some issues since my first. Treatment helped and we''re now expecting #2. There''s hope!', NOW() - INTERVAL '2 days');

  -- Thread 14: OPK confusion
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'OPK strips - how to read them?',
    'I''m using OPK strips but I''m confused about when the test line is "darker" than control. Any tips?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'The test line needs to be as dark or darker than the control line. I found that testing twice a day (morning and evening) helps catch the surge. The surge can be quick!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I use the Premom app to scan my strips - it gives you a ratio and makes it easier to see the progression. Really helpful for visual learners!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'Don''t test with first morning urine - LH is usually higher in the afternoon. Also, limit fluids 2 hours before testing for more accurate results.', NOW() - INTERVAL '3 days');

  -- Thread 15: TTC after miscarriage
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'TTC after miscarriage - when to try again?',
    'I had a miscarriage at 8 weeks. My doctor said we can try again after one period, but I''m nervous. When did you start trying again?',
    'question',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'I''m so sorry for your loss. We waited one cycle as recommended, but emotionally I needed more time. There''s no right answer - do what feels right for you.', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'We tried again after one period. The waiting was hard but we felt ready. Many women go on to have healthy pregnancies after miscarriage. Take care of yourself.', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'I waited 3 months for emotional healing. There''s no rush - your body and heart need time. When you''re ready, you''ll know. Sending you strength.', NOW() - INTERVAL '1 day');

  -- ============================================
  -- TRYING TO CONCEIVE - Share & Uplift (Feedback)
  -- ============================================

  -- Thread 16: Positive test!
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Got my BFP (Big Fat Positive)!',
    'After 7 months of trying, I finally got a positive test! I can''t believe it. This community has been so supportive. Thank you all!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '2 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Congratulations! So happy for you! Wishing you a healthy and happy pregnancy!', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'Amazing news! So excited for you. Enjoy every moment!', NOW() - INTERVAL '12 hours'),
    (new_thread_id, seed_user_id, 'Yay! Congratulations! This gives me hope. So happy for you!', NOW() - INTERVAL '6 hours');

  -- Thread 17: Cycle tracking success
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Tracking helped me understand my cycle!',
    'After 3 months of tracking with OPKs and BBT, I finally understand my cycle patterns. Knowledge is power!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s great! Understanding your cycle makes such a difference. You''re doing everything right!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Tracking is so empowering! It really helps you feel more in control. Keep it up!', NOW() - INTERVAL '1 day');

  -- Thread 18: Support from community
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Grateful for this TTC community',
    'Just wanted to say thank you to everyone in this community. The support and advice during this TTC journey means so much!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'This community is amazing! Having support during TTC makes such a difference. We''re all in this together!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I feel the same way! The support here is invaluable. Thank you all!', NOW() - INTERVAL '2 days');

  -- Thread 19: First appointment scheduled
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Scheduled first fertility appointment',
    'After 10 months of trying, we finally scheduled an appointment with a fertility specialist. Nervous but hopeful!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s a big step! Getting answers and a plan can be so helpful. Good luck with your appointment!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'You''re being proactive and that''s great! Hope you get the answers and support you need.', NOW() - INTERVAL '3 days');

  -- Thread 20: Lifestyle changes paying off
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Lifestyle changes are working!',
    'After making diet and exercise changes, my cycles are more regular. Feeling more hopeful about our TTC journey!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s wonderful! Taking control of what you can really helps. You''re doing great!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'So happy to hear positive changes! Keep up the good work. You''ve got this!', NOW() - INTERVAL '4 days');

  -- Thread 21: Partner support
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Partner is being so supportive',
    'My partner has been amazing during this TTC journey. Making lifestyle changes together and being patient. So grateful!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s so important! Having a supportive partner makes all the difference. You''re lucky to have each other!', NOW() - INTERVAL '2 days'),
    (new_thread_id, seed_user_id, 'Teamwork is everything! So happy you have that support. It really helps during this journey.', NOW() - INTERVAL '1 day');

  -- Thread 22: Staying positive
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Staying positive during TTC',
    'TTC can be so emotional, but I''m trying to stay positive and enjoy the journey. Anyone else focusing on self-care?',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '4 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Self-care is so important! I''ve been doing yoga and meditation. Taking care of yourself is not selfish - it''s necessary!', NOW() - INTERVAL '3 days'),
    (new_thread_id, seed_user_id, 'I''m trying to focus on the present and not stress about the future. Easier said than done, but every day is progress!', NOW() - INTERVAL '2 days');

  -- Thread 23: Learning about fertility
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Learning so much about my body',
    'This TTC journey has taught me so much about my body and fertility. Knowledge is empowering!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Absolutely! Understanding your body is so empowering. You''re becoming your own advocate!', NOW() - INTERVAL '4 days'),
    (new_thread_id, seed_user_id, 'I feel the same way! This journey has been educational in so many ways. Knowledge is power!', NOW() - INTERVAL '3 days');

  -- Thread 24: Celebrating small wins
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'Celebrating small wins',
    'Even though we haven''t conceived yet, I''m celebrating small wins - regular cycles, positive OPKs, staying healthy. Every step counts!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '6 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'That''s such a great mindset! Celebrating progress, not just the end goal, is so important. You''re doing amazing!', NOW() - INTERVAL '5 days'),
    (new_thread_id, seed_user_id, 'I love this! Every step forward is worth celebrating. Keep that positive energy!', NOW() - INTERVAL '4 days');

  -- Thread 25: Hope and encouragement
  INSERT INTO threads (title, body, thread_type, topic_id, author_id, created_at)
  VALUES (
    'For everyone still trying - don''t give up!',
    'To everyone still on their TTC journey - don''t give up hope! We''re all in this together. Your time will come!',
    'feedback',
    topic_ttc_id,
    seed_user_id,
    NOW() - INTERVAL '2 days'
  ) RETURNING id INTO new_thread_id;

  INSERT INTO posts (thread_id, author_id, body, created_at)
  VALUES 
    (new_thread_id, seed_user_id, 'Thank you for this! Sometimes we need reminders to stay hopeful. This community is amazing!', NOW() - INTERVAL '1 day'),
    (new_thread_id, seed_user_id, 'So needed to hear this today. Thank you for the encouragement. We''ve got this!', NOW() - INTERVAL '12 hours');

  RAISE NOTICE 'Successfully inserted 25 Trying to Conceive conversations!';
END $$;

