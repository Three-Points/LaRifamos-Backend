## ⴵ v0.2.0

### Almanac
In the last release, we focused our efforts on cover the next modules:

- Raffles
- Account
- Tickets

#### ✨Features
- Tests
    - Added test in controllers scope to cover both `Raffle` and `ErrorServer` controllers.
    - Added test in controllers scope to cover `Prisma` library.

#### ♻️ Improvements
- Models
    - Removed `Model.js`.
    - > **💥 severity: ↓ Low**
      **✍️ Reason:** It will not be necessary to implement as `extend` structure since the connection to Prisma library can be supported in scope file.