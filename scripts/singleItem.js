// Create single data
function createSingleItem(data) {
    const {id, name, image, published_in, features} = data;
  
    // get a single data from api
    // it's call for modals
    getSingleDataFromApi(id);
  
    const generateId = `item_${id}`;
    const modalId = `modal_${id}`;
    const div = document.createElement("div");
    div.className = "col-md-6 col-xl-4";
    div.id = generateId;
    div.innerHTML = `<div class="card p-3">
    <img src="${image}" class="rounded" alt="${name}">
    <div class="card-body">
      <h4 class="card-title fw-bold">Features</h4>
      <ol class="list-group ms-3">
        <li>${features[0]}</li>
        <li>${features[1]}</li>
        <li>${features[2]}</li>
      </ol>
      <hr>
      <div class="d-flex align-items-center justify-content-between">
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
  
  // see more details in modal
  function modal(data) {
    const {
      id,
      tool_name,
      description,
      image_link,
      input_output_examples,
      features,
      integrations,
      pricing,
      accuracy,
    } = data;
    const generateId = `item_${id}`;
    const modalId = `modal_${id}`;
    const showDetails = document.querySelector(`#${generateId} .show_details`);
  
    const div = document.createElement("div");
    div.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="${modalId}Label">${tool_name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row gy-4">
                <div class="col-lg-6">
                  <div class="card border-danger">
                    <div class="card-body">
                      <h4>${description}</h4>
                      <!-- show pricing list -->
                      <div class="row mt-5 mb-4 gx-4 pricing text-center"></div>
                      <div class="row">
                        <div class="col-6">
                          <h3>Features</h3>
                          <ul class="features"></ul>
                        </div>
                        <div class="col-6">
                          <h3>Integrations</h3>
                          <ul class="integrations"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card  position-relative">
                    <span class="position-absolute top-0 end-0  badge rounded-pill bg-danger fs-5 m-2">
                      ${accuracy.score ? accuracy.score : "0.0"}% accuracy
                    </span>
  
                    <img src="${image_link}" class="card-img-top" alt="${tool_name}" loading="lazy" style="
                    background: #e2e0e0;
                    height: 100%;
                    min-height: 250px;">
                    <div class="card-body text-center">
                      <h3>${
                        input_output_examples
                          ? input_output_examples[0].input
                          : "Can you give any example?"
                      }</h3>
                      <p>${
                        input_output_examples
                          ? input_output_examples[0].output
                          : "No! Not Yet! Take a break!!!"
                      }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    showDetails.appendChild(div);
  
    // show pricing Items
    createPricing(pricing, document.querySelector(`#${modalId} .pricing`));
    // show features items
    createFeatures(features, document.querySelector(`#${modalId} .features`));
    // show integrations items
    createIntegrations(
      integrations,
      document.querySelector(`#${modalId} .integrations`)
    );
  }
  
  // Create Pricing Item for modal
  function createPricing(data, id) {
    if (!data) {
      return (id.innerHTML = `<div class="col-4">
    <p class="m-0 p-2 bg-success-subtle">Free of Cost/ <br>Basic</p>
  </div>
  <div class="col-4">
    <p class="m-0 p-2 bg-warning-subtle">Free Of Cost/ <br>Pro</p>
  </div>
  <div class="col-4">
    <p class="m-0 p-2 bg-danger-subtle">Free of Cost/ <br>Enterprise</p>
  </div>`);
    }
    const bg = ["success", "warning", "danger"];
    data.forEach((d, index) => {
      const div = document.createElement("div");
      div.className = "col-4";
      div.innerHTML = `<p class="m-0 p-2 bg-${bg[index]}-subtle">${d.price} <br>${d.plan}</p>`;
      id.appendChild(div);
    });
  }
  
  // create features item for modal
  function createFeatures(data, id) {
    if (!data) {
      return (id.innerHTML = `<li>Computer Vision</li>
      <li>Natural language processing</li>
      <li>Deep Learning</li>
      <li>Machine learning</li>`);
    }
  
    for (const d in data) {
      const li = document.createElement("li");
      li.innerHTML = data[d].feature_name;
      id.appendChild(li);
    }
  }
  
  // create Integrations item for modal
  function createIntegrations(data, id) {
    if (!data) {
      return (id.innerHTML = `Data not found`);
    }
    data.forEach((d) => {
      const li = document.createElement("li");
      li.innerHTML = d;
      id.appendChild(li);
    });
  }