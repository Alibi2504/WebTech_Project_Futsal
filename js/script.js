"use strict";

const supportedLanguages = ["en", "ru", "kk"];
let currentLanguage = "en";
try {
  const savedLanguage = window.localStorage.getItem("aitu-futsal-language");
  if (supportedLanguages.includes(savedLanguage)) currentLanguage = savedLanguage;
} catch (error) {
  currentLanguage = "en";
}

const uiMessages = {
  en: {
    dayMode: "Day mode", nightMode: "Night mode", switchDay: "Switch to Day mode", switchNight: "Switch to Night mode",
    dayActivated: "Day theme activated.", nightActivated: "Night theme activated.", goldLeague: "Gold League", silverLeague: "Silver League",
    versus: "vs", Tuesday: "Tuesday", Thursday: "Thursday", Saturday: "Saturday", "Court A": "Court A", "Court B": "Court B",
    match: "match", matches: "matches", upcoming: "upcoming", readMore: "Read More", readLess: "Read Less",
    rating: (value) => `Thank you! You rated the experience ${value} out of 5.`,
    audioUnsupported: "Audio is not supported in this browser.", whistle: "Match whistle played - kick-off!",
    languageChanged: "Interface language: English"
  },
  ru: {
    dayMode: "Дневной режим", nightMode: "Ночной режим", switchDay: "Включить дневной режим", switchNight: "Включить ночной режим",
    dayActivated: "Дневная тема включена.", nightActivated: "Ночная тема включена.", goldLeague: "Золотая лига", silverLeague: "Серебряная лига",
    versus: "против", Tuesday: "Вторник", Thursday: "Четверг", Saturday: "Суббота", "Court A": "Поле A", "Court B": "Поле B",
    match: "матч", matches: "матчей", upcoming: "предстоящих", readMore: "Читать дальше", readLess: "Свернуть",
    rating: (value) => `Спасибо! Ваша оценка: ${value} из 5.`,
    audioUnsupported: "Ваш браузер не поддерживает аудио.", whistle: "Свисток прозвучал - матч начался!",
    languageChanged: "Язык интерфейса: русский"
  },
  kk: {
    dayMode: "Күндізгі режим", nightMode: "Түнгі режим", switchDay: "Күндізгі режимді қосу", switchNight: "Түнгі режимді қосу",
    dayActivated: "Күндізгі тақырып қосылды.", nightActivated: "Түнгі тақырып қосылды.", goldLeague: "Алтын лига", silverLeague: "Күміс лига",
    versus: "қарсы", Tuesday: "Сейсенбі", Thursday: "Бейсенбі", Saturday: "Сенбі", "Court A": "Алаң A", "Court B": "Алаң B",
    match: "матч", matches: "матч", upcoming: "алдағы", readMore: "Толығырақ", readLess: "Жасыру",
    rating: (value) => `Рақмет! Сіздің бағаңыз: 5-тен ${value}.`,
    audioUnsupported: "Браузеріңіз аудионы қолдамайды.", whistle: "Ысқырық берілді - матч басталды!",
    languageChanged: "Интерфейс тілі: қазақша"
  }
};

