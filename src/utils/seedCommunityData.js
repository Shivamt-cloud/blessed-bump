/**
 * Village Voice Community Seed Data
 * 
 * This utility creates sample conversations for the community to make it look active.
 * Run this once to populate the database with helpful, realistic conversations.
 * 
 * Usage:
 * 1. Make sure you're logged in as an admin user
 * 2. Import this in a component or run via console
 * 3. Call seedCommunityData() with your user ID
 */

import { supabase } from '../lib/supabaseClient';

// Sample conversations organized by topic and thread type
const seedConversations = {
  'pregnancy-journey': {
    question: [
      {
        title: 'First trimester fatigue - is this normal?',
        body: 'Hi everyone! I\'m 8 weeks along and I\'ve been feeling so exhausted lately. I can barely get through the day without needing a nap. Is this normal? When does the energy come back?',
        replies: [
          'Yes, this is completely normal! Your body is working overtime to create the placenta and support baby\'s growth. The fatigue usually improves in the second trimester. Rest as much as you can - your body needs it! 💕',
          'I felt the same way! I was napping 2-3 times a day in my first trimester. Around week 14-16, I started feeling more energetic. Listen to your body and rest when you need to!',
        ],
      },
      {
        title: 'Morning sickness remedies that actually work?',
        body: 'I\'m 10 weeks and the nausea is really getting to me. I\'ve tried ginger tea and crackers, but nothing seems to help much. What worked for you all?',
        replies: [
          'Vitamin B6 and Unisom (doxylamine) worked wonders for me! Also, eating small snacks every 2 hours helped keep the nausea at bay. Sea bands (acupressure wristbands) helped too!',
          'Cold foods helped me - smoothies, popsicles, cold fruit. Something about warm food made it worse. Also, don\'t let your stomach get empty!',
        ],
      },
      {
        title: 'When did you first feel baby move?',
        body: 'I\'m 18 weeks and haven\'t felt anything yet. When did you all start feeling those first flutters? I\'m getting anxious!',
        replies: [
          'I felt my first flutters around 19 weeks! It felt like tiny bubbles or butterflies. Don\'t worry - it\'s different for everyone, especially first-time moms. You\'ll feel it soon!',
          'I was 20 weeks with my first! It\'s totally normal to not feel anything until 18-22 weeks, especially if this is your first pregnancy. The placenta position can also affect when you feel movements.',
        ],
      },
      {
        title: 'Safe exercises for second trimester?',
        body: 'I\'m 22 weeks and want to stay active. What exercises are safe? I used to run and do HIIT workouts, but I\'m not sure what\'s okay now.',
        replies: [
          'Walking, swimming, and prenatal yoga are all great! If you were active before, you can usually continue with modifications. Avoid anything that involves lying flat on your back after the first trimester. Always check with your doctor!',
          'I switched from running to brisk walking and added prenatal yoga. It\'s been perfect! Listen to your body and don\'t push too hard. Stay hydrated!',
        ],
      },
      {
        title: 'Can\'t sleep - any tips?',
        body: 'I\'m 28 weeks and sleep is getting impossible. Between the frequent bathroom trips, back pain, and just being uncomfortable, I\'m barely sleeping. Help!',
        replies: [
          'Pregnancy pillow was a game changer! Also, try sleeping on your left side with a pillow between your knees. Limit fluids 2 hours before bed to reduce bathroom trips. Warm baths before bed help too!',
          'I use a U-shaped pregnancy pillow and it made such a difference! Also, try some gentle stretches before bed. The sleep gets better after baby arrives (eventually 😊).',
        ],
      },
      {
        title: 'Weirdest pregnancy craving?',
        body: 'I\'ve been craving pickles with ice cream! What\'s the weirdest thing you\'ve craved during pregnancy?',
        replies: [
          'Haha! I craved hot sauce on everything, even fruit! My husband thought I was crazy. The cravings are so real!',
          'I wanted nothing but cold, crunchy things - ice, frozen grapes, cold cucumbers. The texture was everything!',
        ],
      },
      {
        title: 'Preventing stretch marks - what works?',
        body: 'I\'m 24 weeks and starting to see some stretch marks. Is there anything I can do to minimize them?',
        replies: [
          'Keeping your skin moisturized helps! I use cocoa butter and vitamin E oil daily. But honestly, genetics play a big role. They fade over time and are a beautiful reminder of this journey!',
          'I\'ve been using shea butter and staying hydrated. Some marks are inevitable, but keeping skin moisturized can help with elasticity. Remember, they\'re your tiger stripes!',
        ],
      },
      {
        title: 'Braxton Hicks vs real contractions?',
        body: 'I\'m 32 weeks and feeling tightening in my belly. How do I know if it\'s Braxton Hicks or real labor?',
        replies: [
          'Braxton Hicks are usually irregular and don\'t get stronger. Real contractions get more frequent, longer, and stronger over time. If you\'re unsure, call your doctor! Better safe than sorry.',
          'Braxton Hicks often stop if you change positions or walk around. Real contractions continue and get more intense. When in doubt, always call your provider!',
        ],
      },
      {
        title: 'When did you switch to maternity clothes?',
        body: 'I\'m 16 weeks and my regular pants are getting tight. When did you all make the switch? Any favorite brands?',
        replies: [
          'I switched around 18 weeks! Maternity leggings are the best investment. So comfortable and you\'ll wear them postpartum too. Don\'t wait - comfort is everything!',
          'I started wearing maternity jeans at 14 weeks - no shame! The stretchy panel is amazing. You\'ll be so much more comfortable.',
        ],
      },
      {
        title: 'Third trimester heartburn - help!',
        body: 'I\'m 30 weeks and the heartburn is unbearable. Tums help a little but not enough. Any suggestions?',
        replies: [
          'Smaller, more frequent meals help! Also, avoid spicy and acidic foods. I sleep propped up on pillows. Talk to your doctor about safe antacids - some are pregnancy-safe!',
          'I found that eating dinner earlier and staying upright for 2-3 hours after eating helped. Also, milk or almond milk can help neutralize the acid!',
        ],
      },
      {
        title: 'Swelling in feet and ankles',
        body: 'I\'m 34 weeks and my feet are so swollen. Is this normal? Any tips to reduce swelling?',
        replies: [
          'Yes, swelling is very common in the third trimester! Elevate your feet when possible, stay hydrated, and avoid standing for long periods. Compression socks can help too!',
          'I found that putting my feet up and doing ankle circles helped. Also, try to avoid salty foods. The swelling usually goes down after delivery.',
        ],
      },
      {
        title: 'Nesting instinct is real!',
        body: 'I\'m 35 weeks and suddenly I want to clean and organize everything! Is this normal?',
        replies: [
          'Yes! The nesting instinct is totally normal. Your body is preparing for baby. Just don\'t overdo it - rest when you need to!',
          'I went through the same thing! I organized the entire house at 36 weeks. It\'s your body\'s way of preparing. Just pace yourself!',
        ],
      },
      {
        title: 'Back pain in third trimester',
        body: 'My lower back is killing me at 31 weeks. Any suggestions for relief?',
        replies: [
          'Prenatal massage, warm baths, and gentle stretches help! Also, make sure you have good posture and supportive shoes. A belly support band can also help!',
          'I found that cat-cow stretches and pelvic tilts really helped. Also, try sleeping with a pillow between your knees. Heat packs work wonders too!',
        ],
      },
      {
        title: 'Hospital bag checklist?',
        body: 'I\'m 36 weeks and starting to pack my hospital bag. What should I definitely bring?',
        replies: [
          'Comfortable clothes for you and baby, phone charger, snacks, lip balm, and your own pillow! Also bring your birth plan and insurance info.',
          'Don\'t forget comfy going-home outfit, nursing bras if planning to breastfeed, and something for baby to wear home. Pack it early - you never know!',
        ],
      },
      {
        title: 'Baby\'s position - head down?',
        body: 'I\'m 32 weeks and wondering when baby should be head down. When did your baby turn?',
        replies: [
          'Most babies turn head down between 32-36 weeks. Some don\'t until later. Your doctor will check at appointments. There are exercises that can help encourage baby to turn!',
          'My baby turned at 34 weeks! Don\'t worry if it hasn\'t happened yet - there\'s still time. Your provider will monitor the position.',
        ],
      },
    ],
    feedback: [
      {
        title: 'Saw baby\'s heartbeat today! 💓',
        body: 'Just had my first ultrasound at 8 weeks and saw the heartbeat! I\'m so emotional and happy. This is really happening!',
        replies: [
          'Congratulations! That first heartbeat is so magical. Enjoy every moment of this journey! 💕',
          'Aww, that\'s amazing! The first ultrasound is such a special moment. So happy for you!',
        ],
      },
      {
        title: 'It\'s a girl! 🌸',
        body: 'Found out today we\'re having a baby girl! I\'m over the moon. Can\'t wait to meet our little princess!',
        replies: [
          'Congratulations! Little girls are so special. Enjoy shopping for all the cute outfits!',
          'Yay! So exciting! Girls are amazing. Wishing you a healthy and happy pregnancy!',
        ],
      },
      {
        title: 'Felt baby kick for the first time!',
        body: 'Just felt my first real kick at 20 weeks! It was the most amazing feeling. My partner felt it too and we both cried happy tears!',
        replies: [
          'That\'s such a beautiful moment! Feeling those kicks is one of the best parts of pregnancy. Enjoy every flutter!',
          'Aww, that\'s so special! The kicks will get stronger and more frequent. It\'s such a magical connection!',
        ],
      },
      {
        title: 'Baby shower was perfect!',
        body: 'Had my baby shower yesterday and it was everything I dreamed of. So much love and support from family and friends. Feeling so blessed!',
        replies: [
          'So happy for you! Baby showers are such a special celebration. Enjoy all the love and support!',
          'That sounds wonderful! It\'s so nice to feel all that love and support. You\'re going to be an amazing mom!',
        ],
      },
      {
        title: 'Made it to third trimester! 🎉',
        body: 'Just hit 28 weeks and officially in the third trimester! Can\'t believe we\'re in the home stretch. So excited to meet our little one!',
        replies: [
          'Congratulations! You\'re in the home stretch now. The final trimester goes by so fast. You\'ve got this!',
          'Yay! Third trimester is exciting. You\'re so close to meeting your baby! Enjoy these last weeks!',
        ],
      },
      {
        title: 'Anatomy scan went perfectly!',
        body: 'Had my 20-week anatomy scan today and everything looks perfect! Baby is healthy and growing right on track. So relieved and happy!',
        replies: [
          'That\'s wonderful news! So happy everything is going well. Enjoy the rest of your pregnancy!',
          'Amazing! The anatomy scan is such a relief. Wishing you continued health and happiness!',
        ],
      },
      {
        title: 'Partner felt baby kick!',
        body: 'My partner finally felt the baby kick tonight! The look on their face was priceless. These moments are so special!',
        replies: [
          'Aww, that\'s such a beautiful moment! Sharing those kicks with your partner is so special.',
          'Those are the best moments! So happy you got to share that together. More kicks to come!',
        ],
      },
      {
        title: 'Finished the nursery!',
        body: 'Just finished setting up the nursery and it\'s perfect! Everything is ready for our little one. Can\'t wait to bring baby home!',
        replies: [
          'How exciting! Having the nursery ready makes it feel so real. You\'re all set!',
          'That\'s amazing! The nesting is complete. You\'re going to be such a great mom!',
        ],
      },
      {
        title: '36 weeks - almost there!',
        body: 'Hit 36 weeks today! Baby is considered full-term now. We\'re so close to meeting our little one. The excitement is real!',
        replies: [
          'You\'re in the final countdown! So exciting. Wishing you a smooth delivery!',
          'Almost there! The last few weeks are so special. You\'ve got this, mama!',
        ],
      },
      {
        title: 'Baby dropped!',
        body: 'I think baby dropped today - I can breathe easier but the pressure is real! Getting so close now!',
        replies: [
          'That\'s a great sign! Baby is getting ready. You\'re in the home stretch!',
          'Yay! Baby is preparing for arrival. You\'re doing great, mama!',
        ],
      },
    ],
  },
  'trying-to-conceive': {
    question: [
      {
        title: 'How long did it take you to conceive?',
        body: 'We\'ve been trying for 3 months now. I know it can take time, but I\'m getting anxious. How long did it take you all?',
        replies: [
          'It took us 6 months! It\'s totally normal for it to take up to a year. Try to stay positive and not stress too much - easier said than done, I know!',
          'We got lucky on month 2, but I know many couples who took 6-12 months. Tracking ovulation really helped us!',
        ],
      },
      {
        title: 'Best ovulation tracking methods?',
        body: 'I\'m new to tracking ovulation. What methods work best? Apps, test strips, temperature?',
        replies: [
          'I used OPK strips (ovulation predictor kits) and they worked great! Combined with tracking cervical mucus, I found my fertile window easily.',
          'Basal body temperature tracking + OPK strips was the combo that worked for me. The apps help too, but the physical signs are most reliable.',
        ],
      },
      {
        title: 'When to take a pregnancy test?',
        body: 'I think I might be pregnant but I\'m only 8 DPO (days past ovulation). When is the best time to test?',
        replies: [
          'Most tests are accurate from the day of your missed period. Testing too early can give false negatives. I waited until 14 DPO for accurate results!',
          'I tested at 10 DPO and got a faint positive! But waiting until your missed period is more reliable. The wait is so hard!',
        ],
      },
      {
        title: 'Prenatal vitamins - when to start?',
        body: 'Should I start taking prenatal vitamins now or wait until I\'m pregnant?',
        replies: [
          'Start now! Folic acid is especially important in the early weeks, often before you know you\'re pregnant. Most doctors recommend starting 3 months before trying.',
          'Definitely start now! The neural tube forms very early, so having folic acid in your system is crucial. I started 6 months before!',
        ],
      },
      {
        title: 'Does stress affect conception?',
        body: 'I\'ve been so stressed about getting pregnant. Can stress actually prevent conception?',
        replies: [
          'High stress can affect your cycle, but try not to stress about stressing! Easier said than done. Focus on self-care and try to relax.',
          'It can affect your cycle timing, but many people conceive even when stressed. Don\'t add "not stressing" to your stress list! Be kind to yourself.',
        ],
      },
      {
        title: 'Fertility apps recommendations?',
        body: 'What fertility/pregnancy apps do you recommend for tracking?',
        replies: [
          'I love Fertility Friend for detailed tracking! Also used Clue and Flo. They all have different features, so try a few!',
          'Premom is great for OPK tracking! It scans your test strips and predicts ovulation. Really helped me understand my cycle better.',
        ],
      },
      {
        title: 'When to see a fertility specialist?',
        body: 'We\'ve been trying for 8 months with no luck. When should we consider seeing a specialist?',
        replies: [
          'Most doctors recommend seeing a specialist after 12 months if under 35, or 6 months if over 35. But there\'s no harm in getting checked earlier if you\'re concerned!',
          'If you\'re over 35, many recommend 6 months. But trust your gut - if something feels off, it\'s okay to get checked sooner.',
        ],
      },
      {
        title: 'Best positions for conception?',
        body: 'Do certain positions actually help with conception? Or is that just a myth?',
        replies: [
          'There\'s no scientific evidence that positions matter! The important thing is timing - having sex during your fertile window. But if certain positions make you feel more relaxed, that can help!',
          'It\'s mostly about timing, not position! But staying lying down for 10-15 minutes after can help. Mostly just enjoy the process!',
        ],
      },
      {
        title: 'Irregular cycles and TTC',
        body: 'My cycles are really irregular (30-45 days). How do I track ovulation with irregular cycles?',
        replies: [
          'Irregular cycles make it trickier! OPK strips are your best friend. Track for several cycles to see patterns. Some people find BBT helpful too.',
          'I have irregular cycles too. OPK strips and tracking cervical mucus helped me find my pattern. It took a few months to figure it out!',
        ],
      },
      {
        title: 'PCOS and trying to conceive',
        body: 'I have PCOS and we\'re trying to conceive. Any advice from others with PCOS?',
        replies: [
          'PCOS can make it more challenging, but many women with PCOS conceive! Tracking is key, and some find that lifestyle changes (diet, exercise) help regulate cycles. Talk to your doctor!',
          'I have PCOS and it took us 18 months, but we got there! Metformin and lifestyle changes helped regulate my cycles. Don\'t lose hope!',
        ],
      },
    ],
    feedback: [
      {
        title: 'Got my BFP (Big Fat Positive)!',
        body: 'After 5 months of trying, I finally got a positive test! I can\'t believe it. So excited and nervous!',
        replies: [
          'Congratulations! That\'s amazing news! Wishing you a healthy and happy pregnancy!',
          'Yay! So happy for you! Enjoy every moment of this journey!',
        ],
      },
      {
        title: 'First positive test!',
        body: 'Just got my first positive pregnancy test! I\'m shaking with excitement. This is really happening!',
        replies: [
          'Congratulations! That first positive is so special. So happy for you!',
          'Amazing news! Wishing you all the best for a healthy pregnancy!',
        ],
      },
      {
        title: 'Ovulation tracking success!',
        body: 'Started tracking my ovulation this month and finally understand my cycle! Feeling so much more in control.',
        replies: [
          'That\'s great! Understanding your cycle is so empowering. You\'ve got this!',
          'Knowledge is power! Tracking really helps. Good luck on your journey!',
        ],
      },
    ],
  },
  'baby-care': {
    question: [
      {
        title: 'Newborn sleep schedule?',
        body: 'My baby is 2 weeks old and sleep is all over the place. When do they develop a schedule?',
        replies: [
          'Newborns don\'t really have a schedule until around 3-4 months! For now, just follow their cues. They\'ll eat, sleep, and wake on their own timeline.',
          'It\'s totally normal! Newborns sleep in short cycles. Around 3-4 months, you might see more of a pattern. Hang in there!',
        ],
      },
      {
        title: 'Breastfeeding challenges',
        body: 'Breastfeeding is harder than I expected. Baby won\'t latch properly and I\'m in pain. Any tips?',
        replies: [
          'Lactation consultants are amazing! Also, try different positions and make sure baby\'s mouth is wide open. Don\'t hesitate to get help - it\'s worth it!',
          'I struggled too! A lactation consultant helped so much. Also, nipple shields can help while you figure it out. You\'re doing great!',
        ],
      },
      {
        title: 'When to start tummy time?',
        body: 'My baby is 3 weeks old. When should I start tummy time? How often?',
        replies: [
          'You can start tummy time from day one! Just a few minutes at a time, a few times a day. Start with 1-2 minutes and work up. Always supervise!',
          'Start now! Even just a minute or two after diaper changes. It helps build neck strength. My baby hated it at first but got used to it!',
        ],
      },
      {
        title: 'Baby won\'t stop crying',
        body: 'My 6-week-old has been crying for hours. I\'ve tried everything - fed, changed, burped. What else can I try?',
        replies: [
          'Sometimes babies just need to cry. Try swaddling, white noise, gentle rocking, or a warm bath. If nothing works and you\'re overwhelmed, it\'s okay to put baby down safely and take a break.',
          'Purple crying is real! It peaks around 6-8 weeks. Try the 5 S\'s: swaddle, side/stomach position, shush, swing, suck. Also, check for gas - bicycle legs can help!',
        ],
      },
      {
        title: 'Diaper rash help',
        body: 'Baby has a bad diaper rash. I\'m changing frequently and using cream, but it\'s not getting better.',
        replies: [
          'Try letting baby go diaper-free for 10-15 minutes a few times a day. Air is the best healer! Also, make sure the area is completely dry before applying cream.',
          'Zinc oxide cream works great! Also, try a warm bath with baking soda. If it persists or looks infected, definitely call your pediatrician.',
        ],
      },
      {
        title: 'When do babies start smiling?',
        body: 'My baby is 6 weeks and I keep waiting for that first real smile! When did your babies start smiling?',
        replies: [
          'Most babies start social smiling around 6-8 weeks! You\'ll know it\'s real when it\'s in response to your face or voice. It\'s coming soon!',
          'My baby smiled at 7 weeks! It was the best moment. Those first smiles are everything!',
        ],
      },
      {
        title: 'Sleep training - when to start?',
        body: 'Baby is 4 months and still waking every 2 hours. When can we start sleep training?',
        replies: [
          'Most experts recommend waiting until 4-6 months. But every baby is different! Some aren\'t ready until 6 months. Follow your baby\'s cues and your instincts.',
          'We started gentle sleep training at 5 months. It\'s a personal choice - do what feels right for your family. There\'s no rush!',
        ],
      },
      {
        title: 'Introducing solids',
        body: 'Baby is 5 months and showing interest in food. When should we start solids?',
        replies: [
          'Most babies are ready around 6 months, but signs of readiness include sitting up, showing interest, and losing the tongue-thrust reflex. Always check with your pediatrician!',
          'We started at 6 months with purees. Look for signs of readiness - sitting with support, good head control, interest in food. Start slow!',
        ],
      },
      {
        title: 'Baby won\'t take a bottle',
        body: 'I\'m going back to work soon and baby refuses bottles. Any tips?',
        replies: [
          'Try different bottle types and have someone else offer it (not you!). Also, try when baby is calm but slightly hungry. It can take time!',
          'We tried 5 different bottles before finding one baby liked! Also, warming the milk and trying different positions helped. Don\'t give up!',
        ],
      },
      {
        title: 'Teething - what helps?',
        body: 'Baby is drooling constantly and seems fussy. I think teething is starting. What helps with the pain?',
        replies: [
          'Cold teethers, frozen washcloths, and gentle gum massage help! Some babies like teething rings. If really uncomfortable, check with your pediatrician about pain relief options.',
          'Cold things are your friend! Frozen fruit in a mesh feeder, cold teethers, or even a cold spoon. The drooling is endless but it passes!',
        ],
      },
    ],
    feedback: [
      {
        title: 'Baby slept through the night!',
        body: 'My 3-month-old slept 6 hours straight last night! I feel like a new person. Small victories!',
        replies: [
          'That\'s amazing! Those longer stretches are so refreshing. Enjoy it while it lasts!',
          'Yay! Those first longer stretches are everything. You\'re doing great, mama!',
        ],
      },
      {
        title: 'First real smile!',
        body: 'Baby smiled at me for the first time today! I cried happy tears. This is the best feeling!',
        replies: [
          'Aww, those first smiles are everything! So special. Enjoy every moment!',
          'That\'s the best! Those smiles make everything worth it. So happy for you!',
        ],
      },
      {
        title: 'Breastfeeding finally clicked!',
        body: 'After weeks of struggle, breastfeeding finally clicked today! Baby latched perfectly and we both relaxed. So relieved!',
        replies: [
          'That\'s wonderful! When it clicks, it\'s such a relief. You\'re doing amazing!',
          'So happy for you! Breastfeeding can be challenging but you stuck with it. You\'re a rockstar!',
        ],
      },
    ],
  },
  'birth-month-clubs': {
    question: [
      {
        title: 'March 2024 babies - anyone else?',
        body: 'I\'m due in March 2024! Would love to connect with other mamas due around the same time. How are you all feeling?',
        replies: [
          'I\'m due March 15th! So excited to connect with other March mamas. How are you feeling?',
          'March 22nd here! The second trimester energy is finally kicking in. So nice to find others due around the same time!',
        ],
      },
      {
        title: 'April 2024 birth month club',
        body: 'Any other April 2024 mamas here? Let\'s share our journeys and support each other!',
        replies: [
          'April 10th here! So excited to meet other April mamas. We\'re all in this together!',
          'Due April 18th! It\'s so nice to have others going through the same stage at the same time.',
        ],
      },
      {
        title: 'May 2024 babies unite!',
        body: 'May 2024 mamas - how are you all doing? Would love to create a support group!',
        replies: [
          'May 5th here! So excited to connect with other May mamas. We\'re getting close!',
          'May 20th! It\'s so nice to have others to share this journey with. We\'ve got this!',
        ],
      },
    ],
    feedback: [
      {
        title: 'March babies - we\'re in the home stretch!',
        body: 'All my March 2024 mamas - we\'re almost there! How is everyone feeling?',
        replies: [
          'So close! The excitement is real. Can\'t wait to meet our March babies!',
          'Almost there! We\'ve got this, mamas!',
        ],
      },
    ],
  },
};

