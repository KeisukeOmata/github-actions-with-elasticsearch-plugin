import React from 'react'
import { SiteHeader } from '../layouts/SiteHeader'
import { cleanup, render, screen } from '@testing-library/react'
// cypressとの競合を回避
import { expect } from '@jest/globals'

// 各テスト実行後にレンダーしたコンポーネントをアンマウントする
afterEach(cleanup)

it('SiteHeaderコンポーネントが存在している', () => {
  expect(SiteHeader).toBeTruthy()
})

it('「GitHub」のリンクが有効である', () => {
  render(<SiteHeader />)
  expect(screen.getByText('GitHub').getAttribute('href')).toBe(
    'https://github.com/KeisukeOmata/next_blog'
  )
})
