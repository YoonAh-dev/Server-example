const addSum = (a, b, callback) => {
    setTimeout(() => {
        if(typeof a !== 'number' || typeof b !== 'number') {
            return callback('a, b must be numbers');
        }
        return callback(undefined, a+b);
    }, 1000);
}

addSum(10, 123, (err, sum) => {
    if(err) return console.log({ err });
    console.log({ sum });
    addSum(sum, 15, (err, sum) => {
        if(err) return console.log({ err });
        console.log({ sum });
    })
});

const addSSum = (a, b) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if(typeof a !== 'number' || typeof b !== 'number') {
            reject('a, b must be numbers');
        }
        resolve(a+b);
    }, 1000)
})

addSSum(10, 100)
    .then(ssum => { 
        console.log({ ssum });
        return addSSum(ssum, 100)
    })
    .then(ssum2 => console.log({ ssum2 }))
    .catch(err => console.log({ err }))

const totalSum = async () => {
    try {
        let sssum = await addSSum(10, 10)
        let sssum2 = await addSSum(sssum, 10)
        let sssum3 = await addSSum(sssum, 23)
        console.log({ sssum, sssum2, sssum3 })
    } catch(err) {
        if(err) console.log({ err })
    }
}

totalSum();