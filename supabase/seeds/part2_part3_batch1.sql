-- ============================================================================
-- IELTS Speaking Part 2 Cue Cards (100 total) + Part 3 Follow-up Questions
-- Categories: People (15), Places (15), Events (20), Objects (15),
--             Activities (15), Media (10), Abstract (10)
-- ============================================================================

-- ============================================================================
-- PART 2 CUE CARDS (100 rows)
-- ============================================================================

INSERT INTO public.questions (part, topic, question_text, cue_card_points, prep_seconds, min_speak_seconds, max_speak_seconds) VALUES

-- ===== PEOPLE (15) =====
(2, 'Influential People', 'Describe a person who has influenced you.', array['who this person is','how you know this person','what this person has done that influenced you','and explain why this person had such a strong influence on you'], 60, 60, 120),
(2, 'Famous People', 'Describe a famous person you admire.', array['who this person is','what this person is famous for','how you first learned about this person','and explain why you admire this person'], 60, 60, 120),
(2, 'Children and Humour', 'Describe a child who made you laugh.', array['who the child was','when and where this happened','what the child did or said','and explain why it was so funny to you'], 60, 60, 120),
(2, 'Teachers and Education', 'Describe a teacher you remember well.', array['who this teacher was and what they taught','when you had this teacher','what made this teacher special','and explain why you still remember this teacher'], 60, 60, 120),
(2, 'Elderly People', 'Describe an old person you respect.', array['who this person is','how you know this person','what this person is like','and explain why you respect this person'], 60, 60, 120),
(2, 'Childhood Friendships', 'Describe a friend you had when you were a child.', array['who this friend was','how you became friends','what you used to do together','and explain why this friendship was important to you'], 60, 60, 120),
(2, 'Family Relationships', 'Describe a family member you enjoy spending time with.', array['who this family member is','what you usually do together','how often you spend time with them','and explain why you enjoy their company'], 60, 60, 120),
(2, 'Language Skills', 'Describe a person who speaks a foreign language well.', array['who this person is','what language they speak','how they learned this language','and explain why you think they speak it so well'], 60, 60, 120),
(2, 'Cooking and Food', 'Describe someone you know who is good at cooking.', array['who this person is','what kinds of food they cook','how you know about their cooking skills','and explain why you think they are good at cooking'], 60, 60, 120),
(2, 'Problem Solving', 'Describe a person who solved a problem in a clever way.', array['who this person is','what the problem was','how they solved it','and explain why you think the solution was clever'], 60, 60, 120),
(2, 'Kindness and Strangers', 'Describe a time when a stranger helped you.', array['when and where this happened','what the situation was','how the stranger helped you','and explain how you felt about receiving help from a stranger'], 60, 60, 120),
(2, 'Leadership', 'Describe a leader you admire.', array['who this leader is','what they are known for','how you learned about them','and explain why you think they are a good leader'], 60, 60, 120),
(2, 'Creativity', 'Describe a creative person you know or have heard of.', array['who this person is','what creative things they do','how you know about this person','and explain why you consider them to be creative'], 60, 60, 120),
(2, 'Role Models', 'Describe a person older than you whom you admire.', array['who this person is','how you know this person','what qualities this person has','and explain why you admire them'], 60, 60, 120),
(2, 'Neighbours and Community', 'Describe a neighbour you know well.', array['who this neighbour is','how long you have known them','what kind of person they are','and explain how you get along with this neighbour'], 60, 60, 120),

-- ===== PLACES (15) =====
(2, 'Travel and Visits', 'Describe a place you visited recently.', array['where this place is','when you visited it','what you did there','and explain why you decided to visit this place'], 60, 60, 120),
(2, 'Living Spaces', 'Describe your favourite room in your home or another place.', array['which room it is','what it looks like','what you do in this room','and explain why it is your favourite room'], 60, 60, 120),
(2, 'Cities and Urban Life', 'Describe a beautiful city you have visited or know about.', array['what the city is called and where it is','what makes it beautiful','what you can do there','and explain why you would recommend this city to others'], 60, 60, 120),
(2, 'Parks and Nature', 'Describe a park or garden you enjoy visiting.', array['where this park or garden is','what it looks like','what you do when you go there','and explain why you enjoy visiting this place'], 60, 60, 120),
(2, 'Historical Places', 'Describe a historical building you have visited.', array['what the building is and where it is located','when you visited it','what you saw there','and explain why this building is historically important'], 60, 60, 120),
(2, 'Waterside Places', 'Describe a place near water that you like.', array['where this place is','what kind of water is there','what you do when you visit','and explain why you like this place'], 60, 60, 120),
(2, 'Crowded Places', 'Describe a crowded place you have been to.', array['where this place was','when you went there','why it was so crowded','and explain how you felt about being in such a crowded place'], 60, 60, 120),
(2, 'Relaxation', 'Describe a place where you go to relax.', array['where this place is','how often you go there','what you do to relax there','and explain why this place helps you relax'], 60, 60, 120),
(2, 'International Travel', 'Describe a foreign country you would like to visit.', array['which country it is','how you first heard about it','what you would like to do there','and explain why you want to visit this country'], 60, 60, 120),
(2, 'Childhood Memories', 'Describe a place that was special to you when you were a child.', array['where this place was','how often you went there','what you used to do there','and explain why this place was special to you as a child'], 60, 60, 120),
(2, 'Libraries and Reading', 'Describe a library you have visited.', array['where this library is','what it looks like','what you did there','and explain what you liked or disliked about this library'], 60, 60, 120),
(2, 'Shopping', 'Describe a shopping centre you like going to.', array['where this shopping centre is','what shops and facilities it has','how often you go there','and explain why you like this shopping centre'], 60, 60, 120),
(2, 'Markets and Trade', 'Describe a street market you have visited.', array['where the market is','what is sold there','when you visited it','and explain what you found interesting about this market'], 60, 60, 120),
(2, 'Quiet Places', 'Describe a quiet place you like to spend time in.', array['where this place is','how you discovered it','what you do there','and explain why you like the quietness of this place'], 60, 60, 120),
(2, 'Natural Landscapes', 'Describe a natural landscape that impressed you.', array['where this landscape is','when you saw it','what it looked like','and explain why it made such a strong impression on you'], 60, 60, 120),

-- ===== EVENTS (20) =====
(2, 'Weddings and Celebrations', 'Describe a wedding you attended.', array['whose wedding it was','where and when it took place','what happened at the wedding','and explain how you felt about attending this wedding'], 60, 60, 120),
(2, 'Festivals and Culture', 'Describe a festival or celebration you enjoyed.', array['what the festival was','when and where it took place','what you did during the festival','and explain why you enjoyed this festival'], 60, 60, 120),
(2, 'Helping Others', 'Describe a time you helped someone.', array['who you helped','what the situation was','how you helped them','and explain how you felt after helping this person'], 60, 60, 120),
(2, 'Competitions', 'Describe a competition you entered.', array['what kind of competition it was','when and where it took place','how you prepared for it','and explain how you felt about the experience'], 60, 60, 120),
(2, 'Outdoor Activities', 'Describe an outdoor activity you did recently.', array['what the activity was','where you did it','who you did it with','and explain why you enjoyed this activity'], 60, 60, 120),
(2, 'Sports Events', 'Describe a sports event you watched.', array['what the event was','when and where you watched it','who was playing or competing','and explain what made this event memorable for you'], 60, 60, 120),
(2, 'Getting Lost', 'Describe a time you got lost.', array['when and where this happened','why you got lost','what you did to find your way','and explain how you felt during this experience'], 60, 60, 120),
(2, 'Patience and Waiting', 'Describe a time you had to wait for something.', array['what you were waiting for','where you were waiting','how long you had to wait','and explain how you felt about waiting'], 60, 60, 120),
(2, 'Decision Making', 'Describe a difficult decision you had to make.', array['what the decision was about','what options you had','how you made the decision','and explain why this decision was difficult for you'], 60, 60, 120),
(2, 'Special Meals', 'Describe a special meal you had.', array['when and where you had this meal','who you had it with','what you ate','and explain why this meal was special to you'], 60, 60, 120),
(2, 'Public Transport', 'Describe a journey you made by public transport.', array['where you were going','what type of public transport you used','what happened during the journey','and explain how you felt about this journey'], 60, 60, 120),
(2, 'Surprises', 'Describe a time when you were pleasantly surprised.', array['when and where this happened','what the surprise was','who was involved','and explain why this surprise was so pleasant for you'], 60, 60, 120),
(2, 'New Experiences', 'Describe an activity you did for the first time.', array['what the activity was','when and where you did it','how you felt while doing it','and explain whether you would like to do it again'], 60, 60, 120),
(2, 'Sleep and Late Nights', 'Describe a time you stayed up very late.', array['when this was','why you stayed up late','what you were doing','and explain how you felt the next day'], 60, 60, 120),
(2, 'Teaching and Sharing Knowledge', 'Describe a time you taught someone something.', array['who you taught','what you taught them','how you taught them','and explain how you felt about the experience of teaching'], 60, 60, 120),
(2, 'Parties and Social Events', 'Describe a party you enjoyed.', array['what kind of party it was','where and when it took place','who was there','and explain why you enjoyed this party'], 60, 60, 120),
(2, 'Disagreements', 'Describe a time you disagreed with someone.', array['who you disagreed with','what the disagreement was about','how you handled the situation','and explain what the outcome of the disagreement was'], 60, 60, 120),
(2, 'Changing Opinions', 'Describe a time you changed your opinion about something.', array['what your original opinion was','what caused you to change your mind','how your opinion changed','and explain how you felt about changing your view'], 60, 60, 120),
(2, 'Advice', 'Describe a time you received good advice.', array['who gave you the advice','what the advice was about','when you received it','and explain why this advice was helpful to you'], 60, 60, 120),
(2, 'Holidays and Vacations', 'Describe a holiday you remember well.', array['when and where you went','who you went with','what you did during the holiday','and explain why this holiday is so memorable for you'], 60, 60, 120),

