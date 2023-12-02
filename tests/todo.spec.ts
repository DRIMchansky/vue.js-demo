import { test, expect, Page } from '@playwright/test'

import { TODO_INPUT_PLACEHOLDER } from '../src/constsnts'

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('Create new Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo')
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/vue3-demo/)
  })

  test('should allow me to add todo items', async ({ page }) => {
    const inputLocator = page.getByPlaceholder(TODO_INPUT_PLACEHOLDER)

    // 1st todo.
    await inputLocator.fill(TODO_ITEMS[0])
    await inputLocator.press('Enter')

    await expect(page.getByTestId('todo-text')).toHaveText([TODO_ITEMS[0]])
    await expect(page.getByTestId('num-todos')).toHaveText('1')
    await expect(page.getByTestId('num-todos-checked')).toHaveText('0')

    // 2nd todo.
    await inputLocator.fill(TODO_ITEMS[1])
    await inputLocator.press('Enter')

    await expect(page.getByTestId('todo-text')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]])
    await expect(page.getByTestId('num-todos')).toHaveText('2')
    await expect(page.getByTestId('num-todos-checked')).toHaveText('0')
  })

  test('should clear text input field when an item is added', async ({ page }) => {
    const inputLocator = page.getByPlaceholder(TODO_INPUT_PLACEHOLDER)

    await inputLocator.fill(TODO_ITEMS[0])
    await inputLocator.press('Enter')

    await expect(inputLocator).toBeEmpty()
    await checkNumberOfTodosInLocalStorage(page, 1)
  })

  test('should append new items to the bottom of the list', async ({ page }) => {
    await createDefaultTodos(page)

    const todoCount = page.getByTestId('num-todos')

    // Check test using different methods.
    await expect(page.getByText('3')).toBeVisible()
    await expect(todoCount).toHaveText('3')
    await expect(todoCount).toContainText('3')
    await expect(todoCount).toHaveText(/3/)

    await expect(page.getByTestId('todo-text')).toHaveText(TODO_ITEMS)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })
})

test.describe('Change Todo Item state', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo')
  })

  test('should allow me to mark items as complete', async ({ page }) => {
    await createDefaultTodos(page)

    const firstTodoLocator = page.getByText(TODO_ITEMS[0])
    await firstTodoLocator.click()

    // Check first item.
    await checkNumberOfCheckedTodosInLocalStorage(page, 1)

    const completedTodoItemLocator = page.getByTestId('todo-item').nth(2)
    await expect(completedTodoItemLocator).toHaveClass('completed')
  })

  test('should allow me to un-mark items as complete', async ({ page }) => {
    const inputLocator = page.getByPlaceholder(TODO_INPUT_PLACEHOLDER)

    await inputLocator.fill(TODO_ITEMS[0])
    await inputLocator.press('Enter')

    const firstTodoLocator = page.getByText(TODO_ITEMS[0])
    await firstTodoLocator.click()

    await expect(inputLocator).toBeEmpty()
    await checkNumberOfTodosInLocalStorage(page, 1)
    await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('completed')
    await checkNumberOfCheckedTodosInLocalStorage(page, 1)

    await firstTodoLocator.click()

    await expect(page.getByTestId('todo-item').nth(0)).not.toHaveClass('completed')
    await checkNumberOfCheckedTodosInLocalStorage(page, 0)
  })
})

test.describe('Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo')
  })

  test('should persist its data', async ({ page }) => {
    await createDefaultTodos(page)

    const firstTodoLocator = page.getByText(TODO_ITEMS[0])
    await firstTodoLocator.click()
    await checkNumberOfCheckedTodosInLocalStorage(page, 1)

    await page.reload()

    await expect(page.getByTestId('todo-item')).toHaveCount(TODO_ITEMS.length)
    await checkNumberOfCheckedTodosInLocalStorage(page, 1)
  })
})

async function createDefaultTodos(page: Page) {
  const inputLocator = page.getByPlaceholder(TODO_INPUT_PLACEHOLDER)

  for (const item of TODO_ITEMS) {
    await inputLocator.fill(item)
    await inputLocator.press('Enter')
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['todo']).todos.length === e
  }, expected)
}

async function checkNumberOfCheckedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['todo']).todos.filter(e => e.checked).length === e
  }, expected)
}
