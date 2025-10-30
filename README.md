# 🎮 Taboo Game

A modern, interactive web-based implementation of the classic Taboo word guessing game. Built with React and featuring intuitive animated card interactions.

## 🌐 Live Demo

**Play now:** [https://gabrieleromano98.github.io/Taboo](https://gabrieleromano98.github.io/Taboo)

## ✨ Features

### 🎯 Game Mechanics
- **Interactive Card Deck**: Infinite scrolling through 600+ Italian words
- **Easy Controls**: Swipe cards left (wrong) or right (correct)
- **Button Controls**: Alternative tap controls for accessibility
- **Customizable Settings**: Configure game duration, skips, and win conditions

### 🎨 User Experience
- **Smooth Animations**: Card transitions with rotation and color feedback
- **Mobile-First Design**: Optimized for touch devices and mobile browsers
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **No Scroll Interface**: Full-screen game experience without scrolling

### ⚙️ Game Settings
- **Timer Options**: 30s, 1m, 2m, 3m, 5m per turn
- **Skip Allowances**: 0, 1, 3, 5, or unlimited skips
- **Win Conditions**: Play by turns (2-10+) or points (20-100+)
- **Visual Feedback**: Color-coded card hints (green=correct, red=wrong, gray=skip)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GabrieleRomano98/Taboo.git
   cd Taboo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## 🎮 How to Play

1. **Setup**: Configure your preferred game settings (time, skips, win condition)
2. **Start**: Tap "Start" to begin your turn
3. **Play**: 
   - **Swipe Right** or **Tap ✓**: Correct guess
   - **Swipe Left** or **Tap ✗**: Wrong guess/pass
   - **Swipe Down** or **Tap ↗**: Skip word
4. **Cards**: Each card shows a word to guess and forbidden "taboo" words
5. **Win**: Reach your target turns or points to win!

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Routing**: React Router DOM (HashRouter for GitHub Pages)
- **Styling**: Custom CSS with Flexbox
- **Icons**: React Icons
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## 📱 Mobile Optimization

- Touch-optimized card interactions
- Responsive design for all screen sizes
- Gesture recognition for swipe controls
- Fixed viewport to prevent scrolling issues
- Optimized for mobile browsers

## 🎨 Design Features

- **Custom Fonts**: Bangers font for game aesthetic
- **Animations**: Smooth card transitions and visual feedback
- **Icons**: Intuitive control buttons with React Icons
- **Layout**: Mobile-first responsive design

## 📂 Project Structure

```
src/
├── components/
│   ├── home/          # Home page and settings
│   ├── playing/       # Game interface and card logic
│   └── various/       # Shared components (buttons, etc.)
├── data/
│   └── italianWords.js # Word database (600+ words)
├── App.js             # Main app and routing
└── index.js           # React entry point
```

## 🔧 Configuration

### Adding New Words
Edit `src/data/italianWords.js` to add new words to the game:

```javascript
{
  word: "ESEMPIO",
  taboos: ["vietato1", "vietato2", "vietato3", "vietato4", "vietato5"]
}
```

### Customizing Settings
Modify default values in `src/App.js`:

```javascript
const [time, setTime] = useState("30s");
const [skips, setSkips] = useState(0);
const [limitType, setLimitType] = useState("Turns");
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Gabriele Romano**
- GitHub: [@GabrieleRomano98](https://github.com/GabrieleRomano98)

## 🎯 Future Enhancements

- [ ] Multiplayer support
- [ ] Score tracking and statistics
- [ ] Multiple languages support
- [ ] Custom word packs
- [ ] Sound effects and music
- [ ] Team management system

---

**Enjoy playing Taboo!** 🎉
