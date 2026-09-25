# King James Schools - Premium Website

A premium, modern website for King James Schools, a prestigious Nigerian private school. The design balances elegance and trustworthiness (80% elegance + 20% wow factor) with cinematic photography, sophisticated motion, and contemporary UI patterns.

## Visual Identity

**Color Palette:**
- **Deep Royal Blue / Navy:** `#2d3748` (primary, headers, navigation)
- **King James Gold:** `#d4a853` (accent, buttons, highlights)
- **Warm Ivory:** `#f7fafc` (backgrounds, card surfaces)
- **White:** `#ffffff` (clean surfaces)
- **Text Primary:** `#2d3748`
- **Text Secondary:** `#4a5568`
- **Text Muted:** `#718096`

**Gradient Usage:** Restrained - royal blue → softer blue, or royal blue → subtle gold/cream accents only.

**Texture:** Extremely subtle film-grain/noise texture added to large color fields for sophistication.

## Typography System

**Display Serif (Headlines):** `Playfair Display` - sophisticated, editorial, premium

**Body Sans:** `Inter` - clean, modern, highly readable

### Heading Scale
- `.headline-1`: `5.5rem` - largest headlines, hero sections
- `.headline-2`: `4rem` - section titles, major statements
- `.headline-3`: `3rem` - section headers, card titles
- `.headline-4`: `2.25rem` - category labels, subheadings
- `.headline-5`: `1.75rem` - supporting headlines
- `.headline-6`: `1.25rem` - smaller headlines

### Body & Labels
- `.body-text`: `1rem`/1.7 line-height - paragraph text
- `.label-upper`: `0.7rem` uppercase, `2px` letter-spacing - navigation labels, filters
- `.caption`: `0.875rem` - meta text, metadata

**Typography Principle:** Headlines occupy large viewport portions. Tight line-heights. Strong hierarchy. Generous paragraph spacing. Fluid responsive typography.

## Navigation System

### Desktop
- **Left:** King James Schools logo
- **Center/Right:** Navigation links
- **Primary CTA:** "Apply Now" (royal blue gradient, white text)
- **Secondary CTA:** "Book a Visit" (outline style)
- **Background:** Transparent/glassmorphism over hero, becomes subtle solid on scroll
- **Hover Effects:** Animated underline that expands, slight text movement, color transition
- **Active Page:** Clear indicator

### Mobile
- **Compact logo**
- **Menu button** (hamburger)
- **Full-screen overlay navigation** with smooth open/close animation
- **Stacked links** with large touch targets

### Navigation Links (Suggested)
- About
- Academics
- Admissions
- Student Life
- Campuses
- News & Events
- Contact

## Signature Hero - Story/Status Style

### Concept
The most important feature - a story-style hero inspired by WhatsApp/Instagram Stories, but cinematic and sophisticated. Automatically cycles through 5 different stories.

### Hero Structure
```
┌──────────────────────────────────────────────┐
│ KING JAMES                         MENU ☰    │
│                                              │
│  ━━━━━━━ ━━━━━━━ ━━━━━━━ ━━━━━━━            │
│   CAMPUS    LEARNING   SPORTS   CULTURE       │
│                                              │
│                                              │
│          [ FULL-SCREEN PHOTO/VIDEO ]         │
│                                              │
│                                              │
│       WHERE GREAT MINDS BEGIN.               │
│                                              │
│       Discover King James Schools             │
│                                              │
│       [ EXPLORE ]                             │
│                                              │
│  ‹                                      ›    │
└──────────────────────────────────────────────┘
```

### Top Progress Bars
Segmented progress indicators similar to social media stories:
```
CAMPUS | LEARNING | SPORTS | CULTURE | ADMISSIONS
```
Each segment has a progress bar showing position within current story.

### 5 Story Slides

**STORY 01 — CAMPUS**
- Visual: Cinematic campus photography/video, students arriving, architectural shot
- Text: "WELCOME TO KING JAMES."
- Supporting: "A community where curiosity, character and ambition come together."
- CTA: "Explore King James →"

**STORY 02 — LEARNING**
- Visual: Classroom, teacher interacting, science laboratory, students working together
- Headline: "LEARN. CREATE. LEAD."
- Supporting: "An environment designed to challenge young minds and help every student discover their potential."
- CTA: "Explore Academics →"

