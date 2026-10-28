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

function message(key, ...args) {
  const value = uiMessages[currentLanguage]?.[key] ?? uiMessages.en[key] ?? key;
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

  document.querySelectorAll("body *").forEach((element) => {
    if (element.children.length || ["SCRIPT", "STYLE", "OPTION"].includes(element.tagName)) return;
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
    window.setTimeout(() => callback("Thank you! Your message was sent to the AITU Futsal team.", "success"), 600);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      showSubmissionResult("Please complete all fields correctly.", "error");
      return;
    }
    showSubmissionResult("Sending without reloading the page...", "");
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
      setError(fields.password, "Spaces are not allowed in the password.");
      return false;
    }
    if (password.length < 8 || password.length > 64) {
      setError(fields.password, "Password must contain 8-64 characters.");
      return false;
    }
    if (!strongPasswordPattern.test(password)) {
      setError(fields.password, "Add uppercase, lowercase, number and special character.");
      return false;
    }
    setValid(fields.password);
    return true;
  };

  const validatePasswordConfirmation = () => {
    if (!fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value) {
      setError(fields.confirmPassword, "Passwords must match exactly.");
      return false;
    }
    setValid(fields.confirmPassword);
    return true;
  };

  const validate = () => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fields.name.value.trim().length < 2) {
      setError(fields.name, "Enter your full name (at least 2 characters).");
      valid = false;
    } else setValid(fields.name);

    if (!emailPattern.test(fields.email.value.trim())) {
      setError(fields.email, "Enter a valid email address, for example name@aitu.edu.kz.");
      valid = false;
    } else setValid(fields.email);

    if (!fields.year.value) {
      setError(fields.year, "Select your year of study.");
      valid = false;
    } else setValid(fields.year);

    if (!form.querySelector('input[name="position"]:checked')) {
      form.querySelector("#position-error").textContent = "Choose your preferred position.";
      form.querySelector("#position-error").classList.add("is-visible");
      valid = false;
    } else {
      form.querySelector("#position-error").classList.remove("is-visible");
    }

    if (fields.message.value.trim().length < 15) {
      setError(fields.message, "Write at least 15 characters about yourself.");
      valid = false;
    } else setValid(fields.message);

    if (!validatePassword()) valid = false;
    if (!validatePasswordConfirmation()) valid = false;

    return valid;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
      form.querySelector(".is-invalid")?.focus();
      return;
    }
    status.textContent = "Application validated successfully!";
    status.className = "form-status success";
  });

  [fields.password, fields.confirmPassword].forEach((field) => {
    ["copy", "cut", "paste", "drop"].forEach((eventName) => {
      field.addEventListener(eventName, (event) => {
        event.preventDefault();
        setError(field, "Copying and pasting are disabled for password fields.");
        status.textContent = "Please type the password manually in both fields.";
        status.className = "form-status error";
      });
    });

    field.addEventListener("keydown", (event) => {
      if (event.key === " ") event.preventDefault();
    });
    field.addEventListener("input", () => {
      if (/\s/.test(field.value)) {
        field.value = field.value.replace(/\s/g, "");
        setError(field, "Spaces are not allowed and were removed.");
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
