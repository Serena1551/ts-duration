# Duration parse/format

Unlike Python's `datetime.timedelta` which handles interval math natively, TypeScript forces you to write this parser yourself, which seems trivial until you hit edge cases like negative durations, integer overflow, or malformed input that crashes your application. This implementation relies strictly on the TypeScript standard library, avoiding external dependencies that might introduce unpatched vulnerabilities or break your build pipeline when a maintainer abandons the project.

| Approach | Failure Mode | Hard Limit |
|---|---|---|
| Regex parsing | Catastrophic backtracking on malicious input | O(N^2) time complexity on bad strings |
| Strict state machine | Rejects valid but weirdly spaced inputs | High maintenance burden for new units |
| External library | Supply chain attacks, version drift | Adds unnecessary bytes to your bundle |

You will find the test suite located adjacent to the core implementation, which you should execute to verify the boundary conditions and concrete parsing behaviors before trusting it with your production cron schedules.

```
duration.ts
```