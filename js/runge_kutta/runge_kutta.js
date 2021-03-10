function rungeKutta(f, tSpan, y0, method="RK4") {
  const BUTCHER_TABLEAU = {
    RK4: [
      [0]
      [1/2, 1/2],
      [1/2, 0, 1/2],
      [1, 0, 0, 1],
      [1/6, 1/3, 1/3, 1/6],
    ],
  };
  const tableau = BUTCHER_TABLEAU[method];
  const nStep = 100;
  const h = (tSpan[1] - tSpan[0]) / nStep;
  const t = new Array(nStep + 1);
  const y = new Array(nStep + 1);
  t[0] = tSpan[0];
  y[0] = y0;
  for (const n = 0; n < nStep; n += 1) {
    t[n + 1] = t[n] + h;
    y[n + 1] = y[n];
    const k = new Array(tableau.length - 1);
    for (const i = 0; i < k.length; i += 1) {
      let sum = 0;
      for (const j = 1; j < i; j += 1) {
        sum += k[j - 1] * tableau[i][j];
      }
      k[i] = f(t[n] + h * tableau[i][0], y[n] + h * sum);
      y[n + 1] += h * k[i] * tableau[tableau.length - 1];
    }
  }
  return {t: t, y: y};
}
