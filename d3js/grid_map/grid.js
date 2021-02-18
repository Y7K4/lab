/* eslint-disable no-undef */
const N_ROWS = 10;
const N_COLS = 10;
const GRID_SIZE = 50;
const COLOR = {
  0: '#CCCCCC',
  1: '#333333',
};

// random array of 0's and 1's
const gridData = new Array(N_ROWS * N_COLS);
for (let i = 0; i < gridData.length; i += 1) {
  gridData[i] = Math.round(Math.random());
}

// svg
const svg = d3
  .select('#grid-map')
  .append('svg')
  .attr('width', `${N_COLS * GRID_SIZE + 2}px`)
  .attr('height', `${N_ROWS * GRID_SIZE + 2}px`);

// grids
svg
  .selectAll('rect')
  .data(gridData)
  .enter()
  .append('rect')
  .attr('x', (_, i) => (i % N_COLS) * GRID_SIZE + 1)
  .attr('y', (_, i) => Math.floor(i / N_COLS) * GRID_SIZE + 1)
  .attr('width', GRID_SIZE)
  .attr('height', GRID_SIZE)
  .style('fill', (d) => COLOR[d])
  .style('stroke', '#000080')
  .on('click', (e, d) => {
    const dNew = 1 - d;
    d3.select(e.currentTarget).datum(dNew);
    d3.select(e.currentTarget).style('fill', COLOR[dNew]);
  });
