
# AITU FUTSAL CLUB — Final Project

A responsive multi-page website developed for the Web Technologies course at Astana IT University.

The project represents the AITU Futsal Club and provides information about the team, leagues, events, and activities. It also demonstrates frontend development skills through interactive JavaScript and jQuery features, responsive layouts, browser storage, and external API integration.

## Team Members

**Group:** SE-2504

- Yerassyl Bakhtybay
- Shyngysskhan Zharylgassyn
- Alibi Ramazan

## Live Website

[Visit AITU Futsal Club](https://alibi2504.github.io/WebTech_Project_Futsal/)

## GitHub Repository

[View Source Code](https://github.com/Alibi2504/WebTech_Project_Futsal)

## Technologies Used

- **HTML5** — website structure and content.
- **CSS3** — custom styling, layouts, animations, and responsive design.
- **Bootstrap 5.3.3** — responsive grid system and interface components.
- **JavaScript** — interactive functionality and dynamic behavior.
- **jQuery** — DOM manipulation, event handling, and animations.
- **Local Storage** — storing simulated user accounts, session data, and theme preferences.
- **Open-Meteo API** — retrieving current weather information for Astana.

## Website Pages

The project consists of eight connected HTML pages:

| Page | Description |
|---|---|
| `index.html` | Home page with club information, match dashboard, statistics, search, filters, FAQ, and weather information. |
| `team.html` | Player profiles and information about club members. |
| `leagues.html` | Gold and Silver League standings, points, and match schedules. |
| `events.html` | Upcoming matches and university futsal events. |
| `gallery.html` | Photo gallery with interactive media elements. |
| `join.html` | Sign Up page with custom form validation. |
| `login.html` | Log In page with client-side credential verification. |
| `profile.html` | User profile with stored account information and logout functionality. |

## Final Project Features

### Interactive JavaScript and jQuery

1. **Real-time Search:** Directory filtering uses jQuery `input` and `keyup` events.
2. **Autocomplete:** Suggestions are dynamically generated below the search field.
3. **Search Highlighting:** Matching visible text is highlighted using `<mark>` elements.
4. **Scroll Progress Bar:** A gradient progress bar updates as the user scrolls through the page.
5. **Animated Statistics:** Landing-page counters animate when they enter the viewport.
6. **Loading Button:** The registration submit button is disabled and displays a spinner during the simulated request.
7. **Toast Notifications:** Temporary notifications provide feedback after successful actions.
8. **Clipboard Functionality:** The schedule copy button copies text to the clipboard, changes to a checkmark, and displays a tooltip.
9. **Lazy Loading:** Gallery images use `data-src` and load when they approach the viewport.
10. **Responsive Experience:** Eight connected pages adapt to desktop, tablet, and mobile screens.
11. **Theme Switching:** Light and dark modes are saved across pages using `localStorage`.
12. **User Authentication Simulation:** Sign Up stores a simulated user account locally; Log In verifies credentials and opens the Profile page.
13. **Custom Form Validation:** JavaScript validates required fields, email, phone number, and password without relying on native browser validation attributes.
14. **External API Integration:** Open-Meteo provides current weather information for Astana, including loading and error states.

## API Integration

The project uses the **Open-Meteo API** to retrieve current weather data for Astana.

The weather section displays information such as:

- Current temperature.
- Apparent temperature.
- Weather conditions.
- Wind speed.

The application handles asynchronous requests and includes loading, error, and refresh states.

## jQuery Implementation — Defense Notes

The project demonstrates several jQuery methods and techniques:

- `$(document).ready()` — executes code when the DOM is ready.
- `.on()` — attaches event handlers.
- `.each()` — iterates through selected elements.
- `.toggle()` — shows or hides elements.
- `.html()` — updates HTML content.
- Regular expressions — support search and validation.
- `.animate()` — creates animated counters.
- `.fadeIn()` and `.fadeOut()` — display and hide toast notifications.
- `.delay()` — adds a delay before an animation.
- `.scroll()` — handles page scrolling.
- `.offset()` — determines an element's position.
- `.attr("src")` — assigns image sources during lazy loading.

## Project Structure

```text
WebTech_Project_Futsal/
│
├── index.html
├── team.html
├── leagues.html
├── events.html
├── gallery.html
├── join.html
├── login.html
├── profile.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   └── ...
│
└── README.md
```

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a browser or start a local static server in the project folder.
4. Make sure an internet connection is available for Bootstrap and jQuery CDN files and the Open-Meteo API.

## Important Note

User registration and authentication are implemented as a frontend simulation using browser `localStorage`. Account information is stored locally in the user's browser. The project does not use a backend server or a shared database and is intended for educational demonstration purposes.

## Project Goal

The main goal of this project is to demonstrate practical frontend development knowledge, including responsive web design, interactive JavaScript and jQuery functionality, form validation, browser storage, animations, and external API integration.

---

**AITU Futsal Club — Web Technologies Final Project, Group SE-2504.**
