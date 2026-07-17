-- ============================================================
-- BATCH 2: IELTS Speaking Part 2 & Part 3 Seed Data
-- 100 Part 2 Cue Cards + ~450 Part 3 Follow-up Questions
-- ============================================================

-- ************************************************************
-- PART 2 CUE CARDS (100 Total)
-- ************************************************************

INSERT INTO public.questions (part, topic, question_text, cue_card_points, prep_seconds, min_speak_seconds, max_speak_seconds) VALUES

-- ============================================================
-- WORK & CAREER (12)
-- ============================================================
(2, 'Work & Career', 'Describe a job you would like to do in the future.', array['what the job is','what qualifications or skills you would need','why you are interested in this job','and explain what you would enjoy most about it'], 60, 60, 120),
(2, 'Work & Career', 'Describe a successful business you know about.', array['what the business is','what products or services it offers','how it became successful','and explain why you think it is a good business'], 60, 60, 120),
(2, 'Work & Career', 'Describe a time you worked in a team to complete a task.', array['what the task was','who was on the team','what your role was','and explain how well the team worked together'], 60, 60, 120),
(2, 'Work & Career', 'Describe a workplace you would like to work in.', array['what kind of workplace it is','where it would be located','what facilities it would have','and explain why you would like to work there'], 60, 60, 120),
(2, 'Work & Career', 'Describe a manager or boss who impressed you.', array['who this person is','what their management style is like','what they did that impressed you','and explain why you admire them'], 60, 60, 120),
(2, 'Work & Career', 'Describe a skill that is needed for your job or studies.', array['what the skill is','how you learned or developed it','how often you use it','and explain why it is important for your work or studies'], 60, 60, 120),
(2, 'Work & Career', 'Describe a time you worked very hard to achieve something.', array['what you were trying to achieve','what you did to work hard','how long it took','and explain how you felt when you achieved it'], 60, 60, 120),
(2, 'Work & Career', 'Describe a difficult task you were given at work or in your studies.', array['what the task was','why it was difficult','how you handled it','and explain what you learned from the experience'], 60, 60, 120),
(2, 'Work & Career', 'Describe a business you would like to start.', array['what type of business it would be','what products or services it would offer','how you would start it','and explain why you think it would be successful'], 60, 60, 120),
(2, 'Work & Career', 'Describe a professional person you know who is very good at their job.', array['who this person is','what their profession is','how you know them','and explain why you think they are good at their job'], 60, 60, 120),
(2, 'Work & Career', 'Describe a company you admire.', array['what the company is','what it does','how you learned about it','and explain why you admire this company'], 60, 60, 120),
(2, 'Work & Career', 'Describe a career change someone you know has made.', array['who this person is','what their previous career was','what career they changed to','and explain how the change affected their life'], 60, 60, 120),

-- ============================================================
-- EDUCATION (12)
-- ============================================================
(2, 'Education', 'Describe a school you attended when you were young.', array['what the school was called','where it was located','what the school was like','and explain what you remember most about it'], 60, 60, 120),
(2, 'Education', 'Describe a lesson you remember well from school.', array['what the lesson was about','who the teacher was','what happened during the lesson','and explain why you remember it so well'], 60, 60, 120),
(2, 'Education', 'Describe a subject you found difficult at school.', array['what the subject was','when you studied it','why it was difficult for you','and explain how you dealt with the difficulty'], 60, 60, 120),
(2, 'Education', 'Describe a useful skill you learned outside of school.', array['what the skill is','how you learned it','who helped you learn it','and explain why you think it is useful'], 60, 60, 120),
(2, 'Education', 'Describe an online course you have taken or would like to take.', array['what the course is about','where or how you found it','what you learned or hope to learn','and explain why you chose this course'], 60, 60, 120),
(2, 'Education', 'Describe a time you learned something important from a mistake.', array['what the mistake was','when it happened','what you learned from it','and explain how it changed your behaviour afterwards'], 60, 60, 120),
(2, 'Education', 'Describe a teacher who had a positive influence on you.', array['who this teacher was','what subject they taught','what made them special','and explain how they influenced you'], 60, 60, 120),
(2, 'Education', 'Describe a presentation you gave to a group of people.', array['what the presentation was about','who the audience was','how you prepared for it','and explain how you felt about giving the presentation'], 60, 60, 120),
(2, 'Education', 'Describe a group project you participated in.', array['what the project was about','who was in your group','what your role was','and explain what the outcome of the project was'], 60, 60, 120),
(2, 'Education', 'Describe an educational trip or visit you went on.', array['where you went','when you went there','what you saw or did','and explain what you learned from the trip'], 60, 60, 120),
(2, 'Education', 'Describe something new you learned recently.', array['what you learned','how you learned it','how long it took to learn','and explain why you decided to learn it'], 60, 60, 120),
(2, 'Education', 'Describe a time you had to study very hard for an exam.', array['what the exam was','why you needed to study hard','how you prepared for it','and explain how you felt after taking the exam'], 60, 60, 120),

-- ============================================================
-- COMMUNICATION (10)
-- ============================================================
(2, 'Communication', 'Describe a time you gave advice to someone.', array['who you gave advice to','what the situation was','what advice you gave','and explain whether the person followed your advice'], 60, 60, 120),
(2, 'Communication', 'Describe a conversation that changed your mind about something.', array['who you had the conversation with','what the topic was','what changed your mind','and explain how you felt about changing your opinion'], 60, 60, 120),
(2, 'Communication', 'Describe a disagreement you had that you resolved peacefully.', array['who the disagreement was with','what it was about','how you resolved it','and explain what you learned from the experience'], 60, 60, 120),
(2, 'Communication', 'Describe an experience of communicating in another language.', array['what language you used','who you communicated with','what the situation was','and explain how you felt about the experience'], 60, 60, 120),
(2, 'Communication', 'Describe a misunderstanding you had with someone.', array['who the misunderstanding was with','what caused the misunderstanding','how it was cleared up','and explain how it affected your relationship'], 60, 60, 120),
(2, 'Communication', 'Describe a compliment you received that made you happy.', array['who gave you the compliment','what they said','when and where it happened','and explain why it meant a lot to you'], 60, 60, 120),
(2, 'Communication', 'Describe an apology you made to someone.', array['who you apologised to','what you had done wrong','how you apologised','and explain how the person reacted'], 60, 60, 120),
(2, 'Communication', 'Describe a promise you made and kept.', array['who you made the promise to','what the promise was','what you did to keep it','and explain why it was important to keep this promise'], 60, 60, 120),
(2, 'Communication', 'Describe a time you persuaded someone to do something.', array['who you persuaded','what you wanted them to do','how you persuaded them','and explain why you needed to persuade them'], 60, 60, 120),
(2, 'Communication', 'Describe a friendship you have maintained over a long distance.', array['who this friend is','how you became friends','how you stay in touch','and explain why this friendship is important to you'], 60, 60, 120),

-- ============================================================
-- HEALTH (10)
-- ============================================================
(2, 'Health', 'Describe a healthy habit you have.', array['what the habit is','when you started it','how often you do it','and explain how it has benefited your health'], 60, 60, 120),
(2, 'Health', 'Describe a time you felt extremely tired.', array['when this was','what caused the tiredness','what you were doing at the time','and explain what you did to recover'], 60, 60, 120),
(2, 'Health', 'Describe a sport or physical activity you tried for the first time.', array['what the sport or activity was','when and where you tried it','who you did it with','and explain whether you would do it again'], 60, 60, 120),
(2, 'Health', 'Describe a time you cared for someone who was sick.', array['who the person was','what was wrong with them','how you took care of them','and explain how the experience made you feel'], 60, 60, 120),
(2, 'Health', 'Describe a health improvement you have made in your life.', array['what the improvement was','why you decided to make it','what steps you took','and explain what difference it has made'], 60, 60, 120),
(2, 'Health', 'Describe a walk you really enjoyed.', array['where you walked','who you walked with','what you saw during the walk','and explain why you enjoyed it so much'], 60, 60, 120),
(2, 'Health', 'Describe a time you were ill and had to rest.', array['what illness you had','what symptoms you experienced','how long you were ill for','and explain how you felt during that period'], 60, 60, 120),
(2, 'Health', 'Describe a healthy meal you prepared yourself.', array['what the meal was','what ingredients you used','how you prepared it','and explain why you consider it healthy'], 60, 60, 120),
(2, 'Health', 'Describe a relaxation technique you use.', array['what the technique is','how you learned about it','how often you use it','and explain how effective it is for you'], 60, 60, 120),
(2, 'Health', 'Describe an activity that helps you feel calm and relaxed.', array['what the activity is','where you usually do it','how long you have been doing it','and explain why it helps you relax'], 60, 60, 120),

