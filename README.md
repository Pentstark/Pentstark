# Pentstark

## Development

1. Install dependencies
2. Start the dev server

```powershell
npm install
npm run dev
```

## Build and Preview

```powershell
npm run build
npm run preview
```

## Deployment

See `DEPLOYMENT.md` for host-specific steps.

## Use Cases: Structure and Theming

Use cases are listed and rendered consistently across the app.

- Listing page: `src/pages/UseCasesPage.jsx`
- Dynamic detail page: `src/pages/UseCaseDetailPage.jsx` (reads `id` from route and looks up data in `src/data/useCases.js`)
- Individual marketing pages (optional deep content): `src/pages/use-cases/*`
- Reusable card: `src/components/UseCaseCard.jsx`

Theme and UI primitives:

- Buttons: `src/components/ui/button.jsx` (use `variant="enterprise"` for primary CTAs)
- Cards: `src/components/ui/card.jsx`
- Site frame: `src/components/Layout.jsx`

### Adding a new use case

1. Add a new entry to `src/data/useCases.js` with fields: `{ id, title, description, icon, color, hoverColor, image }`.
	- `icon` should be one of: `shield-check`, `cloud`, `smartphone`, `bug`, `banknote`, `brain-circuit`.
	- `color`/`hoverColor` are Tailwind gradient classes used for accents.
2. The listing page will render it automatically via `UseCaseCard`.
3. For a dedicated content page, create `src/pages/use-cases/YourPage.jsx` and wrap content with `Layout`. Use `Button` with `variant="enterprise"` for CTAs.
4. Ensure headings, spacing, and backgrounds use the shared theme (Layout provides the global gradient).