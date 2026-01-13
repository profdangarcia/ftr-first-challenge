import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { LinkRedirect } from '@/pages/link-redirect'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortCode" element={<LinkRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
