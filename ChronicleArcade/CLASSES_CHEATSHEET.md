# Chronicle Arcade: JSX Classes Cheatsheet

This cheatsheet provides a complete, easy-to-read reference explaining **every CSS class** (Tailwind utility classes & custom CSS classes) used across all `.jsx` files in the `ChronicleArcade/src/` application.

---

## 📑 Quick Navigation

1. [Layout & Container Classes](#1-layout--container-classes)
2. [Positioning & Z-Index Classes](#2-positioning--z-index-classes)
3. [Flexbox Layout Classes](#3-flexbox-layout-classes)
4. [CSS Grid Layout Classes](#4-css-grid-layout-classes)
5. [Spacing (Padding & Margin) Classes](#5-spacing-padding--margin-classes)
6. [Typography & Text Formatting Classes](#6-typography--text-formatting-classes)
7. [Backgrounds, Colors & Gradients](#7-backgrounds-colors--gradients)
8. [Borders, Rounded Corners & Glassmorphism](#8-borders-rounded-corners--glassmorphism)
9. [Shadows, Glows & Visual Filters](#9-shadows-glows--visual-filters)
10. [Animations, Transitions & Interactive States](#10-animations-transitions--interactive-states)
11. [Custom Animated & Glass Classes (`index.css`)](#11-custom-animated--glass-classes-indexcss)

---

## 1. Layout & Container Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `min-h-screen` | Sets minimum height to 100vh (`min-height: 100vh`). Ensures full viewport height. | Full-page wrappers (`Home.jsx`, `Explore.jsx`, `GameList.jsx`) |
| `h-screen` | Sets exact height to 100vh (`height: 100vh`). | Modal background overlays |
| `h-full` | Sets height to 100% of parent container (`height: 100%`). | Card images, flex columns |
| `w-full` | Sets width to 100% of parent container (`width: 100%`). | Inputs, buttons, banners |
| `h-44`, `h-4`, `h-5` | Sets fixed height using Tailwind spacing scale (e.g. `11rem`, `1rem`). | Thumbnail images, loading skeletons |
| `max-w-6xl` | Restricts maximum container width to 72rem (`1152px`). | Main content wrappers (`mx-auto max-w-6xl`) |
| `max-w-4xl` | Restricts maximum width to 56rem (`896px`). | Hero text sections |
| `max-w-md` | Restricts maximum width to 28rem (`448px`). | Login & Signup form boxes |
| `mx-auto` | Centers element horizontally by setting `margin-left: auto; margin-right: auto;`. | Centered content containers |
| `overflow-hidden` | Clips overflowing content outside container bounds (`overflow: hidden`). | Rounded cards, banner images |
| `overflow-y-auto` | Enables vertical scrolling when content exceeds container height. | Modals, game detail scrollable areas |
| `hidden` | Completely hides element (`display: none`). | Responsive mobile/desktop toggles |
| `block` | Displays element as block-level box (`display: block`). | Links, image containers |
| `inline-block` | Displays element inline while allowing width/height modification. | Tag badges, status pills |

---

## 2. Positioning & Z-Index Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `relative` | Sets `position: relative`. Establishes positioning context for absolute children. | Cards, hero containers |
| `absolute` | Sets `position: absolute`. Positions element relative to nearest `relative` ancestor. | Overlay gradients, badge tags |
| `fixed` | Sets `position: fixed`. Fixes element position relative to viewport screen. | Navigation header, detail modal |
| `sticky`, `top-0` | Keeps element stuck to top of viewport when scrolling. | Sticky top Navbar (`Navbar.jsx`) |
| `inset-0` | Sets `top: 0; right: 0; bottom: 0; left: 0;` to cover entire parent area. | Background overlays, backdrops |
| `left-1/2` | Sets `left: 50%` to position start point at horizontal center. | Hero glow aura alignment |
| `-translate-x-1/2` | Applies `transform: translateX(-50%)` to shift element left by half its width. | True horizontal centering |
| `-top-25` | Sets top position offset to `-6.25rem` (`-100px`). | Ambient aura blur placement |
| `z-10`, `z-20`, `z-50` | Controls layer depth along Z-axis (`z-index: 10/20/50`). | Modals (`z-50`), Navbar (`z-20`), Hero text (`z-10`) |
| `pointer-events-none` | Prevents mouse click/touch events from targeting element (`pointer-events: none`). | Background glow orbs |

---

## 3. Flexbox Layout Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `flex` | Enables Flexbox layout mode (`display: flex`). | Navbars, headers, cards, form fields |
| `inline-flex` | Enables inline Flexbox layout (`display: inline-flex`). | Icon buttons, inline tag pills |
| `flex-col` | Sets flex direction to column (`flex-direction: column`). | Vertical stack layouts, forms |
| `flex-row` | Sets flex direction to row (`flex-row`). | Horizontal button groups, nav links |
| `flex-1` | Allows flex item to grow and shrink to fill available space (`flex: 1 1 0%`). | Flexible middle content area |
| `items-center` | Vertically aligns flex items along cross-axis (`align-items: center`). | Nav items, icon-with-text rows |
| `items-start` | Aligns flex items to start of cross-axis. | Form field headers |
| `justify-between` | Spreads flex items out with space between them (`justify-content: space-between`). | Navbar header, card title & rating |
| `justify-center` | Centers flex items along main axis (`justify-content: center`). | Hero content, centered buttons |
| `flex-wrap` | Allows flex items to wrap onto next line (`flex-wrap: wrap`). | Category filter buttons |
| `gap-1`, `gap-2`, `gap-4`, `gap-6` | Sets spacing between flex or grid items (`gap: 0.25rem / 0.5rem / 1rem / 1.5rem`). | Form fields, grid cards |

---

## 4. CSS Grid Layout Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `grid` | Enables CSS Grid layout (`display: grid`). | Game catalog grids (`GameList.jsx`, `Home.jsx`) |
| `grid-cols-1` | Creates 1-column grid layout for mobile screens. | Mobile card grid |
| `sm:grid-cols-2` | On small screens (≥640px), expands grid to 2 columns. | Tablet catalog grid |
| `md:grid-cols-3` | On medium screens (≥768px), expands grid to 3 columns. | Desktop catalog grid |
| `lg:grid-cols-4` | On large screens (≥1024px), expands grid to 4 columns. | Widescreen game grid |
| `col-span-full` | Causes grid item to span across all grid columns. | "No games found" empty state |

---

## 5. Spacing (Padding & Margin) Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `p-4`, `p-6`, `p-8` | Sets inner padding on all 4 sides (`1rem / 1.5rem / 2rem`). | Card bodies, form containers |
| `px-4`, `px-6`, `px-8` | Sets horizontal padding (`padding-left` & `padding-right`). | Buttons, hero banners |
| `py-2`, `py-3.5`, `py-10`, `py-12` | Sets vertical padding (`padding-top` & `padding-bottom`). | Page sections, buttons |
| `mb-1.5`, `mb-3`, `mb-4`, `mb-8` | Sets bottom margin (`margin-bottom`). | Section titles, input field gaps |
| `mt-2`, `mt-4`, `mt-8`, `mt-auto` | Sets top margin (`mt-auto` pushes button to bottom of card). | CTA buttons, card action footers |

---

## 6. Typography & Text Formatting Classes

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `text-xs`, `text-sm`, `text-base` | Font sizes (`0.75rem / 0.875rem / 1rem`). | Genre badges, form labels, body text |
| `text-lg`, `text-xl`, `text-2xl`, `text-3xl` | Larger font sizes (`1.125rem` up to `1.875rem`). | Section headers, card titles |
| `font-normal`, `font-semibold`, `font-bold`, `font-extrabold` | Controls font weight (`400 / 600 / 700 / 800`). | Headlines, highlights, button text |
| `font-mono` | Sets font family to monospace stack (`font-family: monospace`). | Section taglines, score numbers |
| `text-white`, `text-cyan-300`, `text-cyan-400`, `text-slate-300`, `text-slate-400` | Applies theme color palette to text. | Headings, highlights, descriptions |
| `text-red-400`, `text-green-400` | Red or green text colors. | Form error messages & status indicators |
| `text-center` | Centers text alignment (`text-align: center`). | Hero headers, empty state text |
| `uppercase` | Transforms text to uppercase letters (`text-transform: uppercase`). | Category badges, taglines |
| `tracking-wider`, `tracking-widest`, `tracking-tight` | Adjusts letter spacing (`letter-spacing`). | Arcade badges, main headlines |
| `leading-tight`, `leading-relaxed` | Controls line height / spacing (`line-height`). | Hero descriptions, card text |
| `line-clamp-1`, `line-clamp-2` | Truncates text to 1 or 2 lines with an ellipsis (`...`). | Game title (1 line), Game description (2 lines) |

---

## 7. Backgrounds, Colors & Gradients

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `bg-[#060814]` | Custom deep dark space navy background (`#060814`). | Main site background |
| `bg-[#0a0a14]`, `bg-[#12121f]` | Custom dark input & card background shades. | Form inputs, signup card background |
| `bg-cover`, `bg-center`, `bg-no-repeat` | Background image styling (`background-size: cover; background-position: center`). | Hero & GameList background image |
| `bg-white/5`, `bg-white/10`, `bg-cyan-500/10`, `bg-cyan-500/15` | Backgrounds with percentage opacities (`5% / 10% / 15%`). | Skeleton cards, glow orbs, badges |
| `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-t` | Linear gradient backgrounds (to right, to bottom, to top). | Hero banner overlay, CTA button |
| `from-cyan-400`, `via-blue-400`, `to-purple-500` | Defines start, middle, and stop colors for linear gradients. | Glowing gradient headlines |
| `bg-clip-text`, `text-transparent` | Clips background gradient to text shape, revealing gradient text color. | Gradient titles ("Latest Games") |

---

## 8. Borders, Rounded Corners & Glassmorphism

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `rounded-lg`, `rounded-xl`, `rounded-2xl` | Border radius (`0.5rem / 0.75rem / 1rem`). | Form inputs, arcade cards |
| `rounded-full` | Full pill/circle border radius (`border-radius: 9999px`). | Tag badges, CTA buttons, glow circles |
| `border`, `border-b`, `border-t` | Applies 1px solid border. | Cards, headers, inputs |
| `border-white/10`, `border-cyan-400/30`, `border-cyan-400/40` | Translucent white & cyan borders. | Glass card borders, glowing tags |
| `backdrop-blur-md` | Applies backdrop blur filter (`backdrop-filter: blur(12px)`). | Navbar overlay, tag pills |
| `blur-[140px]` | Applies heavy gaussian blur (140px) to background shape. | Background ambient glow aura |

---

## 9. Shadows, Glows & Visual Filters

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `shadow-lg`, `shadow-xl` | Standard drop shadow levels. | Cards, form containers |
| `shadow-[0_0_15px_rgba(0,240,255,0.2)]` | Custom subtle cyan outer glow shadow. | Category badges |
| `shadow-[0_0_25px_rgba(0,240,255,0.4)]` | Custom bright glowing cyan button shadow. | Action CTA buttons |
| `drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]` | Glowing drop shadow behind text graphics. | Gradient headline text |
| `brightness-75` | Darkens image brightness to 75% for contrast. | Hero background image |

---

## 10. Animations, Transitions & Interactive States

| Class Name | Explanation / CSS Property | Common Usage Site |
| :--- | :--- | :--- |
| `transition-all`, `transition-colors`, `transition-transform` | Enables smooth CSS transition on state changes. | Hoverable card, links, buttons |
| `duration-300`, `duration-500`, `duration-1000` | Sets transition duration (`300ms / 500ms / 1000ms`). | Card hover zooms, hero image transitions |
| `hover:scale-105` | Scales element up to 105% when hovered by cursor. | Primary CTA buttons |
| `group` | Parent utility class that allows child elements to react when parent is hovered. | Game card wrapper |
| `group-hover:scale-110` | Scales thumbnail image to 110% when parent `group` is hovered. | Game thumbnail hover zoom |
| `group-hover:text-cyan-300` | Changes text color to cyan when parent `group` is hovered. | Game title hover highlight |
| `active:scale-95` | Scales button down to 95% on click for tactile click feedback. | Submit & play buttons |
| `cursor-pointer` | Changes mouse cursor to pointer hand icon. | Clickable cards, buttons |
| `animate-pulse` | Tailwind built-in opacity pulsing animation (`opacity: 1 ↔ 0.5`). | Loading skeleton cards |

---

## 11. Custom Animated & Glass Classes (`index.css`)

Custom CSS classes defined inside `ChronicleArcade/src/index.css`:

| Custom Class | Description | Key Styles |
| :--- | :--- | :--- |
| **`.glass-card`** | Dark translucent glassmorphic card container with hover neon border. | `background: rgba(18, 18, 35, 0.65); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.08); hover: border-color & box-shadow cyan` |
| **`.animate-neon-glow`** | Infinite 3s keyframe animation creating glowing cyan box-shadow pulsation. | `@keyframes neonGlow` (`box-shadow: 0 0 15px/25px rgba(0, 240, 255, ...)`) |
| **`.animate-pulse-aura`** | Infinite 4s keyframe animation creating ambient background aura breathing effect. | `@keyframes pulseAura` (`opacity: 0.4 ↔ 0.8; transform: scale(1) ↔ scale(1.08)`) |
