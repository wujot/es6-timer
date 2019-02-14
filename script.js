class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
    this.listOfTimes = [];
    this.counter = 0;
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  clear() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
  }

  add() {
    this.listOfTimes.push(this.times);
    document.querySelector(".results").innerHTML +=
      "<li>" + this.format(this.listOfTimes[this.counter]) + "<br /></li>";
    this.counter++;
  }

  clearList() {
    this.listOfTimes = [];
    document.querySelector(".results").innerHTML = "";
    this.counter = 0;
  }
}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

let addButton = document.getElementById("add");
addButton.addEventListener("click", () => stopwatch.add());

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => stopwatch.clear());

let clearRecordButton = document.getElementById("clearRecords");
clearRecordButton.addEventListener("click", () => stopwatch.clearList());

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}
