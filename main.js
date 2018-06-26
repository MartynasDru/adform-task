const streetsList =  document.querySelector('.main-list');

function loadData(path, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
};

loadData('./data.json',
        function(data) {
            json = JSON.parse(data);
            if (json.streets.length <= 1) {
                return;
            }
            for (let i = 0; i < json.streets.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = json.streets[i];
                streetsList.appendChild(li);
            }
        },
        function(xhr) { 
            console.error(xhr); 
        }
);

const dataArr = [];
document.querySelector(".main-button").addEventListener("click", function() {
    for (let i = 0; i < 25; i++) {
        for(let i = 0; i < 5; i++) {
            loadData('https://swapi.co/api/people/',
                function(data) {
                    dataArr.push(data.results)
                },
                function(xhr) {
                    console.error(xhr);
                }
            )
        }
        console.log(dataArr);
    }   
}
);