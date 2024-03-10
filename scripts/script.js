// get all data
const getDataFromAPI = () => {
  isLoading(true);
  try {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => showData(data.data.tools));
  } catch (error) {
    console.log(error);
  }
};
getDataFromAPI();

// get single data for modal
const getSingleDataFromApi = (id) => {
  isLoading(true);
  try {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => modal(data.data));
  } catch (error) {
    console.log(error);
  }
  isLoading(false);
};

// show few data
function showData(data) {
  const showAllData = document.getElementById("showAllData");
  showAllData.innerHTML = "";
  data && data.slice(0, 6).forEach((singleData) => {
      showAllData.appendChild(createSingleItem(singleData));
    });
  const sortByDate = document.getElementById("sortByDate");
  sortByDate.addEventListener("click", () => sort(data.slice(0, 6)));

  // see all data eventHandler
  const seeMore = document.getElementById("seeMore");
  seeMore.addEventListener("click", () => seeMoreData(data));

  isLoading(false);
  isSeeMore(true);
}

// see all data
function seeMoreData(data) {
  const sortByDate = document.getElementById("sortByDate");
  sortByDate.addEventListener("click", () => sort(data));

  const showAllData = document.getElementById("showAllData");
  showAllData.innerHTML = "";
  data && data.forEach((singleData) => {
      showAllData.appendChild(createSingleItem(singleData));
    });

  // hide button
  const btn = document.getElementById("seeMore").parentElement;
  btn.innerHTML = "";
}

// is loading
function isLoading(isLoaded) {
  const loading = document.querySelector("#spinner img");
  if (isLoaded) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
}

// see more
function isSeeMore(isShown) {
  const seeButton = document.querySelector("#seeMore");
  if (isShown) {
    seeButton.classList.remove("d-none");
  } else {
    seeButton.classList.add("d-none");
  }
}

// Function to parse a date string and return a Date object
const parseDate = (dateString) => {
  const [month, day, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};

// sort by data
function sort(data) {
  const showAllData = document.getElementById("showAllData");
  showAllData.innerHTML = "";
  
  data = data.sort((a, b) => {
    return parseDate(a.published_in) - parseDate(b.published_in);
  });

  data && data.forEach((singleData) => {
    showAllData.appendChild(createSingleItem(singleData));
  });
}