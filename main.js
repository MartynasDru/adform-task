const streetsList =  document.querySelector('.main-list');

axios.get('./data.json')
    .then((response) => {
        const json = response.data;
        if (json.streets.length <= 1) {
            return;
        }
        for (let i = 0; i < json.streets.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = json.streets[i];
            streetsList.appendChild(li);
        }
    })
    .catch((error) => {
        console.log(error);
    });

document.querySelector(".main-button").addEventListener("click", () => {
    var q = async.queue((task, cb) => {
        if (task.unshift) {
            console.log('Highest priority request fired!');
        } else {
            console.log('Normal request fired!');
        }
        axios.get(task.url)
            .then((response) => {
                console.log('Response arrived');
                cb();
            })
            .catch((error) => {
                console.log(error);
            });
    }, 5);

    q.drain = () => {
        console.log('All the work has been done');
    };

    const names = [];
    for (let i = 2; i < 101; i++) {
        q.push({RequestNumber: i, unshift: false, url: `https://jsonplaceholder.typicode.com/posts/${i}`});
    }  

    q.unshift({RequestNumber: 1, unshift: true, url: `https://jsonplaceholder.typicode.com/posts/${1}`});
});

// const loadData = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                     json = JSON.parse(xhr.responseText);
//                     if (json.streets.length <= 1) {
//                         return;
//                     }
//                     for (let i = 0; i < json.streets.length; i++) {
//                         const li = document.createElement('li');
//                         li.innerHTML = json.streets[i];
//                         streetsList.appendChild(li);
//                     }
//             } else {
//                 console.log(error);
//             }
//         }
//     };
//     xhr.open("GET", './data.json', true);
//     xhr.send();
// };

// loadData();