const staticTranslations = {
  "Home": { ru: "Главная", kk: "Басты бет" },
  "Team": { ru: "Команда", kk: "Команда" },
  "Leagues": { ru: "Лиги", kk: "Лигалар" },
  "Events": { ru: "События", kk: "Іс-шаралар" },
  "Gallery": { ru: "Галерея", kk: "Галерея" },
  "Join Us": { ru: "Вступить", kk: "Бізге қосылу" },
  "Interface language": { ru: "Язык интерфейса", kk: "Интерфейс тілі" },
  "Built with arrays, objects and loops": { ru: "Создано с помощью массивов, объектов и циклов", kk: "Массивтер, нысандар және циклдер арқылы жасалды" },
  "Interactive Match Center": { ru: "Интерактивный матч-центр", kk: "Интерактивті матч орталығы" },
  "Filter the schedule without reloading the page. Match cards are generated entirely by JavaScript.": { ru: "Фильтруйте расписание без перезагрузки страницы. Карточки матчей полностью создаются JavaScript.", kk: "Кестені бетті қайта жүктемей сүзгілеңіз. Матч карточкаларын JavaScript толығымен жасайды." },
  "All matches": { ru: "Все матчи", kk: "Барлық матчтар" },
  "Gold League": { ru: "Золотая лига", kk: "Алтын лига" },
  "Silver League": { ru: "Серебряная лига", kk: "Күміс лига" },
  "Astana IT University": { ru: "Astana IT University", kk: "Astana IT University" },
  "More than a game. It is our community. A student futsal project bringing together players, referees, photographers and the SMM team.": { ru: "Больше, чем игра. Это наше сообщество. Студенческий футзальный проект, объединяющий игроков, судей, фотографов и SMM-команду.", kk: "Бұл ойыннан да үлкен - бұл біздің қауымдастық. Ойыншыларды, төрешілерді, фотографтарды және SMM тобын біріктіретін студенттік футзал жобасы." },
  "Meet the Team": { ru: "Познакомиться с командой", kk: "Командамен танысу" },
  "Join the Club": { ru: "Вступить в клуб", kk: "Клубқа қосылу" },
  "Who we are": { ru: "Кто мы", kk: "Біз кімбіз" },
  "More than players": { ru: "Больше, чем игроки", kk: "Тек ойыншылар емес" },
  "AITU Futsal is a university sports community where different roles work together to make every match possible.": { ru: "AITU Futsal - университетское спортивное сообщество, где участники разных ролей вместе организуют каждый матч.", kk: "AITU Futsal - әр матчты өткізу үшін түрлі рөлдегі қатысушылар бірге жұмыс істейтін университеттік спорт қауымдастығы." },
  "Teams": { ru: "Команды", kk: "Командалар" },
  "4 teams in Gold League and 8 teams in Silver League.": { ru: "4 команды в Золотой лиге и 8 команд в Серебряной лиге.", kk: "Алтын лигада 4 команда, Күміс лигада 8 команда бар." },
  "League Days": { ru: "Игровые дни", kk: "Ойын күндері" },
  "Matches take place every Tuesday and Thursday.": { ru: "Матчи проходят каждый вторник и четверг.", kk: "Матчтар әр сейсенбі және бейсенбі күндері өтеді." },
  "Match Time": { ru: "Время матчей", kk: "Матч уақыты" },
  "Regular match window at Cyber Arena.": { ru: "Обычное время матчей в Cyber Arena.", kk: "Cyber Arena-дағы тұрақты матч уақыты." },
  "University Team": { ru: "Сборная университета", kk: "Университет құрамасы" },
  "AITU competes in university competitions across Kazakhstan.": { ru: "AITU участвует в университетских соревнованиях по Казахстану.", kk: "AITU Қазақстандағы университеттік жарыстарға қатысады." },
  "Our community": { ru: "Наше сообщество", kk: "Біздің қауымдастық" },
  "Play. Compete. Represent.": { ru: "Играй. Соревнуйся. Представляй AITU.", kk: "Ойна. Жарыс. AITU атынан өнер көрсет." },
  "The club is built around competitive futsal and university life. Alongside players, the community includes referees, photographers and SMM members who help organize and present the games.": { ru: "Клуб объединяет соревновательный футзал и университетскую жизнь. Вместе с игроками матчи организуют судьи, фотографы и участники SMM-команды.", kk: "Клуб жарыстық футзал мен университет өмірін біріктіреді. Ойыншылармен бірге матчтарды төрешілер, фотографтар және SMM тобы ұйымдастырады." },
  "⚡ Gold League — 4 strongest AITU teams": { ru: "⚡ Золотая лига - 4 сильнейшие команды AITU", kk: "⚡ Алтын лига - AITU-дың 4 мықты командасы" },
  "⚡ Silver League — 8 teams": { ru: "⚡ Серебряная лига - 8 команд", kk: "⚡ Күміс лига - 8 команда" },
  "⚡ Regular matches on Tuesday and Thursday": { ru: "⚡ Регулярные матчи во вторник и четверг", kk: "⚡ Тұрақты матчтар сейсенбі және бейсенбі күндері" },
  "⚡ Special show matches for the university community": { ru: "⚡ Специальные показательные матчи для университета", kk: "⚡ Университет қауымдастығына арналған арнайы матчтар" },
  "Explore Events": { ru: "Посмотреть события", kk: "Іс-шараларды көру" },
  "Our identity": { ru: "Наша идентичность", kk: "Біздің болмысымыз" },
  "AITU on the court": { ru: "AITU на площадке", kk: "AITU алаңда" },
  "Three pillars of the AITU Futsal community.": { ru: "Три основы сообщества AITU Futsal.", kk: "AITU Futsal қауымдастығының үш тірегі." },
  "One team. One identity.": { ru: "Одна команда. Одна идентичность.", kk: "Бір команда. Бір болмыс." },
  "The AITU kit represents the university's identity on the futsal court.": { ru: "Форма AITU представляет университет на футзальной площадке.", kk: "AITU формасы университетті футзал алаңында танытады." },
  "Representing AITU": { ru: "Представляем AITU", kk: "AITU атынан" },
  "The AITU university team participates in inter-university futsal competitions in Kazakhstan.": { ru: "Сборная AITU участвует в межуниверситетских соревнованиях по футзалу в Казахстане.", kk: "AITU құрамасы Қазақстандағы университетаралық футзал жарыстарына қатысады." },
  "Train and prepare": { ru: "Тренироваться и готовиться", kk: "Жаттығу және дайындалу" },
  "Compete with university teams": { ru: "Играть против университетских команд", kk: "Университет командаларымен жарысу" },
  "Represent AITU with pride": { ru: "С гордостью представлять AITU", kk: "AITU атынан мақтанышпен өнер көрсету" },
  "Community": { ru: "Сообщество", kk: "Қауымдастық" },
  "Beyond the Game": { ru: "Больше, чем игра", kk: "Ойыннан да үлкен" },
  "Referees, photographers and SMM members all play a role in making AITU Futsal happen every week.": { ru: "Судьи, фотографы и SMM-команда каждую неделю помогают проводить AITU Futsal.", kk: "Төрешілер, фотографтар және SMM тобы AITU Futsal матчтарын апта сайын өткізуге көмектеседі." },
  "Join the club": { ru: "Вступить в клуб", kk: "Клубқа қосылу" },
  "JavaScript live features": { ru: "Интерактивные функции JavaScript", kk: "JavaScript интерактивті мүмкіндіктері" },
  "Matchday dashboard": { ru: "Панель игрового дня", kk: "Матч күні панелі" },
  "Play match whistle": { ru: "Проиграть свисток", kk: "Матч ысқырығын ойнату" },
  "Contact Us": { ru: "Связаться с нами", kk: "Бізбен байланысу" },
  "Choose an action to update this dashboard.": { ru: "Выберите действие для обновления панели.", kk: "Панельді жаңарту үшін әрекетті таңдаңыз." },
  "Attribute and content manipulation": { ru: "Изменение атрибутов и содержимого", kk: "Атрибуттар мен мазмұнды өзгерту" },
  "Inside a matchday": { ru: "Как проходит игровой день", kk: "Матч күні қалай өтеді" },
  "Every fixture starts long before kick-off: organizers prepare the court, referees check equipment, and media volunteers publish the line-ups.": { ru: "Подготовка начинается задолго до стартового свистка: организаторы готовят площадку, судьи проверяют оборудование, а медиаволонтёры публикуют составы.", kk: "Әр ойын басталғанға дейін ұйымдастырушылар алаңды дайындайды, төрешілер жабдықты тексереді, ал медиа еріктілер құрамдарды жариялайды." },
  "Rate the match experience": { ru: "Оцените впечатления от матча", kk: "Матчтан алған әсеріңізді бағалаңыз" },
  "No rating selected yet.": { ru: "Оценка пока не выбрана.", kk: "Әзірге баға таңдалмады." },
  "Frequently asked questions": { ru: "Часто задаваемые вопросы", kk: "Жиі қойылатын сұрақтар" },
  "Click a question to reveal or hide its answer.": { ru: "Нажмите на вопрос, чтобы показать или скрыть ответ.", kk: "Жауапты көрсету немесе жасыру үшін сұрақты басыңыз." },
  "Who can join AITU Futsal?": { ru: "Кто может вступить в AITU Futsal?", kk: "AITU Futsal-ға кім қосыла алады?" },
  "Any AITU student can apply as a player, referee, photographer, organizer or SMM team member.": { ru: "Любой студент AITU может подать заявку как игрок, судья, фотограф, организатор или участник SMM-команды.", kk: "Кез келген AITU студенті ойыншы, төреші, фотограф, ұйымдастырушы немесе SMM тобының мүшесі ретінде өтінім бере алады." },
  "When and where are matches played?": { ru: "Когда и где проходят матчи?", kk: "Матчтар қашан және қайда өтеді?" },
  "Regular league matches take place every Tuesday and Thursday from 18:00 to 20:00 at Cyber Arena.": { ru: "Матчи лиги проходят каждый вторник и четверг с 18:00 до 20:00 в Cyber Arena.", kk: "Лига матчтары әр сейсенбі және бейсенбі күндері 18:00-ден 20:00-ге дейін Cyber Arena-да өтеді." },
  "Do I need professional experience?": { ru: "Нужен ли профессиональный опыт?", kk: "Кәсіби тәжірибе қажет пе?" },
  "No. The club welcomes motivated students with different skill levels and helps them find a suitable role.": { ru: "Нет. Клуб принимает мотивированных студентов с разным уровнем подготовки и помогает выбрать подходящую роль.", kk: "Жоқ. Клуб әртүрлі деңгейдегі ынталы студенттерді қабылдап, лайықты рөл табуға көмектеседі." },
  "Our Team": { ru: "Наша команда", kk: "Біздің команда" },
  "Meet the students behind this AITU Futsal project.": { ru: "Познакомьтесь со студентами, создавшими проект AITU Futsal.", kk: "AITU Futsal жобасын жасаған студенттермен танысыңыз." },
  "Gold & Silver Leagues": { ru: "Золотая и Серебряная лиги", kk: "Алтын және Күміс лигалар" },
  "Two internal leagues create a competitive futsal environment at AITU.": { ru: "Две внутренние лиги создают соревновательную футзальную среду в AITU.", kk: "Екі ішкі лига AITU-да бәсекелі футзал ортасын қалыптастырады." },
  "Events & University Team": { ru: "События и сборная университета", kk: "Іс-шаралар және университет құрамасы" },
  "Futsal at AITU is also about community, entertainment and university pride.": { ru: "Футзал в AITU - это также сообщество, яркие события и гордость за университет.", kk: "AITU футзалы - қауымдастық, қызықты іс-шаралар және университет мақтанышы." },
  "Gallery": { ru: "Галерея", kk: "Галерея" },
  "Highlights from matches and events at the Cyber Arena.": { ru: "Лучшие моменты матчей и событий в Cyber Arena.", kk: "Cyber Arena-дағы матчтар мен іс-шаралардың жарқын сәттері." },
  "Join AITU Futsal": { ru: "Вступить в AITU Futsal", kk: "AITU Futsal-ға қосылу" },
  "Interested in futsal? Send us your application.": { ru: "Интересуетесь футзалом? Отправьте заявку.", kk: "Футзалға қызығасыз ба? Өтінім жіберіңіз." },
  "Application form": { ru: "Форма заявки", kk: "Өтінім нысаны" },
  "Player Registration": { ru: "Регистрация игрока", kk: "Ойыншыны тіркеу" },
  "Full Name": { ru: "Полное имя", kk: "Толық аты-жөні" },
  "Email Address": { ru: "Электронная почта", kk: "Электрондық пошта" },
  "Year of Study": { ru: "Курс обучения", kk: "Оқу курсы" },
  "Preferred Position": { ru: "Предпочитаемая позиция", kk: "Қалаған позиция" },
  "Tell us about yourself": { ru: "Расскажите о себе", kk: "Өзіңіз туралы айтыңыз" },
  "Password": { ru: "Пароль", kk: "Құпиясөз" },
  "Confirm Password": { ru: "Подтверждение пароля", kk: "Құпиясөзді растау" },
  "Send Application": { ru: "Отправить заявку", kk: "Өтінімді жіберу" },
  "Reset": { ru: "Очистить", kk: "Тазалау" },
  "Team members:": { ru: "Участники команды:", kk: "Команда мүшелері:" }
};

