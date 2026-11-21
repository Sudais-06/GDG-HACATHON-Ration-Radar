# Ration Radar — Hands-Free Cook Mode setup

The app now includes a **Hands-Free Cook Mode** button beneath each selected recipe card on the final page. It starts a two-way voice conversation with an ElevenLabs Agent and sends the selected recipe, estimated ingredients, tools, and preparation steps as conversation context.

## 1. Create your ElevenLabs Agent

In the ElevenLabs dashboard, create a Conversational AI Agent and configure it for voice conversations. Enable authentication for the agent so the browser uses a temporary signed URL from the local backend.

Suggested agent name: **Ration Radar Cooking Companion**.

Suggested system prompt:

> You are Ration Radar's friendly, patient cooking companion. Speak naturally, warmly, and conversationally, like a helpful friend in the kitchen. The app will send you the current recipe, ingredients, tools, and preparation steps as context. Use that information as the source of truth. Guide the user one step at a time; do not dump the entire recipe unless they ask. After explaining a step, pause and let the user say when they are ready to continue. They may interrupt, ask you to repeat or simplify something, ask about quantities or substitutions, or ask how to tell when food is cooked. Answer clearly and briefly, using metric units unless the recipe context says otherwise. Never pretend a timer is running. If timing matters, tell the user to set a timer on their device. Follow food-safety basics: advise cooking meat thoroughly, avoiding cross-contamination, and checking package instructions where appropriate. If a detail is not in the recipe context, say so rather than inventing an exact quantity or method. Keep the tone encouraging and never judgmental.

Set a friendly voice and enable interruption/barge-in so the user can speak while the agent is talking. Enable the agent's user and agent transcript events if you want the transcript panel in the app to show both sides of the conversation.

## 2. Configure the private server credentials

1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Put your ElevenLabs API key and Agent ID into `.env`:

   ```env
   ELEVENLABS_API_KEY=your_real_key
   ELEVENLABS_AGENT_ID=your_real_agent_id
   PORT=3000
   ```

Do not send the API key in chat, commit `.env`, or paste it into `script.js`. The server uses the key only to request a short-lived signed URL.

## 3. Start the app

Run:

```bash
npm start
```

Then open `http://localhost:3000` in your browser. Do not open `index.html` directly as a `file://` URL: the voice session needs the backend route.

## 4. Browser requirements

Allow microphone access when prompted. Microphone access is supported on localhost and secure HTTPS origins. The first voice session may ask for permission. Use headphones to reduce feedback.

## How it works

- `script.js` dynamically loads the official ElevenLabs JavaScript client when the user starts Cook Mode.
- `server.js` requests a signed URL from ElevenLabs; the private API key never reaches the browser.
- The browser opens the real-time voice session and sends the selected recipe context to the agent.
- The app displays conversation messages and connection state.

The agent's ability to perform actions inside Ration Radar (for example, changing the grocery checklist) is not enabled in this first version. This version is a conversational recipe guide.

## Dietary and cultural filters

The planner includes ingredient-screened options for diabetes-aware/no-added-sugar recipes, recipes with no added salt specified, caffeine-free ingredients, gluten-free, lactose-free, nut-free, vegetarian/vegan/pescatarian, and selected Hindu, Jain, Sikh, Buddhist, halal and kosher preferences.

These are convenience filters, not medical nutrition therapy or religious certification. The current demo recipe database does not calculate full carbohydrate, sodium, potassium, phosphorus, caffeine or allergen cross-contact values. In particular, a no-added-sugar ingredient list is not necessarily appropriate for diabetes; a no-added-salt recipe is not necessarily low in sodium; kidney diets require individualised limits; and halal/kosher compliance depends on certification and preparation as well as ingredients. Religious practices vary within communities. Always check product labels, preparation and cross-contact, and seek advice from a qualified clinician/dietitian or the user's own religious authority when needed.