-- ===== OBJECTS (15) =====
(2, 'Gifts and Giving', 'Describe a gift you received that was special.', array['what the gift was','who gave it to you','when and why you received it','and explain why this gift was special to you'], 60, 60, 120),
(2, 'Technology', 'Describe a piece of technology you use every day.', array['what the technology is','when you first started using it','what you use it for','and explain why it is important to your daily life'], 60, 60, 120),
(2, 'Books and Reading', 'Describe a book that influenced your thinking.', array['what the book is called and who wrote it','what the book is about','when you read it','and explain how this book influenced you'], 60, 60, 120),
(2, 'Photography and Memories', 'Describe a photo you like.', array['what is in the photo','when and where it was taken','who took the photo','and explain why you like this photo'], 60, 60, 120),
(2, 'Clothing and Fashion', 'Describe a piece of clothing you enjoy wearing.', array['what the item of clothing is','when you got it','what it looks like','and explain why you enjoy wearing it'], 60, 60, 120),
(2, 'Handmade Items', 'Describe something you made by hand.', array['what you made','when and where you made it','how you made it','and explain how you felt about making it yourself'], 60, 60, 120),
(2, 'Childhood Toys', 'Describe a toy you enjoyed playing with as a child.', array['what the toy was','how you got it','how you used to play with it','and explain why this toy was special to you'], 60, 60, 120),
(2, 'Home and Furniture', 'Describe a piece of furniture in your home that you like.', array['what the piece of furniture is','where it is in your home','what it looks like','and explain why you like this piece of furniture'], 60, 60, 120),
(2, 'Internet and Websites', 'Describe a website you use often.', array['what the website is','how you found out about it','what you use it for','and explain why you find this website useful'], 60, 60, 120),
(2, 'Written Communication', 'Describe an important letter or email you received.', array['who it was from','what it was about','when you received it','and explain why this letter or email was important to you'], 60, 60, 120),
(2, 'Vehicles and Transport', 'Describe a vehicle you would like to own.', array['what type of vehicle it is','what it looks like','what features it has','and explain why you would like to own this vehicle'], 60, 60, 120),
(2, 'Consumer Choices', 'Describe something you bought recently that you are happy with.', array['what you bought','where and when you bought it','why you decided to buy it','and explain why you are happy with this purchase'], 60, 60, 120),
(2, 'Art and Aesthetics', 'Describe a piece of art you like.', array['what the artwork is','where you saw it','what it looks like or depicts','and explain why you like this piece of art'], 60, 60, 120),
(2, 'Musical Instruments', 'Describe a musical instrument you know about.', array['what the instrument is','how it is played','where you have heard it being played','and explain why you find this instrument interesting'], 60, 60, 120),
(2, 'Games and Play', 'Describe a game you enjoyed playing as a child.', array['what the game was','who you played it with','how the game was played','and explain why you enjoyed this game so much'], 60, 60, 120),

-- ===== ACTIVITIES (15) =====
(2, 'Hobbies', 'Describe a hobby you enjoy.', array['what the hobby is','when you started this hobby','how often you do it','and explain why you enjoy this hobby'], 60, 60, 120),
(2, 'Sports', 'Describe a sport you like playing or watching.', array['what the sport is','when you first became interested in it','how often you play or watch it','and explain why you like this sport'], 60, 60, 120),
(2, 'Learning Skills', 'Describe a skill you learned that you are proud of.', array['what the skill is','how you learned it','how long it took to learn','and explain why you are proud of learning this skill'], 60, 60, 120),
(2, 'Health and Fitness', 'Describe something you do to stay healthy.', array['what the activity is','how often you do it','when you started doing it','and explain how this activity helps you stay healthy'], 60, 60, 120),
(2, 'Family Activities', 'Describe an activity you enjoy doing with your family.', array['what the activity is','how often you do it with your family','what makes it enjoyable','and explain why this activity is important to your family'], 60, 60, 120),
(2, 'Courses and Education', 'Describe a course you would like to take in the future.', array['what the course is about','where you would take it','how long the course would last','and explain why you want to take this course'], 60, 60, 120),
(2, 'Daily Routines', 'Describe a daily routine you follow.', array['what the routine involves','when you do it during the day','how long you have been following this routine','and explain why this routine is important to you'], 60, 60, 120),
(2, 'Creative Activities', 'Describe a creative activity you enjoy.', array['what the activity is','how you got into it','what you create through this activity','and explain why this creative activity is satisfying for you'], 60, 60, 120),
(2, 'Projects and Teamwork', 'Describe a project you worked on.', array['what the project was about','who you worked with','what your role was in the project','and explain what you learned from this project'], 60, 60, 120),
(2, 'Environmental Actions', 'Describe something you do to help the environment.', array['what you do','how often you do it','when you started doing it','and explain why you think this action is important for the environment'], 60, 60, 120),
(2, 'Exercise', 'Describe an exercise or physical activity you enjoy.', array['what the exercise is','where you usually do it','how often you do it','and explain why you enjoy this form of exercise'], 60, 60, 120),
(2, 'Language Learning', 'Describe a language you would like to learn.', array['what the language is','why you are interested in it','how you plan to learn it','and explain what you would do if you could speak this language fluently'], 60, 60, 120),
(2, 'School Subjects', 'Describe a subject you enjoyed studying at school.', array['what the subject was','who taught it','what made it interesting','and explain why you enjoyed studying this subject'], 60, 60, 120),
(2, 'Outdoor Adventures', 'Describe an outdoor activity you tried for the first time.', array['what the activity was','where and when you tried it','who you were with','and explain how you felt about trying this new outdoor activity'], 60, 60, 120),
(2, 'Lifelong Learning', 'Describe something new you would like to learn.', array['what it is you want to learn','why you are interested in it','how you would go about learning it','and explain how learning this would benefit you'], 60, 60, 120),

-- ===== MEDIA (10) =====
(2, 'Films and Cinema', 'Describe a film you enjoyed watching.', array['what the film was called','what the story was about','when and where you watched it','and explain why you enjoyed this film'], 60, 60, 120),
(2, 'Television', 'Describe a TV programme you like watching.', array['what the programme is called','what it is about','how often you watch it','and explain why you like this programme'], 60, 60, 120),
(2, 'Music and Songs', 'Describe a song that means something special to you.', array['what the song is and who performs it','when you first heard it','what the song is about','and explain why this song means so much to you'], 60, 60, 120),
(2, 'Podcasts', 'Describe a podcast you listen to regularly.', array['what the podcast is called','what topics it covers','how you discovered it','and explain why you enjoy listening to this podcast'], 60, 60, 120),
(2, 'Social Media', 'Describe a social media account you follow.', array['what the account is about','what platform it is on','what kind of content it posts','and explain why you find this account interesting'], 60, 60, 120),
(2, 'Advertising', 'Describe an advertisement you remember well.', array['what product or service it advertised','where you saw or heard it','what happened in the advertisement','and explain why this advertisement is so memorable'], 60, 60, 120),
(2, 'News and Media', 'Describe a news story that interested you recently.', array['what the news story was about','where you heard or read about it','when this happened','and explain why this news story interested you'], 60, 60, 120),
(2, 'Magazines and Blogs', 'Describe a magazine or blog you enjoy reading.', array['what it is called','what topics it covers','how often you read it','and explain why you enjoy reading it'], 60, 60, 120),
(2, 'Comedy and Humour', 'Describe a comedian or funny person you like.', array['who this person is','what kind of comedy they do','how you first discovered them','and explain why you find this person funny'], 60, 60, 120),
(2, 'Traditional Stories', 'Describe a traditional story from your country.', array['what the story is about','who the main characters are','how you first heard this story','and explain why this story is important in your culture'], 60, 60, 120),

-- ===== ABSTRACT (10) =====
(2, 'Goals and Ambitions', 'Describe a goal you have set for yourself.', array['what the goal is','when you set this goal','what steps you are taking to achieve it','and explain why this goal is important to you'], 60, 60, 120),
(2, 'Laws and Justice', 'Describe a law in your country that you think is important.', array['what the law is','when it was introduced','who it affects','and explain why you think this law is important'], 60, 60, 120),
(2, 'Environmental Issues', 'Describe an environmental issue that concerns you.', array['what the issue is','how you became aware of it','what effects it is having','and explain why this issue concerns you'], 60, 60, 120),
(2, 'Community Development', 'Describe a change you would like to see in your local area.', array['what change you would like','why this change is needed','how it could be achieved','and explain how this change would benefit the community'], 60, 60, 120),
(2, 'Inventions and Innovation', 'Describe an important invention that has changed the world.', array['what the invention is','when it was invented','how it is used today','and explain why you think this invention is so important'], 60, 60, 120),
(2, 'Cultural Traditions', 'Describe a tradition in your culture that you value.', array['what the tradition is','when it is practised','what people do as part of this tradition','and explain why you value this tradition'], 60, 60, 120),
(2, 'Personal Achievement', 'Describe an achievement you are proud of.', array['what the achievement was','when it happened','how you accomplished it','and explain why you feel proud of this achievement'], 60, 60, 120),
(2, 'Risk Taking', 'Describe a risk you took that was worth it.', array['what the risk was','when you took it','why you decided to take this risk','and explain what happened as a result and why it was worth it'], 60, 60, 120),
(2, 'Advice and Wisdom', 'Describe a piece of advice that helped you in life.', array['what the advice was','who gave it to you','when you received this advice','and explain how this advice helped you'], 60, 60, 120),
(2, 'Future Plans', 'Describe a plan you have for the future.', array['what the plan is','when you hope to carry it out','what you need to do to prepare','and explain why this plan is important to you'], 60, 60, 120)

ON CONFLICT DO NOTHING;


-- ============================================================================
-- PART 3 FOLLOW-UP QUESTIONS (~450 rows)
-- ============================================================================

INSERT INTO public.questions (part, topic, question_text, cue_card_points, prep_seconds, min_speak_seconds, max_speak_seconds) VALUES

-- ===== PART 3: PEOPLE =====

