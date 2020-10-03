async function random() {
    Math.random() * 8
    if (random <= 4) {
        return true
    }throw new Error('error')
}

random()
    .then((val) => {
    console.log("comlete!! :", val);
    })
    .catch((err) => {
        console.error("warning!! :", err);
    })

    function randomFuncPromise() {
      return new Promise((resolve, reject) => {
        const rand = Math.random() * 10;
        if (rand <= 4) {
          resolve(true);
        }

        reject(new Error("my error, promise"));
      });
    }

    async function randomFuncPromiseExecutor() {
      try {
        const val = await randomFuncPromise();
        return val;
      } catch (error) {
        console.log("error: ", error);
        throw new Error("handled error");
      }
    }

    randomFuncPromiseExecutor()
      .then((val) => {
        console.log("SUCCESS:", val);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });