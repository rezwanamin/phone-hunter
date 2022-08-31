document.getElementById('brandName').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        loadPhone();
    }
})
const loadPhone = async (search) => {
    toggleSpiner(true);
    const searchField = document.getElementById('brandName');
    const searchValue = searchField.value;
    search = searchValue;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    displayPhones(data.data);
    searchField.value = '';
}
const displayPhones = data => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    if (data.length === 0) {
        document.getElementById('no-phone-msg').classList.remove('d-none');
    }
    else {
        document.getElementById('no-phone-msg').classList.add('d-none');
    }

    data.slice(0, 12).forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card bg-light">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"><span class="bg-danger px-4 py-1 text-white rounded-5">${phone.brand}</span></p>
            <div class="d-flex flex-column justify-content-center align-items-center mx-auto">
            <a href="#" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
        </div>`;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpiner(false);
}

const toggleSpiner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading == true) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}