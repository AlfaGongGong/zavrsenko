const mysql = require("mysql2");
import mysql from "mysql2";
require("dotenv").config({
  path: "./.env"
});

// Create a connection to the database
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};

// Connect to the database
const connection = mysql.createConnection(dbConfig);
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database:", dbConfig.database);

  // Insert the JSON data into the database
  const jsonData = [
    // Your JSON data here

    {
      name: "Overwatch 2",
      background_image: "https://www.freetogame.com/g/540/thumbnail.jpg",
      free: "1",
      description:
        "A hero-focused first-person team shooter from Blizzard Entertainment.",
      url: "https://www.freetogame.com/open/overwatch-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Diablo Immortal",
      background_image: "https://www.freetogame.com/g/521/thumbnail.jpg",
      free: "1",
      description:
        "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      url: "https://www.freetogame.com/open/diablo-immortal",
      genre: "MMOARPG",
      released: "0000-00-00"
    },
    {
      name: "Lost Ark",
      background_image: "https://www.freetogame.com/g/517/thumbnail.jpg",
      free: "1",
      description:
        "Smilegate\u2019s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
      url: "https://www.freetogame.com/open/lost-ark",
      genre: "ARPG",
      released: "0000-00-00"
    },
    {
      name: "PUBG: BATTLEGROUNDS",
      background_image: "https://www.freetogame.com/g/516/thumbnail.jpg",
      free: "1",
      description:
        "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
      url: "https://www.freetogame.com/open/pubg",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Enlisted",
      background_image: "https://www.freetogame.com/g/508/thumbnail.jpg",
      free: "1",
      description:
        "Get ready to command your own World War II military squad in Gaijin and Darkflow Software\u2019s MMO squad-based shooter Enlisted. ",
      url: "https://www.freetogame.com/open/enlisted",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Forge of Empires",
      background_image: "https://www.freetogame.com/g/345/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based online strategy game, become the leader and raise your city.",
      url: "https://www.freetogame.com/open/forge-of-empires",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Drakensang Online",
      background_image: "https://www.freetogame.com/g/427/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based top-down hack-and-slash 3D MMORPG similar to games in the Diablo series.",
      url: "https://www.freetogame.com/open/drakensang-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MultiVersus",
      background_image: "https://www.freetogame.com/g/525/thumbnail.jpg",
      free: "1",
      description:
        "The Warner Bros lineup meets Smash in Player First Games\u2019 MultiVersus.",
      url: "https://www.freetogame.com/open/multiversus",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Genshin Impact",
      background_image: "https://www.freetogame.com/g/475/thumbnail.jpg",
      free: "1",
      description:
        "If you\u2019ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair, then you\u2019re going to want to check out miHoYo\u2019s Genshin Impact.",
      url: "https://www.freetogame.com/open/genshin-impact",
      genre: "Action RPG",
      released: "0000-00-00"
    },
    {
      name: "Fall Guys",
      background_image: "https://www.freetogame.com/g/523/thumbnail.jpg",
      free: "1",
      description:
        "Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms. ",
      url: "https://www.freetogame.com/open/fall-guys",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Game Of Thrones Winter Is Coming",
      background_image: "https://www.freetogame.com/g/340/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.",
      url: "https://www.freetogame.com/open/game-of-thrones-winter-is-coming",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Elvenar",
      background_image: "https://www.freetogame.com/g/347/thumbnail.jpg",
      free: "1",
      description:
        "A browser based city-building strategy MMO set in the fantasy world of Elvenar.",
      url: "https://www.freetogame.com/open/elvenar",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Neverwinter",
      background_image: "https://www.freetogame.com/g/11/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game. ",
      url: "https://www.freetogame.com/open/neverwinter",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dark Orbit Reloaded",
      background_image: "https://www.freetogame.com/g/380/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based 3D space-combat MMO with a massive playerbase!",
      url: "https://www.freetogame.com/open/darkorbit",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Halo Infinite",
      background_image: "https://www.freetogame.com/g/515/thumbnail.jpg",
      free: "1",
      description:
        "For the first time ever, a free-to-play Halo experience is available in the form of Halo Infinite\u2019s multiplayer.",
      url: "https://www.freetogame.com/open/halo-infinite",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eternal Fury",
      background_image: "https://www.freetogame.com/g/455/thumbnail.jpg",
      free: "1",
      description: "A free-to-play ARPG from R2 Games!",
      url: "https://www.freetogame.com/open/eternal-fury",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Flyff Universe",
      background_image: "https://www.freetogame.com/g/522/thumbnail.jpg",
      free: "1",
      description:
        "Get the full Flyff experience on any platform with the free-to-play browser-based MMORPG Flyff Universe.",
      url: "https://www.freetogame.com/open/flyff-universe",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Phantasy Star Online 2 New Genesis",
      background_image: "https://www.freetogame.com/g/511/thumbnail.jpg",
      free: "1",
      description:
        "The legacy of Phantasy Star Online 2 continues a thousand years later!",
      url: "https://www.freetogame.com/open/pso2-new-genesis",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crossout",
      background_image: "https://www.freetogame.com/g/5/thumbnail.jpg",
      free: "1",
      description: "A post-apocalyptic MMO vehicle combat game! ",
      url: "https://www.freetogame.com/open/crossout",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "World of Warships",
      background_image: "https://www.freetogame.com/g/9/thumbnail.jpg",
      free: "1",
      description:
        "A 3D free to play naval action-themed MMO from the creators of World of Tanks! ",
      url: "https://www.freetogame.com/open/world-of-warships",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "War Thunder",
      background_image: "https://www.freetogame.com/g/12/thumbnail.jpg",
      free: "1",
      description:
        "A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.",
      url: "https://www.freetogame.com/open/war-thunder",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "World of Tanks",
      background_image: "https://www.freetogame.com/g/2/thumbnail.jpg",
      free: "1",
      description:
        "If you like blowing up tanks, with a quick and intense game style you will love this game!",
      url: "https://www.freetogame.com/open/world-of-tanks",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "League of Angels - Heaven's Fury",
      background_image: "https://www.freetogame.com/g/458/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based fantasy online action RPG based loosely on Western mythology!",
      url: "https://www.freetogame.com/open/league-of-angels-heavens-fury",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tower of Fantasy",
      background_image: "https://www.freetogame.com/g/529/thumbnail.jpg",
      free: "1",
      description:
        "Tower of Fantasy is a 3D open-world RPG, anime-style sci-fi MMO RPG game with unique characters and beautiful open vistas!",
      url: "https://www.freetogame.com/open/tower-of-fantasy",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Noah\u2019s Heart",
      background_image: "https://www.freetogame.com/g/528/thumbnail.jpg",
      free: "1",
      description:
        "Noah\u2019s Heart is an open-world MMORPG game with a focus on exploration and socialization.",
      url: "https://www.freetogame.com/open/noahs-heart",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Valorant",
      background_image: "https://www.freetogame.com/g/466/thumbnail.jpg",
      free: "1",
      description:
        "Test your mettle in Riot Games\u2019 character-based FPS shooter Valorant.",
      url: "https://www.freetogame.com/open/valorant",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Phantasy Star Online 2",
      background_image: "https://www.freetogame.com/g/467/thumbnail.jpg",
      free: "1",
      description:
        "Welcome to ARKS, and elite task force searching dangerous planets for the corrupted Falspawn in Phantasy Star 2 Online, Sega\u2019s popular, free-to-play sci-fi MMORPG.",
      url: "https://www.freetogame.com/open/pso2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Call Of Duty: Warzone",
      background_image: "https://www.freetogame.com/g/452/thumbnail.jpg",
      free: "1",
      description:
        "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
      url: "https://www.freetogame.com/open/call-of-duty-warzone",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Destiny 2",
      background_image: "https://www.freetogame.com/g/21/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer Sci-Fi MMOFPS from Bungie.",
      url: "https://www.freetogame.com/open/destiny-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dauntless",
      background_image: "https://www.freetogame.com/g/1/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.",
      url: "https://www.freetogame.com/open/dauntless",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Apex Legends",
      background_image: "https://www.freetogame.com/g/23/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic battle royale game featuring 60-player matches and team-based play. ",
      url: "https://www.freetogame.com/open/apex-legends",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Fortnite",
      background_image: "https://www.freetogame.com/g/57/thumbnail.jpg",
      free: "1",
      description: "A free-to-play, standalone mode of Epic Game's Fortnite. ",
      url: "https://www.freetogame.com/open/fortnite-battle-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Albion Online",
      background_image: "https://www.freetogame.com/g/449/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cross-platform sandbox MMO developed and published by Sandbox Interactive GmbH. ",
      url: "https://www.freetogame.com/open/albion-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Blade and Soul",
      background_image: "https://www.freetogame.com/g/6/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play martial arts MMORPG that tasks players with learning combination attacks.",
      url: "https://www.freetogame.com/open/blade-and-soul",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Brawlhalla",
      background_image: "https://www.freetogame.com/g/212/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D platform fighter inspired by the Smash Bros.",
      url: "https://www.freetogame.com/open/brawlhalla",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Trove",
      background_image: "https://www.freetogame.com/g/8/thumbnail.jpg",
      free: "1",
      description:
        "A free to play Sandbox massively multiplayer online role-playing game! ",
      url: "https://www.freetogame.com/open/trove",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Heroes & Generals",
      background_image: "https://www.freetogame.com/g/202/thumbnail.jpg",
      free: "1",
      description:
        "A World War II-based MMOFPS that mixes infantry, armor, and aircraft.",
      url: "https://www.freetogame.com/open/heroes-and-generals",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Warface",
      background_image: "https://www.freetogame.com/g/207/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online FPS from Crytek, makers of the Far Cry and Crysis series of games.",
      url: "https://www.freetogame.com/open/warface",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Smite",
      background_image: "https://www.freetogame.com/g/217/thumbnail.jpg",
      free: "1",
      description:
        "A popular free-to-play 3D MOBA where you take on the role of an ancient god.",
      url: "https://www.freetogame.com/open/smite",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Warframe",
      background_image: "https://www.freetogame.com/g/3/thumbnail.jpg",
      free: "1",
      description:
        "A cooperative free-to-play third person online action shooter set in an stunning sci-fi world. ",
      url: "https://www.freetogame.com/open/warframe",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "PlanetSide 2",
      background_image: "https://www.freetogame.com/g/243/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open-world FPS that pits three factions against each other in a never-ending war.",
      url: "https://www.freetogame.com/open/planetside-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Guild Wars 2",
      background_image: "https://www.freetogame.com/g/13/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG, the follow-up to ArenaNet's popular Guild Wars. ",
      url: "https://www.freetogame.com/open/guild-wars-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Goodgame Empire",
      background_image: "https://www.freetogame.com/g/350/thumbnail.jpg",
      free: "1",
      description:
        "A free to play medieval strategy browser game. Build you own castle and create a powerful army! ",
      url: "https://www.freetogame.com/open/goodgame-empire",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Trek Online",
      background_image: "https://www.freetogame.com/g/14/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, 3D, Sci-Fi MMORPG based on the popular Star Trek series.",
      url: "https://www.freetogame.com/open/star-trek-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "RuneScape",
      background_image: "https://www.freetogame.com/g/433/thumbnail.jpg",
      free: "1",
      description:
        "A popular 3D browser MMORPG boasting a huge player base and 15 years of content.",
      url: "https://www.freetogame.com/open/runescape",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Synced",
      background_image: "https://www.freetogame.com/g/564/thumbnail.jpg",
      free: "1",
      description: "A free-to-play co-op sci-fi shooter.",
      url: "https://www.freetogame.com/open/synced",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Warhaven",
      background_image: "https://www.freetogame.com/g/565/thumbnail.jpg",
      free: "1",
      description: "A free-to-play, medieval fantasy PvP game from Nexon.",
      url: "https://www.freetogame.com/open/warhaven",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Microvolts: Recharged",
      background_image: "https://www.freetogame.com/g/567/thumbnail.jpg",
      free: "1",
      description: "A lobby-based third-person shooter with a toy-theme.",
      url: "https://www.freetogame.com/open/microvolts",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Hawked",
      background_image: "https://www.freetogame.com/g/558/thumbnail.jpg",
      free: "1",
      description: "A free-to-play PvPvE treasure hunting shooter.",
      url: "https://www.freetogame.com/open/hawked",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Tales Of Yore",
      background_image: "https://www.freetogame.com/g/559/thumbnail.jpg",
      free: "1",
      description: "A 2D MMORPG with lots of RPG tropes.",
      url: "https://www.freetogame.com/open/tales-of-yore",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Palia",
      background_image: "https://www.freetogame.com/g/560/thumbnail.jpg",
      free: "1",
      description: "A cozy MMO with homebuilding and some adventure.",
      url: "https://www.freetogame.com/open/palia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Waven",
      background_image: "https://www.freetogame.com/g/562/thumbnail.jpg",
      free: "1",
      description: "A free-to-play online tactical RPG from Ankama.",
      url: "https://www.freetogame.com/open/waven",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Town of Salem 2",
      background_image: "https://www.freetogame.com/g/566/thumbnail.jpg",
      free: "1",
      description: "A deduction game set in Salem.",
      url: "https://www.freetogame.com/open/town-of-salem-2",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Naraka: Bladepoint",
      background_image: "https://www.freetogame.com/g/556/thumbnail.jpg",
      free: "1",
      description: "A free-to-play melee focused battle royale.",
      url: "https://www.freetogame.com/open/naraka-bladepoint",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Undawn",
      background_image: "https://www.freetogame.com/g/554/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open-world survival RPG developed by LightSpeed studios and published by Level Infinite.",
      url: "https://www.freetogame.com/open/undawn",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Temtem Showdown",
      background_image: "https://www.freetogame.com/g/555/thumbnail.jpg",
      free: "1",
      description:
        "A 2v2 competitive multiplayer battle simulator set in the Temtem universe.",
      url: "https://www.freetogame.com/open/temtem-showdown",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Eden Eternal",
      background_image: "https://www.freetogame.com/g/268/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG with cute anime-inspired graphics.",
      url: "https://www.freetogame.com/open/eden-eternal",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Veiled Experts",
      background_image: "https://www.freetogame.com/g/551/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer shooter game focused on the search and destroy mode of classic shooters.",
      url: "https://www.freetogame.com/open/veiled-experts",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Jected - Rivals",
      background_image: "https://www.freetogame.com/g/552/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play game mixing extreme sports with destructible vehicles and a unique ejection mechanic.",
      url: "https://www.freetogame.com/open/jected-rivals",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Ethyrial: Echoes of Yore",
      background_image: "https://www.freetogame.com/g/557/thumbnail.jpg",
      free: "1",
      description:
        "A old-school MMORPG set in a world on the brink of Civil War",
      url: "https://www.freetogame.com/open/ethyrial-echoes-of-yore",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dead Cide Club",
      background_image: "https://www.freetogame.com/g/548/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, side-scrolling shooter with a variety of modes and character types to choose from.",
      url: "https://www.freetogame.com/open/dead-cide-club",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Kartrider: Drift",
      background_image: "https://www.freetogame.com/g/546/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online racing game set in the Kartrider franchise.",
      url: "https://www.freetogame.com/open/kartrider-drift",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Warlander",
      background_image: "https://www.freetogame.com/g/547/thumbnail.jpg",
      free: "1",
      description:
        "A medieval-style combat game with a selection of modes and characters.",
      url: "https://www.freetogame.com/open/warlander",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Fangs",
      background_image: "https://www.freetogame.com/g/545/thumbnail.jpg",
      free: "1",
      description: "A 4v4 MOBA with hero-specific strategies.",
      url: "https://www.freetogame.com/open/fangs",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Summoners War: Chronicles",
      background_image: "https://www.freetogame.com/g/549/thumbnail.jpg",
      free: "1",
      description: "A multi-platform ARPG set in the Summoners War universe.",
      url: "https://www.freetogame.com/open/summoners-war-chronicles",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Marvel Snap",
      background_image: "https://www.freetogame.com/g/541/thumbnail.jpg",
      free: "1",
      description:
        "A fast paced strategy card game set in the Marvel universe.",
      url: "https://www.freetogame.com/open/marvel-snap",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "World Boss",
      background_image: "https://www.freetogame.com/g/542/thumbnail.jpg",
      free: "1",
      description: "An experimental FPS based on io and roguelike gameplay.",
      url: "https://www.freetogame.com/open/world-boss",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Omega Strikers",
      background_image: "https://www.freetogame.com/g/536/thumbnail.jpg",
      free: "1",
      description: "A 3v3 socccer-style game with knockouts.",
      url: "https://www.freetogame.com/open/omega-strikers",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Gundam Evolution",
      background_image: "https://www.freetogame.com/g/537/thumbnail.jpg",
      free: "1",
      description: "A 6v6 team-based shooter based on the Gundam multiverse",
      url: "https://www.freetogame.com/open/gundam-evolution",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Deathverse: Let It Die",
      background_image: "https://www.freetogame.com/g/539/thumbnail.jpg",
      free: "1",
      description:
        "A game of survival where contestants are pit against each other in a life or death game show.",
      url: "https://www.freetogame.com/open/deathverse-let-it-die",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Galahad 3093",
      background_image: "https://www.freetogame.com/g/544/thumbnail.jpg",
      free: "1",
      description:
        "A 12v12 team shooter featuring mechs based on Arthurian legend.",
      url: "https://www.freetogame.com/open/galahad-3093",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Aero Tales Online",
      background_image: "https://www.freetogame.com/g/527/thumbnail.jpg",
      free: "1",
      description:
        "Aero Tales Online: The World is a free-to-play 3D anime-style MMORPG with PvP and PvE elements. The game revolves around the \u201cmysterious story of the Key of Skylight\u201d.",
      url: "https://www.freetogame.com/open/aero-tales-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Magic Spellslingers",
      background_image: "https://www.freetogame.com/g/531/thumbnail.jpg",
      free: "1",
      description:
        "Magic Spellslingers is the latest entry based on Witzards of the Coast\u2019s popular card game Magic: The Gathering.",
      url: "https://www.freetogame.com/open/magic-spellslingers",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "A.V.A Global",
      background_image: "https://www.freetogame.com/g/533/thumbnail.jpg",
      free: "1",
      description:
        "A.V.A is a free-to-play online first-person shooter with multiple game modes, unique customizations, as well as PvP and PvE gameplay.",
      url: "https://www.freetogame.com/open/ava",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Lost Light",
      background_image: "https://www.freetogame.com/g/534/thumbnail.jpg",
      free: "1",
      description:
        "A post-apocalyptic shooter built around creating a realistic experience.",
      url: "https://www.freetogame.com/open/lost-light",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Temperia: Soul of Majestic",
      background_image: "https://www.freetogame.com/g/524/thumbnail.jpg",
      free: "1",
      description:
        "Fans of collectible card games, are you looking for something a bit different from the normal fare? Then a peek at Moonwolf Entertainment and A2 Softworks\u2019 Temperia: Soul of Majestic might be in order.",
      url: "https://www.freetogame.com/open/temperia",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Chimeraland",
      background_image: "https://www.freetogame.com/g/526/thumbnail.jpg",
      free: "1",
      description:
        "Explore the open-world sandbox MMO game set in a mythical world. Play as one of a large number of races, from jelly-fish to dragon-person \u2013 or even a regular old human if that\u2019s your thing. Explore the land, gather resources, craft items, build homes and more.",
      url: "https://www.freetogame.com/open/chimeraland",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "World of Runes",
      background_image: "https://www.freetogame.com/g/532/thumbnail.jpg",
      free: "1",
      description:
        "An adorable anime-style MMO featuring cute pets and collectable cards.",
      url: "https://www.freetogame.com/open/world-of-runes",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Roller Champions",
      background_image: "https://www.freetogame.com/g/520/thumbnail.jpg",
      free: "1",
      description:
        "What if you could player roller derby, but in a more organized and less physically dangerous environment?",
      url: "https://www.freetogame.com/open/roller-champions",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Space Punks",
      background_image: "https://www.freetogame.com/g/519/thumbnail.jpg",
      free: "1",
      description:
        "Space Punks is a sci-fi co-op looter shooter with graphics and humor that will likely appeal to the Borderlands fans among us.",
      url: "https://www.freetogame.com/open/space-punks",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Goose, Goose, DUCK",
      background_image: "https://www.freetogame.com/g/550/thumbnail.jpg",
      free: "1",
      description: "A social deduction game with geese.",
      url: "https://www.freetogame.com/open/goose-goose-duck",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Swords of Legends Online",
      background_image: "https://www.freetogame.com/g/518/thumbnail.jpg",
      free: "1",
      description:
        "Explore a fantasy world based on Chinese mythology in Gameforge\u2019s action MMORPG Swords of Legends Online!",
      url: "https://www.freetogame.com/open/swords-of-legends-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Super Squad",
      background_image: "https://www.freetogame.com/g/513/thumbnail.jpg",
      free: "1",
      description:
        "Prepare yourself. It\u2019s time for Mayhem. Super Squad is a multi-player online shoot-\u2019em-up (or MOSH)!",
      url: "https://www.freetogame.com/open/super-squad",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Sherwood Extreme",
      background_image: "https://www.freetogame.com/g/512/thumbnail.jpg",
      free: "1",
      description:
        "High action arcade shooter Sherwood Extreme sends players on a mission to save the kingdom!",
      url: "https://www.freetogame.com/open/sherwood-extreme",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Smash Legends",
      background_image: "https://www.freetogame.com/g/509/thumbnail.jpg",
      free: "1",
      description:
        "Classic fairy tales get wild with 5minlab and LINE Games Corporation\u2019s brawl-action game Smash Legends.",
      url: "https://www.freetogame.com/open/smash-legends",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Drifters Loot the Galaxy",
      background_image: "https://www.freetogame.com/g/510/thumbnail.jpg",
      free: "1",
      description:
        "Grab your Driftpacs and grappling hooks, it\u2019s time to loot. Pick a character and dive into Blind Squirrel\u2019s team-based shooter, Drifters Loot the Galaxy.",
      url: "https://www.freetogame.com/open/drifters-loot-the-galaxy",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Primordials: Battle of Gods",
      background_image: "https://www.freetogame.com/g/502/thumbnail.jpg",
      free: "1",
      description:
        "Build armies and fight for control of the realm in Global Dodo Entertainment\u2019s 1v1 strategy game Primordials: Battle of Gods. ",
      url: "https://www.freetogame.com/open/primordials-battle-of-gods",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Super Mecha Champions",
      background_image: "https://www.freetogame.com/g/507/thumbnail.jpg",
      free: "1",
      description:
        "Super Mecha Champions is a PC port of the mobile anime PvP game from NetEease, featuring a variety of modes but focusing on battle royale.",
      url: "https://www.freetogame.com/open/super-mecha-champions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Chroma: Bloom And Blight",
      background_image: "https://www.freetogame.com/g/500/thumbnail.jpg",
      free: "1",
      description:
        "Competitive card game fans have a new, completely free option to add to their list. ",
      url: "https://www.freetogame.com/open/chroma-bloom-and-blight",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Blankos Block Party",
      background_image: "https://www.freetogame.com/g/498/thumbnail.jpg",
      free: "1",
      description:
        "What happens when you take the vinyl collectible toy experience and combine it with an open-world multiplayer game? You get Blankos Block Party!\r\n",
      url: "https://www.freetogame.com/open/blankos",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Slapshot: Rebound",
      background_image: "https://www.freetogame.com/g/499/thumbnail.jpg",
      free: "1",
      description:
        "Do you like hockey? How about physic-based multiplayer, arcade-style sports games with cute graphics? Well, this is the one for you.",
      url: "https://www.freetogame.com/open/slapshot-rebound",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Rogue Company",
      background_image: "https://www.freetogame.com/g/476/thumbnail.jpg",
      free: "1",
      description:
        "From Hi-Rez Studios, the team that brought you Smite and Paladins, comes Rogue Company, a cross-platform, competitive team-based third person shooter.",
      url: "https://www.freetogame.com/open/rogue-company",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eternal Return: Black Survival",
      background_image: "https://www.freetogame.com/g/477/thumbnail.jpg",
      free: "1",
      description:
        "Combining elements from battle royale, MOBA, and the survival genres, Eternal Return: Black Survival is a game designed with a broad audience in mind. ",
      url: "https://www.freetogame.com/open/eternal-return",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Blood of Steel",
      background_image: "https://www.freetogame.com/g/479/thumbnail.jpg",
      free: "1",
      description:
        "Blood of Steel is an online competitive strategy game featuring some of the most well-known figures throughout medieval history. Choose your general \u2013 a Crusader, Viking, Ninja or one of those from the Three Kingdoms. Build your kingdom and command armies in epic PvP battles using classic medieval warfare tactics.",
      url: "https://www.freetogame.com/open/blood-of-steel",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Spellbreak",
      background_image: "https://www.freetogame.com/g/473/thumbnail.jpg",
      free: "1",
      description:
        "Spellbreak is a multiplayer, multi-platform battle-royale where player take on the role of a \u201cbattlemage\u201d mastering elemental magic and using spells to compete against other players.",
      url: "https://www.freetogame.com/open/spellbreak",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Rocket League",
      background_image: "https://www.freetogame.com/g/474/thumbnail.jpg",
      free: "1",
      description:
        "Get your car-soccer gaming on for free with Psyonix\u2019s Rocket League. The popular competitive multi-player game is a popular offering with over 57 million players.",
      url: "https://www.freetogame.com/open/rocket-league",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Armor Valor",
      background_image: "https://www.freetogame.com/g/471/thumbnail.jpg",
      free: "1",
      description:
        "Build your empire with the help of mythical heroes and well thought out strategy in R2 Games\u2019 strategy RPG Armor Valor.",
      url: "https://www.freetogame.com/open/armor-valor",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Unfortunate Spacemen",
      background_image: "https://www.freetogame.com/g/469/thumbnail.jpg",
      free: "1",
      description:
        "Unfortunate Spacemen is a co-op multiplayer game about Shapeshifting with a Co-op Story Mode, lots of objectives and more!",
      url: "https://www.freetogame.com/open/unfortunate-spacemen",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Jade Goddess",
      background_image: "https://www.freetogame.com/g/472/thumbnail.jpg",
      free: "1",
      description:
        "Jade Goddess is a free-to-play, browser based MMO inspired by Eastern mythology.",
      url: "https://www.freetogame.com/open/jade-goddess",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Shop Titans",
      background_image: "https://www.freetogame.com/g/461/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play RPG shopkeeper simulation game where you are responsible for designing and maintaining your own shop.",
      url: "https://www.freetogame.com/open/shop-titans",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Survivor Legacy",
      background_image: "https://www.freetogame.com/g/463/thumbnail.jpg",
      free: "1",
      description:
        "Survivor Legacy is a free-to-play zombie-themed strategy game from R2 Games.",
      url: "https://www.freetogame.com/open/survivor-legacy",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Bombergrounds: Battle Royale",
      background_image: "https://www.freetogame.com/g/459/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play massively multiplayer battle Royale game inspired by the old-shool Bomberman games!",
      url: "https://www.freetogame.com/open/bombergrounds-battle-royale",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Kakale Online",
      background_image: "https://www.freetogame.com/g/563/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play top-down 2D MMORPG from developer and publisher ViVa Games.",
      url: "https://www.freetogame.com/open/kakale-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Darwin Project",
      background_image: "https://www.freetogame.com/g/39/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 10-player battle royale game set just prior to an impeding ice age.",
      url: "https://www.freetogame.com/open/darwin-project",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Legends of Runeterra",
      background_image: "https://www.freetogame.com/g/441/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play CCG based on Riot Games' MOBA League of Legends.",
      url: "https://www.freetogame.com/open/runeterra",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "CRSED: F.O.A.D.",
      background_image: "https://www.freetogame.com/g/4/thumbnail.jpg",
      free: "1",
      description:
        "Take the battle royale genre and add  mystical powers and you have CRSED: F.O.A.D. (Aka Cuisine Royale: Second Edition)",
      url: "https://www.freetogame.com/open/crsed",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Mirage Online Classic",
      background_image: "https://www.freetogame.com/g/535/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based free-to-play spiritual successor to 2001's Mirage Online.",
      url: "https://www.freetogame.com/open/mirage-online-classic",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Inferna",
      background_image: "https://www.freetogame.com/g/436/thumbnail.jpg",
      free: "1",
      description:
        "A cross-platform MMO from indie developer and publisher Inferna Limited, designed for players seeking a classic experience.  ",
      url: "https://www.freetogame.com/open/inferna",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ultimate Pirates",
      background_image: "https://www.freetogame.com/g/443/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based strategy MMO published for both desktop and mobile browsers by Gameforge.  ",
      url: "https://www.freetogame.com/open/ultimate-pirates",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Fer.al",
      background_image: "https://www.freetogame.com/g/501/thumbnail.jpg",
      free: "1",
      description:
        "If you\u2019ve ever wanted to be a creature of myth and hang out with other mytical creatures, Wildworks\u2019 Fer.al can help you live the dream.",
      url: "https://www.freetogame.com/open/Feral",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Battle Breakers",
      background_image: "https://www.freetogame.com/g/435/thumbnail.jpg",
      free: "1",
      description:
        "A multi-platform free-to-play RPG developed and published by Epic Games for PC and Android devices.  ",
      url: "https://www.freetogame.com/open/battlebreakers",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stay Out",
      background_image: "https://www.freetogame.com/g/437/thumbnail.jpg",
      free: "1",
      description:
        "An MMORPG featuring urban exploration and shooter elements.",
      url: "https://www.freetogame.com/open/stay-out",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "PC Futbol Legends",
      background_image: "https://www.freetogame.com/g/439/thumbnail.jpg",
      free: "1",
      description:
        "An arcade soccer game inspired by cult arcade games from IDC games. ",
      url: "https://www.freetogame.com/open/futbol-legends",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Vampire Empire",
      background_image: "https://www.freetogame.com/g/440/thumbnail.jpg",
      free: "1",
      description:
        "A multiplayer strategy game that focuses on the war between vampires and werewolves. ",
      url: "https://www.freetogame.com/open/vampire-empire",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Firestone Idle RPG",
      background_image: "https://www.freetogame.com/g/468/thumbnail.jpg",
      free: "1",
      description:
        "Set in the fantasy world of Alandria, Firestone is an idle RPG in which players are tasked with building the best possible party of heroes and using them to defeat the undead and orcs that plague the world.",
      url: "https://www.freetogame.com/open/firestone-idle-rpg",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Mythgard",
      background_image: "https://www.freetogame.com/g/505/thumbnail.jpg",
      free: "1",
      description:
        "Rhino Games Inc.\u2019s CCG Mythgard combines cyberpunk with the heroes, gods, and creatures of the fantasy in a modern setting to create a world where magic competes against technology for control.",
      url: "https://www.freetogame.com/open/mythgard",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Dark Knight",
      background_image: "https://www.freetogame.com/g/445/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based fantasy MMOARPG wherein players take on the role of a devil hunter descended from the gods.",
      url: "https://www.freetogame.com/open/dark-knight",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Legends of Aria",
      background_image: "https://www.freetogame.com/g/446/thumbnail.jpg",
      free: "1",
      description:
        "A sandbox MMORPG featuring a skill-based system, content that will appeal to both PvE and PvP players, and a robust housing system.",
      url: "https://www.freetogame.com/open/legends-of-aria",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crystal Clash",
      background_image: "https://www.freetogame.com/g/451/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy RTS developed by Crunchy Leaf Games. ",
      url: "https://www.freetogame.com/open/crystal-clash",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dota Underlords",
      background_image: "https://www.freetogame.com/g/447/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play auto battler strategy game set in the world of Valve's Dota franchise.",
      url: "https://www.freetogame.com/open/dota-underlords",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Minion Masters",
      background_image: "https://www.freetogame.com/g/19/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic minion brawler from Danish developer Betadwarf. ",
      url: "https://www.freetogame.com/open/minion-masters",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Splitgate: Arena Warfare",
      background_image: "https://www.freetogame.com/g/20/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer shooter developed and published by 1047 games. ",
      url: "https://www.freetogame.com/open/splitgate-arena-warfare",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Conqueror's Blade",
      background_image: "https://www.freetogame.com/g/456/thumbnail.jpg",
      free: "1",
      description:
        "Command your own medieval army in Conqueror's Blade, a war simulator developed by Booming games.",
      url: "https://www.freetogame.com/open/conquerors-blade",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stein.world",
      background_image: "https://www.freetogame.com/g/353/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based online fantasy role \r\nplaying game done in an old-school \r\n16-bit style.",
      url: "https://www.freetogame.com/open/steinworld",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Kards",
      background_image: "https://www.freetogame.com/g/438/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play collectible World War II card game from developer 1939 Games.",
      url: "https://www.freetogame.com/open/kards",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "KurtzPel",
      background_image: "https://www.freetogame.com/g/448/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play third-person action battle game from KOG Games.",
      url: "https://www.freetogame.com/open/kurtzpel",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "The Third Age",
      background_image: "https://www.freetogame.com/g/457/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based Strategy MMO game focused on story-based PvE gameplay!",
      url: "https://www.freetogame.com/open/the-third-age",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Eternal",
      background_image: "https://www.freetogame.com/g/91/thumbnail.jpg",
      free: "1",
      description:
        "A strategy card game designed to take the best elements of Magic the Gathering, Hearthstone, and Hex and combine them all into one game.",
      url: "https://www.freetogame.com/open/eternal",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Artifact",
      background_image: "https://www.freetogame.com/g/503/thumbnail.jpg",
      free: "1",
      description:
        "Valve\u2019s Artifact is two games in one. Whether you\u2019re looking for the original Dota 2 trading card game created with the help of card game designer Richard Garfield or something a little more streamlined, Artifact has both in one download.",
      url: "https://www.freetogame.com/open/artifact",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "World War 3",
      background_image: "https://www.freetogame.com/g/538/thumbnail.jpg",
      free: "1",
      description: "A realistic multiplayer tactical FPS.",
      url: "https://www.freetogame.com/open/world-war-3",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Combat Arms: Reloaded",
      background_image: "https://www.freetogame.com/g/299/thumbnail.jpg",
      free: "1",
      description:
        "A free to play modern first person shooter with lots of maps and weapons!",
      url: "https://www.freetogame.com/open/combat-arms",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dreadnought",
      background_image: "https://www.freetogame.com/g/68/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play combat flight simulator developed by Yager Development and published by Grey Box. ",
      url: "https://www.freetogame.com/open/dreadnought",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Spacelords",
      background_image: "https://www.freetogame.com/g/28/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 4v1 sci-fi shooter. ",
      url: "https://www.freetogame.com/open/spacelords",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Battlerite Royale",
      background_image: "https://www.freetogame.com/g/450/thumbnail.jpg",
      free: "1",
      description:
        "A free to play battle royale set in the Battlerite universe.",
      url: "https://www.freetogame.com/open/battlerite-royale",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Magic: The Gathering Arena",
      background_image: "https://www.freetogame.com/g/454/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play digital recreation of Wizards of the Coast's popular collectible card game.",
      url: "https://www.freetogame.com/open/mtg-arena",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "League of Angels 3",
      background_image: "https://www.freetogame.com/g/341/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play turn-based strategy browser game developed and published by GTArcade Entertainment, Inc.",
      url: "https://www.freetogame.com/open/league-of-angels-3",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "BlackShot: Revolution",
      background_image: "https://www.freetogame.com/g/282/thumbnail.jpg",
      free: "1",
      description:
        "Get thrown into the fast-paced action of a virtual war zone and compete against other players.",
      url: "https://www.freetogame.com/open/blackshot",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Cosmos Invictus",
      background_image: "https://www.freetogame.com/g/31/thumbnail.jpg",
      free: "1",
      description:
        "A strategic collectible card game developed and published by Pegnio Ltd. ",
      url: "https://www.freetogame.com/open/cosmos-invictus",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Realm Royale Reforged",
      background_image: "https://www.freetogame.com/g/36/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy-themed battle royale game based on Hi-Rez Studio's team shooter Paladins. ",
      url: "https://www.freetogame.com/open/realm-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Empire: World War 3",
      background_image: "https://www.freetogame.com/g/460/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based action packed strategy game from the developer of Legends of Honor.",
      url: "https://www.freetogame.com/open/empireww3",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Totally Accurate Battlegrounds",
      background_image: "https://www.freetogame.com/g/506/thumbnail.jpg",
      free: "1",
      description:
        "Take 60 players, throw them on a map together with over 90 weapons, including balloon crossbows, pots and pans, and inflatable hammers, add physics-based parkour and you have Landfall\u2019s Totally Accurate Battlegrounds (TABG).",
      url: "https://www.freetogame.com/open/tabg",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Will To Live",
      background_image: "https://www.freetogame.com/g/434/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG-shooter developed and published by AlphaSoft LLC.",
      url: "https://www.freetogame.com/open/will-to-live",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Battle Arena Heroes Adventure",
      background_image: "https://www.freetogame.com/g/543/thumbnail.jpg",
      free: "1",
      description: "A MOBA with RPG elements.",
      url: "https://www.freetogame.com/open/battle-arena-heroes-adventure",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Spellsworn",
      background_image: "https://www.freetogame.com/g/42/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play arena battle game developed and published by Frogsong Studios AB. ",
      url: "https://www.freetogame.com/open/spellsworn",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Z1 Battle Royale",
      background_image: "https://www.freetogame.com/g/43/thumbnail.jpg",
      free: "1",
      description: "A highly competitive free-to-play battle royale shooter.",
      url: "https://www.freetogame.com/open/z1-battle-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Tale Of Toast",
      background_image: "https://www.freetogame.com/g/44/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open world MMO inspired by classic, core MMOs. ",
      url: "https://www.freetogame.com/open/tale-of-toast",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Bombtag",
      background_image: "https://www.freetogame.com/g/47/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer Bomberman-inspired game.",
      url: "https://www.freetogame.com/open/bombtag",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Ironsight",
      background_image: "https://www.freetogame.com/g/48/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play futuristic shooter published by Aeria Games. ",
      url: "https://www.freetogame.com/open/ironsight",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dead Maze",
      background_image: "https://www.freetogame.com/g/49/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 2D isometric MMO full of zombies. ",
      url: "https://www.freetogame.com/open/dead-maze",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Scions of Fate",
      background_image: "https://www.freetogame.com/g/316/thumbnail.jpg",
      free: "1",
      description:
        "A friendly free to play MMORPG with easy to pick up controls.",
      url: "https://www.freetogame.com/open/scions-of-fate",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "My Soul",
      background_image: "https://www.freetogame.com/g/342/thumbnail.jpg",
      free: "1",
      description: "A free-to-play ARPG distributed by GameSpirit. ",
      url: "https://www.freetogame.com/open/my-soul",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Wild Terra Online",
      background_image: "https://www.freetogame.com/g/22/thumbnail.jpg",
      free: "1",
      description:
        "A medieval sandbox MMO designed with core players in mind. ",
      url: "https://www.freetogame.com/open/wild-terra-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Global Adventures",
      background_image: "https://www.freetogame.com/g/51/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG developed by PixelSoft and Published by SubaGames. ",
      url: "https://www.freetogame.com/open/global-adventures",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Closers",
      background_image: "https://www.freetogame.com/g/52/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play episodic anime beat-em-up developed \r\nby Naddic Games and published by \r\nEn Masse Entertainment. ",
      url: "https://www.freetogame.com/open/closers",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "La Tale Evolved",
      background_image: "https://www.freetogame.com/g/322/thumbnail.jpg",
      free: "1",
      description:
        "A 2D side-scrolling fantasy MMORPG with anime-inspired graphics.",
      url: "https://www.freetogame.com/open/la-tale",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Luna Online: Reborn",
      background_image: "https://www.freetogame.com/g/120/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, anime themed fantasy MMORPG and a remake of the previous Luna MMO! ",
      url: "https://www.freetogame.com/open/luna-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Ultimatest Battle",
      background_image: "https://www.freetogame.com/g/58/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D platform game that pits two teams of players against each other in a variety of modes. ",
      url: "https://www.freetogame.com/open/the-ultimatest-battle",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Insidia",
      background_image: "https://www.freetogame.com/g/59/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play tactical, turn-based dueling game developed and published by Bad Seed. ",
      url: "https://www.freetogame.com/open/insidia",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Quake Champions",
      background_image: "https://www.freetogame.com/g/30/thumbnail.jpg",
      free: "1",
      description:
        "Quake Champions is a callback to the early days of the Quake IP, featuring the fast-paced action that made the IP popular over two decades ago. ",
      url: "https://www.freetogame.com/open/quake-champions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gods Origin Online",
      background_image: "https://www.freetogame.com/g/354/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based RPG from VivaGames in which players take on the role of human summoners that call deities from the Astral Realm back in time. ",
      url: "https://www.freetogame.com/open/gods-origin",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Black Squad",
      background_image: "https://www.freetogame.com/g/61/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play military FPS developed by NS STUDIO and published by NEOWIZ.",
      url: "https://www.freetogame.com/open/black-squad",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Secret World Legends",
      background_image: "https://www.freetogame.com/g/64/thumbnail.jpg",
      free: "1",
      description: "A free-to-play reboot of The Secret World. ",
      url: "https://www.freetogame.com/open/secret-world-legends",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Argo",
      background_image: "https://www.freetogame.com/g/63/thumbnail.jpg",
      free: "1",
      description: "A tactical first-person shooter from the Arma 3 developer.",
      url: "https://www.freetogame.com/open/argo",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Pixel Worlds",
      background_image: "https://www.freetogame.com/g/65/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, side-scroller MMO sandbox game developed and published by Kukouri Mobile Entertainment. ",
      url: "https://www.freetogame.com/open/pixel-worlds",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Deceit",
      background_image: "https://www.freetogame.com/g/55/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer first-person shooter set \r\nin an asylum! ",
      url: "https://www.freetogame.com/open/deceit",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gwent: The Witcher Card Game",
      background_image: "https://www.freetogame.com/g/66/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play card game based on CD Projekt Red's popular Witcher franchise. ",
      url: "https://www.freetogame.com/open/gwent",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Awesomenauts",
      background_image: "https://www.freetogame.com/g/67/thumbnail.jpg",
      free: "1",
      description: "A 3v3 2D battle arena Developed by Ronimo games.",
      url: "https://www.freetogame.com/open/awesomenauts",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Alien Swarm: Reactive Drop",
      background_image: "https://www.freetogame.com/g/70/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play top-down tactical co-op expansion on the Alien swarm game and Source SDK.",
      url: "https://www.freetogame.com/open/alien-swarm-reactive-drop",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Catan Universe",
      background_image: "https://www.freetogame.com/g/71/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategy game based on the classic board and card games. ",
      url: "https://www.freetogame.com/open/catan-universe",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Krosmaga",
      background_image: "https://www.freetogame.com/g/72/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play CCG/tower defense hybrid developed \r\nby Ankama Studio and published by \r\nAnkama Games. ",
      url: "https://www.freetogame.com/open/krosmaga",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Chronicles of Eidola",
      background_image: "https://www.freetogame.com/g/355/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 3D Browser RPG from AMZGame.",
      url: "https://www.freetogame.com/open/chronicles-of-eidola",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Revelation Online",
      background_image: "https://www.freetogame.com/g/77/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy MMO developed by NetEase and published by My.com. ",
      url: "https://www.freetogame.com/open/revelation-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MU Legend",
      background_image: "https://www.freetogame.com/g/87/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG developed by Webzen and the followup to MU Online. ",
      url: "https://www.freetogame.com/open/mu-legend",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Therian Saga",
      background_image: "https://www.freetogame.com/g/421/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based sandbox MMORPG with a complex crafting system.",
      url: "https://www.freetogame.com/open/therian-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Cabals: Card Blitz",
      background_image: "https://www.freetogame.com/g/69/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play game developed by Kyy Games and published by BISBOG SA. ",
      url: "https://www.freetogame.com/open/cabals-card-blitz",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Line of Sight",
      background_image: "https://www.freetogame.com/g/82/thumbnail.jpg",
      free: "1",
      description: 'Free FPS game ibed as "Bioshock meets Call of Duty"! ',
      url: "https://www.freetogame.com/open/line-of-sight",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Heavy Metal Machines",
      background_image: "https://www.freetogame.com/g/83/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer vehicular combat game based in a post-apocalyptic world.",
      url: "https://www.freetogame.com/open/heavy-metal-machines",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Dragon Awaken",
      background_image: "https://www.freetogame.com/g/343/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based fantasy RPG developed \r\nby Game Hollywood and published by \r\nProficient City.",
      url: "https://www.freetogame.com/open/dragon-awaken",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Infestation: The New Z",
      background_image: "https://www.freetogame.com/g/85/thumbnail.jpg",
      free: "1",
      description:
        'A re-work of the open world zombie shooter game Infestation: Survivor Stories (or as it was formerly known "The War Z").',
      url: "https://www.freetogame.com/open/infestation-new-z",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "One Tower",
      background_image: "https://www.freetogame.com/g/92/thumbnail.jpg",
      free: "1",
      description:
        'A unique 1v1 MOBA known as a "micro-moba" developed and published by SkyReacher following a successful Kickstarter. ',
      url: "https://www.freetogame.com/open/one-tower",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Shadowverse",
      background_image: "https://www.freetogame.com/g/88/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic CCG developed and published by Cygamesm the creators of Rage of Bahamut and Granblu Fantasy. ",
      url: "https://www.freetogame.com/open/shadowverse",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "AdventureQuest 3D",
      background_image: "https://www.freetogame.com/g/89/thumbnail.jpg",
      free: "1",
      description:
        "A free to play cross-platform MMORPG from the creators of the original 2D RPG game.",
      url: "https://www.freetogame.com/open/adventurequest-3d",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Riding Club Championships",
      background_image: "https://www.freetogame.com/g/93/thumbnail.jpg",
      free: "1",
      description:
        "An online competitive horse riding game inspired by traditional equestrian disciplines. ",
      url: "https://www.freetogame.com/open/riding-club-championships",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Battlerite",
      background_image: "https://www.freetogame.com/g/94/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play team arena brawler developed by Stunlock Studios. Players play as one of several available champions on teams in 2v2 or 3v3 matches. ",
      url: "https://www.freetogame.com/open/battlerite",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Paladins",
      background_image: "https://www.freetogame.com/g/95/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play team-based shooter developed and published by Hi-Rez Games, the creators of SMITE. ",
      url: "https://www.freetogame.com/open/paladins",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Star Crusade",
      background_image: "https://www.freetogame.com/g/99/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play sci-fi themed collectable card game developed and published by ZiMAD inc. ",
      url: "https://www.freetogame.com/open/star-crusade",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Omega Zodiac",
      background_image: "https://www.freetogame.com/g/344/thumbnail.jpg",
      free: "1",
      description:
        "A Greek and Norse mythology based free-to-play action MMO developed and published by Proficient City and Game Hollywood.",
      url: "https://www.freetogame.com/open/omega-zodiac",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Elder Scrolls: Legends",
      background_image: "https://www.freetogame.com/g/102/thumbnail.jpg",
      free: "1",
      description: "A free-to-play CCG based on The Elder Scrolls franchise. ",
      url: "https://www.freetogame.com/open/elder-scrolls-legends",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Riders of Icarus",
      background_image: "https://www.freetogame.com/g/106/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play action MMORPG featuring mounted, in-air combat. ",
      url: "https://www.freetogame.com/open/riders-of-icarus",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Naruto Online",
      background_image: "https://www.freetogame.com/g/365/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO based on the popular anime series and manga, developed \r\nby Bandai Namco Entertainment. ",
      url: "https://www.freetogame.com/open/naruto-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Kritika: REBOOT",
      background_image: "https://www.freetogame.com/g/62/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play hack-and-slash MMORPG with both a single-player adventure combat from En Masse Entertainment and ALL-M Co. ",
      url: "https://www.freetogame.com/open/kritika",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Zula",
      background_image: "https://www.freetogame.com/g/108/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play online FPS developed and published by IDC/Games. ",
      url: "https://www.freetogame.com/open/zula",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "LuckCatchers",
      background_image: "https://www.freetogame.com/g/109/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play sandbox sim based on the novels of fantasy and steam-punk author A. Pehov.",
      url: "https://www.freetogame.com/open/luckcatchers",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "UFO Online: Invasion",
      background_image: "https://www.freetogame.com/g/110/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play post-apocalyptic, turn-based tactical combat \r\nMMO developed by Bad Pixel. ",
      url: "https://www.freetogame.com/open/ufo-online-invasion",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Weapons Of Mythology",
      background_image: "https://www.freetogame.com/g/112/thumbnail.jpg",
      free: "1",
      description: "A 3D free-to-play fantasy MMORPG published by IDC/Games. ",
      url: "https://www.freetogame.com/open/weapons-of-mythology",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tree of Savior",
      background_image: "https://www.freetogame.com/g/116/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy 3D MMORPG with a massive freedom of choice, cute looking characters and a distinct art style. ",
      url: "https://www.freetogame.com/open/tree-of-savior",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Starbreak",
      background_image: "https://www.freetogame.com/g/118/thumbnail.jpg",
      free: "1",
      description:
        "A Roguelike MMORPG with MetroidVania-style platformer \r\ngameplay! Castlevania and Metroid fans will \r\nlove this game! ",
      url: "https://www.freetogame.com/open/starbreak",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Fantasy Tales Online",
      background_image: "https://www.freetogame.com/g/119/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, retro MMO featuring puzzles, a rich crafting system and Randomly generated dungeons! ",
      url: "https://www.freetogame.com/open/fantasy-tales-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dragon Blood",
      background_image: "https://www.freetogame.com/g/370/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser MMORPG from 101XP, you'll harness your unique power and the blood of dragons that flows through your veins! ",
      url: "https://www.freetogame.com/open/dragon-blood",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "League of Angels 2",
      background_image: "https://www.freetogame.com/g/371/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser MMORPG that captures all the beauty and elegance of its predecessor.",
      url: "https://www.freetogame.com/open/league-angels-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Astral Heroes",
      background_image: "https://www.freetogame.com/g/117/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play collectable card game from the creators of Astral Masters. ",
      url: "https://www.freetogame.com/open/astral-heroes",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Holodrive",
      background_image: "https://www.freetogame.com/g/124/thumbnail.jpg",
      free: "1",
      description:
        'A free-to-play 2D multiplayer shooter developed by BitCake Studio and published by Versus Evil in which players play as customizable robots or "Dummys". ',
      url: "https://www.freetogame.com/open/holodrive",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Cabal Online",
      background_image: "https://www.freetogame.com/g/304/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast-paced skill-based MMORPG in a stunning world!",
      url: "https://www.freetogame.com/open/cabal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Atom Universe",
      background_image: "https://www.freetogame.com/g/125/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online social Virtual World set in a theme park.",
      url: "https://www.freetogame.com/open/atom-universe",
      genre: "Social",
      released: "0000-00-00"
    },
    {
      name: "Spellweaver",
      background_image: "https://www.freetogame.com/g/128/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online collectible card \r\ngame that requires deep strategic and \r\nthinking.",
      url: "https://www.freetogame.com/open/spellweaver",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Clash of Avatars",
      background_image: "https://www.freetogame.com/g/374/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D browser MMORPG with powerful Avatars, 50 mounts, \r\nand several loyal pets.",
      url: "https://www.freetogame.com/open/clash-of-avatars",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "War Trigger 3",
      background_image: "https://www.freetogame.com/g/134/thumbnail.jpg",
      free: "1",
      description:
        "A MMO shooter with infantry, vehicle, and air combat across massive maps! ",
      url: "https://www.freetogame.com/open/wt3",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "VEGA Conflict",
      background_image: "https://www.freetogame.com/g/136/thumbnail.jpg",
      free: "1",
      description: "A Cross-Platform free to play 2D sci-fi strategy MMO.",
      url: "https://www.freetogame.com/open/vega-conflict",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Metal War Online: Retribution",
      background_image: "https://www.freetogame.com/g/137/thumbnail.jpg",
      free: "1",
      description:
        "A high-speed multiplayer online concept car shooter game with racing elements!",
      url: "https://www.freetogame.com/open/metal-war-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Immortal Empire",
      background_image: "https://www.freetogame.com/g/139/thumbnail.jpg",
      free: "1",
      description:
        "A free to play multiplayer strategy RPG developed by Tactic Studios.",
      url: "https://www.freetogame.com/open/immortal-empire",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MechWarrior Online",
      background_image: "https://www.freetogame.com/g/222/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play PvP game that's a faithful adaptation of the popular MechWarrior strategy board games.",
      url: "https://www.freetogame.com/open/mechwarrior-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Armored Warfare",
      background_image: "https://www.freetogame.com/g/7/thumbnail.jpg",
      free: "1",
      description:
        "A modern team-based MMO tank game from Obsidian Entertainment.",
      url: "https://www.freetogame.com/open/armored-warfare",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "America\u2019s Army: Proving Grounds",
      background_image: "https://www.freetogame.com/g/149/thumbnail.jpg",
      free: "1",
      description:
        "Take a first person shooter, have the game developed by the U.S. Army and you\u2019ve got America\u2019s Army.",
      url: "https://www.freetogame.com/open/americas-army",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "One Piece Online 2",
      background_image: "https://www.freetogame.com/g/346/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based 2D MMORPG based on the immensely popular One Piece franchise.",
      url: "https://www.freetogame.com/open/one-piece-online-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Otherland",
      background_image: "https://www.freetogame.com/g/97/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO based on the popular novels by Tad Williams. ",
      url: "https://www.freetogame.com/open/otherland",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Forza Motorsport 6: Apex",
      background_image: "https://www.freetogame.com/g/121/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO racing game that comes from makers of one of the most popular video game racing series ever. ",
      url: "https://www.freetogame.com/open/forza-motorsport-6-apex",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Legends of Honor",
      background_image: "https://www.freetogame.com/g/383/thumbnail.jpg",
      free: "1",
      description: "A free to play browser based medieval fantasy 2D MMORTS.",
      url: "https://www.freetogame.com/open/legends-of-honor",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Felspire",
      background_image: "https://www.freetogame.com/g/384/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D browser-based fantasy MMORPG with plenty of dungeons and world bosses to slay.",
      url: "https://www.freetogame.com/open/felspire",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "WARMODE",
      background_image: "https://www.freetogame.com/g/152/thumbnail.jpg",
      free: "1",
      description:
        "A Free to play multiplayer online shooter. Sight in enemies to master Headshots, Double Kills and Triple Kills! ",
      url: "https://www.freetogame.com/open/warmode",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Sphere 3: Enchanted World",
      background_image: "https://www.freetogame.com/g/154/thumbnail.jpg",
      free: "1",
      description: "A fantasy action MMORPG with a non-target combat system.",
      url: "https://www.freetogame.com/open/sphere-3",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Fishing Planet",
      background_image: "https://www.freetogame.com/g/157/thumbnail.jpg",
      free: "1",
      description:
        "A Free to play realistic online first-person multiplayer fishing simulator! ",
      url: "https://www.freetogame.com/open/fishing-planet",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Aberoth",
      background_image: "https://www.freetogame.com/g/386/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 8-bit MMORPG with retro graphics and MUD-like interface.",
      url: "https://www.freetogame.com/open/aberoth",
      genre: " MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Codename CURE",
      background_image: "https://www.freetogame.com/g/159/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMOFPS featuring cooperative play, and objective-based missions.",
      url: "https://www.freetogame.com/open/codename-cure",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Skyforge",
      background_image: "https://www.freetogame.com/g/161/thumbnail.jpg",
      free: "1",
      description:
        "A impressive Free to play MMORPG where you can become a god! ",
      url: "https://www.freetogame.com/open/skyforge",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Card Hunter",
      background_image: "https://www.freetogame.com/g/163/thumbnail.jpg",
      free: "1",
      description:
        "A free online collectible card game which blends together role-playing, card play and tactical combat. ",
      url: "https://www.freetogame.com/open/card-hunter",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Fallout Shelter",
      background_image: "https://www.freetogame.com/g/104/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play simulation game based on Bethesda Game Studios' popular Fallout franchise. ",
      url: "https://www.freetogame.com/open/fallout-shelter",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Lord\u2019s Road",
      background_image: "https://www.freetogame.com/g/388/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D browser-based fantasy MMORPG that features two playable classes.",
      url: "https://www.freetogame.com/open/lords-road",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Salem",
      background_image: "https://www.freetogame.com/g/167/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, sandbox type MMO based on the times and trials of living.",
      url: "https://www.freetogame.com/open/salem",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Heroes of the Storm",
      background_image: "https://www.freetogame.com/g/168/thumbnail.jpg",
      free: "1",
      description: "A free to play MOBA developed by Blizzard Entertainment.",
      url: "https://www.freetogame.com/open/heroes-of-the-storm",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Dirty Bomb",
      background_image: "https://www.freetogame.com/g/169/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play first person shooter multiplayer game set in a post-apocalyptic London.",
      url: "https://www.freetogame.com/open/dirty-bomb",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Vikings: War Of Clans",
      background_image: "https://www.freetogame.com/g/357/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO strategy game developed and published by Plarium.",
      url: "https://www.freetogame.com/open/vikings-war-of-clans",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Trek: Alien Domain",
      background_image: "https://www.freetogame.com/g/391/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser based 2D strategy MMO set in the Stark Trek universe.",
      url: "https://www.freetogame.com/open/star-trek-alien-domain",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Block N Load",
      background_image: "https://www.freetogame.com/g/173/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online shooter game that looks like a mix of Minecraft and Team Fortress 2.",
      url: "https://www.freetogame.com/open/block-n-load",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Survarium",
      background_image: "https://www.freetogame.com/g/175/thumbnail.jpg",
      free: "1",
      description: "A free to play post-apocalyptic online FPS game.",
      url: "https://www.freetogame.com/open/survarium",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dungeon Fighter Online",
      background_image: "https://www.freetogame.com/g/177/thumbnail.jpg",
      free: "1",
      description:
        "A free to play arcade-style side-scrolling action game mixed with RPG elements.",
      url: "https://www.freetogame.com/open/dungeon-fighter-online",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Grimoire: Manastorm",
      background_image: "https://www.freetogame.com/g/56/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer FPS... with wizards. ",
      url: "https://www.freetogame.com/open/grimoire-manastorm",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "StarColony",
      background_image: "https://www.freetogame.com/g/373/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser MMO strategy game that puts you in command of a rapidly growing city on a dangerous alien world.",
      url: "https://www.freetogame.com/open/starcolony",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "One Piece Online",
      background_image: "https://www.freetogame.com/g/394/thumbnail.jpg",
      free: "1",
      description: "One Piece Online is a 2D Tower Defense Action MMO! ",
      url: "https://www.freetogame.com/open/one-piece-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Transformice",
      background_image: "https://www.freetogame.com/g/179/thumbnail.jpg",
      free: "1",
      description: "A cute little free-to-play MMO platformer.",
      url: "https://www.freetogame.com/open/transformice",
      genre: "Fantasy",
      released: "0000-00-00"
    },
    {
      name: "Gear Up",
      background_image: "https://www.freetogame.com/g/180/thumbnail.jpg",
      free: "1",
      description:
        "Control your unique tank or robot in multiplayer arcade action!",
      url: "https://www.freetogame.com/open/gear-up",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "8BitMMO",
      background_image: "https://www.freetogame.com/g/181/thumbnail.jpg",
      free: "1",
      description:
        "A free to play retro\u00ad-style 2D MMO and a giant construction sandbox! ",
      url: "https://www.freetogame.com/open/8bitmmo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Siegelord",
      background_image: "https://www.freetogame.com/g/399/thumbnail.jpg",
      free: "1",
      description: "A free to play 2D medieval fantasy browser-based MMORTS.",
      url: "https://www.freetogame.com/open/siegelord",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dungeon Defenders 2",
      background_image: "https://www.freetogame.com/g/182/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cooperative 3D tower-defense game by Trendy Entertainment.",
      url: "https://www.freetogame.com/open/dungeon-defenders-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Blockade 3D",
      background_image: "https://www.freetogame.com/g/184/thumbnail.jpg",
      free: "1",
      description: "A free to play FPS in an editable procedural world.",
      url: "https://www.freetogame.com/open/blockade-3d",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eldevin",
      background_image: "https://www.freetogame.com/g/185/thumbnail.jpg",
      free: "1",
      description: "A indie story-driven Free to Play MMORPG.",
      url: "https://www.freetogame.com/open/eldevin",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Double Action",
      background_image: "https://www.freetogame.com/g/186/thumbnail.jpg",
      free: "1",
      description: "A free to play FPS with bullet time and stylish kills!",
      url: "https://www.freetogame.com/open/double-action",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Pox Nora",
      background_image: "https://www.freetogame.com/g/187/thumbnail.jpg",
      free: "1",
      description:
        "A multiplayer online game that combines a collectible card game with a turn-based strategy game.",
      url: "https://www.freetogame.com/open/pox-nora",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Counter-Strike Nexon: Studio",
      background_image: "https://www.freetogame.com/g/188/thumbnail.jpg",
      free: "1",
      description:
        "What's better than Counter-Strike? Counter-Strike with more modes and Zombies!",
      url: "https://www.freetogame.com/open/counter-strike-nexon",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Uncharted Waters Online",
      background_image: "https://www.freetogame.com/g/189/thumbnail.jpg",
      free: "1",
      description: "A free to play adventure MMORPG set on the high seas! ",
      url: "https://www.freetogame.com/open/uncharted-waters-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "ArcheAge",
      background_image: "https://www.freetogame.com/g/10/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, hybrid fantasy/sandbox MMORPG brought to you by Trion Worlds.",
      url: "https://www.freetogame.com/open/archeage",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tribal Wars 2",
      background_image: "https://www.freetogame.com/g/404/thumbnail.jpg",
      free: "1",
      description:
        "The sequel to the classic city-building strategy game Tribal Wars! ",
      url: "https://www.freetogame.com/open/tribal-wars-2",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "WAKFU",
      background_image: "https://www.freetogame.com/g/192/thumbnail.jpg",
      free: "1",
      description:
        "A 2D tactical turn-based fantasy MMORPG developed by Ankama Games, in conjunction with Square Enix.",
      url: "https://www.freetogame.com/open/wakfu",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Infinity Wars",
      background_image: "https://www.freetogame.com/g/193/thumbnail.jpg",
      free: "1",
      description:
        "A MMO trading card game, Build up your decks and customize them with tons of factional cards! ",
      url: "https://www.freetogame.com/open/infinity-wars",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Divine Souls",
      background_image: "https://www.freetogame.com/g/195/thumbnail.jpg",
      free: "1",
      description:
        "A action-based MMORPG in a fantasy world with magic and technology. ",
      url: "https://www.freetogame.com/open/divine-souls",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Cubic Castles",
      background_image: "https://www.freetogame.com/g/196/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D Platforming and a open world building game.",
      url: "https://www.freetogame.com/open/cubic-castles",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Creativerse",
      background_image: "https://www.freetogame.com/g/198/thumbnail.jpg",
      free: "1",
      description:
        "Playful Corporation enters the sandbox, voxel world with their free-to-play name Creativers.",
      url: "https://www.freetogame.com/open/creativerse",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Royal Quest",
      background_image: "https://www.freetogame.com/g/199/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG game with unique PvPvE locations, PvP Arenas, Battlegrounds and Castle Sieges. ",
      url: "https://www.freetogame.com/open/royal-quest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Guns and Robots",
      background_image: "https://www.freetogame.com/g/200/thumbnail.jpg",
      free: "1",
      description:
        "A free to play online third person shooter with massive customization! ",
      url: "https://www.freetogame.com/open/guns-and-robots",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Bleach Online",
      background_image: "https://www.freetogame.com/g/348/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser based MMORPG based on Bleach, the popular manga and anime series.",
      url: "https://www.freetogame.com/open/bleach-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Robocraft",
      background_image: "https://www.freetogame.com/g/203/thumbnail.jpg",
      free: "1",
      description: "A free-to-play MMO sandbox building game! ",
      url: "https://www.freetogame.com/open/robocraft",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Unturned",
      background_image: "https://www.freetogame.com/g/204/thumbnail.jpg",
      free: "1",
      description:
        "A independently developed free-to-play MMO survival \r\ngame! ",
      url: "https://www.freetogame.com/open/unturned",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Freestyle2: Street Basketball",
      background_image: "https://www.freetogame.com/g/209/thumbnail.jpg",
      free: "1",
      description:
        "A free to play MMO street basketball game. Team up with the best street ballers! ",
      url: "https://www.freetogame.com/open/freestyle2-street-basketball",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Fistful of Frags",
      background_image: "https://www.freetogame.com/g/210/thumbnail.jpg",
      free: "1",
      description: "A first person shooter game set in the Wild West! ",
      url: "https://www.freetogame.com/open/fistful-of-frags",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "GunZ 2: The Second Duel",
      background_image: "https://www.freetogame.com/g/211/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer Third Person Shooter and follow up to the successful GunZ: The Duel. ",
      url: "https://www.freetogame.com/open/gunz-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Archeblade",
      background_image: "https://www.freetogame.com/g/213/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play PvP-based multiplayer action game based on a Korean Fantasy Novel.",
      url: "https://www.freetogame.com/open/archeblade",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Villagers and Heroes",
      background_image: "https://www.freetogame.com/g/214/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy sandbox 3D MMORPG that has plenty to offer gamers.",
      url: "https://www.freetogame.com/open/villagers-and-heroes",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Hex",
      background_image: "https://www.freetogame.com/g/215/thumbnail.jpg",
      free: "1",
      description:
        "HEX combines roleplaying aspects of a MMO with the collectible and strategic gameplay of a Trading Card Game.",
      url: "https://www.freetogame.com/open/hex",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Pocket Starships",
      background_image: "https://www.freetogame.com/g/405/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cross-platform space combat MMO from SPYR games.",
      url: "https://www.freetogame.com/open/pocket-starships",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Sparta: War of Empires",
      background_image: "https://www.freetogame.com/g/409/thumbnail.jpg",
      free: "1",
      description:
        "A 2D browser-based MMORTS in which players must exercise their city-management skills to construct and upgrade different structures and troops.",
      url: "https://www.freetogame.com/open/sparta-war-empires",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dogs of War Online",
      background_image: "https://www.freetogame.com/g/239/thumbnail.jpg",
      free: "1",
      description: "Based on the famous miniature board game Confrontation!",
      url: "https://www.freetogame.com/open/dogs-war-online",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Hearthstone: Heroes of Warcraft",
      background_image: "https://www.freetogame.com/g/220/thumbnail.jpg",
      free: "1",
      description:
        "Blizzard's free-to-play collectible card game that \r\ndraws its inspiration from World of Warcraft. ",
      url: "https://www.freetogame.com/open/hearthstone-heroes-warcraft",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Lucent Heart",
      background_image: "https://www.freetogame.com/g/221/thumbnail.jpg",
      free: "1",
      description:
        "A free to play MMORPG with a match making system that helps players find their soulmates.",
      url: "https://www.freetogame.com/open/lucent-heart",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "League of Angels",
      background_image: "https://www.freetogame.com/g/376/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based fantasy MMORPG with turn-based combat.",
      url: "https://www.freetogame.com/open/league-of-angels",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Aura Kingdom",
      background_image: "https://www.freetogame.com/g/206/thumbnail.jpg",
      free: "1",
      description:
        "Aura Kingdom is a 3D free-to-play Anime MMORPG from the same great studio that brought us Eden Eterna.",
      url: "https://www.freetogame.com/open/aura-kingdom",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crystal Saga",
      background_image: "https://www.freetogame.com/g/424/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based MMORPG that allows players to explore the land of Vidalia.",
      url: "https://www.freetogame.com/open/crystal-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "World of Warplanes",
      background_image: "https://www.freetogame.com/g/224/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play flight combat MMO brought to you by Wargaming.",
      url: "https://www.freetogame.com/open/world-of-warplanes",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "RIFT",
      background_image: "https://www.freetogame.com/g/225/thumbnail.jpg",
      free: "1",
      description:
        "Trion Worlds\u2019 flagship fantasy massively multiplayer online role-playing game.",
      url: "https://www.freetogame.com/open/rift",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Path of Exile",
      background_image: "https://www.freetogame.com/g/226/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play massively multiplayer online ARPG in the style of Diablo.",
      url: "https://www.freetogame.com/open/path-of-exile",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Soldiers Inc.",
      background_image: "https://www.freetogame.com/g/411/thumbnail.jpg",
      free: "1",
      description: "A free to play 2D top-down browser based MMORTS game.",
      url: "https://www.freetogame.com/open/soldiers-inc",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Nords: Heroes of the North",
      background_image: "https://www.freetogame.com/g/412/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based 2D strategy MMO game with Elves, Orcs, Dragons and more.",
      url: "https://www.freetogame.com/open/nords-heroes-north",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dota 2",
      background_image: "https://www.freetogame.com/g/229/thumbnail.jpg",
      free: "1",
      description: "Valve's premiere competitive free to play MOBA.",
      url: "https://www.freetogame.com/open/dota-2",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Ragnarok Online 2",
      background_image: "https://www.freetogame.com/g/230/thumbnail.jpg",
      free: "1",
      description:
        "A 3D fantasy MMORPG, and sequel to the popular Ragnarok Online.",
      url: "https://www.freetogame.com/open/ragnarok-online-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Panzar",
      background_image: "https://www.freetogame.com/g/231/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer third-person shooter with \r\nrpg elements and CryEngine 3 powered \r\ngraphics.",
      url: "https://www.freetogame.com/open/panzar",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Kingdom Wars",
      background_image: "https://www.freetogame.com/g/233/thumbnail.jpg",
      free: "1",
      description: "A free to play 3D MMORTS with real-time siege combat.",
      url: "https://www.freetogame.com/open/kingdom-wars",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Champions of Regnum",
      background_image: "https://www.freetogame.com/g/234/thumbnail.jpg",
      free: "1",
      description: "A free to play, realm versus realm fantasy MMORPG.",
      url: "https://www.freetogame.com/open/champions-of-regnum",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Star Conflict",
      background_image: "https://www.freetogame.com/g/235/thumbnail.jpg",
      free: "1",
      description: "A free to play action-packed MMO space simulation game.",
      url: "https://www.freetogame.com/open/star-conflict",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rail Nation",
      background_image: "https://www.freetogame.com/g/414/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based train simulation strategy MMO game.",
      url: "https://www.freetogame.com/open/rail-nation",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Epic Cards Battle",
      background_image: "https://www.freetogame.com/g/240/thumbnail.jpg",
      free: "1",
      description:
        "A free to play online strategic trading card game with dozens of cards and five factions. ",
      url: "https://www.freetogame.com/open/epic-card-battle",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Age of Wushu",
      background_image: "https://www.freetogame.com/g/232/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play martial arts action MMORPG with a large open world and sandbox-like features.",
      url: "https://www.freetogame.com/open/age-of-wushu",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Everquest",
      background_image: "https://www.freetogame.com/g/241/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy MMORPG nearly two decades in the making. In fact, it\u2019s the game that started it all! ",
      url: "https://www.freetogame.com/open/everquest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Mabinogi",
      background_image: "https://www.freetogame.com/g/242/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play adventure MMORPG where you can create a unique character and live your fantasy life.",
      url: "https://www.freetogame.com/open/mabinogi",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Stormfall: Age of War",
      background_image: "https://www.freetogame.com/g/415/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D top-down browser MMORTS featuring castle building, resource management and PvP battles.",
      url: "https://www.freetogame.com/open/stormfall-age-war",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "AirMech Strike",
      background_image: "https://www.freetogame.com/g/244/thumbnail.jpg",
      free: "1",
      description: "A free to play Action RTS with MOBA elements.",
      url: "https://www.freetogame.com/open/airmech",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Big Farm",
      background_image: "https://www.freetogame.com/g/349/thumbnail.jpg",
      free: "1",
      description: "A friendly browser-based farming simulation MMO game!",
      url: "https://www.freetogame.com/open/big-farm",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Wartune",
      background_image: "https://www.freetogame.com/g/416/thumbnail.jpg",
      free: "1",
      description:
        "A 2D browser-based Strategy MMORPG with classic turn based RPG features.",
      url: "https://www.freetogame.com/open/wartune",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Pirate 101",
      background_image: "https://www.freetogame.com/g/246/thumbnail.jpg",
      free: "1",
      description:
        "A free to play Pirate-themed MMORPG designed with kids in mind.",
      url: "https://www.freetogame.com/open/pirate-101",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dino Storm",
      background_image: "https://www.freetogame.com/g/417/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D MMO with cowboys, dinosaurs, and laser guns.",
      url: "https://www.freetogame.com/open/dino-storm",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Settlers Online",
      background_image: "https://www.freetogame.com/g/418/thumbnail.jpg",
      free: "1",
      description:
        "A free to play city building MMORTS based on the popular Settlers series.",
      url: "https://www.freetogame.com/open/the-settlers-online",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Continent of the Ninth Seal",
      background_image: "https://www.freetogame.com/g/248/thumbnail.jpg",
      free: "1",
      description:
        "A free MMORPG where players take part as heroes of Glenheim to stand together against Nefer.",
      url: "https://www.freetogame.com/open/c9",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Counter-Strike: Global Offensive",
      background_image: "https://www.freetogame.com/g/24/thumbnail.jpg",
      free: "1",
      description: "The popular multiplayer shooter from Valve. ",
      url: "https://www.freetogame.com/open/counter-strike-global-offensive",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gotham City Impostors",
      background_image: "https://www.freetogame.com/g/453/thumbnail.jpg",
      free: "1",
      description:
        "A free to play multiplayer FPS that pits vigilantes dressed up like Batman against criminals dressed up like the Joker",
      url: "https://www.freetogame.com/open/gotham-city-impostors",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "RPG MO",
      background_image: "https://www.freetogame.com/g/249/thumbnail.jpg",
      free: "1",
      description:
        "A nostalgic free MMORPG reminiscent of old-school RPG's like Ultima and Runescape.",
      url: "https://www.freetogame.com/open/rpg-mo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Realm of the Mad God",
      background_image: "https://www.freetogame.com/g/256/thumbnail.jpg",
      free: "1",
      description:
        "A fast paced 2d free to play MMO shooter game with a retro 8-bit style.",
      url: "https://www.freetogame.com/open/realm-mad-god",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Pirates: Tides of Fortune",
      background_image: "https://www.freetogame.com/g/422/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based 2D MMORTS for people who are fans of pirates!",
      url: "https://www.freetogame.com/open/pirates-tides-fortune",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stronghold Kingdoms",
      background_image: "https://www.freetogame.com/g/255/thumbnail.jpg",
      free: "1",
      description:
        "A strategy based building/warfare game based on the long running Strongholds PC game series.",
      url: "https://www.freetogame.com/open/stronghold-kingdoms",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Wars: The Old Republic",
      background_image: "https://www.freetogame.com/g/257/thumbnail.jpg",
      free: "1",
      description:
        "A 3D sci-fi MMORPG based on the popular Star Wars universe and brought to you by Bioware. ",
      url: "https://www.freetogame.com/open/swtor",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "5Street",
      background_image: "https://www.freetogame.com/g/292/thumbnail.jpg",
      free: "1",
      description: "A free-to-play dancing MMO and a unique social experience.",
      url: "https://www.freetogame.com/open/5street",
      genre: "Social",
      released: "0000-00-00"
    },
    {
      name: "No More Room in Hell",
      background_image: "https://www.freetogame.com/g/261/thumbnail.jpg",
      free: "1",
      description:
        "A free to play cooperative FPS survival horror mod for the Source Engine.",
      url: "https://www.freetogame.com/open/no-more-room-in-hell",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Digimon Masters Online",
      background_image: "https://www.freetogame.com/g/262/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMORPG based on the popular Digimon franchise.",
      url: "https://www.freetogame.com/open/digimon-masters-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dragon Nest",
      background_image: "https://www.freetogame.com/g/264/thumbnail.jpg",
      free: "1",
      description: "A free-to-play action MMORPG with non-targeting combat.",
      url: "https://www.freetogame.com/open/dragon-nest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Mission Against Terror",
      background_image: "https://www.freetogame.com/g/267/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast-paced lobby-based MMOFPS with lots of game modes and tons of weapons.",
      url: "https://www.freetogame.com/open/mat",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Spiral Knights",
      background_image: "https://www.freetogame.com/g/269/thumbnail.jpg",
      free: "1",
      description:
        "A massively multiplayer online role-playing game, battle monsters and collect treasures!",
      url: "https://www.freetogame.com/open/spiral-knights",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Steel Legions",
      background_image: "https://www.freetogame.com/g/423/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3d browser based tank game with fast-paced tactical battles! ",
      url: "https://www.freetogame.com/open/steel-legions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Asda Global",
      background_image: "https://www.freetogame.com/g/271/thumbnail.jpg",
      free: "1",
      description:
        "A 3D anime-inspired fantasy MMORPG and is the successor to the original Asda Story.",
      url: "https://www.freetogame.com/open/asda-global",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Brink",
      background_image: "https://www.freetogame.com/g/60/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play first-person-shoot developed by Splash \r\nDamage and published by Bethesda Softworks. ",
      url: "https://www.freetogame.com/open/brink",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Allods Online",
      background_image: "https://www.freetogame.com/g/272/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy MMORPG that follows more traditional \u201cWorld of Warcraft-like\u201d MMO traditions.",
      url: "https://www.freetogame.com/open/allods-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Elsword",
      background_image: "https://www.freetogame.com/g/205/thumbnail.jpg",
      free: "1",
      description:
        "A Free to Play 3D side scrolling action MMORPG with many heroes.",
      url: "https://www.freetogame.com/open/elsword",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "DC Universe Online",
      background_image: "https://www.freetogame.com/g/260/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, comics based MMORPG set in the popular DC Comics universe.",
      url: "https://www.freetogame.com/open/dcuo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Bloodline Champions",
      background_image: "https://www.freetogame.com/g/273/thumbnail.jpg",
      free: "1",
      description:
        "Free-to-Play Moba game where players engage in short battles of up to ten players divided into two teams.",
      url: "https://www.freetogame.com/open/bloodline-champions",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "GetAmped 2",
      background_image: "https://www.freetogame.com/g/274/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fighting MMO, experience frantic battles up to 20 players.",
      url: "https://www.freetogame.com/open/getamped-2",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Dragon Saga",
      background_image: "https://www.freetogame.com/g/275/thumbnail.jpg",
      free: "1",
      description:
        "A free to play arcade\u00ad-style side\u00ad-scrolling 3D MMORPG.",
      url: "https://www.freetogame.com/open/dragon-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Vindictus",
      background_image: "https://www.freetogame.com/g/276/thumbnail.jpg",
      free: "1",
      description:
        "A free to play action MMO game with beautiful graphics and intense battles.",
      url: "https://www.freetogame.com/open/vindictus",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Aika Online",
      background_image: "https://www.freetogame.com/g/277/thumbnail.jpg",
      free: "1",
      description: "A free-to-play MMORPG with large scale PvP battles.",
      url: "https://www.freetogame.com/open/aika-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "APB Reloaded",
      background_image: "https://www.freetogame.com/g/258/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMO third person shooter game brought to you by GTA creator.",
      url: "https://www.freetogame.com/open/apb",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Mortal Online",
      background_image: "https://www.freetogame.com/g/278/thumbnail.jpg",
      free: "1",
      description: "A unique free to play First Person sandbox MMORPG.",
      url: "https://www.freetogame.com/open/mortal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Grand Fantasia",
      background_image: "https://www.freetogame.com/g/281/thumbnail.jpg",
      free: "1",
      description:
        "A free to play anime inspired 3D MMORPG with customizable characters and \r\ncompanions.",
      url: "https://www.freetogame.com/open/grand-fantasia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Grepolis",
      background_image: "https://www.freetogame.com/g/425/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based strategy MMORTS set in Ancient Greece.",
      url: "https://www.freetogame.com/open/grepolis",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "League of Legends",
      background_image: "https://www.freetogame.com/g/286/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MOBA game, and one of the most played pc game in the world.",
      url: "https://www.freetogame.com/open/league-of-legends",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Twelve Sky 2",
      background_image: "https://www.freetogame.com/g/287/thumbnail.jpg",
      free: "1",
      description:
        "There\u2019s a lot of world to explore in this fantasy MMORPG!",
      url: "https://www.freetogame.com/open/twelve-sky-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Champions Online",
      background_image: "https://www.freetogame.com/g/288/thumbnail.jpg",
      free: "1",
      description:
        "A superhero MMORPG created by the same studio behind City of Heroes.",
      url: "https://www.freetogame.com/open/champions-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Might And Magic Heroes Online",
      background_image: "https://www.freetogame.com/g/402/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO strategy RPG game in which you control powerful Heroes! ",
      url: "https://www.freetogame.com/open/might-magic-heroes-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "WolfTeam",
      background_image: "https://www.freetogame.com/g/280/thumbnail.jpg",
      free: "1",
      description: "A free to play MMOFPS with a twist.",
      url: "https://www.freetogame.com/open/wolfteam",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Runes of Magic",
      background_image: "https://www.freetogame.com/g/290/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy 3D MMORPG set in the fantasy world of Taborea.",
      url: "https://www.freetogame.com/open/runes-of-magic",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "theHunter",
      background_image: "https://www.freetogame.com/g/291/thumbnail.jpg",
      free: "1",
      description:
        "An MMO shooter where players can hunt 22 different animals in various locations.",
      url: "https://www.freetogame.com/open/thehunter",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "AION",
      background_image: "https://www.freetogame.com/g/254/thumbnail.jpg",
      free: "1",
      description:
        "A high fantasy, free-to-play MMORPG that centers on the war between the game\u2019s two factions: The Asmodians and the Elyos.",
      url: "https://www.freetogame.com/open/aion",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Atlantica Online",
      background_image: "https://www.freetogame.com/g/293/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D tactical massively multiplayer online role-playing game.",
      url: "https://www.freetogame.com/open/atlantica-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Florensia",
      background_image: "https://www.freetogame.com/g/295/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG with legendary worlds ashore and at \r\nsea.",
      url: "https://www.freetogame.com/open/florensia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "4Story",
      background_image: "https://www.freetogame.com/g/306/thumbnail.jpg",
      free: "1",
      description:
        "A enjoyable MMORPG where you can customize your character, join guilds and battle other factions.",
      url: "https://www.freetogame.com/open/4story",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "AdventureQuest Worlds",
      background_image: "https://www.freetogame.com/g/426/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D fantasy browser MMORPG. There are no downloads or software to install! ",
      url: "https://www.freetogame.com/open/adventurequest-worlds",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Wizard101",
      background_image: "https://www.freetogame.com/g/297/thumbnail.jpg",
      free: "1",
      description: "A free to play MMORPG set in the magical Wizard school.",
      url: "https://www.freetogame.com/open/wizard101",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Perfect World International",
      background_image: "https://www.freetogame.com/g/298/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy MMORPG, that focuses heavily on Chinese mythology.",
      url: "https://www.freetogame.com/open/pwi",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ace Online",
      background_image: "https://www.freetogame.com/g/319/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast action 3D sci-fi MMO where players control space fighters jets.",
      url: "https://www.freetogame.com/open/ace-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rohan: Blood Feud",
      background_image: "https://www.freetogame.com/g/300/thumbnail.jpg",
      free: "1",
      description: "A free-to-play medieval MMORPG highly-focused on PVP.",
      url: "https://www.freetogame.com/open/rohan-blood-feud",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Age of Conan: Unchained",
      background_image: "https://www.freetogame.com/g/301/thumbnail.jpg",
      free: "1",
      description:
        "A award \u00adwinning massively multiplayer online game that has received critical acclaim.",
      url: "https://www.freetogame.com/open/age-of-conan",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ikariam",
      background_image: "https://www.freetogame.com/g/428/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based city-building strategy game by GameForge.",
      url: "https://www.freetogame.com/open/ikariam",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Saga",
      background_image: "https://www.freetogame.com/g/303/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORTS that also features city-building and trading card games.",
      url: "https://www.freetogame.com/open/saga",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Fiesta Online",
      background_image: "https://www.freetogame.com/g/305/thumbnail.jpg",
      free: "1",
      description: "A free to play anime MMORPG with a friendly community.",
      url: "https://www.freetogame.com/open/fiesta-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Shaiya",
      background_image: "https://www.freetogame.com/g/307/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMORPG similar to World of Warcraft and Lineage 2.",
      url: "https://www.freetogame.com/open/shaiya",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Angels Online",
      background_image: "https://www.freetogame.com/g/308/thumbnail.jpg",
      free: "1",
      description: "A cute anime MMORPG with a good selection of classes.",
      url: "https://www.freetogame.com/open/angels-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Seal Online",
      background_image: "https://www.freetogame.com/g/309/thumbnail.jpg",
      free: "1",
      description:
        "A free MMORP that has been out for a long period of time with solid history under its belt.",
      url: "https://www.freetogame.com/open/seal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Team Fortress 2",
      background_image: "https://www.freetogame.com/g/310/thumbnail.jpg",
      free: "1",
      description:
        "Valve's iconic class-based free-to-play first-person shooter!",
      url: "https://www.freetogame.com/open/team-fortress-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rumble Fighter",
      background_image: "https://www.freetogame.com/g/311/thumbnail.jpg",
      free: "1",
      description: "A free to play Fighting MMO, test your skills!",
      url: "https://www.freetogame.com/open/rumble-fighter",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Granado Espada Online",
      background_image: "https://www.freetogame.com/g/312/thumbnail.jpg",
      free: "1",
      description:
        "Adventure back to colonial times where you can find prestige, wealth, adventure, and a lot of work.",
      url: "https://www.freetogame.com/open/granado-espada",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      // ... your code ...

      connection.query(sql, [jsonData.map(Object.values)], (err) => {
        if (err) {
          console.error("Error inserting data into the database:", err);
          return;
        }
        console.log("Data inserted successfully!");
      });
      description:
        "A free to play MMORPG set in the world of J.R.R. Tolkien's \r\nclassic fantasy saga.",
      url: "https://www.freetogame.com/open/lotro",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tibia",
      background_image: "https://www.freetogame.com/g/339/thumbnail.jpg",
      free: "1",
      description:
        "A old-school free-to-play massively multiplayer online \r\nrole-playing game.",
      url: "https://www.freetogame.com/open/tibia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Overwatch 2",
      background_image: "https://www.freetogame.com/g/540/thumbnail.jpg",
      free: "1",
      description:
        "A hero-focused first-person team shooter from Blizzard Entertainment.",
      url: "https://www.freetogame.com/open/overwatch-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Diablo Immortal",
      background_image: "https://www.freetogame.com/g/521/thumbnail.jpg",
      free: "1",
      description:
        "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      url: "https://www.freetogame.com/open/diablo-immortal",
      genre: "MMOARPG",
      released: "0000-00-00"
    },
    {
      name: "Lost Ark",
      background_image: "https://www.freetogame.com/g/517/thumbnail.jpg",
      free: "1",
      description:
        "Smilegate\u2019s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
      url: "https://www.freetogame.com/open/lost-ark",
      genre: "ARPG",
      released: "0000-00-00"
    },
    {
      name: "PUBG: BATTLEGROUNDS",
      background_image: "https://www.freetogame.com/g/516/thumbnail.jpg",
      free: "1",
      description:
        "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
      url: "https://www.freetogame.com/open/pubg",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Enlisted",
      background_image: "https://www.freetogame.com/g/508/thumbnail.jpg",
      free: "1",
      description:
        "Get ready to command your own World War II military squad in Gaijin and Darkflow Software\u2019s MMO squad-based shooter Enlisted. ",
      url: "https://www.freetogame.com/open/enlisted",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Forge of Empires",
      background_image: "https://www.freetogame.com/g/345/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based online strategy game, become the leader and raise your city.",
      url: "https://www.freetogame.com/open/forge-of-empires",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Drakensang Online",
      background_image: "https://www.freetogame.com/g/427/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based top-down hack-and-slash 3D MMORPG similar to games in the Diablo series.",
      url: "https://www.freetogame.com/open/drakensang-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MultiVersus",
      background_image: "https://www.freetogame.com/g/525/thumbnail.jpg",
      free: "1",
      description:
        "The Warner Bros lineup meets Smash in Player First Games\u2019 MultiVersus.",
      url: "https://www.freetogame.com/open/multiversus",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Genshin Impact",
      background_image: "https://www.freetogame.com/g/475/thumbnail.jpg",
      free: "1",
      description:
        "If you\u2019ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair, then you\u2019re going to want to check out miHoYo\u2019s Genshin Impact.",
      url: "https://www.freetogame.com/open/genshin-impact",
      genre: "Action RPG",
      released: "0000-00-00"
    },
    {
      name: "Fall Guys",
      background_image: "https://www.freetogame.com/g/523/thumbnail.jpg",
      free: "1",
      description:
        "Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms. ",
      url: "https://www.freetogame.com/open/fall-guys",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Game Of Thrones Winter Is Coming",
      background_image: "https://www.freetogame.com/g/340/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.",
      url: "https://www.freetogame.com/open/game-of-thrones-winter-is-coming",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Elvenar",
      background_image: "https://www.freetogame.com/g/347/thumbnail.jpg",
      free: "1",
      description:
        "A browser based city-building strategy MMO set in the fantasy world of Elvenar.",
      url: "https://www.freetogame.com/open/elvenar",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Neverwinter",
      background_image: "https://www.freetogame.com/g/11/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game. ",
      url: "https://www.freetogame.com/open/neverwinter",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dark Orbit Reloaded",
      background_image: "https://www.freetogame.com/g/380/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based 3D space-combat MMO with a massive playerbase!",
      url: "https://www.freetogame.com/open/darkorbit",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Halo Infinite",
      background_image: "https://www.freetogame.com/g/515/thumbnail.jpg",
      free: "1",
      description:
        "For the first time ever, a free-to-play Halo experience is available in the form of Halo Infinite\u2019s multiplayer.",
      url: "https://www.freetogame.com/open/halo-infinite",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eternal Fury",
      background_image: "https://www.freetogame.com/g/455/thumbnail.jpg",
      free: "1",
      description: "A free-to-play ARPG from R2 Games!",
      url: "https://www.freetogame.com/open/eternal-fury",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Flyff Universe",
      background_image: "https://www.freetogame.com/g/522/thumbnail.jpg",
      free: "1",
      description:
        "Get the full Flyff experience on any platform with the free-to-play browser-based MMORPG Flyff Universe.",
      url: "https://www.freetogame.com/open/flyff-universe",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Phantasy Star Online 2 New Genesis",
      background_image: "https://www.freetogame.com/g/511/thumbnail.jpg",
      free: "1",
      description:
        "The legacy of Phantasy Star Online 2 continues a thousand years later!",
      url: "https://www.freetogame.com/open/pso2-new-genesis",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crossout",
      background_image: "https://www.freetogame.com/g/5/thumbnail.jpg",
      free: "1",
      description: "A post-apocalyptic MMO vehicle combat game! ",
      url: "https://www.freetogame.com/open/crossout",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "World of Warships",
      background_image: "https://www.freetogame.com/g/9/thumbnail.jpg",
      free: "1",
      description:
        "A 3D free to play naval action-themed MMO from the creators of World of Tanks! ",
      url: "https://www.freetogame.com/open/world-of-warships",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "War Thunder",
      background_image: "https://www.freetogame.com/g/12/thumbnail.jpg",
      free: "1",
      description:
        "A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.",
      url: "https://www.freetogame.com/open/war-thunder",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "World of Tanks",
      background_image: "https://www.freetogame.com/g/2/thumbnail.jpg",
      free: "1",
      description:
        "If you like blowing up tanks, with a quick and intense game style you will love this game!",
      url: "https://www.freetogame.com/open/world-of-tanks",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "League of Angels - Heaven's Fury",
      background_image: "https://www.freetogame.com/g/458/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based fantasy online action RPG based loosely on Western mythology!",
      url: "https://www.freetogame.com/open/league-of-angels-heavens-fury",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tower of Fantasy",
      background_image: "https://www.freetogame.com/g/529/thumbnail.jpg",
      free: "1",
      description:
        "Tower of Fantasy is a 3D open-world RPG, anime-style sci-fi MMO RPG game with unique characters and beautiful open vistas!",
      url: "https://www.freetogame.com/open/tower-of-fantasy",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Noah\u2019s Heart",
      background_image: "https://www.freetogame.com/g/528/thumbnail.jpg",
      free: "1",
      description:
        "Noah\u2019s Heart is an open-world MMORPG game with a focus on exploration and socialization.",
      url: "https://www.freetogame.com/open/noahs-heart",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Valorant",
      background_image: "https://www.freetogame.com/g/466/thumbnail.jpg",
      free: "1",
      description:
        "Test your mettle in Riot Games\u2019 character-based FPS shooter Valorant.",
      url: "https://www.freetogame.com/open/valorant",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Phantasy Star Online 2",
      background_image: "https://www.freetogame.com/g/467/thumbnail.jpg",
      free: "1",
      description:
        "Welcome to ARKS, and elite task force searching dangerous planets for the corrupted Falspawn in Phantasy Star 2 Online, Sega\u2019s popular, free-to-play sci-fi MMORPG.",
      url: "https://www.freetogame.com/open/pso2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Call Of Duty: Warzone",
      background_image: "https://www.freetogame.com/g/452/thumbnail.jpg",
      free: "1",
      description:
        "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
      url: "https://www.freetogame.com/open/call-of-duty-warzone",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Destiny 2",
      background_image: "https://www.freetogame.com/g/21/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer Sci-Fi MMOFPS from Bungie.",
      url: "https://www.freetogame.com/open/destiny-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dauntless",
      background_image: "https://www.freetogame.com/g/1/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.",
      url: "https://www.freetogame.com/open/dauntless",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Apex Legends",
      background_image: "https://www.freetogame.com/g/23/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic battle royale game featuring 60-player matches and team-based play. ",
      url: "https://www.freetogame.com/open/apex-legends",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Fortnite",
      background_image: "https://www.freetogame.com/g/57/thumbnail.jpg",
      free: "1",
      description: "A free-to-play, standalone mode of Epic Game's Fortnite. ",
      url: "https://www.freetogame.com/open/fortnite-battle-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Albion Online",
      background_image: "https://www.freetogame.com/g/449/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cross-platform sandbox MMO developed and published by Sandbox Interactive GmbH. ",
      url: "https://www.freetogame.com/open/albion-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Blade and Soul",
      background_image: "https://www.freetogame.com/g/6/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play martial arts MMORPG that tasks players with learning combination attacks.",
      url: "https://www.freetogame.com/open/blade-and-soul",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Brawlhalla",
      background_image: "https://www.freetogame.com/g/212/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D platform fighter inspired by the Smash Bros.",
      url: "https://www.freetogame.com/open/brawlhalla",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Trove",
      background_image: "https://www.freetogame.com/g/8/thumbnail.jpg",
      free: "1",
      description:
        "A free to play Sandbox massively multiplayer online role-playing game! ",
      url: "https://www.freetogame.com/open/trove",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Heroes & Generals",
      background_image: "https://www.freetogame.com/g/202/thumbnail.jpg",
      free: "1",
      description:
        "A World War II-based MMOFPS that mixes infantry, armor, and aircraft.",
      url: "https://www.freetogame.com/open/heroes-and-generals",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Warface",
      background_image: "https://www.freetogame.com/g/207/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online FPS from Crytek, makers of the Far Cry and Crysis series of games.",
      url: "https://www.freetogame.com/open/warface",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Smite",
      background_image: "https://www.freetogame.com/g/217/thumbnail.jpg",
      free: "1",
      description:
        "A popular free-to-play 3D MOBA where you take on the role of an ancient god.",
      url: "https://www.freetogame.com/open/smite",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Warframe",
      background_image: "https://www.freetogame.com/g/3/thumbnail.jpg",
      free: "1",
      description:
        "A cooperative free-to-play third person online action shooter set in an stunning sci-fi world. ",
      url: "https://www.freetogame.com/open/warframe",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "PlanetSide 2",
      background_image: "https://www.freetogame.com/g/243/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open-world FPS that pits three factions against each other in a never-ending war.",
      url: "https://www.freetogame.com/open/planetside-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Guild Wars 2",
      background_image: "https://www.freetogame.com/g/13/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG, the follow-up to ArenaNet's popular Guild Wars. ",
      url: "https://www.freetogame.com/open/guild-wars-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Goodgame Empire",
      background_image: "https://www.freetogame.com/g/350/thumbnail.jpg",
      free: "1",
      description:
        "A free to play medieval strategy browser game. Build you own castle and create a powerful army! ",
      url: "https://www.freetogame.com/open/goodgame-empire",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Trek Online",
      background_image: "https://www.freetogame.com/g/14/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, 3D, Sci-Fi MMORPG based on the popular Star Trek series.",
      url: "https://www.freetogame.com/open/star-trek-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "RuneScape",
      background_image: "https://www.freetogame.com/g/433/thumbnail.jpg",
      free: "1",
      description:
        "A popular 3D browser MMORPG boasting a huge player base and 15 years of content.",
      url: "https://www.freetogame.com/open/runescape",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Synced",
      background_image: "https://www.freetogame.com/g/564/thumbnail.jpg",
      free: "1",
      description: "A free-to-play co-op sci-fi shooter.",
      url: "https://www.freetogame.com/open/synced",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Warhaven",
      background_image: "https://www.freetogame.com/g/565/thumbnail.jpg",
      free: "1",
      description: "A free-to-play, medieval fantasy PvP game from Nexon.",
      url: "https://www.freetogame.com/open/warhaven",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Microvolts: Recharged",
      background_image: "https://www.freetogame.com/g/567/thumbnail.jpg",
      free: "1",
      description: "A lobby-based third-person shooter with a toy-theme.",
      url: "https://www.freetogame.com/open/microvolts",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Hawked",
      background_image: "https://www.freetogame.com/g/558/thumbnail.jpg",
      free: "1",
      description: "A free-to-play PvPvE treasure hunting shooter.",
      url: "https://www.freetogame.com/open/hawked",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Tales Of Yore",
      background_image: "https://www.freetogame.com/g/559/thumbnail.jpg",
      free: "1",
      description: "A 2D MMORPG with lots of RPG tropes.",
      url: "https://www.freetogame.com/open/tales-of-yore",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Palia",
      background_image: "https://www.freetogame.com/g/560/thumbnail.jpg",
      free: "1",
      description: "A cozy MMO with homebuilding and some adventure.",
      url: "https://www.freetogame.com/open/palia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Waven",
      background_image: "https://www.freetogame.com/g/562/thumbnail.jpg",
      free: "1",
      description: "A free-to-play online tactical RPG from Ankama.",
      url: "https://www.freetogame.com/open/waven",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Town of Salem 2",
      background_image: "https://www.freetogame.com/g/566/thumbnail.jpg",
      free: "1",
      description: "A deduction game set in Salem.",
      url: "https://www.freetogame.com/open/town-of-salem-2",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Naraka: Bladepoint",
      background_image: "https://www.freetogame.com/g/556/thumbnail.jpg",
      free: "1",
      description: "A free-to-play melee focused battle royale.",
      url: "https://www.freetogame.com/open/naraka-bladepoint",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Undawn",
      background_image: "https://www.freetogame.com/g/554/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open-world survival RPG developed by LightSpeed studios and published by Level Infinite.",
      url: "https://www.freetogame.com/open/undawn",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Temtem Showdown",
      background_image: "https://www.freetogame.com/g/555/thumbnail.jpg",
      free: "1",
      description:
        "A 2v2 competitive multiplayer battle simulator set in the Temtem universe.",
      url: "https://www.freetogame.com/open/temtem-showdown",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Eden Eternal",
      background_image: "https://www.freetogame.com/g/268/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG with cute anime-inspired graphics.",
      url: "https://www.freetogame.com/open/eden-eternal",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Veiled Experts",
      background_image: "https://www.freetogame.com/g/551/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer shooter game focused on the search and destroy mode of classic shooters.",
      url: "https://www.freetogame.com/open/veiled-experts",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Jected - Rivals",
      background_image: "https://www.freetogame.com/g/552/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play game mixing extreme sports with destructible vehicles and a unique ejection mechanic.",
      url: "https://www.freetogame.com/open/jected-rivals",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Ethyrial: Echoes of Yore",
      background_image: "https://www.freetogame.com/g/557/thumbnail.jpg",
      free: "1",
      description:
        "A old-school MMORPG set in a world on the brink of Civil War",
      url: "https://www.freetogame.com/open/ethyrial-echoes-of-yore",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dead Cide Club",
      background_image: "https://www.freetogame.com/g/548/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, side-scrolling shooter with a variety of modes and character types to choose from.",
      url: "https://www.freetogame.com/open/dead-cide-club",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Kartrider: Drift",
      background_image: "https://www.freetogame.com/g/546/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online racing game set in the Kartrider franchise.",
      url: "https://www.freetogame.com/open/kartrider-drift",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Warlander",
      background_image: "https://www.freetogame.com/g/547/thumbnail.jpg",
      free: "1",
      description:
        "A medieval-style combat game with a selection of modes and characters.",
      url: "https://www.freetogame.com/open/warlander",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Fangs",
      background_image: "https://www.freetogame.com/g/545/thumbnail.jpg",
      free: "1",
      description: "A 4v4 MOBA with hero-specific strategies.",
      url: "https://www.freetogame.com/open/fangs",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Summoners War: Chronicles",
      background_image: "https://www.freetogame.com/g/549/thumbnail.jpg",
      free: "1",
      description: "A multi-platform ARPG set in the Summoners War universe.",
      url: "https://www.freetogame.com/open/summoners-war-chronicles",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Marvel Snap",
      background_image: "https://www.freetogame.com/g/541/thumbnail.jpg",
      free: "1",
      description:
        "A fast paced strategy card game set in the Marvel universe.",
      url: "https://www.freetogame.com/open/marvel-snap",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "World Boss",
      background_image: "https://www.freetogame.com/g/542/thumbnail.jpg",
      free: "1",
      description: "An experimental FPS based on io and roguelike gameplay.",
      url: "https://www.freetogame.com/open/world-boss",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Omega Strikers",
      background_image: "https://www.freetogame.com/g/536/thumbnail.jpg",
      free: "1",
      description: "A 3v3 socccer-style game with knockouts.",
      url: "https://www.freetogame.com/open/omega-strikers",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Gundam Evolution",
      background_image: "https://www.freetogame.com/g/537/thumbnail.jpg",
      free: "1",
      description: "A 6v6 team-based shooter based on the Gundam multiverse",
      url: "https://www.freetogame.com/open/gundam-evolution",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Deathverse: Let It Die",
      background_image: "https://www.freetogame.com/g/539/thumbnail.jpg",
      free: "1",
      description:
        "A game of survival where contestants are pit against each other in a life or death game show.",
      url: "https://www.freetogame.com/open/deathverse-let-it-die",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Galahad 3093",
      background_image: "https://www.freetogame.com/g/544/thumbnail.jpg",
      free: "1",
      description:
        "A 12v12 team shooter featuring mechs based on Arthurian legend.",
      url: "https://www.freetogame.com/open/galahad-3093",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Aero Tales Online",
      background_image: "https://www.freetogame.com/g/527/thumbnail.jpg",
      free: "1",
      description:
        "Aero Tales Online: The World is a free-to-play 3D anime-style MMORPG with PvP and PvE elements. The game revolves around the \u201cmysterious story of the Key of Skylight\u201d.",
      url: "https://www.freetogame.com/open/aero-tales-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Magic Spellslingers",
      background_image: "https://www.freetogame.com/g/531/thumbnail.jpg",
      free: "1",
      description:
        "Magic Spellslingers is the latest entry based on Witzards of the Coast\u2019s popular card game Magic: The Gathering.",
      url: "https://www.freetogame.com/open/magic-spellslingers",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "A.V.A Global",
      background_image: "https://www.freetogame.com/g/533/thumbnail.jpg",
      free: "1",
      description:
        "A.V.A is a free-to-play online first-person shooter with multiple game modes, unique customizations, as well as PvP and PvE gameplay.",
      url: "https://www.freetogame.com/open/ava",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Lost Light",
      background_image: "https://www.freetogame.com/g/534/thumbnail.jpg",
      free: "1",
      description:
        "A post-apocalyptic shooter built around creating a realistic experience.",
      url: "https://www.freetogame.com/open/lost-light",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Temperia: Soul of Majestic",
      background_image: "https://www.freetogame.com/g/524/thumbnail.jpg",
      free: "1",
      description:
        "Fans of collectible card games, are you looking for something a bit different from the normal fare? Then a peek at Moonwolf Entertainment and A2 Softworks\u2019 Temperia: Soul of Majestic might be in order.",
      url: "https://www.freetogame.com/open/temperia",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Chimeraland",
      background_image: "https://www.freetogame.com/g/526/thumbnail.jpg",
      free: "1",
      description:
        "Explore the open-world sandbox MMO game set in a mythical world. Play as one of a large number of races, from jelly-fish to dragon-person \u2013 or even a regular old human if that\u2019s your thing. Explore the land, gather resources, craft items, build homes and more.",
      url: "https://www.freetogame.com/open/chimeraland",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "World of Runes",
      background_image: "https://www.freetogame.com/g/532/thumbnail.jpg",
      free: "1",
      description:
        "An adorable anime-style MMO featuring cute pets and collectable cards.",
      url: "https://www.freetogame.com/open/world-of-runes",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Roller Champions",
      background_image: "https://www.freetogame.com/g/520/thumbnail.jpg",
      free: "1",
      description:
        "What if you could player roller derby, but in a more organized and less physically dangerous environment?",
      url: "https://www.freetogame.com/open/roller-champions",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Space Punks",
      background_image: "https://www.freetogame.com/g/519/thumbnail.jpg",
      free: "1",
      description:
        "Space Punks is a sci-fi co-op looter shooter with graphics and humor that will likely appeal to the Borderlands fans among us.",
      url: "https://www.freetogame.com/open/space-punks",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Goose, Goose, DUCK",
      background_image: "https://www.freetogame.com/g/550/thumbnail.jpg",
      free: "1",
      description: "A social deduction game with geese.",
      url: "https://www.freetogame.com/open/goose-goose-duck",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Swords of Legends Online",
      background_image: "https://www.freetogame.com/g/518/thumbnail.jpg",
      free: "1",
      description:
        "Explore a fantasy world based on Chinese mythology in Gameforge\u2019s action MMORPG Swords of Legends Online!",
      url: "https://www.freetogame.com/open/swords-of-legends-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Super Squad",
      background_image: "https://www.freetogame.com/g/513/thumbnail.jpg",
      free: "1",
      description:
        "Prepare yourself. It\u2019s time for Mayhem. Super Squad is a multi-player online shoot-\u2019em-up (or MOSH)!",
      url: "https://www.freetogame.com/open/super-squad",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Sherwood Extreme",
      background_image: "https://www.freetogame.com/g/512/thumbnail.jpg",
      free: "1",
      description:
        "High action arcade shooter Sherwood Extreme sends players on a mission to save the kingdom!",
      url: "https://www.freetogame.com/open/sherwood-extreme",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Smash Legends",
      background_image: "https://www.freetogame.com/g/509/thumbnail.jpg",
      free: "1",
      description:
        "Classic fairy tales get wild with 5minlab and LINE Games Corporation\u2019s brawl-action game Smash Legends.",
      url: "https://www.freetogame.com/open/smash-legends",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Drifters Loot the Galaxy",
      background_image: "https://www.freetogame.com/g/510/thumbnail.jpg",
      free: "1",
      description:
        "Grab your Driftpacs and grappling hooks, it\u2019s time to loot. Pick a character and dive into Blind Squirrel\u2019s team-based shooter, Drifters Loot the Galaxy.",
      url: "https://www.freetogame.com/open/drifters-loot-the-galaxy",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Primordials: Battle of Gods",
      background_image: "https://www.freetogame.com/g/502/thumbnail.jpg",
      free: "1",
      description:
        "Build armies and fight for control of the realm in Global Dodo Entertainment\u2019s 1v1 strategy game Primordials: Battle of Gods. ",
      url: "https://www.freetogame.com/open/primordials-battle-of-gods",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Super Mecha Champions",
      background_image: "https://www.freetogame.com/g/507/thumbnail.jpg",
      free: "1",
      description:
        "Super Mecha Champions is a PC port of the mobile anime PvP game from NetEease, featuring a variety of modes but focusing on battle royale.",
      url: "https://www.freetogame.com/open/super-mecha-champions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Chroma: Bloom And Blight",
      background_image: "https://www.freetogame.com/g/500/thumbnail.jpg",
      free: "1",
      description:
        "Competitive card game fans have a new, completely free option to add to their list. ",
      url: "https://www.freetogame.com/open/chroma-bloom-and-blight",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Blankos Block Party",
      background_image: "https://www.freetogame.com/g/498/thumbnail.jpg",
      free: "1",
      description:
        "What happens when you take the vinyl collectible toy experience and combine it with an open-world multiplayer game? You get Blankos Block Party!\r\n",
      url: "https://www.freetogame.com/open/blankos",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Slapshot: Rebound",
      background_image: "https://www.freetogame.com/g/499/thumbnail.jpg",
      free: "1",
      description:
        "Do you like hockey? How about physic-based multiplayer, arcade-style sports games with cute graphics? Well, this is the one for you.",
      url: "https://www.freetogame.com/open/slapshot-rebound",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Rogue Company",
      background_image: "https://www.freetogame.com/g/476/thumbnail.jpg",
      free: "1",
      description:
        "From Hi-Rez Studios, the team that brought you Smite and Paladins, comes Rogue Company, a cross-platform, competitive team-based third person shooter.",
      url: "https://www.freetogame.com/open/rogue-company",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eternal Return: Black Survival",
      background_image: "https://www.freetogame.com/g/477/thumbnail.jpg",
      free: "1",
      description:
        "Combining elements from battle royale, MOBA, and the survival genres, Eternal Return: Black Survival is a game designed with a broad audience in mind. ",
      url: "https://www.freetogame.com/open/eternal-return",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Blood of Steel",
      background_image: "https://www.freetogame.com/g/479/thumbnail.jpg",
      free: "1",
      description:
        "Blood of Steel is an online competitive strategy game featuring some of the most well-known figures throughout medieval history. Choose your general \u2013 a Crusader, Viking, Ninja or one of those from the Three Kingdoms. Build your kingdom and command armies in epic PvP battles using classic medieval warfare tactics.",
      url: "https://www.freetogame.com/open/blood-of-steel",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Spellbreak",
      background_image: "https://www.freetogame.com/g/473/thumbnail.jpg",
      free: "1",
      description:
        "Spellbreak is a multiplayer, multi-platform battle-royale where player take on the role of a \u201cbattlemage\u201d mastering elemental magic and using spells to compete against other players.",
      url: "https://www.freetogame.com/open/spellbreak",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Rocket League",
      background_image: "https://www.freetogame.com/g/474/thumbnail.jpg",
      free: "1",
      description:
        "Get your car-soccer gaming on for free with Psyonix\u2019s Rocket League. The popular competitive multi-player game is a popular offering with over 57 million players.",
      url: "https://www.freetogame.com/open/rocket-league",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Armor Valor",
      background_image: "https://www.freetogame.com/g/471/thumbnail.jpg",
      free: "1",
      description:
        "Build your empire with the help of mythical heroes and well thought out strategy in R2 Games\u2019 strategy RPG Armor Valor.",
      url: "https://www.freetogame.com/open/armor-valor",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Unfortunate Spacemen",
      background_image: "https://www.freetogame.com/g/469/thumbnail.jpg",
      free: "1",
      description:
        "Unfortunate Spacemen is a co-op multiplayer game about Shapeshifting with a Co-op Story Mode, lots of objectives and more!",
      url: "https://www.freetogame.com/open/unfortunate-spacemen",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Jade Goddess",
      background_image: "https://www.freetogame.com/g/472/thumbnail.jpg",
      free: "1",
      description:
        "Jade Goddess is a free-to-play, browser based MMO inspired by Eastern mythology.",
      url: "https://www.freetogame.com/open/jade-goddess",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Shop Titans",
      background_image: "https://www.freetogame.com/g/461/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play RPG shopkeeper simulation game where you are responsible for designing and maintaining your own shop.",
      url: "https://www.freetogame.com/open/shop-titans",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Survivor Legacy",
      background_image: "https://www.freetogame.com/g/463/thumbnail.jpg",
      free: "1",
      description:
        "Survivor Legacy is a free-to-play zombie-themed strategy game from R2 Games.",
      url: "https://www.freetogame.com/open/survivor-legacy",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Bombergrounds: Battle Royale",
      background_image: "https://www.freetogame.com/g/459/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play massively multiplayer battle Royale game inspired by the old-shool Bomberman games!",
      url: "https://www.freetogame.com/open/bombergrounds-battle-royale",
      genre: "Battle Royale",
      released: "0000-00-00"
    },
    {
      name: "Kakale Online",
      background_image: "https://www.freetogame.com/g/563/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play top-down 2D MMORPG from developer and publisher ViVa Games.",
      url: "https://www.freetogame.com/open/kakale-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Darwin Project",
      background_image: "https://www.freetogame.com/g/39/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 10-player battle royale game set just prior to an impeding ice age.",
      url: "https://www.freetogame.com/open/darwin-project",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Legends of Runeterra",
      background_image: "https://www.freetogame.com/g/441/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play CCG based on Riot Games' MOBA League of Legends.",
      url: "https://www.freetogame.com/open/runeterra",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "CRSED: F.O.A.D.",
      background_image: "https://www.freetogame.com/g/4/thumbnail.jpg",
      free: "1",
      description:
        "Take the battle royale genre and add  mystical powers and you have CRSED: F.O.A.D. (Aka Cuisine Royale: Second Edition)",
      url: "https://www.freetogame.com/open/crsed",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Mirage Online Classic",
      background_image: "https://www.freetogame.com/g/535/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based free-to-play spiritual successor to 2001's Mirage Online.",
      url: "https://www.freetogame.com/open/mirage-online-classic",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Inferna",
      background_image: "https://www.freetogame.com/g/436/thumbnail.jpg",
      free: "1",
      description:
        "A cross-platform MMO from indie developer and publisher Inferna Limited, designed for players seeking a classic experience.  ",
      url: "https://www.freetogame.com/open/inferna",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ultimate Pirates",
      background_image: "https://www.freetogame.com/g/443/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based strategy MMO published for both desktop and mobile browsers by Gameforge.  ",
      url: "https://www.freetogame.com/open/ultimate-pirates",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Fer.al",
      background_image: "https://www.freetogame.com/g/501/thumbnail.jpg",
      free: "1",
      description:
        "If you\u2019ve ever wanted to be a creature of myth and hang out with other mytical creatures, Wildworks\u2019 Fer.al can help you live the dream.",
      url: "https://www.freetogame.com/open/Feral",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Battle Breakers",
      background_image: "https://www.freetogame.com/g/435/thumbnail.jpg",
      free: "1",
      description:
        "A multi-platform free-to-play RPG developed and published by Epic Games for PC and Android devices.  ",
      url: "https://www.freetogame.com/open/battlebreakers",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stay Out",
      background_image: "https://www.freetogame.com/g/437/thumbnail.jpg",
      free: "1",
      description:
        "An MMORPG featuring urban exploration and shooter elements.",
      url: "https://www.freetogame.com/open/stay-out",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "PC Futbol Legends",
      background_image: "https://www.freetogame.com/g/439/thumbnail.jpg",
      free: "1",
      description:
        "An arcade soccer game inspired by cult arcade games from IDC games. ",
      url: "https://www.freetogame.com/open/futbol-legends",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Vampire Empire",
      background_image: "https://www.freetogame.com/g/440/thumbnail.jpg",
      free: "1",
      description:
        "A multiplayer strategy game that focuses on the war between vampires and werewolves. ",
      url: "https://www.freetogame.com/open/vampire-empire",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Firestone Idle RPG",
      background_image: "https://www.freetogame.com/g/468/thumbnail.jpg",
      free: "1",
      description:
        "Set in the fantasy world of Alandria, Firestone is an idle RPG in which players are tasked with building the best possible party of heroes and using them to defeat the undead and orcs that plague the world.",
      url: "https://www.freetogame.com/open/firestone-idle-rpg",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Mythgard",
      background_image: "https://www.freetogame.com/g/505/thumbnail.jpg",
      free: "1",
      description:
        "Rhino Games Inc.\u2019s CCG Mythgard combines cyberpunk with the heroes, gods, and creatures of the fantasy in a modern setting to create a world where magic competes against technology for control.",
      url: "https://www.freetogame.com/open/mythgard",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Dark Knight",
      background_image: "https://www.freetogame.com/g/445/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based fantasy MMOARPG wherein players take on the role of a devil hunter descended from the gods.",
      url: "https://www.freetogame.com/open/dark-knight",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Legends of Aria",
      background_image: "https://www.freetogame.com/g/446/thumbnail.jpg",
      free: "1",
      description:
        "A sandbox MMORPG featuring a skill-based system, content that will appeal to both PvE and PvP players, and a robust housing system.",
      url: "https://www.freetogame.com/open/legends-of-aria",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crystal Clash",
      background_image: "https://www.freetogame.com/g/451/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy RTS developed by Crunchy Leaf Games. ",
      url: "https://www.freetogame.com/open/crystal-clash",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dota Underlords",
      background_image: "https://www.freetogame.com/g/447/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play auto battler strategy game set in the world of Valve's Dota franchise.",
      url: "https://www.freetogame.com/open/dota-underlords",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Minion Masters",
      background_image: "https://www.freetogame.com/g/19/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic minion brawler from Danish developer Betadwarf. ",
      url: "https://www.freetogame.com/open/minion-masters",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Splitgate: Arena Warfare",
      background_image: "https://www.freetogame.com/g/20/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer shooter developed and published by 1047 games. ",
      url: "https://www.freetogame.com/open/splitgate-arena-warfare",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Conqueror's Blade",
      background_image: "https://www.freetogame.com/g/456/thumbnail.jpg",
      free: "1",
      description:
        "Command your own medieval army in Conqueror's Blade, a war simulator developed by Booming games.",
      url: "https://www.freetogame.com/open/conquerors-blade",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stein.world",
      background_image: "https://www.freetogame.com/g/353/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based online fantasy role \r\nplaying game done in an old-school \r\n16-bit style.",
      url: "https://www.freetogame.com/open/steinworld",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Kards",
      background_image: "https://www.freetogame.com/g/438/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play collectible World War II card game from developer 1939 Games.",
      url: "https://www.freetogame.com/open/kards",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "KurtzPel",
      background_image: "https://www.freetogame.com/g/448/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play third-person action battle game from KOG Games.",
      url: "https://www.freetogame.com/open/kurtzpel",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "The Third Age",
      background_image: "https://www.freetogame.com/g/457/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based Strategy MMO game focused on story-based PvE gameplay!",
      url: "https://www.freetogame.com/open/the-third-age",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Eternal",
      background_image: "https://www.freetogame.com/g/91/thumbnail.jpg",
      free: "1",
      description:
        "A strategy card game designed to take the best elements of Magic the Gathering, Hearthstone, and Hex and combine them all into one game.",
      url: "https://www.freetogame.com/open/eternal",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Artifact",
      background_image: "https://www.freetogame.com/g/503/thumbnail.jpg",
      free: "1",
      description:
        "Valve\u2019s Artifact is two games in one. Whether you\u2019re looking for the original Dota 2 trading card game created with the help of card game designer Richard Garfield or something a little more streamlined, Artifact has both in one download.",
      url: "https://www.freetogame.com/open/artifact",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "World War 3",
      background_image: "https://www.freetogame.com/g/538/thumbnail.jpg",
      free: "1",
      description: "A realistic multiplayer tactical FPS.",
      url: "https://www.freetogame.com/open/world-war-3",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Combat Arms: Reloaded",
      background_image: "https://www.freetogame.com/g/299/thumbnail.jpg",
      free: "1",
      description:
        "A free to play modern first person shooter with lots of maps and weapons!",
      url: "https://www.freetogame.com/open/combat-arms",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dreadnought",
      background_image: "https://www.freetogame.com/g/68/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play combat flight simulator developed by Yager Development and published by Grey Box. ",
      url: "https://www.freetogame.com/open/dreadnought",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Spacelords",
      background_image: "https://www.freetogame.com/g/28/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 4v1 sci-fi shooter. ",
      url: "https://www.freetogame.com/open/spacelords",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Battlerite Royale",
      background_image: "https://www.freetogame.com/g/450/thumbnail.jpg",
      free: "1",
      description:
        "A free to play battle royale set in the Battlerite universe.",
      url: "https://www.freetogame.com/open/battlerite-royale",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Magic: The Gathering Arena",
      background_image: "https://www.freetogame.com/g/454/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play digital recreation of Wizards of the Coast's popular collectible card game.",
      url: "https://www.freetogame.com/open/mtg-arena",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "League of Angels 3",
      background_image: "https://www.freetogame.com/g/341/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play turn-based strategy browser game developed and published by GTArcade Entertainment, Inc.",
      url: "https://www.freetogame.com/open/league-of-angels-3",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "BlackShot: Revolution",
      background_image: "https://www.freetogame.com/g/282/thumbnail.jpg",
      free: "1",
      description:
        "Get thrown into the fast-paced action of a virtual war zone and compete against other players.",
      url: "https://www.freetogame.com/open/blackshot",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Cosmos Invictus",
      background_image: "https://www.freetogame.com/g/31/thumbnail.jpg",
      free: "1",
      description:
        "A strategic collectible card game developed and published by Pegnio Ltd. ",
      url: "https://www.freetogame.com/open/cosmos-invictus",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Realm Royale Reforged",
      background_image: "https://www.freetogame.com/g/36/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy-themed battle royale game based on Hi-Rez Studio's team shooter Paladins. ",
      url: "https://www.freetogame.com/open/realm-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Empire: World War 3",
      background_image: "https://www.freetogame.com/g/460/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based action packed strategy game from the developer of Legends of Honor.",
      url: "https://www.freetogame.com/open/empireww3",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Totally Accurate Battlegrounds",
      background_image: "https://www.freetogame.com/g/506/thumbnail.jpg",
      free: "1",
      description:
        "Take 60 players, throw them on a map together with over 90 weapons, including balloon crossbows, pots and pans, and inflatable hammers, add physics-based parkour and you have Landfall\u2019s Totally Accurate Battlegrounds (TABG).",
      url: "https://www.freetogame.com/open/tabg",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Will To Live",
      background_image: "https://www.freetogame.com/g/434/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG-shooter developed and published by AlphaSoft LLC.",
      url: "https://www.freetogame.com/open/will-to-live",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Battle Arena Heroes Adventure",
      background_image: "https://www.freetogame.com/g/543/thumbnail.jpg",
      free: "1",
      description: "A MOBA with RPG elements.",
      url: "https://www.freetogame.com/open/battle-arena-heroes-adventure",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Spellsworn",
      background_image: "https://www.freetogame.com/g/42/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play arena battle game developed and published by Frogsong Studios AB. ",
      url: "https://www.freetogame.com/open/spellsworn",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Z1 Battle Royale",
      background_image: "https://www.freetogame.com/g/43/thumbnail.jpg",
      free: "1",
      description: "A highly competitive free-to-play battle royale shooter.",
      url: "https://www.freetogame.com/open/z1-battle-royale",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Tale Of Toast",
      background_image: "https://www.freetogame.com/g/44/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play open world MMO inspired by classic, core MMOs. ",
      url: "https://www.freetogame.com/open/tale-of-toast",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Bombtag",
      background_image: "https://www.freetogame.com/g/47/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer Bomberman-inspired game.",
      url: "https://www.freetogame.com/open/bombtag",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Ironsight",
      background_image: "https://www.freetogame.com/g/48/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play futuristic shooter published by Aeria Games. ",
      url: "https://www.freetogame.com/open/ironsight",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dead Maze",
      background_image: "https://www.freetogame.com/g/49/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 2D isometric MMO full of zombies. ",
      url: "https://www.freetogame.com/open/dead-maze",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Scions of Fate",
      background_image: "https://www.freetogame.com/g/316/thumbnail.jpg",
      free: "1",
      description:
        "A friendly free to play MMORPG with easy to pick up controls.",
      url: "https://www.freetogame.com/open/scions-of-fate",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "My Soul",
      background_image: "https://www.freetogame.com/g/342/thumbnail.jpg",
      free: "1",
      description: "A free-to-play ARPG distributed by GameSpirit. ",
      url: "https://www.freetogame.com/open/my-soul",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Wild Terra Online",
      background_image: "https://www.freetogame.com/g/22/thumbnail.jpg",
      free: "1",
      description:
        "A medieval sandbox MMO designed with core players in mind. ",
      url: "https://www.freetogame.com/open/wild-terra-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Global Adventures",
      background_image: "https://www.freetogame.com/g/51/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG developed by PixelSoft and Published by SubaGames. ",
      url: "https://www.freetogame.com/open/global-adventures",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Closers",
      background_image: "https://www.freetogame.com/g/52/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play episodic anime beat-em-up developed \r\nby Naddic Games and published by \r\nEn Masse Entertainment. ",
      url: "https://www.freetogame.com/open/closers",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "La Tale Evolved",
      background_image: "https://www.freetogame.com/g/322/thumbnail.jpg",
      free: "1",
      description:
        "A 2D side-scrolling fantasy MMORPG with anime-inspired graphics.",
      url: "https://www.freetogame.com/open/la-tale",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Luna Online: Reborn",
      background_image: "https://www.freetogame.com/g/120/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, anime themed fantasy MMORPG and a remake of the previous Luna MMO! ",
      url: "https://www.freetogame.com/open/luna-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Ultimatest Battle",
      background_image: "https://www.freetogame.com/g/58/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D platform game that pits two teams of players against each other in a variety of modes. ",
      url: "https://www.freetogame.com/open/the-ultimatest-battle",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Insidia",
      background_image: "https://www.freetogame.com/g/59/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play tactical, turn-based dueling game developed and published by Bad Seed. ",
      url: "https://www.freetogame.com/open/insidia",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Quake Champions",
      background_image: "https://www.freetogame.com/g/30/thumbnail.jpg",
      free: "1",
      description:
        "Quake Champions is a callback to the early days of the Quake IP, featuring the fast-paced action that made the IP popular over two decades ago. ",
      url: "https://www.freetogame.com/open/quake-champions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gods Origin Online",
      background_image: "https://www.freetogame.com/g/354/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser-based RPG from VivaGames in which players take on the role of human summoners that call deities from the Astral Realm back in time. ",
      url: "https://www.freetogame.com/open/gods-origin",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Black Squad",
      background_image: "https://www.freetogame.com/g/61/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play military FPS developed by NS STUDIO and published by NEOWIZ.",
      url: "https://www.freetogame.com/open/black-squad",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Secret World Legends",
      background_image: "https://www.freetogame.com/g/64/thumbnail.jpg",
      free: "1",
      description: "A free-to-play reboot of The Secret World. ",
      url: "https://www.freetogame.com/open/secret-world-legends",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Argo",
      background_image: "https://www.freetogame.com/g/63/thumbnail.jpg",
      free: "1",
      description: "A tactical first-person shooter from the Arma 3 developer.",
      url: "https://www.freetogame.com/open/argo",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Pixel Worlds",
      background_image: "https://www.freetogame.com/g/65/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, side-scroller MMO sandbox game developed and published by Kukouri Mobile Entertainment. ",
      url: "https://www.freetogame.com/open/pixel-worlds",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Deceit",
      background_image: "https://www.freetogame.com/g/55/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer first-person shooter set \r\nin an asylum! ",
      url: "https://www.freetogame.com/open/deceit",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gwent: The Witcher Card Game",
      background_image: "https://www.freetogame.com/g/66/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play card game based on CD Projekt Red's popular Witcher franchise. ",
      url: "https://www.freetogame.com/open/gwent",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Awesomenauts",
      background_image: "https://www.freetogame.com/g/67/thumbnail.jpg",
      free: "1",
      description: "A 3v3 2D battle arena Developed by Ronimo games.",
      url: "https://www.freetogame.com/open/awesomenauts",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Alien Swarm: Reactive Drop",
      background_image: "https://www.freetogame.com/g/70/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play top-down tactical co-op expansion on the Alien swarm game and Source SDK.",
      url: "https://www.freetogame.com/open/alien-swarm-reactive-drop",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Catan Universe",
      background_image: "https://www.freetogame.com/g/71/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategy game based on the classic board and card games. ",
      url: "https://www.freetogame.com/open/catan-universe",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Krosmaga",
      background_image: "https://www.freetogame.com/g/72/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play CCG/tower defense hybrid developed \r\nby Ankama Studio and published by \r\nAnkama Games. ",
      url: "https://www.freetogame.com/open/krosmaga",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Chronicles of Eidola",
      background_image: "https://www.freetogame.com/g/355/thumbnail.jpg",
      free: "1",
      description: "A free-to-play 3D Browser RPG from AMZGame.",
      url: "https://www.freetogame.com/open/chronicles-of-eidola",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Revelation Online",
      background_image: "https://www.freetogame.com/g/77/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy MMO developed by NetEase and published by My.com. ",
      url: "https://www.freetogame.com/open/revelation-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MU Legend",
      background_image: "https://www.freetogame.com/g/87/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORPG developed by Webzen and the followup to MU Online. ",
      url: "https://www.freetogame.com/open/mu-legend",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Therian Saga",
      background_image: "https://www.freetogame.com/g/421/thumbnail.jpg",
      free: "1",
      description:
        "A browser-based sandbox MMORPG with a complex crafting system.",
      url: "https://www.freetogame.com/open/therian-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Cabals: Card Blitz",
      background_image: "https://www.freetogame.com/g/69/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play game developed by Kyy Games and published by BISBOG SA. ",
      url: "https://www.freetogame.com/open/cabals-card-blitz",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Line of Sight",
      background_image: "https://www.freetogame.com/g/82/thumbnail.jpg",
      free: "1",
      description: 'Free FPS game Bioshock meets Call of Duty"! ',
      url: "https://www.freetogame.com/open/line-of-sight",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Heavy Metal Machines",
      background_image: "https://www.freetogame.com/g/83/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer vehicular combat game based in a post-apocalyptic world.",
      url: "https://www.freetogame.com/open/heavy-metal-machines",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Dragon Awaken",
      background_image: "https://www.freetogame.com/g/343/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based fantasy RPG developed \r\nby Game Hollywood and published by \r\nProficient City.",
      url: "https://www.freetogame.com/open/dragon-awaken",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Infestation: The New Z",
      background_image: "https://www.freetogame.com/g/85/thumbnail.jpg",
      free: "1",
      description:
        'A re-work of the open world zombie shooter game Infestation: Survivor Stories (or as it was formerly known "The War Z").',
      url: "https://www.freetogame.com/open/infestation-new-z",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "One Tower",
      background_image: "https://www.freetogame.com/g/92/thumbnail.jpg",
      free: "1",
      description:
        'A unique 1v1 MOBA known as a "micro-moba" developed and published by SkyReacher following a successful Kickstarter. ',
      url: "https://www.freetogame.com/open/one-tower",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Shadowverse",
      background_image: "https://www.freetogame.com/g/88/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play strategic CCG developed and published by Cygamesm the creators of Rage of Bahamut and Granblu Fantasy. ",
      url: "https://www.freetogame.com/open/shadowverse",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "AdventureQuest 3D",
      background_image: "https://www.freetogame.com/g/89/thumbnail.jpg",
      free: "1",
      description:
        "A free to play cross-platform MMORPG from the creators of the original 2D RPG game.",
      url: "https://www.freetogame.com/open/adventurequest-3d",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Riding Club Championships",
      background_image: "https://www.freetogame.com/g/93/thumbnail.jpg",
      free: "1",
      description:
        "An online competitive horse riding game inspired by traditional equestrian disciplines. ",
      url: "https://www.freetogame.com/open/riding-club-championships",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Battlerite",
      background_image: "https://www.freetogame.com/g/94/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play team arena brawler developed by Stunlock Studios. Players play as one of several available champions on teams in 2v2 or 3v3 matches. ",
      url: "https://www.freetogame.com/open/battlerite",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Paladins",
      background_image: "https://www.freetogame.com/g/95/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play team-based shooter developed and published by Hi-Rez Games, the creators of SMITE. ",
      url: "https://www.freetogame.com/open/paladins",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Star Crusade",
      background_image: "https://www.freetogame.com/g/99/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play sci-fi themed collectable card game developed and published by ZiMAD inc. ",
      url: "https://www.freetogame.com/open/star-crusade",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Omega Zodiac",
      background_image: "https://www.freetogame.com/g/344/thumbnail.jpg",
      free: "1",
      description:
        "A Greek and Norse mythology based free-to-play action MMO developed and published by Proficient City and Game Hollywood.",
      url: "https://www.freetogame.com/open/omega-zodiac",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Elder Scrolls: Legends",
      background_image: "https://www.freetogame.com/g/102/thumbnail.jpg",
      free: "1",
      description: "A free-to-play CCG based on The Elder Scrolls franchise. ",
      url: "https://www.freetogame.com/open/elder-scrolls-legends",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Riders of Icarus",
      background_image: "https://www.freetogame.com/g/106/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play action MMORPG featuring mounted, in-air combat. ",
      url: "https://www.freetogame.com/open/riders-of-icarus",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Naruto Online",
      background_image: "https://www.freetogame.com/g/365/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO based on the popular anime series and manga, developed \r\nby Bandai Namco Entertainment. ",
      url: "https://www.freetogame.com/open/naruto-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Kritika: REBOOT",
      background_image: "https://www.freetogame.com/g/62/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play hack-and-slash MMORPG with both a single-player adventure combat from En Masse Entertainment and ALL-M Co. ",
      url: "https://www.freetogame.com/open/kritika",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Zula",
      background_image: "https://www.freetogame.com/g/108/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play online FPS developed and published by IDC/Games. ",
      url: "https://www.freetogame.com/open/zula",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "LuckCatchers",
      background_image: "https://www.freetogame.com/g/109/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play sandbox sim based on the novels of fantasy and steam-punk author A. Pehov.",
      url: "https://www.freetogame.com/open/luckcatchers",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "UFO Online: Invasion",
      background_image: "https://www.freetogame.com/g/110/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play post-apocalyptic, turn-based tactical combat \r\nMMO developed by Bad Pixel. ",
      url: "https://www.freetogame.com/open/ufo-online-invasion",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Weapons Of Mythology",
      background_image: "https://www.freetogame.com/g/112/thumbnail.jpg",
      free: "1",
      description: "A 3D free-to-play fantasy MMORPG published by IDC/Games. ",
      url: "https://www.freetogame.com/open/weapons-of-mythology",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tree of Savior",
      background_image: "https://www.freetogame.com/g/116/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy 3D MMORPG with a massive freedom of choice, cute looking characters and a distinct art style. ",
      url: "https://www.freetogame.com/open/tree-of-savior",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Starbreak",
      background_image: "https://www.freetogame.com/g/118/thumbnail.jpg",
      free: "1",
      description:
        "A Roguelike MMORPG with MetroidVania-style platformer \r\ngameplay! Castlevania and Metroid fans will \r\nlove this game! ",
      url: "https://www.freetogame.com/open/starbreak",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Fantasy Tales Online",
      background_image: "https://www.freetogame.com/g/119/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, retro MMO featuring puzzles, a rich crafting system and Randomly generated dungeons! ",
      url: "https://www.freetogame.com/open/fantasy-tales-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dragon Blood",
      background_image: "https://www.freetogame.com/g/370/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser MMORPG from 101XP, you'll harness your unique power and the blood of dragons that flows through your veins! ",
      url: "https://www.freetogame.com/open/dragon-blood",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "League of Angels 2",
      background_image: "https://www.freetogame.com/g/371/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser MMORPG that captures all the beauty and elegance of its predecessor.",
      url: "https://www.freetogame.com/open/league-angels-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Astral Heroes",
      background_image: "https://www.freetogame.com/g/117/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play collectable card game from the creators of Astral Masters. ",
      url: "https://www.freetogame.com/open/astral-heroes",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Holodrive",
      background_image: "https://www.freetogame.com/g/124/thumbnail.jpg",
      free: "1",
      description:
        'A free-to-play 2D multiplayer shooter developed by BitCake Studio and published by Versus Evil in which players play as customizable robots or "Dummys". ',
      url: "https://www.freetogame.com/open/holodrive",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Cabal Online",
      background_image: "https://www.freetogame.com/g/304/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast-paced skill-based MMORPG in a stunning world!",
      url: "https://www.freetogame.com/open/cabal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Atom Universe",
      background_image: "https://www.freetogame.com/g/125/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online social Virtual World set in a theme park.",
      url: "https://www.freetogame.com/open/atom-universe",
      genre: "Social",
      released: "0000-00-00"
    },
    {
      name: "Spellweaver",
      background_image: "https://www.freetogame.com/g/128/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online collectible card \r\ngame that requires deep strategic and \r\nthinking.",
      url: "https://www.freetogame.com/open/spellweaver",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Clash of Avatars",
      background_image: "https://www.freetogame.com/g/374/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D browser MMORPG with powerful Avatars, 50 mounts, \r\nand several loyal pets.",
      url: "https://www.freetogame.com/open/clash-of-avatars",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "War Trigger 3",
      background_image: "https://www.freetogame.com/g/134/thumbnail.jpg",
      free: "1",
      description:
        "A MMO shooter with infantry, vehicle, and air combat across massive maps! ",
      url: "https://www.freetogame.com/open/wt3",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "VEGA Conflict",
      background_image: "https://www.freetogame.com/g/136/thumbnail.jpg",
      free: "1",
      description: "A Cross-Platform free to play 2D sci-fi strategy MMO.",
      url: "https://www.freetogame.com/open/vega-conflict",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Metal War Online: Retribution",
      background_image: "https://www.freetogame.com/g/137/thumbnail.jpg",
      free: "1",
      description:
        "A high-speed multiplayer online concept car shooter game with racing elements!",
      url: "https://www.freetogame.com/open/metal-war-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Immortal Empire",
      background_image: "https://www.freetogame.com/g/139/thumbnail.jpg",
      free: "1",
      description:
        "A free to play multiplayer strategy RPG developed by Tactic Studios.",
      url: "https://www.freetogame.com/open/immortal-empire",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "MechWarrior Online",
      background_image: "https://www.freetogame.com/g/222/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play PvP game that's a faithful adaptation of the popular MechWarrior strategy board games.",
      url: "https://www.freetogame.com/open/mechwarrior-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Armored Warfare",
      background_image: "https://www.freetogame.com/g/7/thumbnail.jpg",
      free: "1",
      description:
        "A modern team-based MMO tank game from Obsidian Entertainment.",
      url: "https://www.freetogame.com/open/armored-warfare",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "America\u2019s Army: Proving Grounds",
      background_image: "https://www.freetogame.com/g/149/thumbnail.jpg",
      free: "1",
      description:
        "Take a first person shooter, have the game developed by the U.S. Army and you\u2019ve got America\u2019s Army.",
      url: "https://www.freetogame.com/open/americas-army",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "One Piece Online 2",
      background_image: "https://www.freetogame.com/g/346/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, browser-based 2D MMORPG based on the immensely popular One Piece franchise.",
      url: "https://www.freetogame.com/open/one-piece-online-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Otherland",
      background_image: "https://www.freetogame.com/g/97/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO based on the popular novels by Tad Williams. ",
      url: "https://www.freetogame.com/open/otherland",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Forza Motorsport 6: Apex",
      background_image: "https://www.freetogame.com/g/121/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO racing game that comes from makers of one of the most popular video game racing series ever. ",
      url: "https://www.freetogame.com/open/forza-motorsport-6-apex",
      genre: "Racing",
      released: "0000-00-00"
    },
    {
      name: "Legends of Honor",
      background_image: "https://www.freetogame.com/g/383/thumbnail.jpg",
      free: "1",
      description: "A free to play browser based medieval fantasy 2D MMORTS.",
      url: "https://www.freetogame.com/open/legends-of-honor",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Felspire",
      background_image: "https://www.freetogame.com/g/384/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D browser-based fantasy MMORPG with plenty of dungeons and world bosses to slay.",
      url: "https://www.freetogame.com/open/felspire",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "WARMODE",
      background_image: "https://www.freetogame.com/g/152/thumbnail.jpg",
      free: "1",
      description:
        "A Free to play multiplayer online shooter. Sight in enemies to master Headshots, Double Kills and Triple Kills! ",
      url: "https://www.freetogame.com/open/warmode",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Sphere 3: Enchanted World",
      background_image: "https://www.freetogame.com/g/154/thumbnail.jpg",
      free: "1",
      description: "A fantasy action MMORPG with a non-target combat system.",
      url: "https://www.freetogame.com/open/sphere-3",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Fishing Planet",
      background_image: "https://www.freetogame.com/g/157/thumbnail.jpg",
      free: "1",
      description:
        "A Free to play realistic online first-person multiplayer fishing simulator! ",
      url: "https://www.freetogame.com/open/fishing-planet",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Aberoth",
      background_image: "https://www.freetogame.com/g/386/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 8-bit MMORPG with retro graphics and MUD-like interface.",
      url: "https://www.freetogame.com/open/aberoth",
      genre: " MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Codename CURE",
      background_image: "https://www.freetogame.com/g/159/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMOFPS featuring cooperative play, and objective-based missions.",
      url: "https://www.freetogame.com/open/codename-cure",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Skyforge",
      background_image: "https://www.freetogame.com/g/161/thumbnail.jpg",
      free: "1",
      description:
        "A impressive Free to play MMORPG where you can become a god! ",
      url: "https://www.freetogame.com/open/skyforge",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Card Hunter",
      background_image: "https://www.freetogame.com/g/163/thumbnail.jpg",
      free: "1",
      description:
        "A free online collectible card game which blends together role-playing, card play and tactical combat. ",
      url: "https://www.freetogame.com/open/card-hunter",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Fallout Shelter",
      background_image: "https://www.freetogame.com/g/104/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play simulation game based on Bethesda Game Studios' popular Fallout franchise. ",
      url: "https://www.freetogame.com/open/fallout-shelter",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Lord\u2019s Road",
      background_image: "https://www.freetogame.com/g/388/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D browser-based fantasy MMORPG that features two playable classes.",
      url: "https://www.freetogame.com/open/lords-road",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Salem",
      background_image: "https://www.freetogame.com/g/167/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, sandbox type MMO based on the times and trials of living.",
      url: "https://www.freetogame.com/open/salem",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Heroes of the Storm",
      background_image: "https://www.freetogame.com/g/168/thumbnail.jpg",
      free: "1",
      description: "A free to play MOBA developed by Blizzard Entertainment.",
      url: "https://www.freetogame.com/open/heroes-of-the-storm",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Dirty Bomb",
      background_image: "https://www.freetogame.com/g/169/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play first person shooter multiplayer game set in a post-apocalyptic London.",
      url: "https://www.freetogame.com/open/dirty-bomb",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Vikings: War Of Clans",
      background_image: "https://www.freetogame.com/g/357/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO strategy game developed and published by Plarium.",
      url: "https://www.freetogame.com/open/vikings-war-of-clans",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Trek: Alien Domain",
      background_image: "https://www.freetogame.com/g/391/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser based 2D strategy MMO set in the Stark Trek universe.",
      url: "https://www.freetogame.com/open/star-trek-alien-domain",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Block N Load",
      background_image: "https://www.freetogame.com/g/173/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer online shooter game that looks like a mix of Minecraft and Team Fortress 2.",
      url: "https://www.freetogame.com/open/block-n-load",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Survarium",
      background_image: "https://www.freetogame.com/g/175/thumbnail.jpg",
      free: "1",
      description: "A free to play post-apocalyptic online FPS game.",
      url: "https://www.freetogame.com/open/survarium",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Dungeon Fighter Online",
      background_image: "https://www.freetogame.com/g/177/thumbnail.jpg",
      free: "1",
      description:
        "A free to play arcade-style side-scrolling action game mixed with RPG elements.",
      url: "https://www.freetogame.com/open/dungeon-fighter-online",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Grimoire: Manastorm",
      background_image: "https://www.freetogame.com/g/56/thumbnail.jpg",
      free: "1",
      description: "A free-to-play multiplayer FPS... with wizards. ",
      url: "https://www.freetogame.com/open/grimoire-manastorm",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "StarColony",
      background_image: "https://www.freetogame.com/g/373/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play browser MMO strategy game that puts you in command of a rapidly growing city on a dangerous alien world.",
      url: "https://www.freetogame.com/open/starcolony",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "One Piece Online",
      background_image: "https://www.freetogame.com/g/394/thumbnail.jpg",
      free: "1",
      description: "One Piece Online is a 2D Tower Defense Action MMO! ",
      url: "https://www.freetogame.com/open/one-piece-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Transformice",
      background_image: "https://www.freetogame.com/g/179/thumbnail.jpg",
      free: "1",
      description: "A cute little free-to-play MMO platformer.",
      url: "https://www.freetogame.com/open/transformice",
      genre: "Fantasy",
      released: "0000-00-00"
    },
    {
      name: "Gear Up",
      background_image: "https://www.freetogame.com/g/180/thumbnail.jpg",
      free: "1",
      description:
        "Control your unique tank or robot in multiplayer arcade action!",
      url: "https://www.freetogame.com/open/gear-up",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "8BitMMO",
      background_image: "https://www.freetogame.com/g/181/thumbnail.jpg",
      free: "1",
      description:
        "A free to play retro\u00ad-style 2D MMO and a giant construction sandbox! ",
      url: "https://www.freetogame.com/open/8bitmmo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Siegelord",
      background_image: "https://www.freetogame.com/g/399/thumbnail.jpg",
      free: "1",
      description: "A free to play 2D medieval fantasy browser-based MMORTS.",
      url: "https://www.freetogame.com/open/siegelord",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dungeon Defenders 2",
      background_image: "https://www.freetogame.com/g/182/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cooperative 3D tower-defense game by Trendy Entertainment.",
      url: "https://www.freetogame.com/open/dungeon-defenders-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Blockade 3D",
      background_image: "https://www.freetogame.com/g/184/thumbnail.jpg",
      free: "1",
      description: "A free to play FPS in an editable procedural world.",
      url: "https://www.freetogame.com/open/blockade-3d",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Eldevin",
      background_image: "https://www.freetogame.com/g/185/thumbnail.jpg",
      free: "1",
      description: "A indie story-driven Free to Play MMORPG.",
      url: "https://www.freetogame.com/open/eldevin",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Double Action",
      background_image: "https://www.freetogame.com/g/186/thumbnail.jpg",
      free: "1",
      description: "A free to play FPS with bullet time and stylish kills!",
      url: "https://www.freetogame.com/open/double-action",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Pox Nora",
      background_image: "https://www.freetogame.com/g/187/thumbnail.jpg",
      free: "1",
      description:
        "A multiplayer online game that combines a collectible card game with a turn-based strategy game.",
      url: "https://www.freetogame.com/open/pox-nora",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Counter-Strike Nexon: Studio",
      background_image: "https://www.freetogame.com/g/188/thumbnail.jpg",
      free: "1",
      description:
        "What's better than Counter-Strike? Counter-Strike with more modes and Zombies!",
      url: "https://www.freetogame.com/open/counter-strike-nexon",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Uncharted Waters Online",
      background_image: "https://www.freetogame.com/g/189/thumbnail.jpg",
      free: "1",
      description: "A free to play adventure MMORPG set on the high seas! ",
      url: "https://www.freetogame.com/open/uncharted-waters-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "ArcheAge",
      background_image: "https://www.freetogame.com/g/10/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, hybrid fantasy/sandbox MMORPG brought to you by Trion Worlds.",
      url: "https://www.freetogame.com/open/archeage",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Tribal Wars 2",
      background_image: "https://www.freetogame.com/g/404/thumbnail.jpg",
      free: "1",
      description:
        "The sequel to the classic city-building strategy game Tribal Wars! ",
      url: "https://www.freetogame.com/open/tribal-wars-2",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "WAKFU",
      background_image: "https://www.freetogame.com/g/192/thumbnail.jpg",
      free: "1",
      description:
        "A 2D tactical turn-based fantasy MMORPG developed by Ankama Games, in conjunction with Square Enix.",
      url: "https://www.freetogame.com/open/wakfu",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Infinity Wars",
      background_image: "https://www.freetogame.com/g/193/thumbnail.jpg",
      free: "1",
      description:
        "A MMO trading card game, Build up your decks and customize them with tons of factional cards! ",
      url: "https://www.freetogame.com/open/infinity-wars",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Divine Souls",
      background_image: "https://www.freetogame.com/g/195/thumbnail.jpg",
      free: "1",
      description:
        "A action-based MMORPG in a fantasy world with magic and technology. ",
      url: "https://www.freetogame.com/open/divine-souls",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Cubic Castles",
      background_image: "https://www.freetogame.com/g/196/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D Platforming and a open world building game.",
      url: "https://www.freetogame.com/open/cubic-castles",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Creativerse",
      background_image: "https://www.freetogame.com/g/198/thumbnail.jpg",
      free: "1",
      description:
        "Playful Corporation enters the sandbox, voxel world with their free-to-play name Creativers.",
      url: "https://www.freetogame.com/open/creativerse",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Royal Quest",
      background_image: "https://www.freetogame.com/g/199/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG game with unique PvPvE locations, PvP Arenas, Battlegrounds and Castle Sieges. ",
      url: "https://www.freetogame.com/open/royal-quest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Guns and Robots",
      background_image: "https://www.freetogame.com/g/200/thumbnail.jpg",
      free: "1",
      description:
        "A free to play online third person shooter with massive customization! ",
      url: "https://www.freetogame.com/open/guns-and-robots",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Bleach Online",
      background_image: "https://www.freetogame.com/g/348/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser based MMORPG based on Bleach, the popular manga and anime series.",
      url: "https://www.freetogame.com/open/bleach-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Robocraft",
      background_image: "https://www.freetogame.com/g/203/thumbnail.jpg",
      free: "1",
      description: "A free-to-play MMO sandbox building game! ",
      url: "https://www.freetogame.com/open/robocraft",
      genre: "MMO",
      released: "0000-00-00"
    },
    {
      name: "Unturned",
      background_image: "https://www.freetogame.com/g/204/thumbnail.jpg",
      free: "1",
      description:
        "A independently developed free-to-play MMO survival \r\ngame! ",
      url: "https://www.freetogame.com/open/unturned",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Freestyle2: Street Basketball",
      background_image: "https://www.freetogame.com/g/209/thumbnail.jpg",
      free: "1",
      description:
        "A free to play MMO street basketball game. Team up with the best street ballers! ",
      url: "https://www.freetogame.com/open/freestyle2-street-basketball",
      genre: "Sports",
      released: "0000-00-00"
    },
    {
      name: "Fistful of Frags",
      background_image: "https://www.freetogame.com/g/210/thumbnail.jpg",
      free: "1",
      description: "A first person shooter game set in the Wild West! ",
      url: "https://www.freetogame.com/open/fistful-of-frags",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "GunZ 2: The Second Duel",
      background_image: "https://www.freetogame.com/g/211/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer Third Person Shooter and follow up to the successful GunZ: The Duel. ",
      url: "https://www.freetogame.com/open/gunz-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Archeblade",
      background_image: "https://www.freetogame.com/g/213/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play PvP-based multiplayer action game based on a Korean Fantasy Novel.",
      url: "https://www.freetogame.com/open/archeblade",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Villagers and Heroes",
      background_image: "https://www.freetogame.com/g/214/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy sandbox 3D MMORPG that has plenty to offer gamers.",
      url: "https://www.freetogame.com/open/villagers-and-heroes",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Hex",
      background_image: "https://www.freetogame.com/g/215/thumbnail.jpg",
      free: "1",
      description:
        "HEX combines roleplaying aspects of a MMO with the collectible and strategic gameplay of a Trading Card Game.",
      url: "https://www.freetogame.com/open/hex",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Pocket Starships",
      background_image: "https://www.freetogame.com/g/405/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play cross-platform space combat MMO from SPYR games.",
      url: "https://www.freetogame.com/open/pocket-starships",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Sparta: War of Empires",
      background_image: "https://www.freetogame.com/g/409/thumbnail.jpg",
      free: "1",
      description:
        "A 2D browser-based MMORTS in which players must exercise their city-management skills to construct and upgrade different structures and troops.",
      url: "https://www.freetogame.com/open/sparta-war-empires",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dogs of War Online",
      background_image: "https://www.freetogame.com/g/239/thumbnail.jpg",
      free: "1",
      description: "Based on the famous miniature board game Confrontation!",
      url: "https://www.freetogame.com/open/dogs-war-online",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Hearthstone: Heroes of Warcraft",
      background_image: "https://www.freetogame.com/g/220/thumbnail.jpg",
      free: "1",
      description:
        "Blizzard's free-to-play collectible card game that \r\ndraws its inspiration from World of Warcraft. ",
      url: "https://www.freetogame.com/open/hearthstone-heroes-warcraft",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Lucent Heart",
      background_image: "https://www.freetogame.com/g/221/thumbnail.jpg",
      free: "1",
      description:
        "A free to play MMORPG with a match making system that helps players find their soulmates.",
      url: "https://www.freetogame.com/open/lucent-heart",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "League of Angels",
      background_image: "https://www.freetogame.com/g/376/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based fantasy MMORPG with turn-based combat.",
      url: "https://www.freetogame.com/open/league-of-angels",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Aura Kingdom",
      background_image: "https://www.freetogame.com/g/206/thumbnail.jpg",
      free: "1",
      description:
        "Aura Kingdom is a 3D free-to-play Anime MMORPG from the same great studio that brought us Eden Eterna.",
      url: "https://www.freetogame.com/open/aura-kingdom",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Crystal Saga",
      background_image: "https://www.freetogame.com/g/424/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based MMORPG that allows players to explore the land of Vidalia.",
      url: "https://www.freetogame.com/open/crystal-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "World of Warplanes",
      background_image: "https://www.freetogame.com/g/224/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play flight combat MMO brought to you by Wargaming.",
      url: "https://www.freetogame.com/open/world-of-warplanes",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "RIFT",
      background_image: "https://www.freetogame.com/g/225/thumbnail.jpg",
      free: "1",
      description:
        "Trion Worlds\u2019 flagship fantasy massively multiplayer online role-playing game.",
      url: "https://www.freetogame.com/open/rift",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Path of Exile",
      background_image: "https://www.freetogame.com/g/226/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play massively multiplayer online ARPG in the style of Diablo.",
      url: "https://www.freetogame.com/open/path-of-exile",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Soldiers Inc.",
      background_image: "https://www.freetogame.com/g/411/thumbnail.jpg",
      free: "1",
      description: "A free to play 2D top-down browser based MMORTS game.",
      url: "https://www.freetogame.com/open/soldiers-inc",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Nords: Heroes of the North",
      background_image: "https://www.freetogame.com/g/412/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based 2D strategy MMO game with Elves, Orcs, Dragons and more.",
      url: "https://www.freetogame.com/open/nords-heroes-north",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Dota 2",
      background_image: "https://www.freetogame.com/g/229/thumbnail.jpg",
      free: "1",
      description: "Valve's premiere competitive free to play MOBA.",
      url: "https://www.freetogame.com/open/dota-2",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Ragnarok Online 2",
      background_image: "https://www.freetogame.com/g/230/thumbnail.jpg",
      free: "1",
      description:
        "A 3D fantasy MMORPG, and sequel to the popular Ragnarok Online.",
      url: "https://www.freetogame.com/open/ragnarok-online-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Panzar",
      background_image: "https://www.freetogame.com/g/231/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play multiplayer third-person shooter with \r\nrpg elements and CryEngine 3 powered \r\ngraphics.",
      url: "https://www.freetogame.com/open/panzar",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Kingdom Wars",
      background_image: "https://www.freetogame.com/g/233/thumbnail.jpg",
      free: "1",
      description: "A free to play 3D MMORTS with real-time siege combat.",
      url: "https://www.freetogame.com/open/kingdom-wars",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Champions of Regnum",
      background_image: "https://www.freetogame.com/g/234/thumbnail.jpg",
      free: "1",
      description: "A free to play, realm versus realm fantasy MMORPG.",
      url: "https://www.freetogame.com/open/champions-of-regnum",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Star Conflict",
      background_image: "https://www.freetogame.com/g/235/thumbnail.jpg",
      free: "1",
      description: "A free to play action-packed MMO space simulation game.",
      url: "https://www.freetogame.com/open/star-conflict",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rail Nation",
      background_image: "https://www.freetogame.com/g/414/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D browser-based train simulation strategy MMO game.",
      url: "https://www.freetogame.com/open/rail-nation",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Epic Cards Battle",
      background_image: "https://www.freetogame.com/g/240/thumbnail.jpg",
      free: "1",
      description:
        "A free to play online strategic trading card game with dozens of cards and five factions. ",
      url: "https://www.freetogame.com/open/epic-card-battle",
      genre: "Card Game",
      released: "0000-00-00"
    },
    {
      name: "Age of Wushu",
      background_image: "https://www.freetogame.com/g/232/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play martial arts action MMORPG with a large open world and sandbox-like features.",
      url: "https://www.freetogame.com/open/age-of-wushu",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Everquest",
      background_image: "https://www.freetogame.com/g/241/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy MMORPG nearly two decades in the making. In fact, it\u2019s the game that started it all! ",
      url: "https://www.freetogame.com/open/everquest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Mabinogi",
      background_image: "https://www.freetogame.com/g/242/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play adventure MMORPG where you can create a unique character and live your fantasy life.",
      url: "https://www.freetogame.com/open/mabinogi",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Stormfall: Age of War",
      background_image: "https://www.freetogame.com/g/415/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 2D top-down browser MMORTS featuring castle building, resource management and PvP battles.",
      url: "https://www.freetogame.com/open/stormfall-age-war",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "AirMech Strike",
      background_image: "https://www.freetogame.com/g/244/thumbnail.jpg",
      free: "1",
      description: "A free to play Action RTS with MOBA elements.",
      url: "https://www.freetogame.com/open/airmech",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Big Farm",
      background_image: "https://www.freetogame.com/g/349/thumbnail.jpg",
      free: "1",
      description: "A friendly browser-based farming simulation MMO game!",
      url: "https://www.freetogame.com/open/big-farm",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Wartune",
      background_image: "https://www.freetogame.com/g/416/thumbnail.jpg",
      free: "1",
      description:
        "A 2D browser-based Strategy MMORPG with classic turn based RPG features.",
      url: "https://www.freetogame.com/open/wartune",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Pirate 101",
      background_image: "https://www.freetogame.com/g/246/thumbnail.jpg",
      free: "1",
      description:
        "A free to play Pirate-themed MMORPG designed with kids in mind.",
      url: "https://www.freetogame.com/open/pirate-101",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dino Storm",
      background_image: "https://www.freetogame.com/g/417/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D MMO with cowboys, dinosaurs, and laser guns.",
      url: "https://www.freetogame.com/open/dino-storm",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "The Settlers Online",
      background_image: "https://www.freetogame.com/g/418/thumbnail.jpg",
      free: "1",
      description:
        "A free to play city building MMORTS based on the popular Settlers series.",
      url: "https://www.freetogame.com/open/the-settlers-online",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Continent of the Ninth Seal",
      background_image: "https://www.freetogame.com/g/248/thumbnail.jpg",
      free: "1",
      description:
        "A free MMORPG where players take part as heroes of Glenheim to stand together against Nefer.",
      url: "https://www.freetogame.com/open/c9",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Counter-Strike: Global Offensive",
      background_image: "https://www.freetogame.com/g/24/thumbnail.jpg",
      free: "1",
      description: "The popular multiplayer shooter from Valve. ",
      url: "https://www.freetogame.com/open/counter-strike-global-offensive",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Gotham City Impostors",
      background_image: "https://www.freetogame.com/g/453/thumbnail.jpg",
      free: "1",
      description:
        "A free to play multiplayer FPS that pits vigilantes dressed up like Batman against criminals dressed up like the Joker",
      url: "https://www.freetogame.com/open/gotham-city-impostors",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "RPG MO",
      background_image: "https://www.freetogame.com/g/249/thumbnail.jpg",
      free: "1",
      description:
        "A nostalgic free MMORPG reminiscent of old-school RPG's like Ultima and Runescape.",
      url: "https://www.freetogame.com/open/rpg-mo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Realm of the Mad God",
      background_image: "https://www.freetogame.com/g/256/thumbnail.jpg",
      free: "1",
      description:
        "A fast paced 2d free to play MMO shooter game with a retro 8-bit style.",
      url: "https://www.freetogame.com/open/realm-mad-god",
      genre: "MMORPG",
      released: "2022-09-15"
    },
    {
      name: "Pirates: Tides of Fortune",
      background_image: "https://www.freetogame.com/g/422/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based 2D MMORTS for people who are fans of pirates!",
      url: "https://www.freetogame.com/open/pirates-tides-fortune",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Stronghold Kingdoms",
      background_image: "https://www.freetogame.com/g/255/thumbnail.jpg",
      free: "1",
      description:
        "A strategy based building/warfare game based on the long running Strongholds PC game series.",
      url: "https://www.freetogame.com/open/stronghold-kingdoms",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Star Wars: The Old Republic",
      background_image: "https://www.freetogame.com/g/257/thumbnail.jpg",
      free: "1",
      description:
        "A 3D sci-fi MMORPG based on the popular Star Wars universe and brought to you by Bioware. ",
      url: "https://www.freetogame.com/open/swtor",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "5Street",
      background_image: "https://www.freetogame.com/g/292/thumbnail.jpg",
      free: "1",
      description: "A free-to-play dancing MMO and a unique social experience.",
      url: "https://www.freetogame.com/open/5street",
      genre: "Social",
      released: "0000-00-00"
    },
    {
      name: "No More Room in Hell",
      background_image: "https://www.freetogame.com/g/261/thumbnail.jpg",
      free: "1",
      description:
        "A free to play cooperative FPS survival horror mod for the Source Engine.",
      url: "https://www.freetogame.com/open/no-more-room-in-hell",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Digimon Masters Online",
      background_image: "https://www.freetogame.com/g/262/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMORPG based on the popular Digimon franchise.",
      url: "https://www.freetogame.com/open/digimon-masters-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Dragon Nest",
      background_image: "https://www.freetogame.com/g/264/thumbnail.jpg",
      free: "1",
      description: "A free-to-play action MMORPG with non-targeting combat.",
      url: "https://www.freetogame.com/open/dragon-nest",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Mission Against Terror",
      background_image: "https://www.freetogame.com/g/267/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast-paced lobby-based MMOFPS with lots of game modes and tons of weapons.",
      url: "https://www.freetogame.com/open/mat",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Spiral Knights",
      background_image: "https://www.freetogame.com/g/269/thumbnail.jpg",
      free: "1",
      description:
        "A massively multiplayer online role-playing game, battle monsters and collect treasures!",
      url: "https://www.freetogame.com/open/spiral-knights",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Steel Legions",
      background_image: "https://www.freetogame.com/g/423/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3d browser based tank game with fast-paced tactical battles! ",
      url: "https://www.freetogame.com/open/steel-legions",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Asda Global",
      background_image: "https://www.freetogame.com/g/271/thumbnail.jpg",
      free: "1",
      description:
        "A 3D anime-inspired fantasy MMORPG and is the successor to the original Asda Story.",
      url: "https://www.freetogame.com/open/asda-global",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Brink",
      background_image: "https://www.freetogame.com/g/60/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play first-person-shoot developed by Splash \r\nDamage and published by Bethesda Softworks. ",
      url: "https://www.freetogame.com/open/brink",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Allods Online",
      background_image: "https://www.freetogame.com/g/272/thumbnail.jpg",
      free: "1",
      description:
        "A fantasy MMORPG that follows more traditional \u201cWorld of Warcraft-like\u201d MMO traditions.",
      url: "https://www.freetogame.com/open/allods-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Elsword",
      background_image: "https://www.freetogame.com/g/205/thumbnail.jpg",
      free: "1",
      description:
        "A Free to Play 3D side scrolling action MMORPG with many heroes.",
      url: "https://www.freetogame.com/open/elsword",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "DC Universe Online",
      background_image: "https://www.freetogame.com/g/260/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play, comics based MMORPG set in the popular DC Comics universe.",
      url: "https://www.freetogame.com/open/dcuo",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Bloodline Champions",
      background_image: "https://www.freetogame.com/g/273/thumbnail.jpg",
      free: "1",
      description:
        "Free-to-Play Moba game where players engage in short battles of up to ten players divided into two teams.",
      url: "https://www.freetogame.com/open/bloodline-champions",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "GetAmped 2",
      background_image: "https://www.freetogame.com/g/274/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fighting MMO, experience frantic battles up to 20 players.",
      url: "https://www.freetogame.com/open/getamped-2",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Dragon Saga",
      background_image: "https://www.freetogame.com/g/275/thumbnail.jpg",
      free: "1",
      description:
        "A free to play arcade\u00ad-style side\u00ad-scrolling 3D MMORPG.",
      url: "https://www.freetogame.com/open/dragon-saga",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Vindictus",
      background_image: "https://www.freetogame.com/g/276/thumbnail.jpg",
      free: "1",
      description:
        "A free to play action MMO game with beautiful graphics and intense battles.",
      url: "https://www.freetogame.com/open/vindictus",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Aika Online",
      background_image: "https://www.freetogame.com/g/277/thumbnail.jpg",
      free: "1",
      description: "A free-to-play MMORPG with large scale PvP battles.",
      url: "https://www.freetogame.com/open/aika-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "APB Reloaded",
      background_image: "https://www.freetogame.com/g/258/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMO third person shooter game brought to you by GTA creator.",
      url: "https://www.freetogame.com/open/apb",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Mortal Online",
      background_image: "https://www.freetogame.com/g/278/thumbnail.jpg",
      free: "1",
      description: "A unique free to play First Person sandbox MMORPG.",
      url: "https://www.freetogame.com/open/mortal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Grand Fantasia",
      background_image: "https://www.freetogame.com/g/281/thumbnail.jpg",
      free: "1",
      description:
        "A free to play anime inspired 3D MMORPG with customizable characters and \r\ncompanions.",
      url: "https://www.freetogame.com/open/grand-fantasia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Grepolis",
      background_image: "https://www.freetogame.com/g/425/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based strategy MMORTS set in Ancient Greece.",
      url: "https://www.freetogame.com/open/grepolis",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "League of Legends",
      background_image: "https://www.freetogame.com/g/286/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MOBA game, and one of the most played pc game in the world.",
      url: "https://www.freetogame.com/open/league-of-legends",
      genre: "MOBA",
      released: "0000-00-00"
    },
    {
      name: "Twelve Sky 2",
      background_image: "https://www.freetogame.com/g/287/thumbnail.jpg",
      free: "1",
      description:
        "There\u2019s a lot of world to explore in this fantasy MMORPG!",
      url: "https://www.freetogame.com/open/twelve-sky-2",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Champions Online",
      background_image: "https://www.freetogame.com/g/288/thumbnail.jpg",
      free: "1",
      description:
        "A superhero MMORPG created by the same studio behind City of Heroes.",
      url: "https://www.freetogame.com/open/champions-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Might And Magic Heroes Online",
      background_image: "https://www.freetogame.com/g/402/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMO strategy RPG game in which you control powerful Heroes! ",
      url: "https://www.freetogame.com/open/might-magic-heroes-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "WolfTeam",
      background_image: "https://www.freetogame.com/g/280/thumbnail.jpg",
      free: "1",
      description: "A free to play MMOFPS with a twist.",
      url: "https://www.freetogame.com/open/wolfteam",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Runes of Magic",
      background_image: "https://www.freetogame.com/g/290/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy 3D MMORPG set in the fantasy world of Taborea.",
      url: "https://www.freetogame.com/open/runes-of-magic",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "theHunter",
      background_image: "https://www.freetogame.com/g/291/thumbnail.jpg",
      free: "1",
      description:
        "An MMO shooter where players can hunt 22 different animals in various locations.",
      url: "https://www.freetogame.com/open/thehunter",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "AION",
      background_image: "https://www.freetogame.com/g/254/thumbnail.jpg",
      free: "1",
      description:
        "A high fantasy, free-to-play MMORPG that centers on the war between the game\u2019s two factions: The Asmodians and the Elyos.",
      url: "https://www.freetogame.com/open/aion",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Atlantica Online",
      background_image: "https://www.freetogame.com/g/293/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 3D tactical massively multiplayer online role-playing game.",
      url: "https://www.freetogame.com/open/atlantica-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Florensia",
      background_image: "https://www.freetogame.com/g/295/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fantasy MMORPG with legendary worlds ashore and at \r\nsea.",
      url: "https://www.freetogame.com/open/florensia",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "4Story",
      background_image: "https://www.freetogame.com/g/306/thumbnail.jpg",
      free: "1",
      description:
        "A enjoyable MMORPG where you can customize your character, join guilds and battle other factions.",
      url: "https://www.freetogame.com/open/4story",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "AdventureQuest Worlds",
      background_image: "https://www.freetogame.com/g/426/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play 2D fantasy browser MMORPG. There are no downloads or software to install! ",
      url: "https://www.freetogame.com/open/adventurequest-worlds",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Wizard101",
      background_image: "https://www.freetogame.com/g/297/thumbnail.jpg",
      free: "1",
      description: "A free to play MMORPG set in the magical Wizard school.",
      url: "https://www.freetogame.com/open/wizard101",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Perfect World International",
      background_image: "https://www.freetogame.com/g/298/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play fantasy MMORPG, that focuses heavily on Chinese mythology.",
      url: "https://www.freetogame.com/open/pwi",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ace Online",
      background_image: "https://www.freetogame.com/g/319/thumbnail.jpg",
      free: "1",
      description:
        "A free to play fast action 3D sci-fi MMO where players control space fighters jets.",
      url: "https://www.freetogame.com/open/ace-online",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rohan: Blood Feud",
      background_image: "https://www.freetogame.com/g/300/thumbnail.jpg",
      free: "1",
      description: "A free-to-play medieval MMORPG highly-focused on PVP.",
      url: "https://www.freetogame.com/open/rohan-blood-feud",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Age of Conan: Unchained",
      background_image: "https://www.freetogame.com/g/301/thumbnail.jpg",
      free: "1",
      description:
        "A award \u00adwinning massively multiplayer online game that has received critical acclaim.",
      url: "https://www.freetogame.com/open/age-of-conan",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Ikariam",
      background_image: "https://www.freetogame.com/g/428/thumbnail.jpg",
      free: "1",
      description:
        "A free to play browser-based city-building strategy game by GameForge.",
      url: "https://www.freetogame.com/open/ikariam",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Saga",
      background_image: "https://www.freetogame.com/g/303/thumbnail.jpg",
      free: "1",
      description:
        "A free-to-play MMORTS that also features city-building and trading card games.",
      url: "https://www.freetogame.com/open/saga",
      genre: "Strategy",
      released: "0000-00-00"
    },
    {
      name: "Fiesta Online",
      background_image: "https://www.freetogame.com/g/305/thumbnail.jpg",
      free: "1",
      description: "A free to play anime MMORPG with a friendly community.",
      url: "https://www.freetogame.com/open/fiesta-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Shaiya",
      background_image: "https://www.freetogame.com/g/307/thumbnail.jpg",
      free: "1",
      description:
        "A free to play 3D MMORPG similar to World of Warcraft and Lineage 2.",
      url: "https://www.freetogame.com/open/shaiya",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Angels Online",
      background_image: "https://www.freetogame.com/g/308/thumbnail.jpg",
      free: "1",
      description: "A cute anime MMORPG with a good selection of classes.",
      url: "https://www.freetogame.com/open/angels-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Seal Online",
      background_image: "https://www.freetogame.com/g/309/thumbnail.jpg",
      free: "1",
      description:
        "A free MMORP that has been out for a long period of time with solid history under its belt.",
      url: "https://www.freetogame.com/open/seal-online",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "Team Fortress 2",
      background_image: "https://www.freetogame.com/g/310/thumbnail.jpg",
      free: "1",
      description:
        "Valve's iconic class-based free-to-play first-person shooter!",
      url: "https://www.freetogame.com/open/team-fortress-2",
      genre: "Shooter",
      released: "0000-00-00"
    },
    {
      name: "Rumble Fighter",
      background_image: "https://www.freetogame.com/g/311/thumbnail.jpg",
      free: "1",
      description: "A free to play Fighting MMO, test your skills!",
      url: "https://www.freetogame.com/open/rumble-fighter",
      genre: "Fighting",
      released: "0000-00-00"
    },
    {
      name: "Granado Espada Online",
      background_image: "https://www.freetogame.com/g/312/thumbnail.jpg",
      free: "1",
      description:
        "Adventure back to colonial times where you can find prestige, wealth, adventure, and a lot of work.",
      url: "https://www.freetogame.com/open/granado-espada",
      genre: "MMORPG",
      released: "0000-00-00"
    },
    {
      name: "9Dragons",
      background_image: "https://www.freetogame.com/g/265/thumbnail.jpg",
      free: "1",
      description:
        "A martial arts themed MMORPG set in China during the Ming Dynasty.",
      url: "https://www.freetogame.com/open/9dragons"
    }
  ];

  const sql =
    "INSERT INTO products (name, background_image, free, description, url, genre, released) VALUES ?";

  connection.query(sql, [jsonData.map(Object.values)], (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return;
    }
    console.log("Data inserted successfully");
  });

  // Close the database connection
  connection.end();
});
