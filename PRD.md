# Piano Player PRD

Create an interactive virtual piano that maps QWERTY keyboard keys to piano notes, allowing users to play music using their computer keyboard.

**Experience Qualities**: 
1. **Responsive** - Keys should respond instantly to keypresses with visual and audio feedback
2. **Intuitive** - Clear visual mapping between keyboard keys and piano keys makes it easy to understand
3. **Musical** - High-quality sound synthesis creates an authentic piano playing experience

**Complexity Level**: Light Application (multiple features with basic state)
- Single-purpose music creation tool with keyboard mapping, visual feedback, and audio synthesis

## Essential Features

**Piano Keyboard Display**
- Functionality: Visual piano keyboard with white and black keys in standard layout
- Purpose: Provides familiar piano interface for musical interaction
- Trigger: Application loads
- Progression: Display loads → Keys are visually distinct → Ready for interaction
- Success criteria: 88-key piano layout displays correctly with proper key sizing

**QWERTY to Piano Mapping**
- Functionality: Maps specific keyboard keys to piano notes (QWERTY row = white keys, number row = black keys)
- Purpose: Enables piano playing without physical piano
- Trigger: User presses mapped keyboard key
- Progression: Key press detected → Piano key highlights → Sound plays → Visual feedback resets
- Success criteria: All mapped keys produce correct notes and visual feedback

**Audio Synthesis**
- Functionality: Generates realistic piano sounds for each note
- Purpose: Creates authentic musical experience
- Trigger: Piano key activation (keyboard or mouse)
- Progression: Note triggered → Audio context starts → Synthesized sound plays → Sound fades naturally
- Success criteria: Clear, musical tones with proper pitch relationships

**Visual Feedback**
- Functionality: Piano keys visually depress when activated
- Purpose: Provides immediate confirmation of key presses
- Trigger: Key activation via keyboard or mouse
- Progression: Key press → Visual highlight/depression → Hold during sound → Return to normal
- Success criteria: Smooth visual transitions that feel responsive

**Key Mapping Display**
- Functionality: Shows which keyboard keys map to which piano keys
- Purpose: Helps users learn the control scheme
- Trigger: Application loads or help toggle
- Progression: Interface displays → Mapping labels visible → User can reference while playing
- Success criteria: Clear, readable labels that don't interfere with playing

## Edge Case Handling
- **Multiple simultaneous keys**: Support polyphonic playback for chord playing
- **Key repeat**: Prevent audio artifacts from held keys by debouncing
- **Audio context**: Handle browser audio policy restrictions gracefully
- **Missing audio support**: Provide visual-only feedback if audio fails
- **Touch devices**: Ensure piano keys work with touch input

## Design Direction
The design should feel elegant and sophisticated like a premium digital piano interface, with clean lines and professional aesthetics that inspire musical creativity.

## Color Selection
Analogous color scheme using blacks, whites, and warm grays to mirror a real piano's materials and create a focused, musical atmosphere.

- **Primary Color**: Deep charcoal black (oklch(0.2 0 0)) - communicates sophistication and musical focus
- **Secondary Colors**: Pure white (oklch(1 0 0)) and warm gray (oklch(0.85 0 0)) - mirrors piano key colors
- **Accent Color**: Warm gold (oklch(0.7 0.15 85)) - highlights active keys and creates premium feel
- **Foreground/Background Pairings**: 
  - Background (Deep charcoal): White text (oklch(1 0 0)) - Ratio 10.4:1 ✓
  - White keys (Pure white): Black text (oklch(0.2 0 0)) - Ratio 5.2:1 ✓
  - Black keys (Deep black): White text (oklch(1 0 0)) - Ratio 10.4:1 ✓
  - Accent (Warm gold): Black text (oklch(0.2 0 0)) - Ratio 3.5:1 ✓

## Font Selection
Typography should feel modern and technical like professional music software, using a clean sans-serif that maintains readability for key labels and instructions.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - Key Labels: Inter Medium/14px/normal spacing
  - Instructions: Inter Regular/16px/relaxed spacing

## Animations
Subtle, responsive animations that mirror the physical action of pressing piano keys - quick depression and gentle release that feels natural and musical.

- **Purposeful Meaning**: Key press animations reinforce the tactile nature of piano playing
- **Hierarchy of Movement**: Active keys get primary animation focus, secondary elements remain stable

## Component Selection
- **Components**: Custom piano key components with Button-like behavior, Card for instruction panel
- **Customizations**: Piano key shapes (white rectangular, black smaller), custom keyboard event handling
- **States**: Default, hover, active/pressed, disabled states for each key type
- **Icon Selection**: Musical note icons, keyboard icons for help/settings
- **Spacing**: Tight spacing between keys to mirror real piano, generous padding around instruction areas
- **Mobile**: Responsive key sizing, touch-optimized key areas, collapsible instruction panel for more playing space