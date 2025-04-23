# CheatSheet for CSS Variables

### Root-level custom properties (Light Mode)

#### General Settings

- `--nav-height`: Height of the navigation bar (75px)
- `--nav-height-mobile`: Height of the mobile navigation bar (70px)
- `--radius`: General border radius for rounded corners (0.5rem)

---

### Color Palette

#### Background & Text

- `--background`: General background color for the app/page
- `--background-fallback`: Fallback background color
- `--foreground`: Default text color for body, headings
- `--paragraph`: Text color for paragraphs and body copy

---

#### UI Elements

- `--card`: Background color for cards
- `--card-foreground`: Text color inside cards
- `--popover`: Background color for popovers, tooltips, floating UI
- `--popover-foreground`: Text color inside popovers

---

#### Interactive Elements

- `--primary`: Primary brand color (e.g., buttons, links)
- `--primary-foreground`: Text color on primary-colored elements
- `--secondary`: Secondary color for UI elements
- `--secondary-foreground`: Text color on secondary elements

---

#### Muted & Accent

- `--muted`: Muted color for less emphasized UI components
- `--muted-foreground`: Text on muted backgrounds
- `--accent`: Accent color for highlights, borders, active UI
- `--accent-foreground`: Text or icons placed on accent backgrounds

---

#### Destructive

- `--destructive`: Color for errors, destructive actions
- `--destructive-foreground`: Text/icon color on destructive backgrounds

---

#### Form & Focus

- `--border`: Default border color (e.g., inputs, dividers)
- `--input`: Background color for inputs and form fields
- `--ring`: Ring (outline) color for focus states

---

### Semantic Colors

These colors are used for status indicators, alerts, and badges.

- `--success`: Color indicating success or positive state
- `--success-foreground`: Text/icon color on success backgrounds

- `--warning`: Color indicating warnings or caution
- `--warning-foreground`: Text/icon color on warning backgrounds

- `--info`: Informational indicators (tooltips, banners)
- `--info-foreground`: Text/icon color on info backgrounds

- `--neutral`: Neutral background for subdued elements
- `--neutral-foreground`: Text/icon color for neutral backgrounds

---

### Chart Colors

Used for data visualizations and graphical representations.

- `--chart-1`: Chart color #1
- `--chart-2`: Chart color #2
- `--chart-3`: Chart color #3
- `--chart-4`: Chart color #4
- `--chart-5`: Chart color #5

---

### Sidebar

- `--sidebar`: Background color for sidebar
- `--sidebar-foreground`: Default text color in sidebar
- `--sidebar-primary`: Highlight color for active/selected items
- `--sidebar-primary-foreground`: Text/icon color for active item
- `--sidebar-accent`: Accent color used in sidebar
- `--sidebar-accent-foreground`: Text/icon color on sidebar accents
- `--sidebar-border`: Border color used within sidebar
- `--sidebar-ring`: Ring color for focus states in sidebar

---

### Dark Mode Overrides

All variables defined above are re-declared under the `.dark` class with values optimized for dark backgrounds.

#### Examples of Dark Mode Adjustments:

- `--background`: Darker surface for background elements
- `--foreground`: Light text for readability
- `--popover`: More prominent popover contrast
- `--muted`: Slightly desaturated for dimmed elements
- `--destructive`: Warmer tone for error/destructive states
- `--ring`, `--border`: Subtle and less intense outlines

---

✅ **Tip:** Use `var(--your-variable)` in your Tailwind CSS to apply these values across components. This centralizes theming and makes dark mode a breeze.

---

📁 Keep this cheat sheet nearby during development to ensure consistent, maintainable styling throughout your application.
