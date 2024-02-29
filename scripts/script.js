// Fetch or get data from API
const getDataFromAPI = () => {
    isLoading(true);
    try {
      // data or API source
      const URL = `https://openapi.programming-hero.com/api/ai/tools`;
      // fetch data
      fetch(URL)
        .then((res) => res.json())
        .then((data) => showData(data.data.tools));
    } catch (error) {
      console.log(error);
    }
  };
  getDataFromAPI();
  
  
  // get singleData from api
  const getSingleDataFromApi = (id) => {
    isLoading(true);
  
    try {
      // data or API source
      const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
      // fetch data
      fetch(URL)
        .then((res) => res.json())
        .then((data) => modal(data.data));
    } catch (error) {
      console.log(error);
    }
  
    isLoading(false);
  };
  
  // See 0 to 6 data
  function showData(data) {
    const show_all_data = document.getElementById("show_all_data");
    show_all_data.innerHTML = "";
    data &&
      data.slice(0, 6).forEach((singleData) => {
        show_all_data.appendChild(createSingleItem(singleData));
      });
    const sort_by_date = document.getElementById("sort_by_date");
    sort_by_date.addEventListener("click", () => sortByDate(data.slice(0, 6)));
  
    // see all data eventHandler
    const see_more = document.getElementById("see_more");
    see_more.addEventListener("click", () => seeMoreData(data));
  
    isLoading(false);
  }
  
  // see all data
  function seeMoreData(data) {
    const sort_by_date = document.getElementById("sort_by_date");
    sort_by_date.addEventListener("click", () => sortByDate(data));
  
    const show_all_data = document.getElementById("show_all_data");
    show_all_data.innerHTML = "";
    data &&
      data.forEach((singleData) => {
        show_all_data.appendChild(createSingleItem(singleData));
      });
  
    // hide button
    const btn = document.getElementById("see_more").parentElement;
    btn.innerHTML = "";
  }
  
  // is loading
  function isLoading(isLoaded) {
    const loading = document.querySelector("#loading img");
    if (isLoaded) {
      loading.classList.remove("d-none");
    } else {
      loading.classList.add("d-none");
    }
  }
  
  // Function to parse a date string and return a Date object
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  };
  
  // sort by data
  function sortByDate(data) {
    const show_all_data = document.getElementById("show_all_data");
    show_all_data.innerHTML = "";
  
    data = data.sort((a, b) => {
      return parseDate(a.published_in) - parseDate(b.published_in);
    });
  
    data &&
      data.forEach((singleData) => {
        show_all_data.appendChild(createSingleItem(singleData));
      });
  }