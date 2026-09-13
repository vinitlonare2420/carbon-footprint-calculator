import { CalculatorForm } from './features/calculator/CalculatorForm'

const categories = [
  ['01', 'Travel', 'Choose your usual transport mode and enter the distance you travel.'],
  ['02', 'Home energy', 'Add your household electricity use in monthly kilowatt-hours.'],
  ['03', 'Waste', 'Record the approximate waste your household generates each month.'],
]

export default function App() {
  return <main>
    <header className="site-header"><a className="brand" href="#top" aria-label="TerraTrack home"><span aria-hidden="true">◒</span> TerraTrack</a><a className="text-link" href="#calculator">Calculator <span aria-hidden="true">↓</span></a></header>
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">A clearer view of everyday impact</p><h1 id="hero-title">Small choices.<br /><em>Visible</em> change.</h1><p className="hero-intro">Explore the habits that shape your household footprint, then use that perspective to make practical changes.</p><a className="button button-primary" href="#calculator">Calculate my footprint <span aria-hidden="true">→</span></a><p className="estimate-note"><span aria-hidden="true">✦</span> An educational tool for thoughtful action</p></div>
      <div className="hero-art" aria-hidden="true"><div className="sun" /><div className="orb orb-one" /><div className="orb orb-two" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="leaf leaf-one" /><div className="leaf leaf-two" /></div>
    </section>
    <section className="intro-section" aria-labelledby="intro-title"><p className="eyebrow">Start with the everyday</p><div className="section-heading"><h2 id="intro-title">Your footprint is made of the things you do every day.</h2><p>Carbon footprints are estimates of greenhouse-gas emissions. This first step helps you gather the activity details needed to understand your impact.</p></div><ol className="category-list">{categories.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></section>
    <CalculatorForm />
    <footer><a className="brand" href="#top"><span aria-hidden="true">◒</span> TerraTrack</a><p>Built for environmental learning. Estimates and recommendations will be introduced in the next phase.</p></footer>
  </main>
}