**STORY 03 — SPORTS**
- Visual: Students playing football, basketball, athletics, school sports activities
- Headline: "MORE THAN THE CLASSROOM."
- Supporting: "Developing confidence, discipline, teamwork and resilience beyond academics."
- CTA: "Discover Student Life →"

**STORY 04 — CULTURE / STUDENT LIFE**
- Visual: Music, arts, school events, clubs, students interacting, performances
- Headline: "A PLACE TO BELONG."
- Supporting: "A vibrant community where students learn, create, connect and grow."
- CTA: "Explore Student Life →"

**STORY 05 — ADMISSIONS**
- Visual: Happy students, parent/student interaction, beautiful campus shot
- Headline: "THEIR NEXT CHAPTER STARTS HERE."
- Supporting: "Applications are open for the next academic session."
- Primary CTA: "Apply Now →"
- Secondary CTA: "Book a Visit →"

### Hero Interactions

**Desktop:**
- Click right side → next story
- Click left side → previous story
- Mouse movement creates subtle image parallax
- Hovering over story pauses progress timer
- Subtle arrow controls appear on hover

**Mobile:**
- Swipe left → next story
- Swipe right → previous story
- Tap right → next
- Tap left → previous
- Press/hold → pause

### Hero Transitions (Not Simple Swaps)
- Current image subtly scales and fades/slides away
- New image enters through an image mask
- Typography changes independently (reveals line-by-line)
- CTA fades/slides in
- Progress indicator advances
- Smooth easing, spring-like motion - cinematic, smooth, expensive, intentional

### Hero Parallax
Subtle cursor-based parallax:
- Background image shifts slightly on mouse movement
- Foreground content moves at different rate
- Extremely subtle effect
- Mobile: device/scroll-based motion instead

### Scroll Transition
When user begins scrolling:
- Hero content subtly moves upward
- Background image scales slightly
- Hero fades/transitions into next section
- Navigation transitions from transparent to solid
- No abrupt hard cuts

## Content Sections

### 1. Quick Actions / Admissions (Below Hero)
- Subtle glassmorphism cards
- "Admissions - Applications are open"
- "Book a Visit"
- "Contact Us - Speak with our admissions team"
- Royal blue background with gold accents, subtle grain

### 2. "More Than Education" Section
- Asymmetric two-column layout
- Large editorial typography: "MORE THAN EDUCATION."
- School introduction text
- Large cinematic photograph on other side
- Interesting mask/organic shape
- On scroll: image reveals through mask, text fades/slides upward, decorative elements move subtly

### 3. "By the Numbers"
- Clean premium section
- Actual King James Schools statistics
- Number examples (replace with actual figures):
  - `30+` → Years of Excellence
  - `1,500+` → Students
  - `20+` → Clubs & Activities
  - `95%+` → University Placement
- Numbers animate upward when section enters viewport
- Subtle count-up animation

### 4. Why King James - Bento Grid
- Heading: "WHY KING JAMES?"
- Supporting: "A holistic education built around academic excellence, character, creativity and opportunity."
- Dynamic bento grid with different card sizes:
  - **Large:** ACADEMIC EXCELLENCE
  - **Medium:** SPORTS, STEM & Technology
  - **Wide:** CHARACTER & LEADERSHIP
  - **Small:** ARTS
- Photography inside some cards
- On hover: image zooms slightly (2-4%), arrow moves, card subtly lifts, text shifts minimally

### 5. Academics Section
- Headline: "DISCOVER YOUR POTENTIAL."
- Interactive categories:
  - Early Years
  - Primary
  - Secondary
- Smooth shared-element transition when category selected
- Image and supporting text change actively
- Active category indicator moves smoothly

### 6. Our Campuses
- Heading: "OUR CAMPUSES"
- If multiple campuses: interactive display
- Each campus has: image/video, location, short description, "Explore Campus →"
- Campus selector: `01 / 02 / 03 / ...`
- Smooth transition when switching campuses
- Optional: interactive campus map

### 7. Life at King James - Horizontal Gallery
- Headline: "LIFE AT KING JAMES."
- Horizontal scrolling gallery of large photography
- Categories: Classrooms, Sports, Science, Arts, Culture, Events, Friends, Campus
- User scrolls vertically, gallery moves horizontally
- Image captions and category labels
- Subtle parallax and image scaling
- Smooth horizontal movement
- NOT a generic image carousel

