// WRITE YOUR JS CODE HERE

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");
//TodaySpace
const imgToday = document.getElementById("apod-image");
const decToday = document.getElementById("apod-explanation");
const spanDate2 = document.getElementById("apod-date-detail");
const titleToday = document.getElementById("apod-title");
const dateInfo = document.getElementById("apod-date-info");
const dataType = document.getElementById("apod-media-type");
const spanDate3 = document.getElementById("apod-date");
const loader = document.getElementById("apod-loading");
const fullBtn = document.getElementById("btn-full");
const dateInput = document.getElementById("apod-date-input");
const loadBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");
const labalDate = document.querySelector(".date-input-wrapper");
const videoToday = document.getElementById("apod-video");
//////////////////////////////////////////////////////////////////////////
function showLoadingToday(msg) {
  decToday.innerText = msg;
  spanDate2.innerText = msg;
  titleToday.innerText = msg;
  dateInfo.innerText = msg;
  dataType.innerText = msg;
  spanDate3.innerText = `Astronomy Picture of the Day - ${msg}`;
  loader.classList.remove("hidden");
  imgToday.classList.add("hidden");
  videoToday.classList.add("hidden");
}
///////////////////////////////////////////////////////////////////
async function getTodaySpace(date = "") {
  showLoadingToday("Loading...");

  const url = date
    ? `https://api.nasa.gov/planetary/apod?api_key=T8YhYMdr9vdjB0ao2DVwoaAN38cqzyquEwVgXMJt&date=${date}`
    : `https://api.nasa.gov/planetary/apod?api_key=T8YhYMdr9vdjB0ao2DVwoaAN38cqzyquEwVgXMJt`;

  try {
    const res = await fetch(url);

    const data = await res.json();

    if (data.media_type === "image") {
      imgToday.src = data.hdurl || data.url;

      imgToday.classList.remove("hidden");
      videoToday.classList.add("hidden");
      videoToday.src = "";
    } else if (data.media_type === "video") {
      videoToday.src = data.url;

      videoToday.classList.remove("hidden");
      imgToday.classList.add("hidden");
      imgToday.src = "";
    }

    decToday.innerText = data.explanation;
    spanDate2.innerText = data.date;
    titleToday.innerText = data.title;
    dateInfo.innerText = data.date;
    dataType.innerText = data.media_type;
    spanDate3.innerText = `Astronomy Picture of the Day - ${data.date}`;

    dateInput.value = data.date;
    labalDate.dataset.date = data.date;
    dateInput.max = data.date;
  } catch (error) {
    console.error(error);

    videoToday.classList.add("hidden");
    videoToday.src = "";

    imgToday.src = "./assets/images/placeholder.webp";
    imgToday.classList.remove("hidden");

    decToday.innerText = "Please check your internet connection.";
    spanDate2.innerText = "Internet Error";
    titleToday.innerText = "Failed to load";
    dateInfo.innerText = "Internet Error";
    dataType.innerText = "-";
    spanDate3.innerText = "Astronomy Picture of the Day";
  } finally {
    loader.classList.add("hidden");
  }
}
getTodaySpace();
////////////////////////////////////////////////////////////
fullBtn.addEventListener("click", function () {
  if (!imgToday.classList.contains("hidden")) {
    window.open(imgToday.src, "_blank");
  } else {
    window.open(videoToday.src, "_blank");
  }
});
///////////////////////////////////////////////////////////
loadBtn.addEventListener("click", function () {
  const selectedDate = dateInput.value;
  getTodaySpace(selectedDate);
});
///////////////////////////////////////////////////////////////////
todayBtn.addEventListener("click", function () {
  getTodaySpace();
});
////////////////////////////////////////////////////////////////////////
dateInput.addEventListener("input", function () {
  labalDate.dataset.date = dateInput.value;
});
/////lunches
const launchStatus = document.getElementById("launch-status");
const launchName = document.getElementById("launch-name");
const launchCompany = document.getElementById("launch-company");
const launchRocket = document.getElementById("launch-rocket");
const launchDays = document.getElementById("launch-days");
const launchDate = document.getElementById("launch-date");
const launchTime = document.getElementById("launch-time");
const launchLocation = document.getElementById("launch-location");
const launchCountry = document.getElementById("launch-country");
const launchDescription = document.getElementById("launch-description");
const launchDetailsBtn = document.getElementById("launch-details-btn");
const launchImg = document.getElementById("launch-img");
const placeHolder = document.getElementById("place-holder-launch");
///////display
const launchCardImg = document.getElementById("launch-card-img");
const launchCardPlaceholder = document.getElementById(
  "launch-card-placeholder",
);
let launchList = [];