-- Follow-ups for: Influential People
(3, 'Influential People', 'What qualities make a person influential in society?', null, 0, 30, 90),
(3, 'Influential People', 'Do public figures have a greater responsibility to be positive role models?', null, 0, 30, 90),
(3, 'Influential People', 'Has the type of person who influences young people changed over the years?', null, 0, 30, 90),
(3, 'Influential People', 'Is it possible for ordinary people to have a significant influence on others?', null, 0, 30, 90),
(3, 'Influential People', 'How has social media changed who is considered influential in modern society?', null, 0, 30, 90),

-- Follow-ups for: Famous People
(3, 'Famous People', 'Why do people admire celebrities so much in modern society?', null, 0, 30, 90),
(3, 'Famous People', 'What are the advantages and disadvantages of being famous?', null, 0, 30, 90),
(3, 'Famous People', 'Should famous people be expected to behave as role models?', null, 0, 30, 90),
(3, 'Famous People', 'How has the concept of fame changed in the age of social media?', null, 0, 30, 90),
(3, 'Famous People', 'Do famous people have a responsibility to use their influence for social causes?', null, 0, 30, 90),

-- Follow-ups for: Children and Humour
(3, 'Children and Humour', 'Why is humour important for children''s development?', null, 0, 30, 90),
(3, 'Children and Humour', 'Do children and adults have different senses of humour, and why?', null, 0, 30, 90),
(3, 'Children and Humour', 'How does laughter benefit people''s health and well-being?', null, 0, 30, 90),
(3, 'Children and Humour', 'Is it important for schools to encourage a sense of humour in the classroom?', null, 0, 30, 90),
(3, 'Children and Humour', 'Do different cultures have different attitudes towards children being humorous?', null, 0, 30, 90),

-- Follow-ups for: Teachers and Education
(3, 'Teachers and Education', 'What qualities make an effective teacher?', null, 0, 30, 90),
(3, 'Teachers and Education', 'How has the role of teachers changed compared to previous generations?', null, 0, 30, 90),
(3, 'Teachers and Education', 'Should teachers be paid more to reflect their importance in society?', null, 0, 30, 90),
(3, 'Teachers and Education', 'Can technology ever fully replace human teachers in the classroom?', null, 0, 30, 90),
(3, 'Teachers and Education', 'Why do some teachers have a lasting impact on their students?', null, 0, 30, 90),

-- Follow-ups for: Elderly People
(3, 'Elderly People', 'How are elderly people treated in different cultures around the world?', null, 0, 30, 90),
(3, 'Elderly People', 'What role should elderly people play in modern society?', null, 0, 30, 90),
(3, 'Elderly People', 'Is it better for old people to live with their families or in care homes?', null, 0, 30, 90),
(3, 'Elderly People', 'How can governments better support an ageing population?', null, 0, 30, 90),
(3, 'Elderly People', 'What valuable knowledge can younger generations learn from older people?', null, 0, 30, 90),

-- Follow-ups for: Childhood Friendships
(3, 'Childhood Friendships', 'Why are childhood friendships often considered special?', null, 0, 30, 90),
(3, 'Childhood Friendships', 'How do friendships change as people grow older?', null, 0, 30, 90),
(3, 'Childhood Friendships', 'Is it more difficult for children to make friends today than in the past?', null, 0, 30, 90),
(3, 'Childhood Friendships', 'What role do friendships play in a child''s emotional development?', null, 0, 30, 90),
(3, 'Childhood Friendships', 'Should parents be involved in choosing their children''s friends?', null, 0, 30, 90),

-- Follow-ups for: Family Relationships
(3, 'Family Relationships', 'How have family structures changed in recent decades?', null, 0, 30, 90),
(3, 'Family Relationships', 'Is it important for families to spend time together regularly?', null, 0, 30, 90),
(3, 'Family Relationships', 'What challenges do modern families face in maintaining strong relationships?', null, 0, 30, 90),
(3, 'Family Relationships', 'How does technology affect family communication and bonding?', null, 0, 30, 90),
(3, 'Family Relationships', 'What role does the extended family play in different cultures?', null, 0, 30, 90),

-- Follow-ups for: Language Skills
(3, 'Language Skills', 'What are the benefits of being able to speak more than one language?', null, 0, 30, 90),
(3, 'Language Skills', 'At what age should children start learning a foreign language?', null, 0, 30, 90),
(3, 'Language Skills', 'Will artificial intelligence translation tools make language learning unnecessary?', null, 0, 30, 90),
(3, 'Language Skills', 'Why do some people find it easier to learn languages than others?', null, 0, 30, 90),
(3, 'Language Skills', 'How important is it for a country''s population to be multilingual in a globalised world?', null, 0, 30, 90),

-- Follow-ups for: Cooking and Food
(3, 'Cooking and Food', 'Why are traditional cooking methods being lost in many cultures?', null, 0, 30, 90),
(3, 'Cooking and Food', 'Should cooking be a mandatory subject in schools?', null, 0, 30, 90),
(3, 'Cooking and Food', 'How has the fast food industry affected people''s cooking habits?', null, 0, 30, 90),
(3, 'Cooking and Food', 'What are the social benefits of cooking and eating together?', null, 0, 30, 90),
(3, 'Cooking and Food', 'Is there a difference between cooking as a necessity and cooking as an art form?', null, 0, 30, 90),

-- Follow-ups for: Problem Solving
(3, 'Problem Solving', 'What skills are needed to solve problems effectively?', null, 0, 30, 90),
(3, 'Problem Solving', 'Should schools focus more on teaching problem-solving skills?', null, 0, 30, 90),
(3, 'Problem Solving', 'Is creativity more important than logic when solving complex problems?', null, 0, 30, 90),
(3, 'Problem Solving', 'How do cultural differences influence approaches to problem solving?', null, 0, 30, 90),
(3, 'Problem Solving', 'Can artificial intelligence solve problems better than humans?', null, 0, 30, 90),

-- Follow-ups for: Kindness and Strangers
(3, 'Kindness and Strangers', 'Why do some people hesitate to help strangers?', null, 0, 30, 90),
(3, 'Kindness and Strangers', 'Is society becoming less willing to help others compared to the past?', null, 0, 30, 90),
(3, 'Kindness and Strangers', 'What motivates people to perform acts of kindness for strangers?', null, 0, 30, 90),
(3, 'Kindness and Strangers', 'Should kindness and community service be taught in schools?', null, 0, 30, 90),
(3, 'Kindness and Strangers', 'How does helping others benefit the person who gives the help?', null, 0, 30, 90),

-- Follow-ups for: Leadership
(3, 'Leadership', 'What qualities are essential for effective leadership?', null, 0, 30, 90),
(3, 'Leadership', 'Are leaders born with leadership skills or can these skills be developed?', null, 0, 30, 90),
(3, 'Leadership', 'How has the style of leadership changed over the past century?', null, 0, 30, 90),
(3, 'Leadership', 'Should leaders always follow public opinion or make independent decisions?', null, 0, 30, 90),
(3, 'Leadership', 'What is more important in a leader: intelligence or emotional understanding?', null, 0, 30, 90),

-- Follow-ups for: Creativity
(3, 'Creativity', 'Can creativity be taught, or is it something people are born with?', null, 0, 30, 90),
(3, 'Creativity', 'Why is creativity important in the modern workplace?', null, 0, 30, 90),
(3, 'Creativity', 'How do schools encourage or discourage creative thinking?', null, 0, 30, 90),
(3, 'Creativity', 'Is creativity more valued in some professions than others?', null, 0, 30, 90),
(3, 'Creativity', 'How does technology affect people''s ability to be creative?', null, 0, 30, 90),

-- Follow-ups for: Role Models
(3, 'Role Models', 'Why is it important for young people to have positive role models?', null, 0, 30, 90),
(3, 'Role Models', 'Should role models come from within the family or from public life?', null, 0, 30, 90),
(3, 'Role Models', 'How do role models differ across different cultures?', null, 0, 30, 90),
(3, 'Role Models', 'Is there a danger in idolising certain public figures as role models?', null, 0, 30, 90),
(3, 'Role Models', 'What qualities should a good role model possess?', null, 0, 30, 90),

-- Follow-ups for: Neighbours and Community
(3, 'Neighbours and Community', 'How important is it to have a good relationship with neighbours?', null, 0, 30, 90),
(3, 'Neighbours and Community', 'Are people less connected to their neighbours now than in the past?', null, 0, 30, 90),
(3, 'Neighbours and Community', 'What factors contribute to a strong sense of community?', null, 0, 30, 90),
(3, 'Neighbours and Community', 'How can urban planning help build better communities?', null, 0, 30, 90),
(3, 'Neighbours and Community', 'What role do community events play in bringing people together?', null, 0, 30, 90),

-- ===== PART 3: PLACES =====

-- Follow-ups for: Travel and Visits
(3, 'Travel and Visits', 'Why do people enjoy travelling to new places?', null, 0, 30, 90),
(3, 'Travel and Visits', 'How has tourism changed local cultures and economies?', null, 0, 30, 90),
(3, 'Travel and Visits', 'Is it better to travel independently or with a tour group?', null, 0, 30, 90),
(3, 'Travel and Visits', 'What are the environmental impacts of mass tourism?', null, 0, 30, 90),
(3, 'Travel and Visits', 'Should governments invest more in promoting domestic tourism?', null, 0, 30, 90),

-- Follow-ups for: Living Spaces
(3, 'Living Spaces', 'How does the design of a home affect the people living in it?', null, 0, 30, 90),
(3, 'Living Spaces', 'What are the differences between urban and rural living spaces?', null, 0, 30, 90),
(3, 'Living Spaces', 'Is it important for people to have their own personal space at home?', null, 0, 30, 90),
(3, 'Living Spaces', 'How have living spaces changed over the past few decades?', null, 0, 30, 90),
(3, 'Living Spaces', 'What role does interior design play in people''s well-being?', null, 0, 30, 90),