### 8. News & Events
- Clean editorial events section
- Large cards (not tiny thumbnails)
- Each card has: Date, Category, Large image, Title, Short description, Arrow
- Hover: image subtly zooms, arrow moves, card lifts slightly

### 9. Parent Testimonials
- Large editorial testimonial (not three tiny cards)
- Layout: Large quotation on one side, parent/student image on other
- Example quote: `"King James has given our child the confidence to learn, grow and pursue their ambitions."`
- Then: `"— Parent of [Year Group] Student"`
- Real testimonials where available
- Smooth fade/slide transitions between testimonials

### 10. Final Admissions CTA
- Large typography: `"THEIR NEXT CHAPTER STARTS HERE."`
- Supporting: "Take the next step toward becoming part of the King James community."
- Buttons: "Apply Now →" and "Book a Visit →"
- Visual: Royal blue background, gold accent, subtle gradient, grain texture
- Large typography, optional student/campus image
- Very subtle animated decorative elements
- Feels like visual conclusion of homepage

### 11. Footer
- Premium, substantial footer
- Large closing statement: `"LET'S BUILD THEIR FUTURE."`
- Includes:
  - King James Schools logo
  - Short description
  - Admissions, About, Academics, Campuses, Student Life
  - Contact: Address, Phone, Email
  - Social media links
  - Privacy Policy, Terms, Copyright
- Subtle hover animations to links

## Motion Design System

**Scroll Reveal:** Elements gently reveal as they enter viewport

**Image Reveal:** Images reveal through masks

**Parallax:** Photography moves slightly differently from surrounding content

**Kinetic Typography:** Large headlines reveal line-by-line or word-by-word

**Micro-interactions:** Buttons, links, cards, navigation respond to user interaction

**Magnetic Buttons:** Subtle cursor attraction on important CTAs (Apply Now) - not aggressive

**Image Hover:** Images zoom approximately 2-4%

**Arrow Animation:** Arrows move a few pixels when hovering

**Number Counters:** Statistics count upward when visible

**Shared Element Transitions:** Smooth transitions between changing images/content

**Page Transitions:** Navigation between pages feels smooth and premium

## Glassmorphism Usage

Use sparingly and elegantly. Good places:
- Hero navigation
- Admissions floating cards
- Quick action cards
- Event overlays
- Campus selectors

**Specifications:**
- Low-opacity surfaces
- Background blur (20-25px)
- Soft borders
- Subtle shadows
- Slight transparency (0.5-0.7)

**DO NOT:** Make every card glass. Website must remain elegant and readable.

## Organic Image Masking

Use non-standard image shapes strategically:
- Large rounded rectangles
- Arched images (`shape-arch`)
- Circular crops (`shape-circle`)
- Soft organic shapes
- Images extending outside containers
- Overlapping photography

Makes layout feel custom-designed rather than templated.

## Grain/Texture

Extremely subtle film-grain/noise texture added to:
- Hero gradients
- Large royal-blue sections
- Final CTA
- Selected backgrounds

Barely noticeable - makes design feel tactile and cinematic rather than digitally flat.

## Responsive Design

**Desktop:** Large cinematic layouts, full-width photography, asymmetric grids, horizontal galleries, large typography, sophisticated hover effects

**Tablet:** Reorganize grids, reduce typography, preserve visual hierarchy, maintain story interactions

**Mobile:** 
- Full-screen or near-full-screen story hero
- Swipe-based story navigation
- Tap zones for previous/next
- Simplified navigation
- Stacked editorial sections
- Horizontally scrollable bento/cards where appropriate
- Touch-friendly buttons
- Reduced animation complexity where necessary

**Principle:** Do not simply shrink the desktop design. Design mobile experience intentionally.

## Accessibility

Despite visual sophistication, maintain excellent accessibility:

- Strong color contrast (verify against WCAG)
- Accessible text sizes
- Full keyboard navigation
- Visible focus states (2px solid var(--king-gold) or var(--royal-blue) outline)
- Proper semantic HTML
- Alt text for all images
- Accessible buttons
- **Reduced-motion support:** If user has `prefers-reduced-motion`, significantly reduce or disable decorative animation while keeping website fully usable

## Performance

Site should feel fast despite cinematic visuals:

