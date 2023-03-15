to build for production:
`npm run build`

to build for development:
`npm run bundle`

to run tests:
`npm t`

---

some assumptions:

- all recommendation types are fetched from the same api together (different origins in same list)
- handle errors quietly
- lazy load images
- css prefix for classes and ids
- getting publisher configuration from the window
