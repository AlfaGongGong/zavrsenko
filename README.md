<div align="center">

```
  ██████╗  ██████╗      ██████╗  █████╗ ███╗   ███╗███████╗
 ██╔════╝ ██╔════╝     ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
 ██║  ███╗██║  ███╗    ██║  ███╗███████║██╔████╔██║█████╗
 ██║   ██║██║   ██║    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝
 ╚██████╔╝╚██████╔╝    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
  ╚═════╝  ╚═════╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
         S T O R E  //  PC Games & Gaming Gear
```

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)

</div>

---

## What is this?

GG Gamestore is a full-stack web shop for PC games and gaming gear. Built as a school/portfolio project — but designed like it could go live tomorrow. It uses real data pulled from external APIs (RAWG, FreeShark, Amazon Scraper) combined with local MySQL data, all served through a Node.js/Express backend.

Everything a proper storefront needs is here: browsing, searching, a cart, a 4-step checkout, user accounts, order history, and an admin panel — styled in a dark cyberpunk aesthetic.

---

## Stack

| Layer | Tech |
|---|---|
| Server | Node.js + Express |
| Database | MySQL 8 (via mysql2/promise pool) |
| Auth | JWT (bcrypt hashed passwords, 1h token expiry) |
| Frontend | Vanilla JS, Bootstrap 4, SCSS, Font Awesome |
| Fonts | Orbitron · Open Sans · Press Start 2P |
| Rate limiting | express-rate-limit (20 req/15min on auth) |
| Orders | UUID-based, persisted to MySQL with guest fallback |
| External APIs | RAWG (games), FreeShark (free games), IGDB (upcoming) |

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- MySQL 8 running locally (or via Docker)
- npm

### Install & run

```bash
git clone https://github.com/AlfaGongGong/zavrsenko.git
cd zavrsenko
npm install
```

Copy the example env and fill in your credentials:

```bash
cp .env.example .env
```

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=yourpassword
MYSQL_DATABASE=gg_database
MYSQL_PORT=3306

JWT_SECRET=change-this-to-something-random
```

Start the server:

```bash
npm start
```

Then open `http://localhost:3000` in your browser.

---

## Project structure

```
zavrsenko/
├── app.js                    # Entry point — Express setup, routes, DB connection
├── index.html                # Home page
├── html/
│   ├── login.html            # Login + Register (tabbed)
│   ├── gamesList.html        # Browse & search all games
│   ├── ProductDetails.html   # Individual product page
│   ├── cart.html             # Shopping cart
│   ├── checkout.html         # 4-step checkout wizard
│   ├── myAcc.html            # User dashboard (orders, profile, wishlist)
│   └── adminPannel.html      # Admin dashboard
├── css/
│   ├── shared.css            # Design system — used across all pages
│   └── style.css             # Home page specific styles
├── js/
│   ├── config.js             # API_BASE auto-detection
│   ├── auth.js               # Frontend auth helpers (login, logout, JWT decode)
│   ├── cart.js               # localStorage cart (add, remove, qty, badge)
│   ├── checkout.js           # Checkout wizard logic (card formatting, validation)
│   ├── gamesList.js          # Games browse page (search, filter, sort, pagination)
│   ├── productDetails.js     # Product detail page
│   ├── myAcc.js              # User dashboard logic
│   ├── authentication/
│   │   ├── authToken.js      # JWT verify middleware
│   │   └── isAdmin.js        # Admin guard middleware
│   ├── routes/
│   │   ├── userRoutes.js     # /user — register, login, profile, edit account
│   │   ├── gamesRoutes.js    # /games — CRUD + search (auth required)
│   │   ├── dealsRoutes.js    # /deals — CRUD
│   │   ├── gamingGearRoutes.js # /gaming_gear — CRUD
│   │   ├── orderRoutes.js    # /orders — create, list, view (guest + auth)
│   │   ├── upcomingRoutes.js # /api/upcoming
│   │   └── freeGamesRoutes.js # /api/free_games
│   └── renders/
│       ├── mostPurchasedCardRender.js
│       ├── dealsCardRender.js
│       ├── gamingAccessoriesCardRender.js
│       ├── freeCardsRender.js
│       └── upcomingCardsRender.js
└── images/                   # Static assets
```

---

## API reference

All routes that modify data require a valid JWT in the `Authorization` header. Admin routes additionally require `isAdmin: true` in the token payload.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/user/register` | — | Create a new account |
| POST | `/user/login` | — | Login, returns JWT |
| POST | `/user/logout` | — | Clears session |
| GET | `/user/me` | ✓ | Get current user's profile |
| POST | `/user/changePassword` | ✓ | Change password |
| POST | `/user/changeEmail` | ✓ | Change email |
| POST | `/user/changeAddress` | ✓ | Update address |

### Games

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/games` | ✓ | All games |
| GET | `/games/:id` | ✓ | Single game |
| GET | `/games/genre/:genre` | ✓ | Filter by genre |
| POST | `/games/search` | ✓ | Search by name (body: `{ searchTerm }`) |
| POST | `/games` | Admin | Create game |
| PUT | `/games/:id` | Admin | Update game |
| DELETE | `/games/:id` | Admin | Delete game |

### Deals, Gaming Gear, Upcoming, Free Games

Same pattern — GET endpoints are open, write endpoints require admin. See the respective route files for details.

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders/create` | Optional | Place an order (works for guests too) |
| GET | `/orders/my` | ✓ | All orders for the current user |
| GET | `/orders/:id` | ✓ | Single order (owner-only) |

---

## Database tables

```sql
users         — id, username, email, password (hashed), address, first_name, last_name
games         — id, name, genre, price, background_image, released, ...
deals         — id, title, image, salePrice, normalPrice, releaseDate, score
gaming_gear   — id, name, description, price, image, review_rating
upcoming      — id, name, image, firstReleaseDate, ...
free_games    — id, title, description, image, url
orders        — id (UUID), user_id, items (JSON), customer_info (JSON), total, status, created_at
```

> The `orders` table is created manually — if it doesn't exist yet, order creation still returns a confirmed response so the frontend doesn't break.

---

## Design system

The shop uses a consistent dark cyberpunk theme defined in `css/shared.css`:

```css
--bg:        #0a0a0f   /* deep dark blue-black */
--primary:   #0099ff   /* electric blue — main accent */
--cta:       #ff0066   /* neon magenta — call to action */
--success:   #00ff88   /* neon green — prices, confirmations */
```

Cards use glassmorphism (`backdrop-filter: blur(12px)` + semi-transparent background). Headings use **Orbitron**, body text **Open Sans**, button labels **Press Start 2P**.

---

## Cart & checkout flow

The cart lives in `localStorage` under the key `gg_cart`. It persists across pages without any backend calls until checkout.

Checkout is a 4-step wizard:
1. **Customer info** — name, email, shipping address
2. **Payment** — card number (auto-formatted, Visa/MC/Amex detected), expiry, CVV
3. **Review** — summary of items, shipping, and total
4. **Confirmation** — order ID, simulated 1.5s processing delay, cart cleared

Payment is **simulated** — no real processor is connected.

---

## Auth flow

Tokens are stored in `localStorage` as `gg_token`. The frontend decodes the JWT payload client-side to show the username in the navbar. Token expiry is 1 hour.

Pages that require login call `requireAuth()` which redirects to `/html/login.html` if no token is found.

---

## Authors

[AlfaGongGong](https://alfagonggong.github.io/Portfolio/)

---

<div align="center">
<sub>© 2024 GG Gamestore — built with too much coffee and not enough sleep</sub>
</div>