- **Optimize:** Images, videos, animations, fonts, JavaScript
- **Lazy loading** for all off-screen images
- **Responsive image sizes** via `srcset`
- **Video only** where it materially improves experience
- **Do not load huge videos unnecessarily**
- Animations should remain smooth without excessive CPU/GPU usage
- CSS animations preferred over JavaScript where possible

## Overall Homepage Flow

The final homepage flows approximately like this:

1. **STORY-STYLE CINEMATIC HERO** - 5 cycling stories with progress bars
2. **FLOATING QUICK ACTIONS / ADMISSIONS** - Glass cards below hero
3. **MORE THAN EDUCATION** - School introduction (asymmetric)
4. **BY THE NUMBERS** - Statistics section
5. **WHY KING JAMES — BENTO GRID** - Content organization
6. **ACADEMICS — DISCOVER YOUR POTENTIAL** - Interactive categories
7. **OUR CAMPUSES** - Campus display/selector
8. **LIFE AT KING JAMES** - Horizontal photo gallery
9. **NEWS & EVENTS** - Large editorial cards
10. **PARENT TESTIMONIAL** - Large single testimonial
11. **FINAL ADMISSIONS CTA** - Visual conclusion
12. **PREMIUM FOOTER** - Closing statement

Transitions between sections feel continuous, not disconnected blocks.

## Important Content Principle

**Visual design should never overwhelm actual school information.**

Hierarchy: School → Students → Education → Experience → Brand → Effects

**NOT:** Effects → Animations → Gradients → School

Site must remain highly usable for parents quickly finding:
- Admissions
- Fees
- Academic information
- Campuses
- Contact information
- School calendar/events
- Application information
- About the school

## Project Structure

```
/index.html          # Full website structure
/apply.html          # Admissions application form
/css/style.css       # Comprehensive stylesheet (premium design system)
/js/script.js        # Interactions (hero slider, reveals, tabs, form validation)
/images/             # Placeholder imagery, organized by section
```

### Image folder layout

```
images/
├── hero/           # Hero slider images (campus, learning, primary, secondary,
│                   #   admissions, sports, culture)
├── about/          # About section (main, architecture)
├── academics/      # Academics tabs + news science fair (early-years, classroom,
│                   #   science-lab, science-fair)
├── facilities/     # Campus buildings (campus-ikeja, campus-victoria, campus-lekki)
├── sports/         # Sports (football, interhouse)
├── activities/     # Clubs & arts (art-class, clubs, arts-festival)
├── staff/          # Staff portraits (empty — add staff photos here)
├── students/       # Parent/student portraits (parent-1, parent-2, parent-3)
├── gallery/        # Student-life strip (classrooms, sports, science, arts,
│                   #   culture, events, friends, campus)
└── admissions/     # Admissions imagery (empty — add photos here)
```

To swap in real photography: drop your image over the placeholder file using the **same name** (e.g. replace `images/hero/campus.webp` with a JPG and update the extension in `index.html`), or keep names identical with `.jpg`/`.webp` and adjust references. All current files are labeled placeholder illustrations.

## Customization Guide

### To Replace Statistics
1. Edit the "By the Numbers" section in index.html
2. Update number values and labels
3. Ensure count-up animations still work

### To Add/Modify Stories
1. Edit the hero section's 5 story slides
2. Update visual content (images/videos)
3. Modify headline and supporting text
4. Adjust CTA destinations

### To Change Color Palette
1. Update CSS variables in style.css
2. Maintain: royal blue/navy as primary, gold as accent, ivory as secondary
3. Test all components with new colors

### To Add/Modify Bento Grid Cards
1. Update grid HTML in appropriate section
2. Adjust card sizes (large/medium/wide/small classes)
3. Modify card content and hover effects
4. Ensure responsive grid columns display correctly

### To Replace Photography
1. Place real images in the matching `images/<section>/` folder (see layout above)
2. Update image paths in index.html if the filename or extension changes
3. Optimize images for web (compress while maintaining quality)
4. Add descriptive alt text for accessibility

## Reference Points

- **Story Interaction:** WhatsApp Status / Instagram Stories (but premium/cinematic)
- **Typography:** Premium editorial magazines
- **Content Organization:** Modern bento interfaces
- **Motion:** High-end brand websites
- **Visual Restraint:** Luxury/institutional websites

**DO NOT:** Directly copy another school's website. This should be an original King James Schools experience.