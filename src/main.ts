import './styles.css'

const app = document.querySelector<HTMLElement>('#app')

if (!app) {
  throw new Error('Hop Premium could not find its application root.')
}

app.innerHTML = `
  <section class="launch" aria-labelledby="launch-title">
    <p class="eyebrow">Hop Premium</p>
    <h1 id="launch-title">Earnings, compounded.</h1>
    <p>Foundation ready. The live stay-versus-switch chart is next.</p>
  </section>
`
