import { test, expect } from '@playwright/test'

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should add a new todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('New Todo Item')
    await page.getByTestId('add-todo-button').click()

    const todoItem = page.getByText('New Todo Item')
    await expect(todoItem).toBeVisible()
  })

  test('should toggle todo completion', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Toggle Me')
    await page.getByTestId('add-todo-button').click()

    await page.getByTestId('toggle-todo').click()
    const todoText = page.getByText('Toggle Me')
    await expect(todoText).toHaveCSS('text-decoration-line', 'line-through')
  })

  test('should delete a todo', async ({ page }) => {
    await page.getByTestId('todo-input').fill('Delete Me')
    await page.getByTestId('add-todo-button').click()

    await page.getByTestId('delete-todo').click()
    const todoItem = page.getByText('Delete Me')
    await expect(todoItem).not.toBeVisible()
  })

  test('health check endpoint returns correct status', async ({ request }) => {
    const response = await request.get('http://localhost:3000/health')
    const data = await response.json()

    expect(response.ok()).toBeTruthy()
    expect(data.status).toBe('healthy')
    expect(data.timestamp).toBeDefined()
  })

  test('should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Todo App')
  })
})