-- Follow-ups for: Cities and Urban Life
(3, 'Cities and Urban Life', 'What makes a city a good place to live?', null, 0, 30, 90),
(3, 'Cities and Urban Life', 'How can cities be made more sustainable and environmentally friendly?', null, 0, 30, 90),
(3, 'Cities and Urban Life', 'What are the main challenges facing rapidly growing cities?', null, 0, 30, 90),
(3, 'Cities and Urban Life', 'Should cities prioritise preserving old buildings or constructing modern ones?', null, 0, 30, 90),
(3, 'Cities and Urban Life', 'How does city life differ from rural life in terms of quality of living?', null, 0, 30, 90),

-- Follow-ups for: Parks and Nature
(3, 'Parks and Nature', 'Why are green spaces important in urban areas?', null, 0, 30, 90),
(3, 'Parks and Nature', 'How do parks contribute to the physical and mental health of communities?', null, 0, 30, 90),
(3, 'Parks and Nature', 'Should governments invest more in creating and maintaining public parks?', null, 0, 30, 90),
(3, 'Parks and Nature', 'How can cities balance development with preserving green spaces?', null, 0, 30, 90),
(3, 'Parks and Nature', 'What activities should be available in public parks to serve all age groups?', null, 0, 30, 90),

-- Follow-ups for: Historical Places
(3, 'Historical Places', 'Why is it important to preserve historical buildings?', null, 0, 30, 90),
(3, 'Historical Places', 'Who should be responsible for funding the preservation of historical sites?', null, 0, 30, 90),
(3, 'Historical Places', 'How can historical buildings be used effectively in modern times?', null, 0, 30, 90),
(3, 'Historical Places', 'Is there a conflict between modernisation and historical preservation?', null, 0, 30, 90),
(3, 'Historical Places', 'What role do historical sites play in educating future generations?', null, 0, 30, 90),

-- Follow-ups for: Waterside Places
(3, 'Waterside Places', 'Why are places near water often popular with tourists?', null, 0, 30, 90),
(3, 'Waterside Places', 'How does water pollution affect communities living near rivers and coasts?', null, 0, 30, 90),
(3, 'Waterside Places', 'What measures should governments take to protect natural water bodies?', null, 0, 30, 90),
(3, 'Waterside Places', 'Is living near water beneficial for mental health?', null, 0, 30, 90),
(3, 'Waterside Places', 'How has climate change affected coastal and waterside areas?', null, 0, 30, 90),

-- Follow-ups for: Crowded Places
(3, 'Crowded Places', 'What problems do overcrowded cities face?', null, 0, 30, 90),
(3, 'Crowded Places', 'How does overcrowding affect people''s quality of life?', null, 0, 30, 90),
(3, 'Crowded Places', 'What can governments do to manage population density in cities?', null, 0, 30, 90),
(3, 'Crowded Places', 'Are some people more comfortable in crowded environments than others, and why?', null, 0, 30, 90),
(3, 'Crowded Places', 'How can public events be organised to manage large crowds safely?', null, 0, 30, 90),

-- Follow-ups for: Relaxation
(3, 'Relaxation', 'Why is relaxation important for people''s health?', null, 0, 30, 90),
(3, 'Relaxation', 'How do methods of relaxation differ between generations?', null, 0, 30, 90),
(3, 'Relaxation', 'Is modern life making it harder for people to relax effectively?', null, 0, 30, 90),
(3, 'Relaxation', 'What role does nature play in helping people feel relaxed?', null, 0, 30, 90),
(3, 'Relaxation', 'Should employers provide relaxation facilities for their workers?', null, 0, 30, 90),

-- Follow-ups for: International Travel
(3, 'International Travel', 'How does international travel broaden people''s perspectives?', null, 0, 30, 90),
(3, 'International Travel', 'What are the potential negative effects of international tourism on local cultures?', null, 0, 30, 90),
(3, 'International Travel', 'Should international travel be made more accessible to people of all income levels?', null, 0, 30, 90),
(3, 'International Travel', 'How has air travel changed the way people experience other countries?', null, 0, 30, 90),
(3, 'International Travel', 'What responsibilities do travellers have towards the countries they visit?', null, 0, 30, 90),

-- Follow-ups for: Childhood Memories
(3, 'Childhood Memories', 'Why do people tend to remember childhood experiences so vividly?', null, 0, 30, 90),
(3, 'Childhood Memories', 'How do childhood experiences shape a person''s character as an adult?', null, 0, 30, 90),
(3, 'Childhood Memories', 'Are childhood experiences today very different from those of previous generations?', null, 0, 30, 90),
(3, 'Childhood Memories', 'Is it important for children to have access to outdoor play spaces?', null, 0, 30, 90),
(3, 'Childhood Memories', 'How does nostalgia influence the way people remember the past?', null, 0, 30, 90),

-- Follow-ups for: Libraries and Reading
(3, 'Libraries and Reading', 'Are public libraries still relevant in the digital age?', null, 0, 30, 90),
(3, 'Libraries and Reading', 'How can libraries adapt to remain useful in modern society?', null, 0, 30, 90),
(3, 'Libraries and Reading', 'What role do libraries play in promoting literacy and education?', null, 0, 30, 90),
(3, 'Libraries and Reading', 'Should governments continue to fund public libraries?', null, 0, 30, 90),
(3, 'Libraries and Reading', 'How has the way people read changed with the introduction of e-books and audiobooks?', null, 0, 30, 90),

-- Follow-ups for: Shopping
(3, 'Shopping', 'How has online shopping changed the way people buy things?', null, 0, 30, 90),
(3, 'Shopping', 'What are the advantages and disadvantages of large shopping centres?', null, 0, 30, 90),
(3, 'Shopping', 'Will physical shops eventually be replaced by online stores?', null, 0, 30, 90),
(3, 'Shopping', 'How does consumer culture affect the environment?', null, 0, 30, 90),
(3, 'Shopping', 'Is shopping more of a necessity or a leisure activity in modern society?', null, 0, 30, 90),

-- Follow-ups for: Markets and Trade
(3, 'Markets and Trade', 'Why are street markets popular in many countries?', null, 0, 30, 90),
(3, 'Markets and Trade', 'How do traditional markets differ from modern supermarkets?', null, 0, 30, 90),
(3, 'Markets and Trade', 'Should governments do more to protect traditional markets from disappearing?', null, 0, 30, 90),
(3, 'Markets and Trade', 'What is the economic importance of local markets for small businesses?', null, 0, 30, 90),
(3, 'Markets and Trade', 'How do markets contribute to the cultural identity of a community?', null, 0, 30, 90),

-- Follow-ups for: Quiet Places
(3, 'Quiet Places', 'Is noise pollution a serious problem in modern cities?', null, 0, 30, 90),
(3, 'Quiet Places', 'How does constant noise affect people''s productivity and mental health?', null, 0, 30, 90),
(3, 'Quiet Places', 'What can city planners do to create quieter urban environments?', null, 0, 30, 90),
(3, 'Quiet Places', 'Do people today have less access to quiet places than in the past?', null, 0, 30, 90),
(3, 'Quiet Places', 'Why do some people prefer quiet environments while others prefer lively ones?', null, 0, 30, 90),

-- Follow-ups for: Natural Landscapes
(3, 'Natural Landscapes', 'Why is it important to protect natural landscapes from development?', null, 0, 30, 90),
(3, 'Natural Landscapes', 'How does experiencing nature benefit people''s well-being?', null, 0, 30, 90),
(3, 'Natural Landscapes', 'What are the biggest threats to natural landscapes today?', null, 0, 30, 90),
(3, 'Natural Landscapes', 'Should access to national parks and natural areas be free for everyone?', null, 0, 30, 90),
(3, 'Natural Landscapes', 'How can tourism and environmental conservation coexist in natural areas?', null, 0, 30, 90),

-- ===== PART 3: EVENTS =====

-- Follow-ups for: Weddings and Celebrations
(3, 'Weddings and Celebrations', 'How have wedding traditions changed in recent years?', null, 0, 30, 90),
(3, 'Weddings and Celebrations', 'Why do many people spend large amounts of money on weddings?', null, 0, 30, 90),
(3, 'Weddings and Celebrations', 'Are traditional wedding customs still important in modern society?', null, 0, 30, 90),
(3, 'Weddings and Celebrations', 'How do wedding customs differ across cultures?', null, 0, 30, 90),
(3, 'Weddings and Celebrations', 'Is the commercialisation of weddings a positive or negative trend?', null, 0, 30, 90),

-- Follow-ups for: Festivals and Culture
(3, 'Festivals and Culture', 'What role do festivals play in preserving cultural identity?', null, 0, 30, 90),
(3, 'Festivals and Culture', 'Are traditional festivals losing their significance in modern times?', null, 0, 30, 90),
(3, 'Festivals and Culture', 'How do festivals contribute to the local economy?', null, 0, 30, 90),
(3, 'Festivals and Culture', 'Should governments fund cultural festivals and events?', null, 0, 30, 90),
(3, 'Festivals and Culture', 'How has globalisation affected local festivals and traditions?', null, 0, 30, 90),

-- Follow-ups for: Helping Others
(3, 'Helping Others', 'Why is it important for communities to have a culture of helping others?', null, 0, 30, 90),
(3, 'Helping Others', 'Should people be expected to do voluntary work for their communities?', null, 0, 30, 90),
(3, 'Helping Others', 'How has the concept of charity changed in the modern world?', null, 0, 30, 90),
(3, 'Helping Others', 'Are people more or less willing to help others compared to previous generations?', null, 0, 30, 90),
(3, 'Helping Others', 'What is the role of non-governmental organisations in helping communities?', null, 0, 30, 90),

-- Follow-ups for: Competitions
(3, 'Competitions', 'What are the benefits of competition for individuals and society?', null, 0, 30, 90),
(3, 'Competitions', 'Can competition have negative effects on people, especially children?', null, 0, 30, 90),
(3, 'Competitions', 'How important is winning compared to participating in a competition?', null, 0, 30, 90),
(3, 'Competitions', 'Should schools encourage more competitive or collaborative activities?', null, 0, 30, 90),
(3, 'Competitions', 'How does competition drive innovation in business and technology?', null, 0, 30, 90),

