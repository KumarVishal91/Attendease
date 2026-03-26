# AttendEase 📚

> Track subject-wise attendance, calculate safe bunks, and get recovery targets — built for Indian college students.

---

## 🎯 What is AttendEase?

AttendEase is a smart attendance tracker designed specifically for Indian college students who need to maintain a minimum attendance percentage (usually **75%**) to be eligible for exams.

It answers the three most important questions every student has:

- 📊 **"What is my current attendance?"** — subject by subject
- 😴 **"How many classes can I bunk safely?"** — without falling below 75%
- 🚨 **"How many classes do I need to attend to recover?"** — if already below 75%

---

## ✨ Features

- **Subject-wise Tracking** — Add multiple subjects and log attended vs total classes separately for each
- **Safe Bunk Calculator** — Instantly see how many future classes you can skip while staying above 75%
- **Recovery Target** — If you're below 75%, see exactly how many consecutive classes you must attend to get back on track
- **Attendance % Badge** — Color-coded indicators (green / yellow / red) so you know your status at a glance
- **Overall Attendance Summary** — Aggregate view across all subjects
- **Local Storage** — Your data stays saved even after closing the browser, no login needed
- **Responsive UI** — Works on mobile and desktop

---

## 🧮 How the Math Works

### Safe Bunks
```
Let:  attended = classes attended
      total    = total classes held
      required = 0.75 (minimum percentage)

Safe bunks = floor((attended - required × total) / required)
```
Example: Attended 40 out of 50 classes → `floor((40 - 0.75×50) / 0.75)` = **floor(3.33)** = **3 safe bunks**

### Recovery Target
```
Classes needed = ceil((required × total - attended) / (1 - required))
```
Example: Attended 30 out of 50 classes → `ceil((0.75×50 - 30) / 0.25)` = **ceil(7.5)** = **8 classes needed**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Styling | Tailwind CSS |
| State Management | useState, useReducer |
| Data Persistence | localStorage |
| Build Tool | Vite |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/attendease.git

# Navigate to the project folder
cd attendease

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
attendease/
├── public/
├── src/
│   ├── components/
│   │   ├── SubjectCard.jsx       # Individual subject attendance card
│   │   ├── AddSubjectModal.jsx   # Modal to add a new subject
│   │   ├── AttendanceSummary.jsx # Overall attendance overview
│   │   └── StatusBadge.jsx       # Color-coded percentage badge
│   ├── hooks/
│   │   └── useAttendance.js      # Custom hook for attendance logic
│   ├── utils/
│   │   └── calculator.js         # Safe bunk & recovery math functions
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 📱 Screenshots

> *(Add your screenshots here)*

| Dashboard | Subject Detail | Recovery View |
|---|---|---|
| `screenshot1.png` | `screenshot2.png` | `screenshot3.png` |

---

## 🎓 Who Is This For?

AttendEase is built for students at Indian universities and colleges where:

- Minimum **75% attendance** is mandatory
- Detaining students below the threshold is common
- Manually tracking attendance across 6–8 subjects is a pain

---

## 🔮 Planned Features

- [ ] Export attendance report as PDF
- [ ] Timetable integration to auto-mark classes
- [ ] Push notifications before you hit the danger zone
- [ ] Dark mode
- [ ] PWA support (install as an app on mobile)
- [ ] Custom minimum percentage (for colleges with 80% or 85% rules)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and all components are properly documented.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 💬 Feedback

Have a suggestion or found a bug? Open an [issue](https://github.com/yourusername/attendease/issues) or reach out directly.

---

<p align="center">Made with ❤️ for stressed Indian college students everywhere</p>
