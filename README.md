# Ration Radar

A meal planner that helps students eat well without spending too much.

Ration Radar lets you plan meals around your budget, find recipes that match your preferences, and create a grocery list from the meals you choose. It is designed with students in Debrecen in mind.

## Features

- Set a food budget, number of days, and number of people.
- Choose dietary preferences and cuisines.
- Browse breakfast, lunch, dinner, and snack ideas.
- View recipe ingredients and cooking instructions.
- Save recipes for later.
- Generate a grocery list from selected meals.
- Compare estimated costs at Tesco, SPAR, and Aldi.
- Tick off items while shopping.
- Use hands-free cooking mode for voice-guided recipe instructions.

## Built With

- HTML
- CSS
- JavaScript
- Local Storage
- ElevenLabs client for voice cooking mode

## Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/ration-radar.git
cd ration-radar
```

Start a local server:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

You can also open `index.html` using the Live Server extension in VS Code.

## Project Files

```text
ration-radar/
├── index.html
├── preview.html
├── style.css
├── script.js
└── database.js
```

- `index.html` — Main page
- `preview.html` — Preview page
- `style.css` — Layout and styling
- `script.js` — App functionality
- `database.js` — Recipe and ingredient data

## A Note About Prices and Dietary Filters

The supermarket prices are sample data, not live prices from Tesco, SPAR, or Aldi.

Dietary filters check the ingredients listed in the recipe database. They cannot guarantee that a meal is suitable for a medical condition, prevent cross-contamination, or confirm Halal or Kosher certification. Always check product labels.

Saved recipes are stored in your browser, so they won't automatically appear on another device.

Hands-free cooking mode needs a configured ElevenLabs backend endpoint and microphone permission to work.

## What's Next

Some things I'd like to improve:

- Add live supermarket prices.
- Expand the recipe database.
- Add nutritional information.
- Make saved recipes available across devices.
- Improve meal planning and shopping lists.

---

Made to make student food shopping a little easier.

**Eat well. Spend less.**