const launchGrid = document.getElementById("launches-grid");
///////////////////////////////////////////////////////////////////////////
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    for (let j = 0; j < sections.length; j++) {
      sections[j].classList.add("hidden");
    }
    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove("active");
    }

    const sectionId = navLinks[i].dataset.section;
    document.getElementById(sectionId).classList.remove("hidden");
    navLinks[i].classList.add("active");
  });
}
/////////////////////////////////////////////////////////////////////////////////////
async function launches() {
  const url = `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const launch = data.results[0];
    launchList = data.results;
    launchName.innerText = launch.image.name;
    launchStatus.innerText = launch.status.abbrev;
    launchCompany.innerText = launch.image.credit;
    launchRocket.innerText = launch.rocket.configuration.name;
    launchDate.innerText = launch.net.split("T")[0];
    launchTime.innerText = launch.net.split("T")[1].slice(0, 5);
    launchLocation.innerText = launch.pad.location.name;
    launchCountry.innerText = launch.pad.country.name;
    launchDescription.innerText = launch.mission.description;

    if (launch.image && launch.image.image_url) {
      launchImg.src = launch.image.image_url;

      launchImg.onload = function () {
        launchImg.classList.remove("hidden");
        placeHolder.classList.add("hidden");
      };

      launchImg.onerror = function () {
        launchImg.classList.add("hidden");
        placeHolder.classList.remove("hidden");
      };
    } else {
      launchImg.classList.add("hidden");
      placeHolder.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
    launchImg.classList.add("hidden");
    placeHolder.classList.remove("hidden");
  }
}
/////////////////////////////////////////////////////////////////////////////
async function call() {
  await launches();
  displayLaunches();
}
///////////////////////////////
call();
/////////////////////////////////////////////////////////
function displayLaunches() {
  let cartona = "";

  for (let i = 1; i < launchList.length; i++) {
    let launch = launchList[i];

    cartona += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">

     ${
       launch.image && launch.image.image_url
         ? `<img
        class="w-full h-full object-cover"
        src="${launch.image.image_url}"
        onerror="this.src='./assets/images/launch-placeholder.png'"
      >`
         : `<img
        class="w-full h-full object-cover"
        src="./assets/images/launch-placeholder.png"
      >`
     }

          <div class="flex ${
            launch.image && launch.image.image_url ? "hidden" : ""
          } items-center justify-center w-full h-full bg-slate-900">
            <i class="fas fa-space-shuttle text-5xl text-slate-700"></i>
          </div>

          <div class="absolute top-3 right-3">
            <span
              class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
            >
              ${launch.status.abbrev}
            </span>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              ${launch.name}
            </h4>

            <p class="text-sm text-slate-400 flex items-center gap-2">
              <i class="fas fa-building text-xs"></i>
              <span>${launch.launch_service_provider.name}</span>
            </p>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.net.split("T")[0]}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.net.split("T")[1].slice(0, 5)}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span class="text-slate-300">${launch.rocket.configuration.name}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="text-slate-300 line-clamp-1">
                ${launch.pad.location.name}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button
              class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
            >
              Details
            </button>

            <button
              class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <i class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  launchGrid.innerHTML = cartona;
}

////////planets
const cardPlanetImg = document.getElementById("planet-detail-image");
const cardPlanetName = document.getElementById("planet-detail-name");
const cardPlanetDec = document.getElementById("planet-detail-description");
const cardPlanetDistance = document.getElementById("planet-distance");
const cardPlanetRudias = document.getElementById("planet-radius");
const cardPlanetMass = document.getElementById("planet-mass");
const cardPlanetDensity = document.getElementById("planet-density");
const cardPlanetOrbital = document.getElementById("planet-orbital-period");
const cardPlanetRotation = document.getElementById("planet-rotation");
const cardPlanetMoons = document.getElementById("planet-moons");
const cardPlanetGravity = document.getElementById("planet-gravity");
//////right part
const cardPlanetDiscoverer = document.getElementById("planet-discoverer");
const cardPlanetDiscoveryDate = document.getElementById(
  "planet-discovery-date",
);
const cardPlanetBodyType = document.getElementById("planet-body-type");
const cardPlanetVolume = document.getElementById("planet-volume");
/////facts
const cardPlanetFact1 = document.getElementById("planet-fact-1");
const cardPlanetFact2 = document.getElementById("planet-fact-2");
const cardPlanetFact3 = document.getElementById("planet-fact-3");
const cardPlanetFact4 = document.getElementById("planet-fact-4");
/////Orbital Characteristics
const cardPlanetPerihelion = document.getElementById("planet-perihelion");
const cardPlanetAphelion = document.getElementById("planet-aphelion");
const cardPlanetEccentricity = document.getElementById("planet-eccentricity");
const cardPlanetInclination = document.getElementById("planet-inclination");
const cardPlanetAxialTilt = document.getElementById("planet-axial-tilt");
const cardPlanetTemp = document.getElementById("planet-temp");
const cardPlanetEscape = document.getElementById("planet-escape");
////////////////////////////////////////////////////////////////
const planetsGrid = document.getElementById("planets-grid");

const planetColors = {
  Mercury: "#eab308",
  Venus: "#f97316",
  Earth: "#3b82f6",
  Mars: "#ef4444",
  Jupiter: "#fb923c",
  Saturn: "#facc15",
  Uranus: "#06b6d4",
  Neptune: "#2563eb",
};

const planetImages = {
  Mercury: "./assets/images/mercury.png",
  Venus: "./assets/images/venus.png",
  Earth: "./assets/images/earth.png",
  Mars: "./assets/images/mars.png",
  Jupiter: "./assets/images/jupiter.png",
  Saturn: "./assets/images/saturn.png",
  Uranus: "./assets/images/uranus.png",
  Neptune: "./assets/images/neptune.png",
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function displayPlanetBtns(planets) {
  let cartona = "";

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];

    const color = planetColors[planet.englishName];
    const image = planetImages[planet.englishName];

    const distance = (planet.semimajorAxis / 149597870.7).toFixed(2);

    cartona += `
    <div
      class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
      data-planet-id="${planet.id}"
      style="--planet-color:${color}"
      onmouseover="this.style.borderColor='${color}80'"
      onmouseout="this.style.borderColor='#334155'"
    >
      <div class="relative mb-3 h-24 flex items-center justify-center">
        <img
          class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
          src="${image}"
          alt="${planet.englishName}"
        />
      </div>

      <h4 class="font-semibold text-center text-sm">
        ${planet.englishName}
      </h4>

      <p class="text-xs text-slate-400 text-center">
        ${distance} AU
      </p>
    </div>
  `;
  }

  planetsGrid.innerHTML = cartona;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
function displayPlanet(planet) {
  cardPlanetImg.src = planet.image;
  cardPlanetName.innerText = planet.englishName;
  cardPlanetDec.innerText = planet.description;
  cardPlanetDistance.innerText =
    (planet.semimajorAxis / 1000000).toFixed(1) + "M km";
  cardPlanetRudias.innerText = planet.equaRadius.toFixed(0) + " km";
  cardPlanetMass.innerText = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
  cardPlanetDensity.innerText = planet.density.toFixed(2) + " g/cm³";
  cardPlanetOrbital.innerText = planet.sideralOrbit.toFixed(2) + "days";
  cardPlanetRotation.innerText = planet.sideralRotation.toFixed(2) + "hours";
  cardPlanetMoons.innerText = planet.moons ? planet.moons.length : 0;
  cardPlanetGravity.innerText = planet.gravity.toFixed(2) + "m/s²";
  cardPlanetDiscoverer.innerText =
    planet.discoveredBy || "Known since antiquity";
  cardPlanetDiscoveryDate.innerText = planet.discoveryDate || "Ancient times";
  cardPlanetBodyType.innerText = planet.bodyType;
  cardPlanetVolume.innerText = `
  ${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`;

  /////////////////////////////////////////////////////////////////////////////////////////////////
  cardPlanetFact1.innerText = `Mass: ${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
  cardPlanetFact2.innerText = `Surface gravity: ${planet.gravity} m/s²`;
  cardPlanetFact3.innerText = `Density: ${planet.density.toFixed(4)} g/cm³`;
  cardPlanetFact4.innerText = `Axial tilt: ${planet.axialTilt}°`;
  /////////////////////////////////////////////////////////////////////////////////////
  cardPlanetPerihelion.innerText =
    (planet.perihelion / 1000000).toFixed(1) + "M km";
  cardPlanetAphelion.innerText =
    (planet.aphelion / 1000000).toFixed(1) + "M km";
  cardPlanetEccentricity.innerText = planet.eccentricity.toFixed(4);
  cardPlanetInclination.innerText = planet.inclination
    ? planet.inclination.toFixed(2) + "°"
    : "N/A";
  cardPlanetAxialTilt.innerText = planet.axialTilt.toFixed(2) + "°";
  cardPlanetTemp.innerText = planet.avgTemp ? planet.avgTemp + "°C" : "N/A";
  cardPlanetEscape.innerText = (planet.escape / 1000).toFixed(1) + " km/s";
}

///////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
function displayPlanets(planets) {
  const tbody = document.getElementById("planet-comparison-tbody");

  const typeClasses = {
    Terrestrial: "background-color: #f9731680; color: #fb923c",
    "Gas Giant": "background-color: #a855f780; color: #c084fc",
    "Ice Giant": "background-color: #3b82f680; color: #60a5fa",
  };

  tbody.innerHTML = "";
  const earthMass = 5.97237e24;
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    const moon = planet.moons ? planet.moons.length : 0;

    let color = planetColors[planet.englishName] || "#94a3b8";
    let badgeClass =
      typeClasses[planet.type] || "bg-slate-500/50 text-slate-200";
    console.log(badgeClass);

    tbody.innerHTML += `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-2 md:space-x-3">
            <div
              class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
              style="background-color: ${color}"
            ></div>

            <span class="font-semibold text-sm md:text-base whitespace-nowrap">
              ${planet.englishName}
            </span>
          </div>
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${(planet.semimajorAxis / 149597870.7).toFixed(2)}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${(planet.equaRadius * 2).toLocaleString()}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${((planet.mass.massValue * 10 ** planet.mass.massExponent) / earthMass).toFixed(3)}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${(planet.sideralOrbit / 365).toFixed(1)}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${moon}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <span class="px-2 py-1 rounded text-xs " style="${badgeClass}">
            ${planet.type}
          </span>
        </td>
      </tr>
    `;
  }
}

///////////////////////////////////////////////////////////

async function planets() {
  const url = `https://solar-system-opendata-proxy.vercel.app/api/planets`;
  const res = await fetch(url);
  const data = await res.json();
  const planet = data.bodies;
  console.log(planet);
  displayPlanets(planet);
  displayPlanetBtns(planet);
  const cards = document.querySelectorAll(".planet-card");

  for (let i = 0; i < planet.length; i++) {
    if (planet[i].id == "terre") {
      displayPlanet(planet[i]);
    }
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      const planetId = cards[i].dataset.planetId;

      for (let j = 0; j < planet.length; j++) {
        if (planet[j].id === planetId) {
          displayPlanet(planet[j]);
          break;
        }
      }
    });
  }
}

planets();
