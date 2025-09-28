# pianista-challenge
Frontend project making use of Pianista API
A React + Tailwind web app for creating, solving, and managing planning problems using **PDDL** and **MiniZinc**.
Features file-based input, use ready presets, solving options selection and persistent record management.

---

## 🚀 Features

* **Multiple input flows**

  * PDDL (Domain + Problem files)
  * MiniZinc (Model + optional Parameters)
  * Natural Prompt (text input/file)

* **Parameters component**

  * Select one of the available key-value pairs

* **Records management**

  * Records panel with status: `solving`, `resolved`, `error`
  * Persisted with localStorage
  * Remove record option

* **Solving workflow**

  * Calls solver endpoints for PDDL / MiniZinc
  * Errors handled gracefully
  * Results linked to input record

* **UX improvements**

  * New record/status animations
  * Landscape/portrait responsive layout
  * Back/forward browser arrows navigate history

---


---

## 🌐 Environment Variables

Create a `.env` file in the root with:

```
PIANISTA_API_KEY=
```

---

## 🖥️ Usage

1. **Select a flow** (Files, Text, or Preset).
2. **Select file type and respective options** (PDDL, MiniZinc, or Prompt).
5. Press **Solve**.
6. Open the **Records panel**:
   * View input
   * View result (if solved)
   * Remove record
7. Use browser arrows (back/forward) for navigation.

---


---

## 🎥 Demo

[Insert link to demo video or screenshots]

---

## ⚠️ Known Limitations

* Gantt chart features are minimal (basic display only).
* Page transitions and animations are simple (no complex motion design).
* Input validation is basic — assumes correct PDDL/MiniZinc syntax.
* App flow requires optimization.

---

## 📜 License

MIT License. See `LICENSE` file for details.