-- Follow-ups for: Outdoor Activities
(3, 'Outdoor Activities', 'Why are outdoor activities important for people''s health?', null, 0, 30, 90),
(3, 'Outdoor Activities', 'Are children spending less time outdoors than previous generations?', null, 0, 30, 90),
(3, 'Outdoor Activities', 'How can governments encourage people to participate in outdoor activities?', null, 0, 30, 90),
(3, 'Outdoor Activities', 'What are the risks associated with extreme outdoor sports?', null, 0, 30, 90),
(3, 'Outdoor Activities', 'How do outdoor activities contribute to community building?', null, 0, 30, 90),

-- Follow-ups for: Sports Events
(3, 'Sports Events', 'Why are major sporting events so popular around the world?', null, 0, 30, 90),
(3, 'Sports Events', 'What are the economic benefits and drawbacks of hosting international sports events?', null, 0, 30, 90),
(3, 'Sports Events', 'How does watching sports bring people from different backgrounds together?', null, 0, 30, 90),
(3, 'Sports Events', 'Should governments invest heavily in sports infrastructure?', null, 0, 30, 90),
(3, 'Sports Events', 'How has technology changed the way people watch and experience sports?', null, 0, 30, 90),

-- Follow-ups for: Getting Lost
(3, 'Getting Lost', 'Has technology made it almost impossible to get lost these days?', null, 0, 30, 90),
(3, 'Getting Lost', 'Are people too dependent on GPS and navigation technology?', null, 0, 30, 90),
(3, 'Getting Lost', 'Is it important for people to develop a good sense of direction?', null, 0, 30, 90),
(3, 'Getting Lost', 'How do people in different cultures navigate and find their way around?', null, 0, 30, 90),
(3, 'Getting Lost', 'Can getting lost ever be a positive experience?', null, 0, 30, 90),

-- Follow-ups for: Patience and Waiting
(3, 'Patience and Waiting', 'Is patience a quality that is becoming rarer in modern society?', null, 0, 30, 90),
(3, 'Patience and Waiting', 'How has technology changed people''s ability to be patient?', null, 0, 30, 90),
(3, 'Patience and Waiting', 'Why do some people find it harder to wait than others?', null, 0, 30, 90),
(3, 'Patience and Waiting', 'What are effective ways to teach children the value of patience?', null, 0, 30, 90),
(3, 'Patience and Waiting', 'How does instant gratification culture affect society''s overall well-being?', null, 0, 30, 90),

-- Follow-ups for: Decision Making
(3, 'Decision Making', 'What factors influence the decisions people make in life?', null, 0, 30, 90),
(3, 'Decision Making', 'Do people make better decisions when they take time to think or when they act quickly?', null, 0, 30, 90),
(3, 'Decision Making', 'How does having too many choices affect people''s ability to decide?', null, 0, 30, 90),
(3, 'Decision Making', 'Should important decisions be made individually or collectively?', null, 0, 30, 90),
(3, 'Decision Making', 'How do cultural values influence the way people make decisions?', null, 0, 30, 90),

-- Follow-ups for: Special Meals
(3, 'Special Meals', 'How important is food in bringing people together socially?', null, 0, 30, 90),
(3, 'Special Meals', 'Are traditional meals and recipes being lost in modern society?', null, 0, 30, 90),
(3, 'Special Meals', 'How has the restaurant industry changed dining habits?', null, 0, 30, 90),
(3, 'Special Meals', 'What role does food play in cultural celebrations around the world?', null, 0, 30, 90),
(3, 'Special Meals', 'Is the trend of food photography on social media affecting the way people experience dining?', null, 0, 30, 90),

-- Follow-ups for: Public Transport
(3, 'Public Transport', 'What are the advantages of public transport over private vehicles?', null, 0, 30, 90),
(3, 'Public Transport', 'How can governments encourage more people to use public transport?', null, 0, 30, 90),
(3, 'Public Transport', 'What improvements need to be made to public transport systems in most cities?', null, 0, 30, 90),
(3, 'Public Transport', 'How does reliable public transport affect a city''s economy?', null, 0, 30, 90),
(3, 'Public Transport', 'Will self-driving vehicles change the future of public transport?', null, 0, 30, 90),

-- Follow-ups for: Surprises
(3, 'Surprises', 'Why do people generally enjoy being surprised?', null, 0, 30, 90),
(3, 'Surprises', 'Are surprises always a positive thing, or can they have negative effects?', null, 0, 30, 90),
(3, 'Surprises', 'How do different cultures view the idea of surprising others?', null, 0, 30, 90),
(3, 'Surprises', 'Is it becoming harder to surprise people in the age of social media?', null, 0, 30, 90),
(3, 'Surprises', 'What makes a surprise memorable and meaningful?', null, 0, 30, 90),

-- Follow-ups for: New Experiences
(3, 'New Experiences', 'Why is it important for people to try new things throughout their lives?', null, 0, 30, 90),
(3, 'New Experiences', 'What prevents people from stepping outside their comfort zone?', null, 0, 30, 90),
(3, 'New Experiences', 'How do new experiences contribute to personal growth?', null, 0, 30, 90),
(3, 'New Experiences', 'Is it better to have a wide range of experiences or to specialise in one area?', null, 0, 30, 90),
(3, 'New Experiences', 'How does society benefit when people are open to new experiences?', null, 0, 30, 90),

-- Follow-ups for: Sleep and Late Nights
(3, 'Sleep and Late Nights', 'Why is getting enough sleep important for health and productivity?', null, 0, 30, 90),
(3, 'Sleep and Late Nights', 'How has modern technology affected people''s sleep patterns?', null, 0, 30, 90),
(3, 'Sleep and Late Nights', 'What are the long-term health effects of sleep deprivation on a population?', null, 0, 30, 90),
(3, 'Sleep and Late Nights', 'Should workplaces consider flexible hours to accommodate different sleep patterns?', null, 0, 30, 90),
(3, 'Sleep and Late Nights', 'How do attitudes towards sleep differ across cultures?', null, 0, 30, 90),

-- Follow-ups for: Teaching and Sharing Knowledge
(3, 'Teaching and Sharing Knowledge', 'Is teaching a skill that everyone should develop?', null, 0, 30, 90),
(3, 'Teaching and Sharing Knowledge', 'How has the internet changed the way knowledge is shared globally?', null, 0, 30, 90),
(3, 'Teaching and Sharing Knowledge', 'What are the most effective ways to teach complex concepts to beginners?', null, 0, 30, 90),
(3, 'Teaching and Sharing Knowledge', 'Should knowledge be freely available to everyone, or is it acceptable to charge for expertise?', null, 0, 30, 90),
(3, 'Teaching and Sharing Knowledge', 'How does peer-to-peer learning compare to traditional classroom teaching?', null, 0, 30, 90),

-- Follow-ups for: Parties and Social Events
(3, 'Parties and Social Events', 'How have social gatherings and parties changed in recent decades?', null, 0, 30, 90),
(3, 'Parties and Social Events', 'What role do social events play in building relationships?', null, 0, 30, 90),
(3, 'Parties and Social Events', 'Are online social events a suitable replacement for face-to-face gatherings?', null, 0, 30, 90),
(3, 'Parties and Social Events', 'How do cultural norms influence the way people socialise?', null, 0, 30, 90),
(3, 'Parties and Social Events', 'Is there too much pressure on people to socialise in modern society?', null, 0, 30, 90),

-- Follow-ups for: Disagreements
(3, 'Disagreements', 'Is it healthy for people to express disagreement openly?', null, 0, 30, 90),
(3, 'Disagreements', 'How can conflicts be resolved constructively in the workplace?', null, 0, 30, 90),
(3, 'Disagreements', 'What causes disagreements between different generations?', null, 0, 30, 90),
(3, 'Disagreements', 'Are people more polarised in their opinions now than in the past?', null, 0, 30, 90),
(3, 'Disagreements', 'What role does compromise play in maintaining healthy relationships?', null, 0, 30, 90),

-- Follow-ups for: Changing Opinions
(3, 'Changing Opinions', 'Why is it important for people to be open to changing their opinions?', null, 0, 30, 90),
(3, 'Changing Opinions', 'What factors cause people to change their views on important issues?', null, 0, 30, 90),
(3, 'Changing Opinions', 'Is it a sign of strength or weakness to change one''s mind publicly?', null, 0, 30, 90),
(3, 'Changing Opinions', 'How does media influence public opinion on social and political issues?', null, 0, 30, 90),
(3, 'Changing Opinions', 'Can education effectively change deeply held beliefs in a society?', null, 0, 30, 90),

-- Follow-ups for: Advice
(3, 'Advice', 'Why do people sometimes find it difficult to accept advice from others?', null, 0, 30, 90),
(3, 'Advice', 'Is advice from older generations still relevant in today''s rapidly changing world?', null, 0, 30, 90),
(3, 'Advice', 'What is the difference between good advice and bad advice?', null, 0, 30, 90),
(3, 'Advice', 'How has the internet changed the way people seek and receive advice?', null, 0, 30, 90),
(3, 'Advice', 'Should professional counselling services be more widely available in communities?', null, 0, 30, 90),

-- Follow-ups for: Holidays and Vacations
(3, 'Holidays and Vacations', 'Why are holidays important for people''s mental health?', null, 0, 30, 90),
(3, 'Holidays and Vacations', 'How has the way people spend their holidays changed over time?', null, 0, 30, 90),
(3, 'Holidays and Vacations', 'Should all workers be entitled to a minimum amount of paid holiday?', null, 0, 30, 90),
(3, 'Holidays and Vacations', 'What impact does the holiday industry have on the environment?', null, 0, 30, 90),
(3, 'Holidays and Vacations', 'Is it better to relax on holiday or to be active and explore?', null, 0, 30, 90),

-- ===== PART 3: OBJECTS =====

