function rungeKutta(ode, y0, tSpan, dt = 0.1, method = "RK4") {
  const scale = (k, v) => (Array.isArray(v) ? v.map((e) => k * e) : k * v);
  const add = (u, v) => (Array.isArray(v) ? v.map((e, i) => u[i] + e) : u + v);
  const BUTCHER_TABLEAU = {
    Euler: [[0], [1]],
    Midpoint: [[0], [1/2, 1/2], [0, 1]],
    RK4: [[0], [1/2, 1/2], [1/2, 0, 1/2], [1, 0, 0, 1], [1/6, 1/3, 1/3, 1/6]],
  };
  const tableau = BUTCHER_TABLEAU[method];
  const nStep = Math.ceil((tSpan[1] - tSpan[0]) / dt - 1e-9);
  const t = new Array(nStep + 1);
  const y = new Array(nStep + 1);
  t[0] = tSpan[0];
  y[0] = y0;
  for (let n = 0; n < nStep; n += 1) {
    t[n + 1] = Math.min(t[n] + dt, tSpan[1]);
    y[n + 1] = y[n];
    const h = t[n + 1] - t[n];
    const k = new Array(tableau.length - 1);
    for (let i = 0; i < k.length; i += 1) {
      const tk = t[n] + h * tableau[i][0];
      let yk = y[n];
      for (let j = 0; j < i; j += 1) {
        yk = add(yk, scale(h * tableau[i][j + 1], k[j]));
      }
      k[i] = ode(tk, yk);
      y[n + 1] = add(y[n + 1], scale(h * tableau[k.length][i], k[i]));
    }
  }
  return [t, y];
}

let ode, y0, tSpan;
let t, y;
const precise = (v) => v.toPrecision(6);
const final = (v) =>
  Array.isArray(v[v.length - 1])
    ? v[v.length - 1].map((e) => precise(e))
    : precise(v[v.length - 1]);

// y(t) = t^3
console.log("y(t) = t^4");
ode = (t, y) => 4 * t * t * t;
y0 = 0;
tSpan = [0, 10];
[t, y] = rungeKutta(ode, y0, tSpan, 0.1, "Euler");
console.log(`Euler:    y(${final(t)}) = ${final(y)}`);
[t, y] = rungeKutta(ode, y0, tSpan, 0.1, "Midpoint");
console.log(`Midpoint: y(${final(t)}) = ${final(y)}`);
[t, y] = rungeKutta(ode, y0, tSpan, 0.1, "RK4");
console.log(`RK4:      y(${final(t)}) = ${final(y)}`);
console.log(`True:     y(${final([10])}) = ${final([10000])}`);
console.log();


// y(t) = e^(-t)
console.log("y(t) = e^(-t)");
ode = (t, y) => -y;
y0 = 1;
tSpan = [0, 10];
[t, y] = rungeKutta(ode, y0, tSpan, 1);
console.log(`dt=1:    y(${final(t)}) = ${final(y)}`);
[t, y] = rungeKutta(ode, y0, tSpan, 0.1);
console.log(`dt=0.1:  y(${final(t)}) = ${final(y)}`);
[t, y] = rungeKutta(ode, y0, tSpan, 0.01);
console.log(`dt=0.01: y(${final(t)}) = ${final(y)}`);
console.log(`True:    y(${final([10])}) = ${final([Math.exp(-10)])}`);
console.log();

// y(t) = [cos(t), -sin(t)]
console.log("y(t) = [cos(t), -sin(t)]");
ode = (t, y) => [y[1], -y[0]];
y0 = [1, 0];
tSpan = [0, 10];
[t, y] = rungeKutta(ode, y0, tSpan);
console.log(`0.1, RK4: y(${final(t)}) = ${final(y)}`);
console.log(
  `True:     y(${final([10])}) = ${final([[Math.cos(10), -Math.sin(10)]])}`
);