-- ============================================================
-- NATURE (10)
-- ============================================================
(2, 'Nature', 'Describe a wild animal you saw in person.', array['what the animal was','where and when you saw it','what it was doing','and explain how you felt when you saw it'], 60, 60, 120),
(2, 'Nature', 'Describe a natural disaster you heard about or experienced.', array['what type of disaster it was','when and where it happened','how it affected people','and explain what you think could be done to prevent such disasters'], 60, 60, 120),
(2, 'Nature', 'Describe a beach you visited that you enjoyed.', array['where the beach was','when you visited','what you did there','and explain why you enjoyed this beach'], 60, 60, 120),
(2, 'Nature', 'Describe a mountain or hill you climbed or would like to climb.', array['where the mountain or hill is','when you climbed it or plan to','who you went with or would go with','and explain how you felt or would feel about the experience'], 60, 60, 120),
(2, 'Nature', 'Describe a garden or park you like visiting.', array['where it is','what it looks like','how often you visit','and explain what you like most about it'], 60, 60, 120),
(2, 'Nature', 'Describe a river, lake, or body of water near your home.', array['where it is','what it looks like','what people do there','and explain what this place means to the local community'], 60, 60, 120),
(2, 'Nature', 'Describe an environmental campaign or project you know about.', array['what the campaign or project is','who organises it','what its goals are','and explain how effective you think it is'], 60, 60, 120),
(2, 'Nature', 'Describe your favourite season of the year.', array['which season it is','what the weather is like during this season','what activities you do during this season','and explain why it is your favourite'], 60, 60, 120),
(2, 'Nature', 'Describe a time you spent a long period outdoors in nature.', array['where you were','what you were doing','who you were with','and explain how being in nature made you feel'], 60, 60, 120),
(2, 'Nature', 'Describe a plant or flower you grew or tried to grow.', array['what the plant or flower was','where you grew it','how you took care of it','and explain how successful you were'], 60, 60, 120),