-- Follow-ups for: Gifts and Giving
(3, 'Gifts and Giving', 'Is gift-giving becoming too commercialised in modern society?', null, 0, 30, 90),
(3, 'Gifts and Giving', 'What makes a gift truly meaningful?', null, 0, 30, 90),
(3, 'Gifts and Giving', 'How do gift-giving customs differ across cultures?', null, 0, 30, 90),
(3, 'Gifts and Giving', 'Is it better to give practical gifts or sentimental ones?', null, 0, 30, 90),
(3, 'Gifts and Giving', 'How has online shopping changed the way people choose and send gifts?', null, 0, 30, 90),

-- Follow-ups for: Technology
(3, 'Technology', 'How has technology changed the way people communicate?', null, 0, 30, 90),
(3, 'Technology', 'Are people becoming too dependent on technology in everyday life?', null, 0, 30, 90),
(3, 'Technology', 'What are the risks of rapid technological advancement for society?', null, 0, 30, 90),
(3, 'Technology', 'How can the digital divide between rich and poor countries be addressed?', null, 0, 30, 90),
(3, 'Technology', 'Should there be stricter regulations on how technology companies use personal data?', null, 0, 30, 90),

-- Follow-ups for: Books and Reading
(3, 'Books and Reading', 'Why is reading important for intellectual development?', null, 0, 30, 90),
(3, 'Books and Reading', 'Are people reading less than previous generations, and does it matter?', null, 0, 30, 90),
(3, 'Books and Reading', 'How have digital books changed the publishing industry?', null, 0, 30, 90),
(3, 'Books and Reading', 'What types of books are most beneficial for children to read?', null, 0, 30, 90),
(3, 'Books and Reading', 'Can reading fiction improve a person''s empathy and understanding of others?', null, 0, 30, 90),

-- Follow-ups for: Photography and Memories
(3, 'Photography and Memories', 'How has digital photography changed the way people capture memories?', null, 0, 30, 90),
(3, 'Photography and Memories', 'Is taking too many photos preventing people from fully experiencing the moment?', null, 0, 30, 90),
(3, 'Photography and Memories', 'What is the value of photography as an art form in modern society?', null, 0, 30, 90),
(3, 'Photography and Memories', 'How do photographs help preserve cultural and historical heritage?', null, 0, 30, 90),
(3, 'Photography and Memories', 'Should there be limits on photography in public spaces for privacy reasons?', null, 0, 30, 90),

-- Follow-ups for: Clothing and Fashion
(3, 'Clothing and Fashion', 'How does fashion reflect cultural identity?', null, 0, 30, 90),
(3, 'Clothing and Fashion', 'What are the environmental impacts of the fast fashion industry?', null, 0, 30, 90),
(3, 'Clothing and Fashion', 'Should schools require students to wear uniforms?', null, 0, 30, 90),
(3, 'Clothing and Fashion', 'How does clothing influence the way people are perceived by others?', null, 0, 30, 90),
(3, 'Clothing and Fashion', 'Is sustainable fashion a realistic goal for the industry?', null, 0, 30, 90),

-- Follow-ups for: Handmade Items
(3, 'Handmade Items', 'Why are handmade products often valued more highly than mass-produced ones?', null, 0, 30, 90),
(3, 'Handmade Items', 'Are traditional crafts and handmade skills being lost in modern society?', null, 0, 30, 90),
(3, 'Handmade Items', 'How can governments support traditional artisans and craftspeople?', null, 0, 30, 90),
(3, 'Handmade Items', 'Is there a growing trend towards handmade and artisanal products, and why?', null, 0, 30, 90),
(3, 'Handmade Items', 'What are the benefits of learning to make things by hand?', null, 0, 30, 90),

-- Follow-ups for: Childhood Toys
(3, 'Childhood Toys', 'How have children''s toys changed over the past few decades?', null, 0, 30, 90),
(3, 'Childhood Toys', 'Are electronic toys better or worse for children''s development than traditional ones?', null, 0, 30, 90),
(3, 'Childhood Toys', 'Should there be stricter safety regulations on toys manufactured for children?', null, 0, 30, 90),
(3, 'Childhood Toys', 'How does play contribute to a child''s learning and social development?', null, 0, 30, 90),
(3, 'Childhood Toys', 'Is the toy industry too focused on marketing and consumerism?', null, 0, 30, 90),

-- Follow-ups for: Home and Furniture
(3, 'Home and Furniture', 'How does the furniture people choose reflect their personality?', null, 0, 30, 90),
(3, 'Home and Furniture', 'Is it better to buy high-quality furniture that lasts or cheaper alternatives?', null, 0, 30, 90),
(3, 'Home and Furniture', 'How has the rise of flat-pack furniture changed consumer habits?', null, 0, 30, 90),
(3, 'Home and Furniture', 'What impact does disposable furniture culture have on the environment?', null, 0, 30, 90),
(3, 'Home and Furniture', 'How important is it for a home to be well-furnished and comfortable?', null, 0, 30, 90),

-- Follow-ups for: Internet and Websites
(3, 'Internet and Websites', 'How has the internet changed the way people access information?', null, 0, 30, 90),
(3, 'Internet and Websites', 'What are the dangers of misinformation on the internet?', null, 0, 30, 90),
(3, 'Internet and Websites', 'Should there be more regulation of content on the internet?', null, 0, 30, 90),
(3, 'Internet and Websites', 'How has the internet affected traditional media such as newspapers and television?', null, 0, 30, 90),
(3, 'Internet and Websites', 'Is internet access a basic human right in the modern world?', null, 0, 30, 90),

-- Follow-ups for: Written Communication
(3, 'Written Communication', 'How has digital communication changed the way people write?', null, 0, 30, 90),
(3, 'Written Communication', 'Is the art of letter writing being lost, and does it matter?', null, 0, 30, 90),
(3, 'Written Communication', 'What are the advantages of written communication over verbal communication?', null, 0, 30, 90),
(3, 'Written Communication', 'How important is good writing skill in the professional world?', null, 0, 30, 90),
(3, 'Written Communication', 'Has email made workplace communication more efficient or created more problems?', null, 0, 30, 90),

-- Follow-ups for: Vehicles and Transport
(3, 'Vehicles and Transport', 'How will electric and autonomous vehicles change transportation in the future?', null, 0, 30, 90),
(3, 'Vehicles and Transport', 'What are the environmental consequences of car ownership worldwide?', null, 0, 30, 90),
(3, 'Vehicles and Transport', 'Should governments provide incentives for people to use environmentally friendly vehicles?', null, 0, 30, 90),
(3, 'Vehicles and Transport', 'How does access to transport affect economic opportunities in rural areas?', null, 0, 30, 90),
(3, 'Vehicles and Transport', 'Is the concept of personal car ownership becoming outdated?', null, 0, 30, 90),

-- Follow-ups for: Consumer Choices
(3, 'Consumer Choices', 'What factors influence people''s buying decisions the most?', null, 0, 30, 90),
(3, 'Consumer Choices', 'Is consumer culture leading to excessive waste in society?', null, 0, 30, 90),
(3, 'Consumer Choices', 'How does advertising manipulate consumer behaviour?', null, 0, 30, 90),
(3, 'Consumer Choices', 'Should consumers prioritise buying locally made products?', null, 0, 30, 90),
(3, 'Consumer Choices', 'What responsibilities do companies have towards their consumers?', null, 0, 30, 90),

-- Follow-ups for: Art and Aesthetics
(3, 'Art and Aesthetics', 'What role does art play in society?', null, 0, 30, 90),
(3, 'Art and Aesthetics', 'Should governments fund the arts, even during times of economic difficulty?', null, 0, 30, 90),
(3, 'Art and Aesthetics', 'How has technology changed the way art is created and consumed?', null, 0, 30, 90),
(3, 'Art and Aesthetics', 'Is modern art as valuable as classical art?', null, 0, 30, 90),
(3, 'Art and Aesthetics', 'Why is art education important for children?', null, 0, 30, 90),

-- Follow-ups for: Musical Instruments
(3, 'Musical Instruments', 'Why is learning a musical instrument beneficial for children?', null, 0, 30, 90),
(3, 'Musical Instruments', 'Are traditional musical instruments being replaced by digital music technology?', null, 0, 30, 90),
(3, 'Musical Instruments', 'How does music education contribute to a well-rounded education?', null, 0, 30, 90),
(3, 'Musical Instruments', 'What role does music play in preserving cultural heritage?', null, 0, 30, 90),
(3, 'Musical Instruments', 'Should music education be compulsory in schools?', null, 0, 30, 90),

-- Follow-ups for: Games and Play
(3, 'Games and Play', 'How have games changed from the past to the present?', null, 0, 30, 90),
(3, 'Games and Play', 'Are video games harmful or beneficial for children''s development?', null, 0, 30, 90),
(3, 'Games and Play', 'What can children learn from playing traditional games?', null, 0, 30, 90),
(3, 'Games and Play', 'Should parents limit the amount of time children spend playing games?', null, 0, 30, 90),
(3, 'Games and Play', 'How does play help adults maintain their mental health and creativity?', null, 0, 30, 90),

-- ===== PART 3: ACTIVITIES =====

-- Follow-ups for: Hobbies
(3, 'Hobbies', 'Why is it important for people to have hobbies outside of work?', null, 0, 30, 90),
(3, 'Hobbies', 'How have popular hobbies changed over the past generation?', null, 0, 30, 90),
(3, 'Hobbies', 'Is it better to have one serious hobby or many casual ones?', null, 0, 30, 90),
(3, 'Hobbies', 'How can hobbies contribute to professional skill development?', null, 0, 30, 90),
(3, 'Hobbies', 'Why do some people struggle to find time for hobbies in modern life?', null, 0, 30, 90),

-- Follow-ups for: Sports
(3, 'Sports', 'What are the social benefits of playing sports?', null, 0, 30, 90),
(3, 'Sports', 'Should professional athletes be considered role models for young people?', null, 0, 30, 90),
(3, 'Sports', 'How does participation in sport benefit a country''s public health?', null, 0, 30, 90),
(3, 'Sports', 'Is too much money spent on professional sports compared to grassroots programmes?', null, 0, 30, 90),
(3, 'Sports', 'How can governments encourage more young people to participate in sports?', null, 0, 30, 90),

