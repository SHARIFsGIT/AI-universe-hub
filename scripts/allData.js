const allData = async() => {
    toggleLoadingSpinner(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
        const data = await res.json();
        const courses = data.data.tools;
        // displayCourses(courses);
    }
    catch (err) {
        console.log(err);
    }
}

// get single course
function createSingleItem(data){
    const {id, name, image, published_in, features} = data;
    getSingleDataFromApi(id);

    const generateId = `item_${id}`;
    const modalId = `modal_${id}`;
    const div = document.createElement("div");
    div.className = "card bg-base-100 p-4 shadow-xl";
    div.id = generateId;
    div.innerHTML = `<div class="card p-3">
    <img src="${image}" class="rounded" alt="${name}">
    <div class="card-body">
      <h4 class="card-title fw-bold">Features</h4>
      <ol class="ms-3">
        <li>${features[0]}</li>
        <li>${features[1]}</li>
        <li>${features[2]}</li>
      </ol>
      <hr>
      <div class="flex align-items-center justify-content-between">
        <div>
          <h4 class="card-title fw-bold">${name}</h4>
          <p><img src="./assets/icons/calendar.svg" alt="date" loading="lazy"> <span>${published_in}</span></p>
        </div>
  
        <div class="show_details">
          <!-- modal btn or clicker -->
          <button class="btn p-1 border border-danger rounded-circle" data-bs-toggle="modal"
            data-bs-target="#${modalId}">
            <img src="./assets/icons/eye-slash-fill.svg" width="28" alt="show modal eye slash fill icon">
          </button>
        </div>
  
      </div>
    </div>
  </div>`;
  
    return div;
  }

// get single data from api
const getSingleDataFromApi = (id) => {
    toggleLoadingSpinner(true);
    try {
        const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
        fetch(URL)
          .then((res) => res.json())
          .then((data) => modal(data.data));
        }
        catch (error) {
            console.log(error);
        }
        isLoading(false);
    };

// const displayCourses = courses => {
//     // 1. get the container
//     const coursesContainer = document.getElementById('show-courses');

//     courses.forEach((course => {
//         // 2. create a div
//         const courseCard = document.createElement('div');
//         courseCard.classList = `card bg-base-100 p-4 shadow-xl`;
//         // 3. set innerHTML
//         courseCard.innerHTML = `
//         <figure class="px-10 pt-10">
//             <img src="${course.image}" alt="" class="rounded-xl" />
//         </figure>
//         <div class="card-body items-center text-center">
//             <h2 class="card-title">${course.name}</h2>
//         </div>
//         `;
//         // 4. append child
//         coursesContainer.appendChild(courseCard);
//     }));
// }

// spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};

allData();