-- ============================================================
-- SOCIETY & CULTURE (12)
-- ============================================================
(2, 'Society & Culture', 'Describe a cultural event you attended.', array['what the event was','where and when it took place','what happened during the event','and explain what you learned or enjoyed about it'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a tradition in your country that is changing.', array['what the tradition is','how it used to be practised','how it is changing','and explain why you think it is changing'], 60, 60, 120),
(2, 'Society & Culture', 'Describe an interesting event from history that you know about.', array['what the event was','when and where it happened','who was involved','and explain why you find it interesting'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a museum or gallery you have visited.', array['what museum or gallery it was','where it was located','what you saw there','and explain what impressed you the most'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a piece of local history in your area.', array['what it is','where it can be found','what happened historically','and explain why it is important to the local community'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a celebration or festival you enjoy.', array['what the celebration is','when it takes place','how people celebrate it','and explain why you enjoy it'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a custom from another culture that you find interesting.', array['what the custom is','which culture it belongs to','how you learned about it','and explain why you find it interesting'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a public figure who has made a positive difference in society.', array['who this person is','what they have done','how they have made a difference','and explain why you think their contribution is important'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a charity or voluntary organisation you support or know about.', array['what the organisation is','what it does','how you support it or know about it','and explain why you think its work is important'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a social issue that concerns you.', array['what the issue is','how it affects people','what you think should be done about it','and explain why it concerns you personally'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a rule or law you disagree with.', array['what the rule or law is','who it affects','why you disagree with it','and explain what change you would suggest'], 60, 60, 120),
(2, 'Society & Culture', 'Describe a change you have noticed in your society in recent years.', array['what the change is','when you first noticed it','how it has affected people','and explain whether you think it is a positive or negative change'], 60, 60, 120),

-- ============================================================
-- TECHNOLOGY (10)
-- ============================================================
(2, 'Technology', 'Describe an app on your phone that you use frequently.', array['what the app is','what it does','how often you use it','and explain why it is useful to you'], 60, 60, 120),
(2, 'Technology', 'Describe a gadget or device you cannot live without.', array['what the gadget is','when you got it','what you use it for','and explain why it is so important to you'], 60, 60, 120),
(2, 'Technology', 'Describe a website that you find very helpful.', array['what the website is','what information or services it provides','how often you use it','and explain why you find it helpful'], 60, 60, 120),
(2, 'Technology', 'Describe a time when technology caused a problem for you.', array['what technology was involved','what the problem was','how you dealt with it','and explain what you learned from the experience'], 60, 60, 120),
(2, 'Technology', 'Describe an invention you wish existed.', array['what the invention would be','what it would do','who would benefit from it','and explain why you think it is needed'], 60, 60, 120),
(2, 'Technology', 'Describe a time you learned to use a new piece of technology.', array['what the technology was','why you needed to learn it','how you learned to use it','and explain how you felt once you mastered it'], 60, 60, 120),
(2, 'Technology', 'Describe a piece of technology that has changed your daily life.', array['what the technology is','when you started using it','how it changed your routine','and explain whether the change has been positive or negative'], 60, 60, 120),
(2, 'Technology', 'Describe an online community you are part of.', array['what the community is about','how you found it','what you do in this community','and explain what you enjoy about being part of it'], 60, 60, 120),
(2, 'Technology', 'Describe a time the internet was particularly useful to you.', array['what you needed to do','how the internet helped you','what the outcome was','and explain what you would have done without the internet'], 60, 60, 120),
(2, 'Technology', 'Describe an artificial intelligence system you find interesting.', array['what the AI system is','what it can do','how you learned about it','and explain why you find it interesting'], 60, 60, 120),

-- ============================================================
-- TRAVEL (12)
-- ============================================================
(2, 'Travel', 'Describe a country you would like to visit in the future.', array['which country it is','what you know about it','what you would like to do there','and explain why you want to visit this country'], 60, 60, 120),
(2, 'Travel', 'Describe a memorable journey you have taken.', array['where you went','how you travelled','who you were with','and explain what made the journey memorable'], 60, 60, 120),
(2, 'Travel', 'Describe an interesting city you have visited or would like to visit.', array['what the city is','where it is located','what is interesting about it','and explain why you would recommend it to others'], 60, 60, 120),
(2, 'Travel', 'Describe a trip or holiday that did not go as planned.', array['where you were going','what went wrong','how you dealt with the situation','and explain what you learned from the experience'], 60, 60, 120),
(2, 'Travel', 'Describe an adventure activity you have done or would like to do.', array['what the activity is','where you did it or would do it','what it involves','and explain why you find it exciting'], 60, 60, 120),
(2, 'Travel', 'Describe a local attraction in your area that visitors enjoy.', array['what the attraction is','where it is located','what visitors can do there','and explain why it is popular with visitors'], 60, 60, 120),
(2, 'Travel', 'Describe an experience of travelling alone.', array['where you went','when you travelled','what you did during the trip','and explain how you felt about travelling alone'], 60, 60, 120),
(2, 'Travel', 'Describe a form of transport you enjoy using.', array['what the form of transport is','how often you use it','where you usually travel on it','and explain why you enjoy using it'], 60, 60, 120),
(2, 'Travel', 'Describe a place you visited that was very different from where you live.', array['where the place was','when you visited','how it was different','and explain what you liked or disliked about the differences'], 60, 60, 120),
(2, 'Travel', 'Describe a time you stayed somewhere unusual.', array['where you stayed','why you stayed there','what the place was like','and explain how the experience was different from staying in a normal hotel'], 60, 60, 120),
(2, 'Travel', 'Describe a person who is a great travel companion.', array['who this person is','how you know them','what makes them a good travel companion','and explain what your best trip together was'], 60, 60, 120),
(2, 'Travel', 'Describe a souvenir you brought home from a trip.', array['what the souvenir is','where you bought it','why you chose it','and explain what it means to you now'], 60, 60, 120),

-- ============================================================
-- PERSONAL GROWTH (12)
-- ============================================================
(2, 'Personal Growth', 'Describe a time you felt very proud of yourself.', array['when this was','what you had done','who you shared the news with','and explain why you felt so proud'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a challenge you overcame.', array['what the challenge was','when you faced it','what you did to overcome it','and explain how overcoming it changed you'], 60, 60, 120),
(2, 'Personal Growth', 'Describe one of the happiest times in your life.', array['when it was','where you were','what was happening','and explain why it was such a happy time for you'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a decision you made that changed your life.', array['what the decision was','when you made it','why you made this decision','and explain how your life changed as a result'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a time you felt very nervous.', array['when this was','what the situation was','what caused your nervousness','and explain how you managed your nerves'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a goal you set and achieved.', array['what the goal was','why you set this goal','what steps you took to achieve it','and explain how you felt when you achieved it'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a time you experienced a disappointment.', array['what the disappointment was','when it happened','how it affected you','and explain how you dealt with the disappointment'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a positive change you have made in your life.', array['what the change was','when you made it','what motivated you to change','and explain what impact it has had on your life'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a time you showed courage.', array['what the situation was','what you were afraid of','what you did that was courageous','and explain how you felt afterwards'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a moment when someone showed you unexpected kindness.', array['who the person was','what they did','when and where it happened','and explain how their kindness affected you'], 60, 60, 120),
(2, 'Personal Growth', 'Describe an experience that made you more mature.', array['what the experience was','when it happened','what you learned from it','and explain how it changed your perspective on life'], 60, 60, 120),
(2, 'Personal Growth', 'Describe a fear you managed to overcome.', array['what the fear was','how long you had it','what you did to overcome it','and explain how your life is different now without this fear'], 60, 60, 120)

ON CONFLICT DO NOTHING;


-- ************************************************************
-- PART 3 FOLLOW-UP QUESTIONS (~450 Total)
-- ************************************************************

INSERT INTO public.questions (part, topic, question_text, cue_card_points, prep_seconds, min_speak_seconds, max_speak_seconds) VALUES

-- ============================================================
-- WORK & CAREER - Part 3 Questions
-- ============================================================

-- Follow-ups for: a job you would like to do
(3, 'Work & Career', 'What factors do young people consider when choosing a career?', null, 0, 30, 90),
(3, 'Work & Career', 'How has the job market changed in your country over the past few decades?', null, 0, 30, 90),
(3, 'Work & Career', 'Do you think job satisfaction is more important than a high salary?', null, 0, 30, 90),
(3, 'Work & Career', 'Should schools do more to prepare students for the world of work?', null, 0, 30, 90),
(3, 'Work & Career', 'How might automation change the types of jobs available in the future?', null, 0, 30, 90),

-- Follow-ups for: a successful business
(3, 'Work & Career', 'What qualities do successful business owners tend to have?', null, 0, 30, 90),
(3, 'Work & Career', 'Is it easier to start a business now than it was in the past?', null, 0, 30, 90),
(3, 'Work & Career', 'What role does innovation play in business success?', null, 0, 30, 90),
(3, 'Work & Career', 'Should governments provide more support for small businesses?', null, 0, 30, 90),

-- Follow-ups for: a time you worked in a team
(3, 'Work & Career', 'Why is teamwork considered an important skill in the modern workplace?', null, 0, 30, 90),
(3, 'Work & Career', 'What are the main challenges people face when working in teams?', null, 0, 30, 90),
(3, 'Work & Career', 'Is it better to work independently or as part of a team?', null, 0, 30, 90),
(3, 'Work & Career', 'How can leaders ensure effective teamwork within an organisation?', null, 0, 30, 90),
(3, 'Work & Career', 'Do you think remote teamwork is as effective as working together in person?', null, 0, 30, 90),

-- Follow-ups for: a workplace you would like
(3, 'Work & Career', 'How important is the physical work environment for employee productivity?', null, 0, 30, 90),
(3, 'Work & Career', 'What are the advantages and disadvantages of open-plan offices?', null, 0, 30, 90),
(3, 'Work & Career', 'Do you think working from home will become the norm in the future?', null, 0, 30, 90),
(3, 'Work & Career', 'How can employers create a positive workplace culture?', null, 0, 30, 90),

-- Follow-ups for: a manager who impressed you
(3, 'Work & Career', 'What makes a good leader in the workplace?', null, 0, 30, 90),
(3, 'Work & Career', 'Are leadership skills something people are born with or can they be learned?', null, 0, 30, 90),
(3, 'Work & Career', 'How has the style of management in companies changed over the years?', null, 0, 30, 90),
(3, 'Work & Career', 'Should managers be friends with their employees?', null, 0, 30, 90),
(3, 'Work & Career', 'How important is it for leaders to admit when they have made a mistake?', null, 0, 30, 90),

-- Follow-ups for: a skill needed for your job
(3, 'Work & Career', 'What skills are most valued by employers today?', null, 0, 30, 90),
(3, 'Work & Career', 'How important are soft skills compared to technical skills in the workplace?', null, 0, 30, 90),
(3, 'Work & Career', 'Do you think the skills needed in the job market will change significantly in the next decade?', null, 0, 30, 90),
(3, 'Work & Career', 'Should companies invest more in training their employees?', null, 0, 30, 90),

-- Follow-ups for: a time you worked hard
(3, 'Work & Career', 'Is hard work always the key to success?', null, 0, 30, 90),
(3, 'Work & Career', 'Do people in your country value hard work more than talent?', null, 0, 30, 90),
(3, 'Work & Career', 'How can employers motivate their staff to work harder?', null, 0, 30, 90),
(3, 'Work & Career', 'Is there a danger that people work too hard in modern society?', null, 0, 30, 90),
(3, 'Work & Career', 'What is the difference between working hard and working smart?', null, 0, 30, 90),

-- Follow-ups for: a difficult task at work
(3, 'Work & Career', 'Why do some people perform better under pressure than others?', null, 0, 30, 90),
(3, 'Work & Career', 'How should employers support employees who are struggling with difficult tasks?', null, 0, 30, 90),
(3, 'Work & Career', 'Is it important for people to take on challenging work even if they might fail?', null, 0, 30, 90),
(3, 'Work & Career', 'How does dealing with difficult situations at work help people grow professionally?', null, 0, 30, 90),

-- Follow-ups for: a business you want to start
(3, 'Work & Career', 'What are the biggest obstacles people face when starting a new business?', null, 0, 30, 90),
(3, 'Work & Career', 'Is entrepreneurship something that should be taught in schools?', null, 0, 30, 90),
(3, 'Work & Career', 'Why do many new businesses fail within the first few years?', null, 0, 30, 90),
(3, 'Work & Career', 'How has the internet made it easier for people to become entrepreneurs?', null, 0, 30, 90),

-- Follow-ups for: a professional person
(3, 'Work & Career', 'What does it mean to be a true professional?', null, 0, 30, 90),
(3, 'Work & Career', 'Are some professions more respected than others in your society?', null, 0, 30, 90),
(3, 'Work & Career', 'How important is continuous learning for professionals?', null, 0, 30, 90),
(3, 'Work & Career', 'Should professionals be held to higher ethical standards than other workers?', null, 0, 30, 90),
(3, 'Work & Career', 'What impact do role models in various professions have on young people?', null, 0, 30, 90),

-- Follow-ups for: a company you admire
(3, 'Work & Career', 'What responsibilities do large companies have towards society?', null, 0, 30, 90),
(3, 'Work & Career', 'Do you think multinational companies have too much power?', null, 0, 30, 90),
(3, 'Work & Career', 'How important is corporate social responsibility?', null, 0, 30, 90),
(3, 'Work & Career', 'Should companies prioritise profit or the well-being of their employees?', null, 0, 30, 90),

-- Follow-ups for: a career change someone made
(3, 'Work & Career', 'Why do some people decide to completely change their career?', null, 0, 30, 90),
(3, 'Work & Career', 'Is it becoming more common for people to have multiple careers in their lifetime?', null, 0, 30, 90),
(3, 'Work & Career', 'What challenges do people face when changing careers later in life?', null, 0, 30, 90),
(3, 'Work & Career', 'How can governments help workers who need to retrain for new industries?', null, 0, 30, 90),
(3, 'Work & Career', 'Is the idea of a single lifelong career outdated?', null, 0, 30, 90),

-- ============================================================
-- EDUCATION - Part 3 Questions
-- ============================================================

-- Follow-ups for: a school you attended
(3, 'Education', 'How have schools in your country changed over the years?', null, 0, 30, 90),
(3, 'Education', 'What makes a school a good school?', null, 0, 30, 90),
(3, 'Education', 'Do you think the size of a school affects the quality of education?', null, 0, 30, 90),
(3, 'Education', 'How important is the school environment for children''s learning?', null, 0, 30, 90),
(3, 'Education', 'Should children have a say in which school they attend?', null, 0, 30, 90),

-- Follow-ups for: a lesson you remember
(3, 'Education', 'Why do some lessons stay in our memory more than others?', null, 0, 30, 90),
(3, 'Education', 'What teaching methods are most effective for engaging students?', null, 0, 30, 90),
(3, 'Education', 'Should education be more practical and less theoretical?', null, 0, 30, 90),
(3, 'Education', 'How has technology changed the way lessons are delivered in classrooms?', null, 0, 30, 90),

-- Follow-ups for: a difficult subject
(3, 'Education', 'Why do some students find certain subjects more difficult than others?', null, 0, 30, 90),
(3, 'Education', 'Should students be allowed to drop subjects they find too difficult?', null, 0, 30, 90),
(3, 'Education', 'How can teachers better support students who struggle with particular subjects?', null, 0, 30, 90),
(3, 'Education', 'Is it important for students to study a broad range of subjects or specialise early?', null, 0, 30, 90),

-- Follow-ups for: a skill learned outside school
(3, 'Education', 'Are the skills learned outside school sometimes more valuable than those learned inside?', null, 0, 30, 90),
(3, 'Education', 'What types of skills are best learned through experience rather than formal education?', null, 0, 30, 90),
(3, 'Education', 'How important is self-directed learning in the modern world?', null, 0, 30, 90),
(3, 'Education', 'Should informal learning be officially recognised by educational institutions?', null, 0, 30, 90),
(3, 'Education', 'What role do hobbies play in personal skill development?', null, 0, 30, 90),

-- Follow-ups for: an online course
(3, 'Education', 'What are the advantages of online learning compared to traditional classroom learning?', null, 0, 30, 90),
(3, 'Education', 'Do you think online courses will eventually replace universities?', null, 0, 30, 90),
(3, 'Education', 'What challenges do students face when studying online?', null, 0, 30, 90),
(3, 'Education', 'Should online courses be free for everyone?', null, 0, 30, 90),

-- Follow-ups for: a time you learned from a mistake
(3, 'Education', 'Why is it important for people to learn from their mistakes?', null, 0, 30, 90),
(3, 'Education', 'Do you think schools should create environments where making mistakes is acceptable?', null, 0, 30, 90),
(3, 'Education', 'Is failure a necessary part of success?', null, 0, 30, 90),
(3, 'Education', 'How does a society''s attitude towards failure affect innovation?', null, 0, 30, 90),

-- Follow-ups for: a teacher who influenced you
(3, 'Education', 'What qualities make an excellent teacher?', null, 0, 30, 90),
(3, 'Education', 'Do you think teachers are given enough respect in society?', null, 0, 30, 90),
(3, 'Education', 'How has the role of teachers changed with the introduction of technology?', null, 0, 30, 90),
(3, 'Education', 'Should teachers be paid more to attract the best candidates?', null, 0, 30, 90),
(3, 'Education', 'Can artificial intelligence ever replace human teachers?', null, 0, 30, 90),

-- Follow-ups for: a presentation you gave
(3, 'Education', 'Why are presentation skills important in both education and the workplace?', null, 0, 30, 90),
(3, 'Education', 'How can people overcome the fear of public speaking?', null, 0, 30, 90),
(3, 'Education', 'Should schools put more emphasis on teaching communication and presentation skills?', null, 0, 30, 90),
(3, 'Education', 'How has technology changed the way people give presentations?', null, 0, 30, 90),

-- Follow-ups for: a group project
(3, 'Education', 'What are the benefits of group work in education?', null, 0, 30, 90),
(3, 'Education', 'How should group projects be assessed fairly?', null, 0, 30, 90),
(3, 'Education', 'What problems commonly arise during group projects?', null, 0, 30, 90),
(3, 'Education', 'Is individual work or group work more valuable for student development?', null, 0, 30, 90),
(3, 'Education', 'How can group projects prepare students for the workplace?', null, 0, 30, 90),

-- Follow-ups for: an educational trip
(3, 'Education', 'How valuable are educational trips compared to classroom learning?', null, 0, 30, 90),
(3, 'Education', 'Should schools invest more money in educational trips and field visits?', null, 0, 30, 90),
(3, 'Education', 'What types of educational trips are most beneficial for students?', null, 0, 30, 90),
(3, 'Education', 'Can virtual reality field trips be a good substitute for real ones?', null, 0, 30, 90),

-- Follow-ups for: something you learned recently
(3, 'Education', 'Why is lifelong learning important in the modern world?', null, 0, 30, 90),
(3, 'Education', 'What motivates adults to continue learning new things?', null, 0, 30, 90),
(3, 'Education', 'Is it harder to learn new things as people get older?', null, 0, 30, 90),
(3, 'Education', 'How has access to information changed the way people learn?', null, 0, 30, 90),

-- Follow-ups for: a time you studied hard
(3, 'Education', 'Is the current examination system the best way to assess student ability?', null, 0, 30, 90),
(3, 'Education', 'Do students face too much academic pressure nowadays?', null, 0, 30, 90),
(3, 'Education', 'What are some effective study techniques that students can use?', null, 0, 30, 90),
(3, 'Education', 'How can schools help students manage stress during exam periods?', null, 0, 30, 90),
(3, 'Education', 'Should exams be replaced with continuous assessment?', null, 0, 30, 90),

-- ============================================================
-- COMMUNICATION - Part 3 Questions
-- ============================================================

-- Follow-ups for: a time you gave advice
(3, 'Communication', 'Why do people sometimes find it difficult to accept advice from others?', null, 0, 30, 90),
(3, 'Communication', 'Is it better to ask for advice from older people or peers?', null, 0, 30, 90),
(3, 'Communication', 'What are the qualities of a good advisor?', null, 0, 30, 90),
(3, 'Communication', 'Should professionals like doctors and lawyers be held accountable for the advice they give?', null, 0, 30, 90),
(3, 'Communication', 'How has the internet changed the way people seek and receive advice?', null, 0, 30, 90),

-- Follow-ups for: a conversation that changed your mind
(3, 'Communication', 'Why is it important for people to be open to changing their opinions?', null, 0, 30, 90),
(3, 'Communication', 'What role does constructive debate play in a democratic society?', null, 0, 30, 90),
(3, 'Communication', 'Do you think social media encourages or discourages people from changing their views?', null, 0, 30, 90),
(3, 'Communication', 'How can people have productive conversations about controversial topics?', null, 0, 30, 90),

-- Follow-ups for: a disagreement you resolved
(3, 'Communication', 'What are the most common causes of disagreements between people?', null, 0, 30, 90),
(3, 'Communication', 'Is conflict resolution a skill that should be taught in schools?', null, 0, 30, 90),
(3, 'Communication', 'How do cultural differences affect the way people handle disagreements?', null, 0, 30, 90),
(3, 'Communication', 'What is the role of compromise in maintaining good relationships?', null, 0, 30, 90),

-- Follow-ups for: communicating in another language
(3, 'Communication', 'What are the benefits of learning a foreign language?', null, 0, 30, 90),
(3, 'Communication', 'Is it important for everyone to learn English in today''s world?', null, 0, 30, 90),
(3, 'Communication', 'How does speaking multiple languages benefit a person professionally?', null, 0, 30, 90),
(3, 'Communication', 'Will translation technology make learning foreign languages unnecessary?', null, 0, 30, 90),
(3, 'Communication', 'How does language affect the way people think and see the world?', null, 0, 30, 90),

-- Follow-ups for: a misunderstanding
(3, 'Communication', 'What are the main reasons for misunderstandings between people?', null, 0, 30, 90),
(3, 'Communication', 'How can people improve their communication skills to avoid misunderstandings?', null, 0, 30, 90),
(3, 'Communication', 'Do you think technology has increased or decreased the number of misunderstandings?', null, 0, 30, 90),
(3, 'Communication', 'How important is non-verbal communication in preventing misunderstandings?', null, 0, 30, 90),

-- Follow-ups for: a compliment you received
(3, 'Communication', 'Why is it important to give and receive compliments?', null, 0, 30, 90),
(3, 'Communication', 'Do complimenting habits differ across cultures?', null, 0, 30, 90),
(3, 'Communication', 'Can too many compliments be harmful?', null, 0, 30, 90),
(3, 'Communication', 'How does positive feedback affect people''s performance and motivation?', null, 0, 30, 90),

-- Follow-ups for: an apology you made
(3, 'Communication', 'Why do some people find it difficult to apologise?', null, 0, 30, 90),
(3, 'Communication', 'How important is a sincere apology in maintaining relationships?', null, 0, 30, 90),
(3, 'Communication', 'Should public figures apologise when they make mistakes?', null, 0, 30, 90),
(3, 'Communication', 'Do you think children should be taught the importance of apologising?', null, 0, 30, 90),
(3, 'Communication', 'Is it always enough to just say sorry?', null, 0, 30, 90),

-- Follow-ups for: a promise you kept
(3, 'Communication', 'Why is keeping promises important in building trust?', null, 0, 30, 90),
(3, 'Communication', 'Do people make too many promises they cannot keep?', null, 0, 30, 90),
(3, 'Communication', 'How does broken trust affect relationships in the long term?', null, 0, 30, 90),
(3, 'Communication', 'Should there be consequences for people who break important promises?', null, 0, 30, 90),

-- Follow-ups for: a time you persuaded someone
(3, 'Communication', 'What makes someone a persuasive speaker?', null, 0, 30, 90),
(3, 'Communication', 'Is there a difference between persuasion and manipulation?', null, 0, 30, 90),
(3, 'Communication', 'How do advertisers use persuasion techniques to influence consumers?', null, 0, 30, 90),
(3, 'Communication', 'Should critical thinking be taught in schools to help people resist manipulation?', null, 0, 30, 90),

-- Follow-ups for: a long-distance friendship
(3, 'Communication', 'How has technology changed the way people maintain friendships?', null, 0, 30, 90),
(3, 'Communication', 'Are online friendships as meaningful as face-to-face ones?', null, 0, 30, 90),
(3, 'Communication', 'What are the challenges of maintaining long-distance relationships?', null, 0, 30, 90),
(3, 'Communication', 'Is the quality or quantity of friendships more important for well-being?', null, 0, 30, 90),
(3, 'Communication', 'How do friendships change as people get older?', null, 0, 30, 90),

-- ============================================================
-- HEALTH - Part 3 Questions
-- ============================================================

-- Follow-ups for: a healthy habit
(3, 'Health', 'What are the most important habits for maintaining good health?', null, 0, 30, 90),
(3, 'Health', 'Why do some people find it difficult to maintain healthy habits?', null, 0, 30, 90),
(3, 'Health', 'Should governments encourage healthy lifestyles through legislation?', null, 0, 30, 90),
(3, 'Health', 'How do advertising and media influence people''s health choices?', null, 0, 30, 90),
(3, 'Health', 'Is it the responsibility of individuals or governments to ensure public health?', null, 0, 30, 90),

-- Follow-ups for: a time you felt very tired
(3, 'Health', 'Why are people more stressed and tired today compared to previous generations?', null, 0, 30, 90),
(3, 'Health', 'How does lack of sleep affect people''s productivity and health?', null, 0, 30, 90),
(3, 'Health', 'What can employers do to prevent burnout among their staff?', null, 0, 30, 90),
(3, 'Health', 'Is the work-life balance getting worse in modern society?', null, 0, 30, 90),

-- Follow-ups for: a sport you tried
(3, 'Health', 'What role does sport play in keeping a society healthy?', null, 0, 30, 90),
(3, 'Health', 'Should governments invest more in sports facilities?', null, 0, 30, 90),
(3, 'Health', 'How can schools encourage more young people to be physically active?', null, 0, 30, 90),
(3, 'Health', 'Is competitive sport always beneficial or can it be harmful?', null, 0, 30, 90),
(3, 'Health', 'Why do some people prefer individual sports while others prefer team sports?', null, 0, 30, 90),

-- Follow-ups for: a time you cared for someone
(3, 'Health', 'What challenges do people face when caring for elderly relatives?', null, 0, 30, 90),
(3, 'Health', 'Should caring for sick family members be supported by the government?', null, 0, 30, 90),
(3, 'Health', 'How has the role of family caregivers changed in modern society?', null, 0, 30, 90),
(3, 'Health', 'What impact does caregiving have on the mental health of the carer?', null, 0, 30, 90),

-- Follow-ups for: a health improvement
(3, 'Health', 'What motivates people to make changes to improve their health?', null, 0, 30, 90),
(3, 'Health', 'Why is prevention often considered better than cure?', null, 0, 30, 90),
(3, 'Health', 'How can communities promote healthier lifestyles among their residents?', null, 0, 30, 90),
(3, 'Health', 'Do you think people have access to enough reliable health information?', null, 0, 30, 90),

-- Follow-ups for: a walk you enjoyed
(3, 'Health', 'What are the physical and mental benefits of walking regularly?', null, 0, 30, 90),
(3, 'Health', 'Should cities be designed to be more walkable?', null, 0, 30, 90),
(3, 'Health', 'Why do fewer people walk today compared to the past?', null, 0, 30, 90),
(3, 'Health', 'How does spending time outdoors affect mental health?', null, 0, 30, 90),
(3, 'Health', 'What can governments do to encourage people to walk more?', null, 0, 30, 90),

-- Follow-ups for: a time you were ill
(3, 'Health', 'How has healthcare changed in your country in recent years?', null, 0, 30, 90),
(3, 'Health', 'Should healthcare be free for everyone?', null, 0, 30, 90),
(3, 'Health', 'What are the biggest health challenges facing the world today?', null, 0, 30, 90),
(3, 'Health', 'How important is mental health compared to physical health?', null, 0, 30, 90),

-- Follow-ups for: a healthy meal you prepared
(3, 'Health', 'Why is it important for people to learn how to cook?', null, 0, 30, 90),
(3, 'Health', 'How has the food industry affected people''s eating habits?', null, 0, 30, 90),
(3, 'Health', 'Should schools teach cooking and nutrition?', null, 0, 30, 90),
(3, 'Health', 'What role does diet play in preventing chronic diseases?', null, 0, 30, 90),

-- Follow-ups for: a relaxation technique
(3, 'Health', 'Why is stress management important in the modern world?', null, 0, 30, 90),
(3, 'Health', 'What are the most effective ways to deal with stress?', null, 0, 30, 90),
(3, 'Health', 'Should workplaces offer stress management programmes for employees?', null, 0, 30, 90),
(3, 'Health', 'How has awareness of mental health issues changed in recent years?', null, 0, 30, 90),
(3, 'Health', 'Do you think meditation and mindfulness are becoming more popular worldwide?', null, 0, 30, 90),

-- Follow-ups for: an activity that calms you
(3, 'Health', 'Why do different people find different activities relaxing?', null, 0, 30, 90),
(3, 'Health', 'Is leisure time becoming harder to find in modern life?', null, 0, 30, 90),
(3, 'Health', 'How important is it for people to have regular downtime?', null, 0, 30, 90),
(3, 'Health', 'Can hobbies and leisure activities improve work performance?', null, 0, 30, 90),

-- ============================================================
-- NATURE - Part 3 Questions
-- ============================================================

-- Follow-ups for: a wild animal you saw
(3, 'Nature', 'How important is it to protect wildlife in the modern world?', null, 0, 30, 90),
(3, 'Nature', 'What are the main threats to wild animals today?', null, 0, 30, 90),
(3, 'Nature', 'Should governments spend more money on wildlife conservation?', null, 0, 30, 90),
(3, 'Nature', 'Is it ethical to keep wild animals in zoos?', null, 0, 30, 90),
(3, 'Nature', 'How can ordinary people help protect endangered species?', null, 0, 30, 90),

-- Follow-ups for: a natural disaster
(3, 'Nature', 'How well prepared are most countries for natural disasters?', null, 0, 30, 90),
(3, 'Nature', 'What role does climate change play in increasing the frequency of natural disasters?', null, 0, 30, 90),
(3, 'Nature', 'How can technology help predict and prepare for natural disasters?', null, 0, 30, 90),
(3, 'Nature', 'Should wealthier countries do more to help poorer countries recover from natural disasters?', null, 0, 30, 90),

-- Follow-ups for: a beach you visited
(3, 'Nature', 'Why are beaches popular tourist destinations around the world?', null, 0, 30, 90),
(3, 'Nature', 'What impact does tourism have on coastal environments?', null, 0, 30, 90),
(3, 'Nature', 'How can coastal areas be protected from pollution and erosion?', null, 0, 30, 90),
(3, 'Nature', 'Should access to beaches be free for everyone?', null, 0, 30, 90),

-- Follow-ups for: a mountain you climbed
(3, 'Nature', 'Why do some people enjoy outdoor adventure activities like climbing?', null, 0, 30, 90),
(3, 'Nature', 'What impact does tourism have on mountain environments?', null, 0, 30, 90),
(3, 'Nature', 'Should there be limits on the number of people who can visit natural areas?', null, 0, 30, 90),
(3, 'Nature', 'How important is it for people to experience nature firsthand?', null, 0, 30, 90),
(3, 'Nature', 'What responsibilities do visitors have when exploring natural environments?', null, 0, 30, 90),

-- Follow-ups for: a garden you like
(3, 'Nature', 'What are the benefits of having gardens and green spaces in cities?', null, 0, 30, 90),
(3, 'Nature', 'How can urban areas be made greener?', null, 0, 30, 90),
(3, 'Nature', 'Do you think gardening is a valuable hobby for young people?', null, 0, 30, 90),
(3, 'Nature', 'How do parks and gardens contribute to the mental health of city residents?', null, 0, 30, 90),

-- Follow-ups for: a river near your home
(3, 'Nature', 'How important are rivers and waterways to local communities?', null, 0, 30, 90),
(3, 'Nature', 'What are the main causes of water pollution?', null, 0, 30, 90),
(3, 'Nature', 'Should stricter laws be introduced to protect rivers and lakes?', null, 0, 30, 90),
(3, 'Nature', 'How does water scarcity affect communities around the world?', null, 0, 30, 90),
(3, 'Nature', 'What can individuals do to reduce water pollution?', null, 0, 30, 90),

-- Follow-ups for: an environmental campaign
(3, 'Nature', 'How effective are environmental campaigns in changing people''s behaviour?', null, 0, 30, 90),
(3, 'Nature', 'Should environmental education be a compulsory part of the school curriculum?', null, 0, 30, 90),
(3, 'Nature', 'Do individuals or governments bear more responsibility for protecting the environment?', null, 0, 30, 90),
(3, 'Nature', 'What are the most pressing environmental issues facing the world today?', null, 0, 30, 90),

-- Follow-ups for: your favourite season
(3, 'Nature', 'How does the weather affect people''s mood and behaviour?', null, 0, 30, 90),
(3, 'Nature', 'Are seasonal celebrations and traditions important in your culture?', null, 0, 30, 90),
(3, 'Nature', 'How has climate change affected seasonal patterns in different parts of the world?', null, 0, 30, 90),
(3, 'Nature', 'Do you think people who live in places with distinct seasons are happier?', null, 0, 30, 90),

-- Follow-ups for: time spent in nature
(3, 'Nature', 'Why is spending time in nature beneficial for people''s health?', null, 0, 30, 90),
(3, 'Nature', 'Are children today spending enough time outdoors?', null, 0, 30, 90),
(3, 'Nature', 'How can people living in cities stay connected to nature?', null, 0, 30, 90),
(3, 'Nature', 'What is the concept of eco-therapy and how effective is it?', null, 0, 30, 90),
(3, 'Nature', 'Should companies encourage employees to spend more time outdoors?', null, 0, 30, 90),

-- Follow-ups for: a plant you grew
(3, 'Nature', 'Why is growing your own food becoming more popular?', null, 0, 30, 90),
(3, 'Nature', 'What are the environmental benefits of community gardens?', null, 0, 30, 90),
(3, 'Nature', 'How can urban farming contribute to food security?', null, 0, 30, 90),
(3, 'Nature', 'Should schools include gardening as part of the curriculum?', null, 0, 30, 90),

-- ============================================================
-- SOCIETY & CULTURE - Part 3 Questions
-- ============================================================

-- Follow-ups for: a cultural event
(3, 'Society & Culture', 'Why are cultural events important for a community?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can cultural events help promote understanding between different groups?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should governments provide funding for cultural events and festivals?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has globalisation affected local cultural events?', null, 0, 30, 90),
(3, 'Society & Culture', 'Do young people show enough interest in cultural events?', null, 0, 30, 90),

-- Follow-ups for: a changing tradition
(3, 'Society & Culture', 'Why do traditions change over time?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is it important to preserve all traditions or is change inevitable?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can a balance be struck between modernisation and cultural preservation?', null, 0, 30, 90),
(3, 'Society & Culture', 'What role do younger generations play in keeping traditions alive?', null, 0, 30, 90),

-- Follow-ups for: an interesting historical event
(3, 'Society & Culture', 'Why is it important to study history?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can historical events be taught in a way that engages young people?', null, 0, 30, 90),
(3, 'Society & Culture', 'Do people learn from the mistakes of the past?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has the way history is recorded changed with modern technology?', null, 0, 30, 90),

-- Follow-ups for: a museum you visited
(3, 'Society & Culture', 'What role do museums play in preserving culture and history?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should all museums be free to the public?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can museums attract younger visitors?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is it important for museums to return artefacts to their countries of origin?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has technology enhanced the museum experience?', null, 0, 30, 90),

-- Follow-ups for: a piece of local history
(3, 'Society & Culture', 'How important is it for communities to preserve their local history?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should historical buildings be protected even if they slow down urban development?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can local history be made more accessible and interesting to the public?', null, 0, 30, 90),
(3, 'Society & Culture', 'What is the value of oral history and personal stories in recording the past?', null, 0, 30, 90),

-- Follow-ups for: a celebration
(3, 'Society & Culture', 'How do celebrations bring communities together?', null, 0, 30, 90),
(3, 'Society & Culture', 'Have celebrations become too commercialised in modern times?', null, 0, 30, 90),
(3, 'Society & Culture', 'How do national celebrations help build a sense of identity?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should public holidays be based on cultural or religious events?', null, 0, 30, 90),

-- Follow-ups for: a custom from another culture
(3, 'Society & Culture', 'How can learning about other cultures benefit individuals and societies?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is cultural exchange always positive or can it lead to cultural appropriation?', null, 0, 30, 90),
(3, 'Society & Culture', 'What is the difference between appreciating a culture and appropriating it?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has travel and migration led to the mixing of cultures?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should schools teach students about diverse cultures from around the world?', null, 0, 30, 90),

-- Follow-ups for: a public figure who made a difference
(3, 'Society & Culture', 'What qualities are needed to be a positive public figure?', null, 0, 30, 90),
(3, 'Society & Culture', 'Do celebrities have a responsibility to use their influence for social good?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has social media changed the way public figures influence society?', null, 0, 30, 90),
(3, 'Society & Culture', 'Are ordinary people or public figures more effective at creating social change?', null, 0, 30, 90),

-- Follow-ups for: a charity you support
(3, 'Society & Culture', 'Why is charitable work important in society?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should wealthy individuals be expected to donate more to charity?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can charities ensure that donations are used effectively?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is volunteering more valuable than donating money?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has crowdfunding changed the way people support causes?', null, 0, 30, 90),

-- Follow-ups for: a social issue
(3, 'Society & Culture', 'What are the most serious social issues affecting your country today?', null, 0, 30, 90),
(3, 'Society & Culture', 'How can young people contribute to solving social problems?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should the media do more to raise awareness of social issues?', null, 0, 30, 90),
(3, 'Society & Culture', 'What is the role of education in addressing social inequality?', null, 0, 30, 90),

-- Follow-ups for: a rule you disagree with
(3, 'Society & Culture', 'Why do societies need rules and laws?', null, 0, 30, 90),
(3, 'Society & Culture', 'How should citizens go about trying to change laws they disagree with?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is civil disobedience ever justified?', null, 0, 30, 90),
(3, 'Society & Culture', 'Should young people have more say in the laws that govern them?', null, 0, 30, 90),

-- Follow-ups for: a change in your society
(3, 'Society & Culture', 'What are the biggest changes societies around the world are experiencing?', null, 0, 30, 90),
(3, 'Society & Culture', 'Is rapid social change always a good thing?', null, 0, 30, 90),
(3, 'Society & Culture', 'How does urbanisation affect the way people live?', null, 0, 30, 90),
(3, 'Society & Culture', 'What can societies do to help people adapt to rapid change?', null, 0, 30, 90),
(3, 'Society & Culture', 'How has the role of family in society changed in recent generations?', null, 0, 30, 90),

-- ============================================================
-- TECHNOLOGY - Part 3 Questions
-- ============================================================

-- Follow-ups for: an app you use often
(3, 'Technology', 'How have mobile apps changed the way people live and work?', null, 0, 30, 90),
(3, 'Technology', 'Are people becoming too dependent on their smartphones?', null, 0, 30, 90),
(3, 'Technology', 'What are the potential dangers of sharing personal data through apps?', null, 0, 30, 90),
(3, 'Technology', 'Should there be stricter regulations on how apps collect and use data?', null, 0, 30, 90),
(3, 'Technology', 'How do free apps make money and is this model fair to users?', null, 0, 30, 90),

-- Follow-ups for: a gadget you need
(3, 'Technology', 'Do people buy too many electronic gadgets they don''t really need?', null, 0, 30, 90),
(3, 'Technology', 'What is the environmental impact of constantly upgrading technology?', null, 0, 30, 90),
(3, 'Technology', 'How has the cost of technology affected access for people in developing countries?', null, 0, 30, 90),
(3, 'Technology', 'Should electronic devices be designed to last longer?', null, 0, 30, 90),

-- Follow-ups for: a helpful website
(3, 'Technology', 'How has the internet changed the way people access information?', null, 0, 30, 90),
(3, 'Technology', 'Is it possible to trust all the information found online?', null, 0, 30, 90),
(3, 'Technology', 'What skills do people need to evaluate online information critically?', null, 0, 30, 90),
(3, 'Technology', 'Should access to the internet be considered a basic human right?', null, 0, 30, 90),

-- Follow-ups for: a time tech caused a problem
(3, 'Technology', 'What are the most common problems people experience with technology?', null, 0, 30, 90),
(3, 'Technology', 'How dependent has society become on technology?', null, 0, 30, 90),
(3, 'Technology', 'What would happen if the internet stopped working for a day?', null, 0, 30, 90),
(3, 'Technology', 'Should people be encouraged to spend regular periods without technology?', null, 0, 30, 90),
(3, 'Technology', 'How can people protect themselves from cyber threats?', null, 0, 30, 90),

-- Follow-ups for: an invention you wish existed
(3, 'Technology', 'What drives human innovation and invention?', null, 0, 30, 90),
(3, 'Technology', 'Should governments invest more in scientific research and development?', null, 0, 30, 90),
(3, 'Technology', 'How can inventors ensure their creations benefit society rather than harm it?', null, 0, 30, 90),
(3, 'Technology', 'What ethical considerations should guide the development of new technologies?', null, 0, 30, 90),

-- Follow-ups for: learning to use something new
(3, 'Technology', 'Why do some people resist adopting new technology?', null, 0, 30, 90),
(3, 'Technology', 'How can older generations be helped to keep up with technological changes?', null, 0, 30, 90),
(3, 'Technology', 'Is the pace of technological change too fast for society to keep up with?', null, 0, 30, 90),
(3, 'Technology', 'What is the best way to learn how to use new technology?', null, 0, 30, 90),

-- Follow-ups for: technology that changed your life
(3, 'Technology', 'What has been the most important technological advancement in the last fifty years?', null, 0, 30, 90),
(3, 'Technology', 'Has technology made people''s lives better or worse overall?', null, 0, 30, 90),
(3, 'Technology', 'How will technology continue to change the way people live in the future?', null, 0, 30, 90),
(3, 'Technology', 'Is there a point where technology becomes more harmful than helpful?', null, 0, 30, 90),
(3, 'Technology', 'How has technology changed human relationships and social interactions?', null, 0, 30, 90),

-- Follow-ups for: an online community
(3, 'Technology', 'What are the benefits and risks of online communities?', null, 0, 30, 90),
(3, 'Technology', 'How do online communities differ from traditional ones?', null, 0, 30, 90),
(3, 'Technology', 'Can online communities be as supportive as real-life communities?', null, 0, 30, 90),
(3, 'Technology', 'What responsibility do platforms have in moderating online communities?', null, 0, 30, 90),

-- Follow-ups for: a time the internet was useful
(3, 'Technology', 'How has the internet transformed education and learning?', null, 0, 30, 90),
(3, 'Technology', 'What are the disadvantages of relying too heavily on the internet?', null, 0, 30, 90),
(3, 'Technology', 'How can governments ensure equal internet access for all citizens?', null, 0, 30, 90),
(3, 'Technology', 'Is the digital divide between developed and developing countries growing or shrinking?', null, 0, 30, 90),

-- Follow-ups for: an AI system you find interesting
(3, 'Technology', 'What are the potential benefits of artificial intelligence for society?', null, 0, 30, 90),
(3, 'Technology', 'What risks does artificial intelligence pose to employment?', null, 0, 30, 90),
(3, 'Technology', 'Should there be international regulations governing the development of AI?', null, 0, 30, 90),
(3, 'Technology', 'How might AI change the education system in the coming years?', null, 0, 30, 90),
(3, 'Technology', 'Is it possible for AI to be truly creative or will it always imitate human creativity?', null, 0, 30, 90),

-- ============================================================
-- TRAVEL - Part 3 Questions
-- ============================================================

-- Follow-ups for: a country you want to visit
(3, 'Travel', 'Why do people enjoy travelling to other countries?', null, 0, 30, 90),
(3, 'Travel', 'How does international travel broaden a person''s perspective?', null, 0, 30, 90),
(3, 'Travel', 'What impact does mass tourism have on local cultures?', null, 0, 30, 90),
(3, 'Travel', 'Should governments promote tourism or protect their culture from tourist influence?', null, 0, 30, 90),
(3, 'Travel', 'Is it better to travel to many places briefly or spend a long time in one place?', null, 0, 30, 90),

-- Follow-ups for: a memorable journey
(3, 'Travel', 'What makes a journey truly memorable?', null, 0, 30, 90),
(3, 'Travel', 'How has the experience of travel changed over the past century?', null, 0, 30, 90),
(3, 'Travel', 'Do you think people value the journey or the destination more?', null, 0, 30, 90),
(3, 'Travel', 'What role does travel play in personal development?', null, 0, 30, 90),

-- Follow-ups for: an interesting city
(3, 'Travel', 'What makes a city attractive to tourists?', null, 0, 30, 90),
(3, 'Travel', 'How can cities balance the needs of tourists and local residents?', null, 0, 30, 90),
(3, 'Travel', 'What challenges do rapidly growing cities face?', null, 0, 30, 90),
(3, 'Travel', 'Is city life better than life in the countryside?', null, 0, 30, 90),

-- Follow-ups for: a trip that went wrong
(3, 'Travel', 'How should people prepare for unexpected problems when travelling?', null, 0, 30, 90),
(3, 'Travel', 'Why do some people enjoy unplanned or spontaneous travel?', null, 0, 30, 90),
(3, 'Travel', 'How important is travel insurance for international travellers?', null, 0, 30, 90),
(3, 'Travel', 'Can negative travel experiences sometimes be more valuable than positive ones?', null, 0, 30, 90),
(3, 'Travel', 'What responsibilities do travel companies have when things go wrong?', null, 0, 30, 90),

-- Follow-ups for: an adventure activity
(3, 'Travel', 'Why are adventure sports and activities becoming more popular?', null, 0, 30, 90),
(3, 'Travel', 'Should adventure tourism be more strictly regulated for safety?', null, 0, 30, 90),
(3, 'Travel', 'What are the risks and benefits of extreme sports?', null, 0, 30, 90),
(3, 'Travel', 'Does the desire for adventure change as people get older?', null, 0, 30, 90),

-- Follow-ups for: a local attraction
(3, 'Travel', 'How important is tourism for local economies?', null, 0, 30, 90),
(3, 'Travel', 'What can be done to promote lesser-known tourist attractions?', null, 0, 30, 90),
(3, 'Travel', 'How can popular tourist sites be protected from damage caused by visitors?', null, 0, 30, 90),
(3, 'Travel', 'Should local residents receive discounted access to tourist attractions in their area?', null, 0, 30, 90),

-- Follow-ups for: travelling alone
(3, 'Travel', 'What are the advantages of travelling alone compared to travelling in a group?', null, 0, 30, 90),
(3, 'Travel', 'Is solo travel safe for everyone?', null, 0, 30, 90),
(3, 'Travel', 'How can solo travel contribute to personal growth?', null, 0, 30, 90),
(3, 'Travel', 'Why is solo travel becoming more popular among young people?', null, 0, 30, 90),
(3, 'Travel', 'What precautions should solo travellers take?', null, 0, 30, 90),

-- Follow-ups for: a transport you enjoy
(3, 'Travel', 'How should cities improve their public transport systems?', null, 0, 30, 90),
(3, 'Travel', 'What are the environmental impacts of different forms of transport?', null, 0, 30, 90),
(3, 'Travel', 'Will electric vehicles replace petrol cars in the near future?', null, 0, 30, 90),
(3, 'Travel', 'How has transport infrastructure changed in your country?', null, 0, 30, 90),

-- Follow-ups for: a very different place
(3, 'Travel', 'What can people learn from visiting places that are very different from their own?', null, 0, 30, 90),
(3, 'Travel', 'How does experiencing different ways of life change a person?', null, 0, 30, 90),
(3, 'Travel', 'Is globalisation making places around the world more similar?', null, 0, 30, 90),
(3, 'Travel', 'What is the value of cultural diversity in the world?', null, 0, 30, 90),

-- Follow-ups for: staying somewhere unusual
(3, 'Travel', 'How has accommodation changed for travellers in recent years?', null, 0, 30, 90),
(3, 'Travel', 'What impact have platforms like Airbnb had on the hotel industry?', null, 0, 30, 90),
(3, 'Travel', 'Is staying with local families a better way to experience a culture than staying in hotels?', null, 0, 30, 90),
(3, 'Travel', 'How important is comfort when choosing accommodation while travelling?', null, 0, 30, 90),
(3, 'Travel', 'What are the pros and cons of eco-lodges and sustainable accommodation?', null, 0, 30, 90),

-- Follow-ups for: a great travel companion
(3, 'Travel', 'What qualities make a good travel companion?', null, 0, 30, 90),
(3, 'Travel', 'How can travelling together strengthen or weaken a relationship?', null, 0, 30, 90),
(3, 'Travel', 'Is it better to travel with family, friends, or alone?', null, 0, 30, 90),
(3, 'Travel', 'How do people handle disagreements when travelling together?', null, 0, 30, 90),

-- Follow-ups for: a souvenir you brought home
(3, 'Travel', 'Why do people like to buy souvenirs when they travel?', null, 0, 30, 90),
(3, 'Travel', 'Has the souvenir industry become too commercialised?', null, 0, 30, 90),
(3, 'Travel', 'How can souvenirs help preserve local crafts and traditions?', null, 0, 30, 90),
(3, 'Travel', 'Is taking photographs a better way to remember a trip than buying souvenirs?', null, 0, 30, 90),
(3, 'Travel', 'What ethical issues should travellers consider when purchasing souvenirs?', null, 0, 30, 90),

-- ============================================================
-- PERSONAL GROWTH - Part 3 Questions
-- ============================================================

-- Follow-ups for: a time you felt proud
(3, 'Personal Growth', 'Why is it important for people to feel a sense of achievement?', null, 0, 30, 90),
(3, 'Personal Growth', 'How do parents and teachers help children develop a sense of pride in their work?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is there a difference between healthy pride and arrogance?', null, 0, 30, 90),
(3, 'Personal Growth', 'How does recognition and praise affect people''s motivation?', null, 0, 30, 90),
(3, 'Personal Growth', 'Should children receive prizes for participation or only for winning?', null, 0, 30, 90),

-- Follow-ups for: a challenge you overcame
(3, 'Personal Growth', 'Why is it important for people to face challenges in life?', null, 0, 30, 90),
(3, 'Personal Growth', 'How do difficult experiences help build character?', null, 0, 30, 90),
(3, 'Personal Growth', 'Should parents protect their children from all challenges or let them struggle?', null, 0, 30, 90),
(3, 'Personal Growth', 'What support systems help people overcome major life challenges?', null, 0, 30, 90),

-- Follow-ups for: one of the happiest times
(3, 'Personal Growth', 'What are the main factors that contribute to happiness?', null, 0, 30, 90),
(3, 'Personal Growth', 'Do you think people today are happier than previous generations?', null, 0, 30, 90),
(3, 'Personal Growth', 'Can money buy happiness?', null, 0, 30, 90),
(3, 'Personal Growth', 'How does the pursuit of material possessions affect people''s happiness?', null, 0, 30, 90),

-- Follow-ups for: a life-changing decision
(3, 'Personal Growth', 'What factors should people consider when making important life decisions?', null, 0, 30, 90),
(3, 'Personal Growth', 'Do people tend to make better decisions as they get older and more experienced?', null, 0, 30, 90),
(3, 'Personal Growth', 'How much influence should family have on major life decisions?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is it better to follow your head or your heart when making important decisions?', null, 0, 30, 90),
(3, 'Personal Growth', 'How does fear of failure affect people''s decision-making?', null, 0, 30, 90),

-- Follow-ups for: a time you were nervous
(3, 'Personal Growth', 'Why do some people handle pressure better than others?', null, 0, 30, 90),
(3, 'Personal Growth', 'What are effective ways to manage anxiety and nervousness?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is some level of nervousness beneficial for performance?', null, 0, 30, 90),
(3, 'Personal Growth', 'How has the pace of modern life contributed to increased anxiety in society?', null, 0, 30, 90),

-- Follow-ups for: a goal you achieved
(3, 'Personal Growth', 'Why is it important for people to set goals?', null, 0, 30, 90),
(3, 'Personal Growth', 'What is the best way to stay motivated when working towards a long-term goal?', null, 0, 30, 90),
(3, 'Personal Growth', 'Should people set realistic goals or aim for something very ambitious?', null, 0, 30, 90),
(3, 'Personal Growth', 'How do cultural differences influence the goals people set for themselves?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is it important to celebrate small achievements along the way to a big goal?', null, 0, 30, 90),

-- Follow-ups for: a disappointment
(3, 'Personal Growth', 'How do people typically react to disappointment?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is it possible to learn from every disappointment?', null, 0, 30, 90),
(3, 'Personal Growth', 'How can parents help children cope with disappointment?', null, 0, 30, 90),
(3, 'Personal Growth', 'Does social media make it harder for people to deal with disappointment?', null, 0, 30, 90),

-- Follow-ups for: a positive change
(3, 'Personal Growth', 'Why do people often resist change even when it could be beneficial?', null, 0, 30, 90),
(3, 'Personal Growth', 'What motivates people to make positive changes in their lives?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is it easier to change habits when you are young or old?', null, 0, 30, 90),
(3, 'Personal Growth', 'How does having a support network help when making significant life changes?', null, 0, 30, 90),

-- Follow-ups for: showing courage
(3, 'Personal Growth', 'What does it mean to be courageous in everyday life?', null, 0, 30, 90),
(3, 'Personal Growth', 'Are some people naturally more courageous than others?', null, 0, 30, 90),
(3, 'Personal Growth', 'How important is it for leaders to show courage?', null, 0, 30, 90),
(3, 'Personal Growth', 'Can courage be taught or developed over time?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is there a difference between physical courage and moral courage?', null, 0, 30, 90),

-- Follow-ups for: a moment of kindness
(3, 'Personal Growth', 'Why is kindness important in modern society?', null, 0, 30, 90),
(3, 'Personal Growth', 'Are people less kind today than they were in the past?', null, 0, 30, 90),
(3, 'Personal Growth', 'How can acts of kindness create a ripple effect in communities?', null, 0, 30, 90),
(3, 'Personal Growth', 'Should kindness and empathy be taught in schools?', null, 0, 30, 90),

-- Follow-ups for: an experience that matured you
(3, 'Personal Growth', 'At what age do people generally become mature?', null, 0, 30, 90),
(3, 'Personal Growth', 'What experiences contribute most to a person''s maturity?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is emotional maturity more important than intellectual maturity?', null, 0, 30, 90),
(3, 'Personal Growth', 'How does taking responsibility help people mature?', null, 0, 30, 90),

-- Follow-ups for: a fear you overcame
(3, 'Personal Growth', 'What are the most common fears people have?', null, 0, 30, 90),
(3, 'Personal Growth', 'How can overcoming fears lead to personal growth?', null, 0, 30, 90),
(3, 'Personal Growth', 'Is it always necessary to overcome our fears?', null, 0, 30, 90),
(3, 'Personal Growth', 'What role do fear and risk play in human progress?', null, 0, 30, 90),
(3, 'Personal Growth', 'How can society help people who suffer from extreme fears or phobias?', null, 0, 30, 90)

ON CONFLICT DO NOTHING;
