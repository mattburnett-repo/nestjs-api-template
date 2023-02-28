# Testing

An important thing to know about testing with NestJS is that much of it depends on decoupling injected dependencies.

- [Here](https://github.com/jmcdo29/testing-nestjs/tree/main/apps/typeorm-sample) is a place for better understanding and examples.
- [This video](https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s) explains the basic concepts and has examples.

## Tests expect a .env.test file.

---

Basic tests

```bash
yarn test
```

End-to-end / endpoint tests

```bash
yarn test:e2e
```
