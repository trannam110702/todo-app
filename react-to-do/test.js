function a(x) {
  x++;
  return function () {
    console.log(++x);
  };
}

let x = a(1);
console.dir(x);