Object.assign(staticTranslations, {
  "Day mode": { ru: "Дневной режим", kk: "Күндізгі режим" },
  "Switch to Day mode": { ru: "Включить дневной режим", kk: "Күндізгі режимді қосу" },
  "Beyond the league": { ru: "За пределами лиги", kk: "Лигадан тыс" },
  "Show matches": { ru: "Показательные матчи", kk: "Көрсетілім матчтары" },
  "Football for the whole university": { ru: "Футбол для всего университета", kk: "Бүкіл университетке арналған футбол" },
  "AITU Futsal also organizes show matches that bring together different generations and roles from the university community.": { ru: "AITU Futsal также проводит показательные матчи, объединяющие разные поколения и участников университетского сообщества.", kk: "AITU Futsal университет қауымдастығындағы әртүрлі буындар мен рөлдерді біріктіретін көрсетілім матчтарын да ұйымдастырады." },
  "⚽ Graduates": { ru: "⚽ Выпускники", kk: "⚽ Түлектер" },
  "⚽ Current players": { ru: "⚽ Действующие игроки", kk: "⚽ Қазіргі ойыншылар" },
  "⚽ Teachers": { ru: "⚽ Преподаватели", kk: "⚽ Оқытушылар" },
  "⚽ Physical education instructors": { ru: "⚽ Преподаватели физкультуры", kk: "⚽ Дене шынықтыру нұсқаушылары" },
  "These matches add a friendly and entertaining side to the competitive futsal environment.": { ru: "Такие матчи добавляют дружескую и развлекательную атмосферу в соревновательный футзал.", kk: "Бұл матчтар бәсекелі футзал ортасына достық әрі көңілді атмосфера қосады." },
  "Join an event": { ru: "Принять участие", kk: "Іс-шараға қатысу" },
  "View gallery": { ru: "Открыть галерею", kk: "Галереяны көру" },
  "University representation": { ru: "Представление университета", kk: "Университет атынан" },
  "AITU Team Across Kazakhstan": { ru: "Команда AITU по всему Казахстану", kk: "AITU командасы Қазақстан бойынша" },
  "The university team participates in inter-university futsal competitions between universities in Kazakhstan.": { ru: "Сборная университета участвует в межвузовских соревнованиях по футзалу в Казахстане.", kk: "Университет құрамасы Қазақстандағы жоғары оқу орындары арасындағы футзал жарыстарына қатысады." },
  "Compete": { ru: "Соревноваться", kk: "Жарысу" },
  "Play against university teams from different parts of Kazakhstan.": { ru: "Играть против университетских команд из разных регионов Казахстана.", kk: "Қазақстанның әр өңіріндегі университет командаларына қарсы ойнау." },
  "Join": { ru: "Вступить", kk: "Қосылу" },
  "Represent": { ru: "Представлять", kk: "Таныстыру" },
  "Carry the AITU name and identity beyond the university league.": { ru: "Представлять имя и ценности AITU за пределами университетской лиги.", kk: "AITU атауы мен болмысын университет лигасынан тыс таныту." },
  "Meet team": { ru: "Познакомиться с командой", kk: "Командамен танысу" },
  "Achieve": { ru: "Добиваться результатов", kk: "Жетістікке жету" },
  "Work toward strong tournament performances and high placements.": { ru: "Стремиться к сильным выступлениям и высоким местам на турнирах.", kk: "Турнирлерде жақсы нәтиже мен жоғары орындарға ұмтылу." },
  "See leagues": { ru: "Посмотреть лиги", kk: "Лигаларды көру" },
  "The people behind the game": { ru: "Люди, стоящие за игрой", kk: "Ойынның артындағы адамдар" },
  "More Than Players": { ru: "Больше, чем игроки", kk: "Ойыншылардан да көп" },
  "Players": { ru: "Игроки", kk: "Ойыншылар" },
  "Train, compete and represent AITU on the court.": { ru: "Тренироваться, соревноваться и представлять AITU на площадке.", kk: "Жаттығу, жарысу және алаңда AITU атынан өнер көрсету." },
  "Referees": { ru: "Судьи", kk: "Төрешілер" },
  "Help matches run fairly and according to the rules.": { ru: "Помогать проводить матчи честно и по правилам.", kk: "Матчтардың әділ және ережеге сай өтуіне көмектесу." },
  "Apply": { ru: "Подать заявку", kk: "Өтінім беру" },
  "Photographers": { ru: "Фотографы", kk: "Фотографтар" },
  "Capture tournament moments, players and team memories.": { ru: "Снимать моменты турниров, игроков и командные воспоминания.", kk: "Турнир сәттерін, ойыншыларды және командалық естеліктерді түсіру." },
  "SMM Team": { ru: "SMM-команда", kk: "SMM тобы" },
  "Share results, announcements and club content with students.": { ru: "Публиковать результаты, объявления и материалы клуба для студентов.", kk: "Нәтижелерді, хабарландыруларды және клуб материалдарын студенттермен бөлісу." },
  "AITU Futsal moments": { ru: "Моменты AITU Futsal", kk: "AITU Futsal сәттері" },
  "Match Highlights": { ru: "Лучшие моменты матчей", kk: "Матчтың жарқын сәттері" },
  "Carousel": { ru: "Карусель", kk: "Карусель" },
  "Gold League in action": { ru: "Золотая лига в игре", kk: "Алтын лига ойында" },
  "The Team": { ru: "Команда", kk: "Команда" },
  "AITU Futsal squad at Cyber Arena": { ru: "Команда AITU Futsal в Cyber Arena", kk: "Cyber Arena-дағы AITU Futsal командасы" },
  "Official Kit": { ru: "Официальная форма", kk: "Ресми форма" },
  "Our home court at AITU": { ru: "Наша домашняя площадка в AITU", kk: "AITU-дағы үй алаңымыз" },
  "Silver League Match": { ru: "Матч Серебряной лиги", kk: "Күміс лига матчы" },
  "Eight teams competing weekly": { ru: "Восемь команд соревнуются каждую неделю", kk: "Сегіз команда апта сайын жарысады" },
  "Forward": { ru: "Нападающий", kk: "Шабуылшы" },
  "Goalkeeper / Defender": { ru: "Вратарь / Защитник", kk: "Қақпашы / Қорғаушы" },
  "Midfielder": { ru: "Полузащитник", kk: "Жартылай қорғаушы" },
  "Community Moments": { ru: "Моменты сообщества", kk: "Қауымдастық сәттері" },
  "Previous": { ru: "Назад", kk: "Алдыңғы" },
  "Next": { ru: "Вперёд", kk: "Келесі" },
  "All Photos": { ru: "Все фотографии", kk: "Барлық фотосуреттер" },
  "Photo Grid": { ru: "Фотогалерея", kk: "Фотосуреттер торы" },
  "League match — Cyber Arena": { ru: "Матч лиги — Cyber Arena", kk: "Лига матчы — Cyber Arena" },
  "Team photo 2026": { ru: "Командное фото 2026", kk: "2026 жылғы командалық фото" },
  "Official kit 2026": { ru: "Официальная форма 2026", kk: "2026 жылғы ресми форма" },
  "Cyber Arena — home court": { ru: "Cyber Arena — домашняя площадка", kk: "Cyber Arena — үй алаңы" },
  "Community moments": { ru: "Моменты сообщества", kk: "Қауымдастық сәттері" },
  "Tuesday night league": { ru: "Вечерняя лига во вторник", kk: "Сейсенбідегі кешкі лига" },
  "View Events": { ru: "Посмотреть события", kk: "Іс-шараларды көру" },
  "After the final whistle, results are verified and added to the league table. This shared workflow lets players focus on the match while the community learns event management, design and teamwork.": { ru: "После финального свистка результаты проверяются и добавляются в таблицу. Общая работа помогает игрокам сосредоточиться на матче, а сообществу — развивать навыки организации, дизайна и командной работы.", kk: "Соңғы ысқырықтан кейін нәтижелер тексеріліп, лига кестесіне қосылады. Ортақ жұмыс ойыншыларға матчқа көңіл бөлуге, ал қауымдастыққа іс-шара ұйымдастыру, дизайн және командалық жұмыс дағдыларын үйренуге мүмкіндік береді." },
  "Assignment 6 · jQuery Search": { ru: "Задание 6 · Поиск jQuery", kk: "6-тапсырма · jQuery іздеуі" },
  "Find your place in AITU Futsal": { ru: "Найдите своё место в AITU Futsal", kk: "AITU Futsal-дағы орныңызды табыңыз" },
  "Search teams, club roles and league information in real time.": { ru: "Ищите команды, роли и информацию о лигах в реальном времени.", kk: "Командаларды, клуб рөлдерін және лига ақпаратын нақты уақытта іздеңіз." },
  "Search the club directory": { ru: "Поиск по клубу", kk: "Клуб бойынша іздеу" },
  "Try: goalkeeper, Gold League, media...": { ru: "Например: вратарь, Золотая лига, медиа...", kk: "Мысалы: қақпашы, Алтын лига, медиа..." },
  "6 directory items": { ru: "6 элементов каталога", kk: "Каталогта 6 элемент" },
  "Competitive team in the Gold League.": { ru: "Соревновательная команда Золотой лиги.", kk: "Алтын лигадағы бәсекелі команда." },
  "Student team competing in the Silver League.": { ru: "Студенческая команда Серебряной лиги.", kk: "Күміс лигада жарысатын студенттік команда." },
  "Goalkeeper": { ru: "Вратарь", kk: "Қақпашы" },
  "Protect the goal and organize the defense.": { ru: "Защищает ворота и организует оборону.", kk: "Қақпаны қорғайды және қорғанысты ұйымдастырады." },
  "Referee": { ru: "Судья", kk: "Төреші" },
  "Apply the rules and manage club matches.": { ru: "Следит за правилами и управляет матчами клуба.", kk: "Ережелерді сақтап, клуб матчтарын басқарады." },
  "Photographer": { ru: "Фотограф", kk: "Фотограф" },
  "Capture match highlights for the community.": { ru: "Снимает лучшие моменты матчей для сообщества.", kk: "Қауымдастық үшін матчтың жарқын сәттерін түсіреді." },
  "Publish news, line-ups and match results.": { ru: "Публикует новости, составы и результаты матчей.", kk: "Жаңалықтарды, құрамдарды және матч нәтижелерін жариялайды." },
  "Share the schedule": { ru: "Поделиться расписанием", kk: "Кестемен бөлісу" },
  "Copy match information": { ru: "Скопировать информацию о матчах", kk: "Матч ақпаратын көшіру" },
  "Copy": { ru: "Копировать", kk: "Көшіру" },
  "Copied": { ru: "Скопировано", kk: "Көшірілді" },
  "Copied to clipboard!": { ru: "Скопировано в буфер обмена!", kk: "Алмасу буферіне көшірілді!" },
  "Contact the club": { ru: "Связаться с клубом", kk: "Клубпен байланысу" },
  "Send us a message": { ru: "Напишите нам", kk: "Бізге хабарлама жіберіңіз" },
  "Ask about teams, schedules or ways to contribute.": { ru: "Спросите о командах, расписании или способах помочь клубу.", kk: "Командалар, кесте немесе клубқа көмектесу жолдары туралы сұраңыз." },
  "Message": { ru: "Сообщение", kk: "Хабарлама" },
  "Send Message": { ru: "Отправить сообщение", kk: "Хабарлама жіберу" },
  "Become part of the community": { ru: "Станьте частью сообщества", kk: "Қауымдастықтың бір бөлігі болыңыз" },
  "Complete the form below to join the AITU Futsal club.": { ru: "Заполните форму ниже, чтобы вступить в клуб AITU Futsal.", kk: "AITU Futsal клубына қосылу үшін төмендегі нысанды толтырыңыз." },
  "Enter your name": { ru: "Введите имя", kk: "Атыңызды енгізіңіз" },
  "Select your year": { ru: "Выберите курс", kk: "Курсты таңдаңыз" },
  "1st year": { ru: "1 курс", kk: "1 курс" },
  "2nd year": { ru: "2 курс", kk: "2 курс" },
  "3rd year": { ru: "3 курс", kk: "3 курс" },
  "Masters degree": { ru: "Магистратура", kk: "Магистратура" },
  "Defender": { ru: "Защитник", kk: "Қорғаушы" },
  "Why would you like to join AITU Futsal?": { ru: "Почему вы хотите вступить в AITU Futsal?", kk: "Неліктен AITU Futsal-ға қосылғыңыз келеді?" },
  "Quick info": { ru: "Краткая информация", kk: "Қысқаша ақпарат" },
  "What you need to know": { ru: "Что нужно знать", kk: "Нені білу керек" },
  "When?": { ru: "Когда?", kk: "Қашан?" },
  "Where?": { ru: "Где?", kk: "Қайда?" },
  "Who?": { ru: "Для кого?", kk: "Кім үшін?" },
  "League activity takes place every Tuesday and Thursday from 18:00 to 20:00.": { ru: "Матчи проходят каждый вторник и четверг с 18:00 до 20:00.", kk: "Матчтар әр сейсенбі және бейсенбі күндері 18:00-ден 20:00-ге дейін өтеді." },
  "Matches take place at the Cyber Arena of Astana IT University.": { ru: "Матчи проходят в Cyber Arena Университета Astana IT.", kk: "Матчтар Astana IT University-дің Cyber Arena алаңында өтеді." },
  "Students can participate as players or contribute through other club roles.": { ru: "Студенты могут быть игроками или помогать клубу в других ролях.", kk: "Студенттер ойыншы бола алады немесе клубтың басқа рөлдеріне үлес қоса алады." }
});

Object.assign(staticTranslations, {
  "AITU Competition": { ru: "Соревнования AITU", kk: "AITU жарыстары" },
  "4 Teams": { ru: "4 команды", kk: "4 команда" },
  "The Gold League brings together the four strongest AITU futsal teams for high-level university competition.": { ru: "Золотая лига объединяет четыре сильнейшие команды AITU для соревнований высокого уровня.", kk: "Алтын лига жоғары деңгейдегі университеттік жарыс үшін AITU-дың төрт мықты командасын біріктіреді." },
  "🥇 Top 4 AITU teams": { ru: "🥇 4 лучшие команды AITU", kk: "🥇 AITU-дың 4 үздік командасы" },
  "🥇 Competitive league format": { ru: "🥇 Соревновательный формат", kk: "🥇 Бәсекелі лига форматы" },
  "🥇 Regular match schedule": { ru: "🥇 Регулярное расписание матчей", kk: "🥇 Тұрақты матч кестесі" },
  "Apply Now": { ru: "Подать заявку", kk: "Қазір өтінім беру" },
  "8 Teams": { ru: "8 команд", kk: "8 команда" },
  "The Silver League includes eight teams and gives more AITU students an opportunity to compete and develop.": { ru: "Серебряная лига включает восемь команд и даёт большему числу студентов AITU возможность соревноваться и развиваться.", kk: "Күміс лига сегіз команданы қамтып, AITU студенттеріне жарысуға және дамуға мүмкіндік береді." },
  "🥈 8 AITU teams": { ru: "🥈 8 команд AITU", kk: "🥈 AITU-дың 8 командасы" },
  "🥈 Regular league matches": { ru: "🥈 Регулярные матчи лиги", kk: "🥈 Тұрақты лига матчтары" },
  "🥈 Development and competition": { ru: "🥈 Развитие и соревнование", kk: "🥈 Даму және жарыс" },
  "Current standings": { ru: "Текущее положение", kk: "Ағымдағы турнир кестесі" },
  "League Table": { ru: "Таблица лиги", kk: "Лига кестесі" },
  "AITU Futsal league standings.": { ru: "Турнирная таблица AITU Futsal.", kk: "AITU Futsal турнир кестесі." },
  "Pos": { ru: "Место", kk: "Орын" },
  "Club": { ru: "Клуб", kk: "Клуб" },
  "Match schedule": { ru: "Расписание матчей", kk: "Матч кестесі" },
  "Every Tuesday & Thursday": { ru: "Каждый вторник и четверг", kk: "Әр сейсенбі және бейсенбі" },
  "AITU Futsal matches are held at the university's Cyber Arena from 18:00 to 20:00.": { ru: "Матчи AITU Futsal проходят в университетской Cyber Arena с 18:00 до 20:00.", kk: "AITU Futsal матчтары университеттің Cyber Arena алаңында 18:00-ден 20:00-ге дейін өтеді." },
  "Join a team": { ru: "Вступить в команду", kk: "Командаға қосылу" },
  "View events": { ru: "Посмотреть события", kk: "Іс-шараларды көру" },
  "Day": { ru: "День", kk: "Күн" },
  "Time": { ru: "Время", kk: "Уақыт" },
  "Activity": { ru: "Активность", kk: "Іс-шара" },
  "Tuesday": { ru: "Вторник", kk: "Сейсенбі" },
  "Thursday": { ru: "Четверг", kk: "Бейсенбі" },
  "League matches": { ru: "Матчи лиги", kk: "Лига матчтары" },
  "AITU Futsal": { ru: "AITU Futsal", kk: "AITU Futsal" },
  "Three students. One team.": { ru: "Три студента. Одна команда.", kk: "Үш студент. Бір команда." },
  "Our team members are active in the futsal community and also worked together on this website assignment.": { ru: "Участники нашей команды активно участвуют в футзальном сообществе и вместе работали над этим сайтом.", kk: "Команда мүшелері футзал қауымдастығына белсенді қатысып, осы сайт тапсырмасын бірге орындады." },
  "Goalkeeper/Defender": { ru: "Вратарь/Защитник", kk: "Қақпашы/Қорғаушы" },
  "19 years old. Plays as a defender and can also take the goalkeeper role.": { ru: "19 лет. Играет защитником и при необходимости занимает позицию вратаря.", kk: "19 жаста. Қорғаушы болып ойнайды және қақпашы рөлін де атқара алады." },
  "19 years old. A forward focused on movement, attacking play and finishing.": { ru: "19 лет. Нападающий, ориентированный на движение, атаку и завершение моментов.", kk: "19 жаста. Қозғалысқа, шабуылға және соққыны аяқтауға бағытталған шабуылшы." },
  "19 years old. A creative midfielder who helps connect defence and attack.": { ru: "19 лет. Креативный полузащитник, связывающий защиту и атаку.", kk: "19 жаста. Қорғаныс пен шабуылды байланыстыратын шығармашыл жартылай қорғаушы." },
  "About the team": { ru: "О команде", kk: "Команда туралы" },
  "Students behind the project": { ru: "Студенты — авторы проекта", kk: "Жоба авторлары — студенттер" },
  "All three members are first-year students at Astana IT University who play together in the AITU Futsal leagues and built this website as part of their Web Technologies assignment.": { ru: "Все три участника — студенты первого курса Astana IT University. Они вместе играют в лигах AITU Futsal и создали этот сайт в рамках задания по Web Technologies.", kk: "Үш қатысушы да Astana IT University-дің бірінші курс студенттері. Олар AITU Futsal лигаларында бірге ойнайды және бұл сайтты Web Technologies тапсырмасы аясында жасады." },
  "Beyond playing, they manage content, coordinate match schedules, and represent AITU in wider university competitions.": { ru: "Помимо игры, они создают контент, координируют расписание матчей и представляют AITU на межвузовских соревнованиях.", kk: "Ойыннан бөлек, олар контент жүргізеді, матч кестесін үйлестіреді және университетаралық жарыстарда AITU атынан өнер көрсетеді." },
  "Join the team": { ru: "Вступить в команду", kk: "Командаға қосылу" },
  "See events": { ru: "Посмотреть события", kk: "Іс-шараларды көру" }
});

