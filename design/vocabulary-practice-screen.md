# Screen Design: Vocabulary Practice

## 🎯 Purpose
Allow users to practice Japanese vocabulary with two modes:
- Input Japanese translation from a given Vietnamese word.
- Select the correct Vietnamese meaning for a given Japanese word.

---

## 📦 Data Structure (JSON)

Each lesson contains a JSON file with word pairs:

```json
[
  {
    "jp": "水",
    "vn": "nước"
  },
  {
    "jp": "火",
    "vn": "lửa"
  }
]
```


## Main UI Layout
1. Header
Title: "Vocabulary Practice"
Lesson Selector: Dropdown or tabs to select the lesson (e.g., Lesson 1, Lesson 2...)

2. Practice Area

Mode A: Input Japanese from Vietnamese
- Display the Vietnamese word (e.g., "nước")
- Text input: user types the Japanese word ("みず")
- Submit button: "Check"
- Result display:
    - If correct: green border and text
    - If incorrect: red border and show correct answer below

Mode B: Choose Vietnamese from Japanese
- Display the Japanese word (e.g., "火")
- Multiple choices (4 options), example: "gió", "nước", "lửa", "đất"
- On selection:
    - Show result immediately:
        - Selected option turns green if correct
        - Selected option turns red if incorrect
        - Show correct answer below if the user's answer is incorrect

3. Navigation
- "Next" button to move to another word
- Words are randomly selected from the JSON of the currently selected lesson

## Mode Switching
- Toggle switch or radio buttons:
    - Input Japanese
    - Choose Vietnamese
- User can switch mode at any time.

## Lesson Menu
- Each lesson corresponds to a different JSON data source
- Switching lessons will reload a new set of word pairs and reset the session

## Visual Feedback
- Green color for correct answers
- Red color for incorrect answers
- Input borders or selected option backgrounds change color accordingly

## Optional Features
- Score tracking (total correct / total answered)
- Option to show answers in order or random
- Audio pronunciation (for future)
- Display kanji + kana + romaji (expandable later)
- Categorization by JLPT level or topic (e.g., food, travel)

## Notes for Implementation
- Keep data in separate JSON files per lesson
- Words should be randomized to avoid memorization by order
- All user interactions (input/select) should trigger instant feedback


## Example Word Entry 
```json
{
  "jp": "猫",
  "vn": "con mèo"
}
```

## Component Suggestions (for dev)
<LessonSelector />
<PracticeInput />
<PracticeChoice />
<Feedback />
<NextButton />

