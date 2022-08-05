import http from "k6/http";
// import { Counter } from "k6/metrics";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "15s", target: 5000 },
    { duration: "15s", target: 10000 },
    { duration: "15s", target: 15000 },
    { duration: "15s", target: 0 },
  ],
};

export default function () {
  group("GET questions", () => {
    const res = http.get(
      "http://localhost:3000/qa/questions?product_id=1000000&count=20&page=1"
    );
    check(res, { "is status 200": (r) => r.status == 200 });
    sleep(1);
  });

  group("GET answers", () => {
    const res = http.get(
      "http://localhost:3000/qa/questions/3518960/answers?page=1&count=10"
    );
    check(res, { "is status 200": (r) => r.status == 200 });
    sleep(1);
  });
  group("POST question helpful", () => {
    const res = http.put("http://localhost:3000/qa/questions/141817/helpful");
    check(res, { "is status 204": (r) => r.status == 204 });
    sleep(1);
  });
}

// k6 run --vus 1 --duration 1s script.js
// k6 run --vus 10 --duration 1s script.js
// k6 run --vus 100 --duration 1s script.js
// k6 run --vus 10000 --duration 10s script.js