Object.assign(staticTranslations, {
  "Home | AITU Futsal": { ru: "Главная | AITU Futsal", kk: "Басты бет | AITU Futsal" },
  "Our Team | AITU Futsal": { ru: "Наша команда | AITU Futsal", kk: "Біздің команда | AITU Futsal" },
  "Leagues | AITU Futsal": { ru: "Лиги | AITU Futsal", kk: "Лигалар | AITU Futsal" },
  "Events | AITU Futsal": { ru: "События | AITU Futsal", kk: "Іс-шаралар | AITU Futsal" },
  "Gallery | AITU Futsal": { ru: "Галерея | AITU Futsal", kk: "Галерея | AITU Futsal" },
  "Join Us | AITU Futsal": { ru: "Вступить | AITU Futsal", kk: "Қосылу | AITU Futsal" },
  "Main navigation": { ru: "Главная навигация", kk: "Негізгі навигация" },
  "Toggle navigation": { ru: "Открыть навигацию", kk: "Навигацияны ашу" },
  "Quick links": { ru: "Быстрые ссылки", kk: "Жылдам сілтемелер" },
  "Filter matches by league": { ru: "Фильтр матчей по лиге", kk: "Матчтарды лига бойынша сүзу" },
  "Match experience rating": { ru: "Оценка матча", kk: "Матчты бағалау" },
  "Copy schedule": { ru: "Скопировать расписание", kk: "Кестені көшіру" },
  "Close contact form": { ru: "Закрыть контактную форму", kk: "Байланыс нысанын жабу" },
  "Thank you! Your message was sent to the AITU Futsal team.": { ru: "Спасибо! Ваше сообщение отправлено команде AITU Futsal.", kk: "Рақмет! Хабарламаңыз AITU Futsal командасына жіберілді." },
  "Please complete all fields correctly.": { ru: "Пожалуйста, правильно заполните все поля.", kk: "Барлық өрістерді дұрыс толтырыңыз." },
  "Sending without reloading the page...": { ru: "Отправка без перезагрузки страницы...", kk: "Бетті қайта жүктемей жіберілуде..." },
  "Spaces are not allowed in the password.": { ru: "Пробелы в пароле запрещены.", kk: "Құпиясөзде бос орынға рұқсат жоқ." },
  "Password must contain 8-64 characters.": { ru: "Пароль должен содержать 8-64 символа.", kk: "Құпиясөз 8-64 таңбадан тұруы керек." },
  "Add uppercase, lowercase, number and special character.": { ru: "Добавьте заглавную и строчную буквы, цифру и специальный символ.", kk: "Бас және кіші әріп, сан және арнайы таңба қосыңыз." },
  "Passwords must match exactly.": { ru: "Пароли должны полностью совпадать.", kk: "Құпиясөздер толық сәйкес болуы керек." },
  "Enter your full name (at least 2 characters).": { ru: "Введите полное имя — минимум 2 символа.", kk: "Толық атыңызды енгізіңіз — кемінде 2 таңба." },
  "Enter a valid email address, for example name@aitu.edu.kz.": { ru: "Введите корректный email, например name@aitu.edu.kz.", kk: "Дұрыс email енгізіңіз, мысалы name@aitu.edu.kz." },
  "Select your year of study.": { ru: "Выберите курс обучения.", kk: "Оқу курсын таңдаңыз." },
  "Choose your preferred position.": { ru: "Выберите предпочитаемую позицию.", kk: "Қалаған позицияңызды таңдаңыз." },
  "Write at least 15 characters about yourself.": { ru: "Напишите о себе минимум 15 символов.", kk: "Өзіңіз туралы кемінде 15 таңба жазыңыз." },
  "Please correct the highlighted fields.": { ru: "Исправьте выделенные поля.", kk: "Белгіленген өрістерді түзетіңіз." },
  "Application validated successfully!": { ru: "Заявка успешно проверена!", kk: "Өтінім сәтті тексерілді!" },
  "Copying and pasting are disabled for password fields.": { ru: "Копирование и вставка в полях пароля отключены.", kk: "Құпиясөз өрістерінде көшіру және қою өшірілген." },
  "Please type the password manually in both fields.": { ru: "Введите пароль вручную в обоих полях.", kk: "Құпиясөзді екі өріске де қолмен енгізіңіз." },
  "Spaces are not allowed and were removed.": { ru: "Пробелы запрещены и были удалены.", kk: "Бос орындарға рұқсат жоқ, олар жойылды." },
  "Application submitted successfully!": { ru: "Заявка успешно отправлена!", kk: "Өтінім сәтті жіберілді!" },
  "Schedule copied to clipboard!": { ru: "Расписание скопировано!", kk: "Кесте алмасу буферіне көшірілді!" },
  "Please wait...": { ru: "Пожалуйста, подождите...", kk: "Күте тұрыңыз..." },
  "result found": { ru: "результат найден", kk: "нәтиже табылды" },
  "results found": { ru: "результатов найдено", kk: "нәтиже табылды" }
});

