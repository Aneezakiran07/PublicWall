# Shared Notebook

# Link: https://public-wall-rho.vercel.app/

A collaborative canvas where multiple people can write, draw, place stickers, drop GIFs, upload images, react, and decorate a shared page together. Everyone sees changes instantly. Just open it and start writing, you don't need an account, just enter your name.

## What it does

You get a themed notebook page. Click anywhere to type something, hit Enter and it stays there. Drag it around, resize it, change the font or color before you write. Other people connected at the same time see everything as it happens.

Beyond text, you can switch to Draw mode and sketch freely on the page with a pen. Choose your color and size, and strokes sync to everyone in real time. You can also use the eraser to clean up mistakes, a filling pen that fills the shape of your stroke as you draw, and an undo button to step back your last stroke.

You can drop emoji stickers and GIFs onto the page from the toolbar. Those are draggable and resizable too. Images can also be uploaded directly from your device and land in the center of your current view. They get compressed automatically before uploading so things stay fast.

Any piece of text, sticker, gif, or image can be locked. Hover over it and click the lock button to prevent anyone from moving, editing, or deleting it. Click again to unlock. The lock state syncs instantly to all users.

The notebook supports multiple notebooks. There is a dropdown in the toolbar where you can switch between them, create new ones, or rename existing ones by double clicking. Each notebook has its own writings, drawings, and media completely separate from the others.

There are twelve Japanese-inspired page themes. Switching the theme changes it for everyone in the room. The page can be extended vertically if you run out of space. A lofi radio player lets everyone listen to synced background music together. A reaction bar lets you send floating emoji bursts visible to all users.

The app also shows who is online, notifies you when someone joins or leaves, and displays a live typing indicator when others are writing.

## Tech

- React (Vite)
- Supabase, Postgres database with realtime subscriptions, presence tracking, and broadcast channels
- Giphy API, for GIF search
- Google Fonts, handwriting fonts loaded via CSS import
- nightride.fm, lofi radio streams


## Getting started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd shared-notebook
npm install
```

### 2. Set up Supabase

Create a free project at supabase.com. Then run the following SQL in your Supabase SQL editor to create the required tables.

```sql
-- Notebooks
create table notebooks (
  id uuid primary key default gen_random_uuid(),
  title text default 'main notebook',
  created_by text,
  created_at timestamptz default now()
);

-- Text entries
create table writings (
  id uuid primary key default gen_random_uuid(),
  content text,
  position_x float,
  position_y float,
  font_color text default '#1a1a2e',
  font_style text default '''Caveat'', cursive',
  font_size int default 20,
  author_name text,
  locked boolean default false,
  notebook_id uuid references notebooks(id),
  created_at timestamptz default now()
);

-- Stickers, GIFs, and uploaded images
create table media_items (
  id uuid primary key default gen_random_uuid(),
  media_type text,
  content text,
  position_x float,
  position_y float,
  size float default 120,
  locked boolean default false,
  notebook_id uuid references notebooks(id),
  created_at timestamptz default now()
);

-- Global page settings (theme, height)
create table page_settings (
  id text primary key,
  theme_id text default 'sakura',
  extra_height int default 0,
  changed_by text,
  updated_at timestamptz default now()
);

-- Drawing strokes
create table drawing_strokes (
  id uuid primary key default gen_random_uuid(),
  points jsonb,
  color text,
  size float,
  notebook_id uuid references notebooks(id),
  created_at timestamptz default now()
);
```

Enable realtime on all tables in your Supabase dashboard under Database > Replication.

Run this so lock state broadcasts correctly to other users in real time:

```sql
ALTER TABLE writings REPLICA IDENTITY FULL;
ALTER TABLE media_items REPLICA IDENTITY FULL;
```

Create a storage bucket called `notebook-images` and set it to public so uploaded images are accessible.

### 3. Configure environment variables

Create a `.env` file in the project root:

```
VITE_GIPHY=your_giphy_api_key_here
VITE_ANON=your_supabase_anon_key_here
VITE_URL=your_supabase_project_url_here
```

Get a free Giphy API key at developers.giphy.com.

### 4. Run it

```bash
npm run dev
```

---

## How to use it

**Your name**  on first visit you'll be prompted to enter a name. It shows up as a byline on your notes so others know who wrote what.

**Notebooks**  the dropdown at the left of the toolbar lets you switch between notebooks, create new ones, or rename existing ones by double clicking. Each notebook is completely independent with its own content.

**Writing**  make sure you're in Text mode (default). Click anywhere on the page and start typing. Press Enter to place the text, Escape to cancel. After placing, click a piece of text to edit it or drag it to move it. Hover over it to see the delete button and resize handle in the bottom-right corner.

**Ink color**  click the colored circle in the toolbar to pick a color before writing. There are preset colors and a full color picker with hex input.

**Font**  the font dropdown changes the handwriting style applied to new text. Options include Caveat, Kalam, Patrick Hand, Indie Flower, Shadows Into Light, and Pacifico.

**Drawing**  click Draw in the mode toggle in the toolbar to switch to drawing mode. A panel appears where you can pick a pen color and size. Choose from three tools: Pen for regular freehand drawing, Filling Pen which fills the shape of your stroke as you draw, and Eraser. Hit Undo to remove your last stroke. Draw freely on the page and strokes sync to everyone in real time. Hover over a stroke in Text mode to reveal a delete button.

**Locking**  hover over any text, sticker, gif, or image and click the lock button that appears. Locked items cannot be moved, edited, or deleted by anyone until unlocked. Click the lock button again to unlock. Lock state syncs to all users instantly.

**Images**  click the image button in the toolbar and pick a file from your device. It gets compressed automatically and placed in the center of your current view.

**Stickers and GIFs**  click "Stickers & GIFs" in the toolbar. The Stickers tab has ten packs organized by category with a search field. The GIFs tab connects to Giphy with trending results and search. Click anything to place it on the page. Drag it where you want, resize it by dragging the handle in the bottom-right corner.

**Lofi radio**  click "lofi" in the toolbar to open the radio player. Pick from four stations (nightride fm, chillsynth fm, datawave fm, spacesynth fm). Play/pause and station selection are synced to everyone on the page.

**Reactions**  the reaction bar at the bottom of the screen lets you send emoji bursts. They float up on screen for everyone with your name attached.

**Page theme**  "Change Page" opens a theme selector with twelve Japanese-inspired styles including Sakura, Washi, Matcha, Bunny, Waves, Koi Pond, and more. Changing the theme updates it for everyone currently on the page.

**Add Page**  extends the canvas downward by 600px. Useful when you run out of room. Syncs to all users.

**Online indicator**  the toolbar shows how many people are currently on the page. A toast notification appears when someone joins or leaves. A typing indicator appears in the bottom-right corner when others are writing.


## Notes

The page is fully public , anyone with the URL can read and write. If you want to restrict access, you will need to add Supabase Row Level Security policies or an auth layer.

There is no version history. Deleted content is gone. Drawing strokes can be deleted one at a time by hovering over them in Text mode, undone immediately after drawing with the Undo button, or cleared all at once.

Names are stored in localStorage. Clearing your browser storage will prompt for a name again on next visit.
