# Notes

## Summary of changes
Fixed 8 bugs (details are in the handwritten notes):
- Backend: removed an artificial `Thread.sleep` delay; invalid `status` now returns 400 instead of 500; added validation for `page` and `pageSize` and made the offset calculation overflow-safe.
- SQL: added missing parentheses around the title/description `OR`, so the archived and status filters always apply. Fixed in the repository query, the H2 file and the Oracle package (count and data queries).
- Frontend: page resets to 1 when search or status changes; search input is debounced (300 ms); `useTasks` ignores stale responses (race condition) and now clears error and loading state correctly.

## What I chose not to change
- Pagination still loads all matching rows into memory and slices with `subList`. Moving it to the database (`Pageable` or `LIMIT/OFFSET`) is a bigger change than a patch.
- No `id` tie-breaker in `ORDER BY`, no LIKE wildcard escaping, and `System.out.println` instead of a logger. These are low impact.
- No validation of `page` and `pageSize` inside the Oracle procedure.
- I did not use `AbortController`, because it would also need changes in `api.js`.

## Biggest remaining risk
In-memory pagination. It will get slow and use a lot of memory as the task table grows. Searching with `LIKE '%term%'` on `LOWER(...)` also cannot use an index.

## Tools and AI
I used Claude to help review the code, find the bugs and draft the fixes. I reproduced each bug myself (curl, browser Network tab, H2 console) before and after the fix, and wrote the handwritten explanations myself. The Oracle file could not be run locally, so I only checked it by reading.