-- Follow-ups for: Learning Skills
(3, 'Learning Skills', 'What skills are most important for success in the modern world?', null, 0, 30, 90),
(3, 'Learning Skills', 'Is it better to learn skills formally or through self-study?', null, 0, 30, 90),
(3, 'Learning Skills', 'How has the internet changed the way people learn new skills?', null, 0, 30, 90),
(3, 'Learning Skills', 'Should education systems focus more on practical skills than academic knowledge?', null, 0, 30, 90),
(3, 'Learning Skills', 'Why is it important for people to continue learning new skills throughout their lives?', null, 0, 30, 90),

-- Follow-ups for: Health and Fitness
(3, 'Health and Fitness', 'What are the main health challenges facing modern societies?', null, 0, 30, 90),
(3, 'Health and Fitness', 'Should governments do more to promote healthy lifestyles among citizens?', null, 0, 30, 90),
(3, 'Health and Fitness', 'How has the fitness industry grown, and is this a positive trend?', null, 0, 30, 90),
(3, 'Health and Fitness', 'Is mental health given enough attention compared to physical health?', null, 0, 30, 90),
(3, 'Health and Fitness', 'How does a nation''s overall health affect its economy?', null, 0, 30, 90),

-- Follow-ups for: Family Activities
(3, 'Family Activities', 'Why is it important for families to do activities together?', null, 0, 30, 90),
(3, 'Family Activities', 'How has technology affected family activities and bonding time?', null, 0, 30, 90),
(3, 'Family Activities', 'Are families spending less quality time together than in the past?', null, 0, 30, 90),
(3, 'Family Activities', 'What role do shared activities play in strengthening family relationships?', null, 0, 30, 90),
(3, 'Family Activities', 'How do family activities differ across cultures?', null, 0, 30, 90),

-- Follow-ups for: Courses and Education
(3, 'Courses and Education', 'How has online learning changed access to education globally?', null, 0, 30, 90),
(3, 'Courses and Education', 'Is a university education still necessary for career success?', null, 0, 30, 90),
(3, 'Courses and Education', 'What are the advantages of vocational training compared to academic education?', null, 0, 30, 90),
(3, 'Courses and Education', 'Should higher education be free for all citizens?', null, 0, 30, 90),
(3, 'Courses and Education', 'How can education systems better prepare students for the job market?', null, 0, 30, 90),

-- Follow-ups for: Daily Routines
(3, 'Daily Routines', 'How important is it to have a daily routine for productivity?', null, 0, 30, 90),
(3, 'Daily Routines', 'How do daily routines differ between cultures?', null, 0, 30, 90),
(3, 'Daily Routines', 'Has remote working changed people''s daily routines significantly?', null, 0, 30, 90),
(3, 'Daily Routines', 'Is it healthy to follow a strict routine or to be more flexible?', null, 0, 30, 90),
(3, 'Daily Routines', 'How do daily routines contribute to mental and physical well-being?', null, 0, 30, 90),

-- Follow-ups for: Creative Activities
(3, 'Creative Activities', 'Why is creative expression important for people of all ages?', null, 0, 30, 90),
(3, 'Creative Activities', 'How does engaging in creative activities benefit mental health?', null, 0, 30, 90),
(3, 'Creative Activities', 'Should creative subjects receive equal funding to science and maths in schools?', null, 0, 30, 90),
(3, 'Creative Activities', 'How has digital technology expanded the possibilities for creative expression?', null, 0, 30, 90),
(3, 'Creative Activities', 'Is creativity more important in today''s economy than ever before?', null, 0, 30, 90),

-- Follow-ups for: Projects and Teamwork
(3, 'Projects and Teamwork', 'What makes a team work together effectively?', null, 0, 30, 90),
(3, 'Projects and Teamwork', 'Is teamwork always better than working individually?', null, 0, 30, 90),
(3, 'Projects and Teamwork', 'How can conflicts within a team be resolved constructively?', null, 0, 30, 90),
(3, 'Projects and Teamwork', 'What skills are essential for effective collaboration in the workplace?', null, 0, 30, 90),
(3, 'Projects and Teamwork', 'How has remote working affected team collaboration and project management?', null, 0, 30, 90),

-- Follow-ups for: Environmental Actions
(3, 'Environmental Actions', 'What are the most effective actions individuals can take to protect the environment?', null, 0, 30, 90),
(3, 'Environmental Actions', 'Should environmental protection be the responsibility of individuals or governments?', null, 0, 30, 90),
(3, 'Environmental Actions', 'How effective are recycling programmes in reducing waste?', null, 0, 30, 90),
(3, 'Environmental Actions', 'What role should businesses play in environmental conservation?', null, 0, 30, 90),
(3, 'Environmental Actions', 'How can communities be encouraged to adopt more environmentally friendly habits?', null, 0, 30, 90),

-- Follow-ups for: Exercise
(3, 'Exercise', 'What are the main barriers that prevent people from exercising regularly?', null, 0, 30, 90),
(3, 'Exercise', 'How does regular exercise benefit both physical and mental health?', null, 0, 30, 90),
(3, 'Exercise', 'Should companies provide exercise facilities for their employees?', null, 0, 30, 90),
(3, 'Exercise', 'How has the fitness industry changed the way people think about exercise?', null, 0, 30, 90),
(3, 'Exercise', 'Is there too much pressure on people to maintain a certain body image through exercise?', null, 0, 30, 90),

-- Follow-ups for: Language Learning
(3, 'Language Learning', 'Why is learning foreign languages valuable in the modern world?', null, 0, 30, 90),
(3, 'Language Learning', 'What is the best age to start learning a new language?', null, 0, 30, 90),
(3, 'Language Learning', 'How has technology improved the way people learn languages?', null, 0, 30, 90),
(3, 'Language Learning', 'Is the dominance of English as a global language a positive or negative development?', null, 0, 30, 90),
(3, 'Language Learning', 'What is the best method for learning a new language: immersion, classroom study, or apps?', null, 0, 30, 90),

-- Follow-ups for: School Subjects
(3, 'School Subjects', 'Should students be allowed to choose all their own subjects at school?', null, 0, 30, 90),
(3, 'School Subjects', 'How important is it for schools to offer a balanced curriculum?', null, 0, 30, 90),
(3, 'School Subjects', 'Are some school subjects more valuable than others for future career success?', null, 0, 30, 90),
(3, 'School Subjects', 'How should education evolve to keep pace with changes in the job market?', null, 0, 30, 90),
(3, 'School Subjects', 'What subjects should be added to school curricula to prepare students for the future?', null, 0, 30, 90),

-- Follow-ups for: Outdoor Adventures
(3, 'Outdoor Adventures', 'Why are adventure activities becoming more popular worldwide?', null, 0, 30, 90),
(3, 'Outdoor Adventures', 'What safety measures should be in place for adventure tourism?', null, 0, 30, 90),
(3, 'Outdoor Adventures', 'How can outdoor activities help build character and resilience?', null, 0, 30, 90),
(3, 'Outdoor Adventures', 'Should outdoor education be a required part of the school curriculum?', null, 0, 30, 90),
(3, 'Outdoor Adventures', 'How does adventure tourism impact the natural environment?', null, 0, 30, 90),

-- Follow-ups for: Lifelong Learning
(3, 'Lifelong Learning', 'Why is lifelong learning important in the modern economy?', null, 0, 30, 90),
(3, 'Lifelong Learning', 'What barriers prevent adults from continuing their education?', null, 0, 30, 90),
(3, 'Lifelong Learning', 'How can employers support employees in continuing to learn and develop?', null, 0, 30, 90),
(3, 'Lifelong Learning', 'Is self-directed learning more effective than formal education for adults?', null, 0, 30, 90),
(3, 'Lifelong Learning', 'How will the need for lifelong learning change as automation increases?', null, 0, 30, 90),

-- ===== PART 3: MEDIA =====

-- Follow-ups for: Films and Cinema
(3, 'Films and Cinema', 'How has the film industry changed in the era of streaming services?', null, 0, 30, 90),
(3, 'Films and Cinema', 'Do films have a responsibility to portray social issues accurately?', null, 0, 30, 90),
(3, 'Films and Cinema', 'What impact does cinema have on shaping public attitudes and culture?', null, 0, 30, 90),
(3, 'Films and Cinema', 'Are international films important for cross-cultural understanding?', null, 0, 30, 90),
(3, 'Films and Cinema', 'Will cinemas survive the competition from home streaming platforms?', null, 0, 30, 90),

-- Follow-ups for: Television
(3, 'Television', 'How has television content changed over the past few decades?', null, 0, 30, 90),
(3, 'Television', 'Is television still the most influential form of media?', null, 0, 30, 90),
(3, 'Television', 'What are the effects of binge-watching on people''s health and productivity?', null, 0, 30, 90),
(3, 'Television', 'Should there be stricter regulations on what is shown on television?', null, 0, 30, 90),
(3, 'Television', 'How do reality TV programmes affect society''s values?', null, 0, 30, 90),

-- Follow-ups for: Music and Songs
(3, 'Music and Songs', 'How does music affect people''s emotions and mental well-being?', null, 0, 30, 90),
(3, 'Music and Songs', 'Is the music industry fair to artists in the streaming era?', null, 0, 30, 90),
(3, 'Music and Songs', 'How has technology changed the way music is produced and distributed?', null, 0, 30, 90),
(3, 'Music and Songs', 'What role does music play in bringing different cultures together?', null, 0, 30, 90),
(3, 'Music and Songs', 'Is traditional music being lost as modern music becomes more globalised?', null, 0, 30, 90),

-- Follow-ups for: Podcasts
(3, 'Podcasts', 'Why have podcasts become such a popular form of media?', null, 0, 30, 90),
(3, 'Podcasts', 'How do podcasts compare to traditional radio in terms of content and reach?', null, 0, 30, 90),
(3, 'Podcasts', 'What role do podcasts play in educating the public on complex topics?', null, 0, 30, 90),
(3, 'Podcasts', 'Should there be fact-checking standards for podcast content?', null, 0, 30, 90),
(3, 'Podcasts', 'How has the rise of podcasts affected the traditional media landscape?', null, 0, 30, 90),

