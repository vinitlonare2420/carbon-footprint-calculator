import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CalculatorForm } from './CalculatorForm'

describe('CalculatorForm', () => {
  it('shows accessible errors for empty submission', async () => {
    const user = userEvent.setup(); render(<CalculatorForm />)
    await user.click(screen.getByRole('button', { name: /calculate my footprint/i }))
    expect(await screen.findByText('Select a transport mode.')).toBeVisible()
    expect(screen.getByText('Enter a monthly electricity value greater than or equal to 0.')).toBeVisible()
  })
  it('accepts zero values and confirms a complete profile', async () => {
    const user = userEvent.setup(); render(<CalculatorForm />)
    await user.selectOptions(screen.getByLabelText(/main transport mode/i), 'bus')
    await user.selectOptions(screen.getByLabelText(/waste treatment/i), 'composting')
    for (const label of [/distance travelled per month/i, /monthly electricity consumption/i, /monthly organic waste generated/i]) await user.type(screen.getByLabelText(label), '0')
    await user.click(screen.getByRole('button', { name: /calculate my footprint/i }))
    expect(await screen.findByRole('heading', { name: /0 kg co2e per month/i })).toBeVisible()
    expect(screen.getByRole('img', { name: /monthly emission contribution chart/i })).toBeVisible()
    expect(screen.getByText('No emissions were recorded for the activities entered.')).toBeVisible()
  })
  it('renders an accessible result dashboard and calculates again without a refresh', async () => {
    const user = userEvent.setup(); render(<CalculatorForm />)
    await user.selectOptions(screen.getByLabelText(/main transport mode/i), 'car')
    await user.selectOptions(screen.getByLabelText(/waste treatment/i), 'landfill')
    await user.type(screen.getByLabelText(/distance travelled per month/i), '100')
    await user.type(screen.getByLabelText(/monthly electricity consumption/i), '100')
    await user.type(screen.getByLabelText(/monthly organic waste generated/i), '10')
    await user.click(screen.getByRole('button', { name: /calculate my footprint/i }))
    expect(await screen.findByText(/electricity is your largest emission source/i)).toBeVisible()
    expect(screen.getByRole('heading', { name: /ways to make progress/i })).toBeVisible()
    await user.click(screen.getByRole('button', { name: /calculate again/i }))
    expect(screen.queryByRole('heading', { name: /ways to make progress/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate my footprint/i })).toBeVisible()
  })
})