Object.assign(staticTranslations, {
  "Please enter your full name.": { ru: "Введите полное имя.", kk: "Толық аты-жөніңізді енгізіңіз." },
  "Please enter a valid email address.": { ru: "Введите корректный email.", kk: "Дұрыс email енгізіңіз." },
  "Please select your year.": { ru: "Выберите курс.", kk: "Курсты таңдаңыз." },
  "Please choose a position.": { ru: "Выберите позицию.", kk: "Позицияны таңдаңыз." },
  "Please tell us about yourself.": { ru: "Расскажите о себе.", kk: "Өзіңіз туралы айтыңыз." },
  "8-64 characters with uppercase, lowercase, number and special character. Spaces, copying and pasting are not allowed.": { ru: "8-64 символа: заглавная и строчная буквы, цифра и специальный символ. Пробелы, копирование и вставка запрещены.", kk: "8-64 таңба: бас және кіші әріп, сан және арнайы таңба. Бос орын, көшіру және қою рұқсат етілмейді." },
  "Enter a strong password without spaces.": { ru: "Введите надёжный пароль без пробелов.", kk: "Бос орынсыз сенімді құпиясөз енгізіңіз." },
  "Passwords must match.": { ru: "Пароли должны совпадать.", kk: "Құпиясөздер сәйкес болуы керек." },
  "Team actions": { ru: "Действия команды", kk: "Команда әрекеттері" },
  "Loading current date and time...": { ru: "Загрузка текущей даты и времени...", kk: "Ағымдағы күн мен уақыт жүктелуде..." },
  "Read More": { ru: "Читать дальше", kk: "Толығырақ" },
  "AITU Futsal FAQ": { ru: "Вопросы об AITU Futsal", kk: "AITU Futsal туралы сұрақтар" },
  "Please enter your name.": { ru: "Введите имя.", kk: "Атыңызды енгізіңіз." },
  "Please enter a valid email.": { ru: "Введите корректный email.", kk: "Дұрыс email енгізіңіз." },
  "Please enter at least 10 characters.": { ru: "Введите не менее 10 символов.", kk: "Кемінде 10 таңба енгізіңіз." },
  "Actions": { ru: "Действия", kk: "Әрекеттер" },
  "Gallery navigation": { ru: "Навигация по галерее", kk: "Галерея навигациясы" },
  "Cyber Arena — Match 1": { ru: "Cyber Arena — Матч 1", kk: "Cyber Arena — 1-матч" },
  "AITU Futsal · Tuesday & Thursday · 18:00-20:00 · Cyber Arena": { ru: "AITU Futsal · Вторник и четверг · 18:00-20:00 · Cyber Arena", kk: "AITU Futsal · Сейсенбі және бейсенбі · 18:00-20:00 · Cyber Arena" },
  "1 star": { ru: "1 звезда", kk: "1 жұлдыз" },
  "2 stars": { ru: "2 звезды", kk: "2 жұлдыз" },
  "3 stars": { ru: "3 звезды", kk: "3 жұлдыз" },
  "4 stars": { ru: "4 звезды", kk: "4 жұлдыз" },
  "5 stars": { ru: "5 звёзд", kk: "5 жұлдыз" },
  "Slide 1": { ru: "Слайд 1", kk: "1-слайд" }, "Slide 2": { ru: "Слайд 2", kk: "2-слайд" },
  "Slide 3": { ru: "Слайд 3", kk: "3-слайд" }, "Slide 4": { ru: "Слайд 4", kk: "4-слайд" },
  "Slide 5": { ru: "Слайд 5", kk: "5-слайд" }, "Slide 6": { ru: "Слайд 6", kk: "6-слайд" },
  "Slide 7": { ru: "Слайд 7", kk: "7-слайд" }, "Slide 8": { ru: "Слайд 8", kk: "8-слайд" },
  "Slide 9": { ru: "Слайд 9", kk: "9-слайд" }
});

function message(key, ...args) {
  const value = uiMessages[currentLanguage]?.[key]
    ?? uiMessages.en[key]
    ?? (currentLanguage === "en" ? key : staticTranslations[key]?.[currentLanguage])
    ?? key;
  return typeof value === "function" ? value(...args) : value;
}

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initThemeSwitcher();
  initKeyboardNavigation();
  initMatchCenter();
  initReadMore();
  initRating();
  initSoundEffect();
  initLanguageSelector();
  initAccordion();
  initContactModal();
  initJoinForm();
});

$(document).ready(function () {
  console.log("jQuery is ready!");
  initJQueryAssignment();
});

function initClock() {
  const clock = document.querySelector("#current-date-time");
  if (!clock) return;

  const updateClock = () => {
    const locale = currentLanguage === "ru" ? "ru-RU" : currentLanguage === "kk" ? "kk-KZ" : "en-US";
    clock.textContent = new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "medium"
    }).format(new Date());
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

function initThemeSwitcher() {
  const buttons = [...document.querySelectorAll(".theme-toggle")];
  if (!buttons.length) return;

  const setTheme = (theme, announce = false) => {
    const isDay = theme === "day";
    document.body.classList.toggle("theme-day", isDay);
    document.documentElement.style.colorScheme = isDay ? "light" : "dark";
    buttons.forEach((button) => {
      const isCompactButton = button.classList.contains("nav-link");
      button.textContent = isDay
        ? (isCompactButton ? message("nightMode") : message("switchNight"))
        : (isCompactButton ? message("dayMode") : message("switchDay"));
      button.setAttribute("aria-pressed", String(isDay));
    });
    try {
      window.localStorage.setItem("aitu-futsal-theme", theme);
    } catch (error) {
      // The theme still works if storage is disabled by the browser.
    }
    if (announce) updateDashboardMessage(isDay ? message("dayActivated") : message("nightActivated"));
  };

  let savedTheme = "night";
  try {
    savedTheme = window.localStorage.getItem("aitu-futsal-theme") || "night";
  } catch (error) {
    savedTheme = "night";
  }
  setTheme(savedTheme);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(document.body.classList.contains("theme-day") ? "night" : "day", true);
    });
  });
}

function updateDashboardMessage(message) {
  const output = document.querySelector("#dashboard-message");
  if (!output) return;
  output.textContent = message;
  output.classList.remove("is-updated");
  window.requestAnimationFrame(() => output.classList.add("is-updated"));
}

function initKeyboardNavigation() {
  const links = [...document.querySelectorAll("#mainNav .nav-link")];
  if (!links.length) return;

  links.forEach((link, index) => {
    link.addEventListener("keydown", (event) => {
      let nextIndex = index;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % links.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + links.length) % links.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = links.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      links[nextIndex].focus();
    });
  });
}