-- Follow-ups for: Social Media
(3, 'Social Media', 'What impact does social media have on young people''s mental health?', null, 0, 30, 90),
(3, 'Social Media', 'Should social media platforms be held responsible for the content they host?', null, 0, 30, 90),
(3, 'Social Media', 'How has social media changed the way news is reported and consumed?', null, 0, 30, 90),
(3, 'Social Media', 'Is social media bringing people together or driving them apart?', null, 0, 30, 90),
(3, 'Social Media', 'What regulations should governments impose on social media companies?', null, 0, 30, 90),

-- Follow-ups for: Advertising
(3, 'Advertising', 'How does advertising influence consumer behaviour?', null, 0, 30, 90),
(3, 'Advertising', 'Should there be stricter regulations on advertising aimed at children?', null, 0, 30, 90),
(3, 'Advertising', 'How has digital advertising changed the marketing industry?', null, 0, 30, 90),
(3, 'Advertising', 'What ethical responsibilities do advertisers have towards the public?', null, 0, 30, 90),
(3, 'Advertising', 'Is advertising a form of art or purely a commercial tool?', null, 0, 30, 90),

-- Follow-ups for: News and Media
(3, 'News and Media', 'How can people distinguish reliable news from misinformation?', null, 0, 30, 90),
(3, 'News and Media', 'What responsibilities do journalists have in reporting the truth?', null, 0, 30, 90),
(3, 'News and Media', 'How has citizen journalism changed the media landscape?', null, 0, 30, 90),
(3, 'News and Media', 'Is there too much negative news in the media, and how does it affect society?', null, 0, 30, 90),
(3, 'News and Media', 'Should the government have any role in regulating news content?', null, 0, 30, 90),

-- Follow-ups for: Magazines and Blogs
(3, 'Magazines and Blogs', 'Have blogs replaced traditional magazines in terms of influence?', null, 0, 30, 90),
(3, 'Magazines and Blogs', 'What are the advantages and disadvantages of getting information from blogs?', null, 0, 30, 90),
(3, 'Magazines and Blogs', 'How has the rise of digital media affected the print publishing industry?', null, 0, 30, 90),
(3, 'Magazines and Blogs', 'Should bloggers be held to the same journalistic standards as traditional media?', null, 0, 30, 90),
(3, 'Magazines and Blogs', 'What role do niche publications play in serving specific communities?', null, 0, 30, 90),

-- Follow-ups for: Comedy and Humour
(3, 'Comedy and Humour', 'What role does humour play in society?', null, 0, 30, 90),
(3, 'Comedy and Humour', 'Are there topics that should be considered off-limits in comedy?', null, 0, 30, 90),
(3, 'Comedy and Humour', 'How has comedy changed with the rise of social media and online platforms?', null, 0, 30, 90),
(3, 'Comedy and Humour', 'Why do different cultures find different things humorous?', null, 0, 30, 90),
(3, 'Comedy and Humour', 'Can humour be an effective tool for addressing serious social issues?', null, 0, 30, 90),

-- Follow-ups for: Traditional Stories
(3, 'Traditional Stories', 'Why is it important to preserve traditional stories and folklore?', null, 0, 30, 90),
(3, 'Traditional Stories', 'How do traditional stories help pass values from one generation to the next?', null, 0, 30, 90),
(3, 'Traditional Stories', 'Are traditional stories still relevant in modern society?', null, 0, 30, 90),
(3, 'Traditional Stories', 'How can schools use traditional stories as educational tools?', null, 0, 30, 90),
(3, 'Traditional Stories', 'What is the difference between oral storytelling traditions and written literature?', null, 0, 30, 90),

-- ===== PART 3: ABSTRACT =====

-- Follow-ups for: Goals and Ambitions
(3, 'Goals and Ambitions', 'Why is goal-setting important for personal and professional success?', null, 0, 30, 90),
(3, 'Goals and Ambitions', 'Do people today face more pressure to be ambitious than previous generations?', null, 0, 30, 90),
(3, 'Goals and Ambitions', 'How can society support individuals in achieving their goals?', null, 0, 30, 90),
(3, 'Goals and Ambitions', 'Is it more important to set realistic goals or highly ambitious ones?', null, 0, 30, 90),
(3, 'Goals and Ambitions', 'How do cultural values influence the types of goals people set?', null, 0, 30, 90),

-- Follow-ups for: Laws and Justice
(3, 'Laws and Justice', 'What makes a legal system fair and effective?', null, 0, 30, 90),
(3, 'Laws and Justice', 'Should laws change as society evolves, or should they remain constant?', null, 0, 30, 90),
(3, 'Laws and Justice', 'How effective are international laws in resolving global issues?', null, 0, 30, 90),
(3, 'Laws and Justice', 'Is punishment or rehabilitation more effective in reducing crime?', null, 0, 30, 90),
(3, 'Laws and Justice', 'What role should citizens play in shaping the laws of their country?', null, 0, 30, 90),

-- Follow-ups for: Environmental Issues
(3, 'Environmental Issues', 'What are the most urgent environmental challenges facing the world today?', null, 0, 30, 90),
(3, 'Environmental Issues', 'Should developed countries take greater responsibility for environmental damage?', null, 0, 30, 90),
(3, 'Environmental Issues', 'How can education raise awareness about environmental issues?', null, 0, 30, 90),
(3, 'Environmental Issues', 'Is economic growth compatible with environmental protection?', null, 0, 30, 90),
(3, 'Environmental Issues', 'What role should technology play in solving environmental problems?', null, 0, 30, 90),

-- Follow-ups for: Community Development
(3, 'Community Development', 'What are the key factors that make a community a good place to live?', null, 0, 30, 90),
(3, 'Community Development', 'How can local governments involve citizens in community planning decisions?', null, 0, 30, 90),
(3, 'Community Development', 'What challenges do rapidly developing communities face?', null, 0, 30, 90),
(3, 'Community Development', 'Is it more important to invest in infrastructure or social programmes in a community?', null, 0, 30, 90),
(3, 'Community Development', 'How do strong community bonds contribute to social stability?', null, 0, 30, 90),

-- Follow-ups for: Inventions and Innovation
(3, 'Inventions and Innovation', 'What drives innovation in society?', null, 0, 30, 90),
(3, 'Inventions and Innovation', 'Are all technological inventions beneficial for humanity?', null, 0, 30, 90),
(3, 'Inventions and Innovation', 'How should governments balance encouraging innovation with regulating new technologies?', null, 0, 30, 90),
(3, 'Inventions and Innovation', 'What areas of life would benefit most from new inventions?', null, 0, 30, 90),
(3, 'Inventions and Innovation', 'Is it possible for society to become too reliant on technology?', null, 0, 30, 90),

-- Follow-ups for: Cultural Traditions
(3, 'Cultural Traditions', 'Why is it important to preserve cultural traditions?', null, 0, 30, 90),
(3, 'Cultural Traditions', 'How does globalisation threaten or enrich cultural traditions?', null, 0, 30, 90),
(3, 'Cultural Traditions', 'Should traditions be adapted to fit modern values, or kept in their original form?', null, 0, 30, 90),
(3, 'Cultural Traditions', 'What role do cultural traditions play in shaping national identity?', null, 0, 30, 90),
(3, 'Cultural Traditions', 'How can younger generations be encouraged to maintain cultural traditions?', null, 0, 30, 90),

-- Follow-ups for: Personal Achievement
(3, 'Personal Achievement', 'What defines success in modern society?', null, 0, 30, 90),
(3, 'Personal Achievement', 'Is individual achievement valued more than collective achievement in some cultures?', null, 0, 30, 90),
(3, 'Personal Achievement', 'How does celebrating achievements motivate people to accomplish more?', null, 0, 30, 90),
(3, 'Personal Achievement', 'Is too much emphasis placed on academic achievements over other types of success?', null, 0, 30, 90),
(3, 'Personal Achievement', 'What role does failure play in the journey towards achievement?', null, 0, 30, 90),

-- Follow-ups for: Risk Taking
(3, 'Risk Taking', 'Why is taking risks sometimes necessary for progress?', null, 0, 30, 90),
(3, 'Risk Taking', 'How do different cultures view risk taking?', null, 0, 30, 90),
(3, 'Risk Taking', 'Is modern society becoming more or less willing to take risks?', null, 0, 30, 90),
(3, 'Risk Taking', 'What role does risk taking play in entrepreneurship and innovation?', null, 0, 30, 90),
(3, 'Risk Taking', 'Should young people be encouraged to take calculated risks?', null, 0, 30, 90),

-- Follow-ups for: Advice and Wisdom
(3, 'Advice and Wisdom', 'Why is wisdom considered valuable in all cultures?', null, 0, 30, 90),
(3, 'Advice and Wisdom', 'How has the role of elders as advisors changed in modern society?', null, 0, 30, 90),
(3, 'Advice and Wisdom', 'Is advice from professionals always better than advice from friends and family?', null, 0, 30, 90),
(3, 'Advice and Wisdom', 'How does access to information on the internet affect the value placed on personal advice?', null, 0, 30, 90),
(3, 'Advice and Wisdom', 'What is the difference between knowledge and wisdom?', null, 0, 30, 90),

-- Follow-ups for: Future Plans
(3, 'Future Plans', 'How important is it for people to plan ahead for their future?', null, 0, 30, 90),
(3, 'Future Plans', 'Is it possible to plan effectively in a world that is changing so rapidly?', null, 0, 30, 90),
(3, 'Future Plans', 'How do economic conditions affect people''s ability to make long-term plans?', null, 0, 30, 90),
(3, 'Future Plans', 'What are the advantages of being spontaneous versus being a planner?', null, 0, 30, 90),
(3, 'Future Plans', 'How do cultural expectations shape the plans young people make for their future?', null, 0, 30, 90)

ON CONFLICT DO NOTHING;
