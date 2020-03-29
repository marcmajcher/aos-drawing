const samples = 10000;
const count = [0];
const scale = 20;

for (let i = 0; i < samples; i++) {
  const r = Math.min(0.9, Math.max(0.1, Math.random()));
  const num = Math.round(Math.pow(r, -0.5) * Math.pow(1 - r, -0.5) * 3) - 5;
  count[num] = count[num] ? count[num] + 1 : 1;
}

let c = count.map(e => (e == null ? 0 : e));
const mod = scale / Math.max(...c);
for (let i = 0; i < count.length; i++) {
  console.log(`${i}: ${'*'.repeat(count[i] * mod)}`);
}

console.log(count);