const matchData = [
  { league: "gold", home: "AITU United", away: "Nomads", day: "Tuesday", time: "18:00", court: "Court A" },
  { league: "silver", home: "Byte Strikers", away: "Cyber Wolves", day: "Tuesday", time: "19:00", court: "Court B" },
  { league: "gold", home: "Data FC", away: "AITU United", day: "Thursday", time: "18:30", court: "Court A" },
  { league: "silver", home: "Code Eleven", away: "Binary Ballers", day: "Thursday", time: "19:30", court: "Court B" },
  { league: "silver", home: "Cloud Crew", away: "Byte Strikers", day: "Saturday", time: "17:00", court: "Court A" },
  { league: "gold", home: "Nomads", away: "Data FC", day: "Saturday", time: "18:00", court: "Court A" }
];

function createMatchCard(match, index) {
  const leagueName = match.league === "gold" ? message("goldLeague") : message("silverLeague");
  const color = match.league === "gold" ? "#e7c85b" : "#b8c5ce";
  return `
    <article class="match-card" style="--league-color:${color};animation-delay:${index * 60}ms">
      <span class="badge-custom">${leagueName}</span>
      <h3 class="mt-3">${match.home} ${message("versus")} ${match.away}</h3>
      <p class="match-meta">${message(match.day)} · ${match.time} · ${message(match.court)}</p>
    </article>`;
}

function initMatchCenter() {
  const container = document.querySelector("#match-list");
  const count = document.querySelector("#match-count");
  const buttons = [...document.querySelectorAll(".filter-button")];
  if (!container || !count || !buttons.length) return;

  const renderMatches = (filter) => {
    const visibleMatches = matchData.filter((match) => filter === "all" || match.league === filter);
    container.innerHTML = visibleMatches.map(createMatchCard).join("");
    count.textContent = `${visibleMatches.length} ${message("upcoming")} ${message(visibleMatches.length === 1 ? "match" : "matches")}`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderMatches(button.dataset.filter);
    });
  });
  renderMatches("all");
}

function initReadMore() {
  const button = document.querySelector("#read-more-button");
  const content = document.querySelector("#extra-story");
  if (!button || !content) return;
  button.addEventListener("click", () => {
    const willOpen = content.hidden;
    content.hidden = !willOpen;
    button.textContent = willOpen ? message("readLess") : message("readMore");
    button.setAttribute("aria-expanded", String(willOpen));
  });
}

function initRating() {
  const stars = [...document.querySelectorAll("#rating-stars button")];
  const message = document.querySelector("#rating-message");
  if (!stars.length || !message) return;
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = Number(star.dataset.rating);
      stars.forEach((item) => {
        const selected = Number(item.dataset.rating) <= rating;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-checked", String(Number(item.dataset.rating) === rating));
      });
      message.textContent = uiMessages[currentLanguage].rating(rating);
    });
  });
}

function initSoundEffect() {
  const button = document.querySelector("#sound-button");
  if (!button) return;
  button.addEventListener("click", () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      updateDashboardMessage(message("audioUnsupported"));
      return;
    }
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1180, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(820, context.currentTime + 0.18);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.25);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.26);
    oscillator.addEventListener("ended", () => context.close());
    updateDashboardMessage(message("whistle"));
  });
}

function initLanguageSelector() {
  const selector = document.querySelector("#language-selector");
  if (selector) selector.value = currentLanguage;
  applyLanguage(currentLanguage);
  if (!selector) return;
  selector.addEventListener("change", () => {
    applyLanguage(selector.value, true);
  });
}

function applyLanguage(language, announce = false) {
  currentLanguage = supportedLanguages.includes(language) ? language : "en";
  document.documentElement.lang = currentLanguage;
  try {
    window.localStorage.setItem("aitu-futsal-language", currentLanguage);
  } catch (error) {
    // Translation still works when storage is disabled.
  }

  document.querySelectorAll("body *, title").forEach((element) => {
    if (element.children.length || ["SCRIPT", "STYLE"].includes(element.tagName)) return;
    if (!element.dataset.i18nOriginal) {
      const original = element.textContent.replace(/\s+/g, " ").trim();
      if (staticTranslations[original]) element.dataset.i18nOriginal = original;
    }
    const original = element.dataset.i18nOriginal;
    if (!original) return;
    element.textContent = currentLanguage === "en"
      ? original
      : (staticTranslations[original]?.[currentLanguage] || original);
  });

  document.querySelectorAll("[placeholder], [title], [aria-label]").forEach((element) => {
    ["placeholder", "title", "aria-label"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const dataKey = `i18n${attribute.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())}`;
      if (!element.dataset[dataKey]) element.dataset[dataKey] = element.getAttribute(attribute);
      const original = element.dataset[dataKey];
      element.setAttribute(attribute, currentLanguage === "en"
        ? original
        : (staticTranslations[original]?.[currentLanguage] || original));
    });
  });

  document.querySelectorAll(".search-item").forEach((item) => {
    if (!item.dataset.searchOriginal) item.dataset.searchOriginal = item.dataset.search || "";
    item.dataset.search = `${item.dataset.searchOriginal} ${item.textContent}`;
    if (window.jQuery) window.jQuery(item).data("original-html", item.innerHTML);
  });

  const selector = document.querySelector("#language-selector");
  if (selector) selector.value = currentLanguage;

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const isDay = document.body.classList.contains("theme-day");
    const compact = button.classList.contains("nav-link");
    button.textContent = isDay
      ? (compact ? message("nightMode") : message("switchNight"))
      : (compact ? message("dayMode") : message("switchDay"));
  });

  const readMoreButton = document.querySelector("#read-more-button");
  const extraStory = document.querySelector("#extra-story");
  if (readMoreButton && extraStory) readMoreButton.textContent = extraStory.hidden ? message("readMore") : message("readLess");

  document.querySelector(".filter-button.is-active")?.click();
  initClockLanguageRefresh();
  if (announce) updateDashboardMessage(message("languageChanged"));
}

function initClockLanguageRefresh() {
  const clock = document.querySelector("#current-date-time");
  if (!clock) return;
  const locale = currentLanguage === "ru" ? "ru-RU" : currentLanguage === "kk" ? "kk-KZ" : "en-US";
  clock.textContent = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeStyle: "medium" }).format(new Date());
}

function initAccordion() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("is-open", !isOpen);
    });
  });
}

function initContactModal() {
  const modal = document.querySelector("#contact-modal");
  const openButton = document.querySelector("#open-contact-modal");
  if (!modal || !openButton) return;

  const closeButton = modal.querySelector(".modal-close");
  const form = modal.querySelector("#contact-form");
  const status = modal.querySelector("#contact-status");

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    openButton.focus();
  };

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  const showSubmissionResult = (message, type) => {
    status.textContent = message;
    status.className = `form-status ${type}`;
  };

  const submitContactForm = (callback) => {
    window.setTimeout(() => callback(message("Thank you! Your message was sent to the AITU Futsal team."), "success"), 600);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showSubmissionResult(message("Please complete all fields correctly."), "error");
      return;
    }
    showSubmissionResult(message("Sending without reloading the page..."), "");
    submitContactForm((message, type) => {
      showSubmissionResult(message, type);
      form.reset();
      form.classList.remove("was-validated");
    });
  });
}