/**
 * Seeds the community with sample conversations
 * @param {string} userId - The user ID to use as author (or use system user)
 * @param {boolean} useSystemUser - Whether to create/use a system user for seed data
 */
export async function seedCommunityData(userId = null, useSystemUser = true) {
  try {
    let authorId = userId;

    // Create or get system user if needed
    if (useSystemUser && !authorId) {
      // Try to get existing system user
      const { data: existingUser } = await supabase.auth.admin.getUserById(
        '00000000-0000-0000-0000-000000000001'
      );

      if (!existingUser) {
        // Create system user (requires admin access)
        console.log('Creating system user for seed data...');
        // Note: This requires Supabase admin API - you may need to do this manually
        // Or use a real user ID
      }
      authorId = '00000000-0000-0000-0000-000000000001';
    }

    if (!authorId) {
      throw new Error('No user ID provided. Please provide a user ID or use a system user.');
    }

    // Get all topics
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('id, slug');

    if (topicsError) {
      throw topicsError;
    }

    const topicMap = {};
    topics.forEach((topic) => {
      topicMap[topic.slug] = topic.id;
    });

    let totalThreads = 0;
    let totalPosts = 0;

    // Seed data for each topic
    for (const [topicSlug, conversations] of Object.entries(seedConversations)) {
      const topicId = topicMap[topicSlug];
      if (!topicId) {
        console.warn(`Topic not found: ${topicSlug}`);
        continue;
      }

      // Seed question threads
      for (const thread of conversations.question || []) {
        const { data: threadData, error: threadError } = await supabase
          .from('threads')
          .insert({
            title: thread.title,
            body: thread.body,
            thread_type: 'question',
            topic_id: topicId,
            author_id: authorId,
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
          })
          .select()
          .single();

        if (threadError) {
          console.error(`Error creating thread: ${thread.title}`, threadError);
          continue;
        }

        totalThreads++;

        // Add replies
        for (const reply of thread.replies || []) {
          const { error: postError } = await supabase.from('posts').insert({
            thread_id: threadData.id,
            body: reply,
            author_id: authorId,
            created_at: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
          });

          if (!postError) {
            totalPosts++;
          }
        }
      }

      // Seed feedback threads
      for (const thread of conversations.feedback || []) {
        const { data: threadData, error: threadError } = await supabase
          .from('threads')
          .insert({
            title: thread.title,
            body: thread.body,
            thread_type: 'feedback',
            topic_id: topicId,
            author_id: authorId,
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
          .select()
          .single();

        if (threadError) {
          console.error(`Error creating thread: ${thread.title}`, threadError);
          continue;
        }

        totalThreads++;

        // Add replies
        for (const reply of thread.replies || []) {
          const { error: postError } = await supabase.from('posts').insert({
            thread_id: threadData.id,
            body: reply,
            author_id: authorId,
            created_at: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
          });

          if (!postError) {
            totalPosts++;
          }
        }
      }
    }

    console.log(`✅ Seed data complete! Created ${totalThreads} threads and ${totalPosts} posts.`);
    return { success: true, threads: totalThreads, posts: totalPosts };
  } catch (error) {
    console.error('Error seeding community data:', error);
    throw error;
  }
}

// Export seed data for manual use
export { seedConversations };

