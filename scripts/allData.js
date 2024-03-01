const allData = async() => {
    toggleLoadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const courses = data.data.tools;
    displayCourses(courses);
}

const displayCourses = courses => {
    // 1. get the container
    const coursesContainer = document.getElementById('show-courses');

    courses.forEach((course => {
        // 2. create a div
        const courseCard = document.createElement('div');
        courseCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3. set innerHTML
        courseCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${course.image}" alt="" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${course.name}</h2>
        </div>
        `;
        // 4. append child
        coursesContainer.appendChild(courseCard);
    }));
}

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