function initJoinForm() {
  const form = document.querySelector("#join-form");
  if (!form) return;

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    year: form.querySelector("#year"),
    message: form.querySelector("#message"),
    password: form.querySelector("#password"),
    confirmPassword: form.querySelector("#confirm-password")
  };
  const status = form.querySelector("#join-form-status");
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,64}$/;

  const setError = (field, message) => {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    if (error) error.textContent = message;
  };

  const setValid = (field) => {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  };

  const validatePassword = () => {
    const password = fields.password.value;
    if (/\s/.test(password)) {
      setError(fields.password, message("Spaces are not allowed in the password."));
      return false;
    }
    if (password.length < 8 || password.length > 64) {
      setError(fields.password, message("Password must contain 8-64 characters."));
      return false;
    }
    if (!strongPasswordPattern.test(password)) {
      setError(fields.password, message("Add uppercase, lowercase, number and special character."));
      return false;
    }
    setValid(fields.password);
    return true;
  };

  const validatePasswordConfirmation = () => {
    if (!fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value) {
      setError(fields.confirmPassword, message("Passwords must match exactly."));
      return false;
    }
    setValid(fields.confirmPassword);
    return true;
  };

  const validate = () => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fields.name.value.trim().length < 2) {
      setError(fields.name, message("Enter your full name (at least 2 characters)."));
      valid = false;
    } else setValid(fields.name);

    if (!emailPattern.test(fields.email.value.trim())) {
      setError(fields.email, message("Enter a valid email address, for example name@aitu.edu.kz."));
      valid = false;
    } else setValid(fields.email);

    if (!fields.year.value) {
      setError(fields.year, message("Select your year of study."));
      valid = false;
    } else setValid(fields.year);

    if (!form.querySelector('input[name="position"]:checked')) {
      form.querySelector("#position-error").textContent = message("Choose your preferred position.");
      form.querySelector("#position-error").classList.add("is-visible");
      valid = false;
    } else {
      form.querySelector("#position-error").classList.remove("is-visible");
    }

    if (fields.message.value.trim().length < 15) {
      setError(fields.message, message("Write at least 15 characters about yourself."));
      valid = false;
    } else setValid(fields.message);

    if (!validatePassword()) valid = false;
    if (!validatePasswordConfirmation()) valid = false;

    return valid;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      status.textContent = message("Please correct the highlighted fields.");
      status.className = "form-status error";
      form.querySelector(".is-invalid")?.focus();
      return;
    }
    status.textContent = message("Application validated successfully!");
    status.className = "form-status success";
  });

  [fields.password, fields.confirmPassword].forEach((field) => {
    ["copy", "cut", "paste", "drop"].forEach((eventName) => {
      field.addEventListener(eventName, (event) => {
        event.preventDefault();
        setError(field, message("Copying and pasting are disabled for password fields."));
        status.textContent = message("Please type the password manually in both fields.");
        status.className = "form-status error";
      });
    });

    field.addEventListener("keydown", (event) => {
      if (event.key === " ") event.preventDefault();
    });
    field.addEventListener("input", () => {
      if (/\s/.test(field.value)) {
        field.value = field.value.replace(/\s/g, "");
        setError(field, message("Spaces are not allowed and were removed."));
      }
    });
  });

  fields.password.addEventListener("input", () => {
    if (fields.password.value) validatePassword();
    if (fields.confirmPassword.value) validatePasswordConfirmation();
  });
  fields.confirmPassword.addEventListener("input", () => {
    if (fields.confirmPassword.value) validatePasswordConfirmation();
  });

  fields.password.addEventListener("blur", () => {
    validatePassword();
    if (fields.confirmPassword.value) validatePasswordConfirmation();
  });
  fields.confirmPassword.addEventListener("blur", validatePasswordConfirmation);

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      form.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
        field.classList.remove("is-valid", "is-invalid");
      });
      form.querySelector("#position-error").classList.remove("is-visible");
      status.textContent = "";
      status.className = "form-status";
    });
  });
}

function initJQueryAssignment() {
  const $body = $("body");
  $body.prepend('<div class="scroll-progress" aria-hidden="true"><div class="scroll-progress__bar"></div></div>');
  $body.append('<div id="jquery-toast" class="jquery-toast" role="status" aria-live="polite"></div>');

  const showToast = (text) => {
    const $toast = $("#jquery-toast");
    $toast.stop(true, true).text(text).addClass("is-visible").fadeIn(180).delay(1800).fadeOut(450, function () {
      $toast.removeClass("is-visible");
    });
  };

  const updateScrollProgress = () => {
    const documentHeight = $(document).height() - $(window).height();
    const progress = documentHeight > 0 ? ($(window).scrollTop() / documentHeight) * 100 : 0;
    $(".scroll-progress__bar").css("width", `${Math.min(100, progress)}%`);
  };
  $(window).on("scroll resize", updateScrollProgress);
  updateScrollProgress();

  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  $(".search-item").each(function () {
    $(this).data("original-html", $(this).html());
  });

  const performSearch = () => {
    const query = $("#futsal-search").val().trim();
    const normalized = query.toLowerCase();
    let visibleCount = 0;

    $(".search-item").each(function () {
      const $item = $(this);
      const matches = !normalized || $item.data("search").toLowerCase().includes(normalized);
      $item.toggle(matches).html($item.data("original-html"));
      if (matches) {
        visibleCount += 1;
        if (query) {
          const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
          $item.find("h3, p").each(function () {
            $(this).html($(this).text().replace(regex, "<mark>$1</mark>"));
          });
        }
      }
    });

    $("#search-summary").text(`${visibleCount} ${message(visibleCount === 1 ? "result found" : "results found")}`);
    const directoryNames = $(".search-item h3").map(function () {
      return $(this).text();
    }).get();
    const suggestions = query
      ? directoryNames.filter((name) => name.toLowerCase().includes(normalized)).slice(0, 5)
      : [];
    const $suggestions = $("#search-suggestions").empty();
    suggestions.forEach((name) => {
      $("<button>", { type: "button", class: "search-suggestion", text: name, role: "option" }).appendTo($suggestions);
    });
    $suggestions.prop("hidden", suggestions.length === 0);
  };

  $("#futsal-search").on("keyup input", performSearch);
  $(document).on("click", ".search-suggestion", function () {
    $("#futsal-search").val($(this).text()).trigger("input").focus();
    $("#search-suggestions").prop("hidden", true);
  });

  let countersStarted = false;
  const startCounters = () => {
    if (countersStarted || !$(".js-counter").length) return;
    if ($(window).scrollTop() + $(window).height() < $(".js-counter").first().offset().top) return;
    countersStarted = true;
    $(".js-counter").each(function () {
      const $counter = $(this);
      $({ value: 0 }).animate({ value: Number($counter.data("target")) }, {
        duration: 1200,
        easing: "swing",
        step(value) { $counter.text(Math.ceil(value)); },
        complete() { $counter.text($counter.data("target")); }
      });
    });
  };
  $(window).on("scroll", startCounters);
  startCounters();

  $("#join-form").on("submit", function () {
    const $form = $(this);
    window.setTimeout(() => {
      if (!$form.find(".is-invalid").length && $form.find("#join-form-status").hasClass("success")) {
        const $button = $("#join-submit");
        $button.prop("disabled", true).addClass("is-loading");
        $button.find(".submit-label").html(`<span class="submit-spinner" aria-hidden="true"></span> ${message("Please wait...")}`);
        window.setTimeout(() => {
          $button.prop("disabled", false).removeClass("is-loading");
          $button.find(".submit-label").text(message("Send Application"));
          showToast(message("Application submitted successfully!"));
        }, 1500);
      }
    }, 0);
  });

  $(document).on("click", ".copy-button", async function () {
    const $button = $(this);
    const text = $($button.data("copy-target")).text();
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const $temporary = $("<textarea>").val(text).appendTo("body").select();
      document.execCommand("copy");
      $temporary.remove();
    }
    $button.find(".copy-icon").text("✓");
    $button.find(".copy-label").text(message("Copied"));
    $button.siblings(".copy-tooltip").addClass("is-visible");
    showToast(message("Schedule copied to clipboard!"));
    window.setTimeout(() => {
      $button.find(".copy-icon").text("⧉");
      $button.find(".copy-label").text(message("Copy"));
      $button.siblings(".copy-tooltip").removeClass("is-visible");
    }, 1800);
  });

  const loadVisibleImages = () => {
    const viewportBottom = $(window).scrollTop() + $(window).height() + 160;
    $("img.lazy-image[data-src]").each(function () {
      const $image = $(this);
      if ($image.offset().top <= viewportBottom) {
        $image.attr("src", $image.attr("data-src")).removeAttr("data-src").addClass("is-loaded");
      }
    });
  };
  $(window).on("scroll resize", loadVisibleImages);
  loadVisibleImages();
}

