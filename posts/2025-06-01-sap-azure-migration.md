---
title: 5 things nobody tells you before migrating a SAP pipeline to Azure
date: 2025-06-01
category: data eng
excerpt: Time windows, NULL semantics in Spark SQL, and why your test always passes but production doesn't. An honest diary from someone who lived a full enterprise migration in the field.
---

Migrating a SAP Data Services pipeline to Azure Data Factory and Databricks sounds straightforward on paper. You have the source logic, you have the target platform, and you have Spark SQL which is "basically SQL". What could go wrong?

A lot, it turns out. Here are the five things I wish someone had told me before we started.

## 1. NULL semantics are not the same in Spark SQL

In standard SQL, `NULL != NULL` evaluates to NULL (not FALSE). Most developers know this. What fewer people know is that Spark SQL has its own set of edge cases when NULLs interact with window functions, aggregations with `FILTER`, and certain JOIN conditions.

In SAP Data Services, some of these were silently handled by the engine. Moving to Spark, those same transformations started producing different results — not errors, just wrong numbers — which is the worst possible kind of bug to catch in production.

**What to do:** Write explicit NULL handling (`COALESCE`, `IS NOT DISTINCT FROM`) everywhere, and add dedicated NULL-injection tests to your validation suite before you touch production data.

## 2. Time windows behave differently at partition boundaries

If your pipeline uses tumbling or sliding time windows on event timestamps, be very careful about how Spark handles records that fall exactly on a boundary. SAP Data Services and Spark do not always agree on which window a boundary record belongs to.

This caused us a ~0.3% discrepancy in daily aggregations — small enough to pass a quick sanity check, large enough to matter in financial reporting.

**What to do:** Run both pipelines in parallel on the same input for at least two weeks and compare outputs row by row before cutting over.

## 3. Your unit tests will always pass. Your integration tests will not.

The nature of ETL migration work means you tend to test transformations in isolation. A function that converts a date format, a lookup that joins two tables. All green.

What breaks in production is always the interaction between steps: a transformation that produces a valid output but in a format that the next step doesn't expect, or a dependency on data ordering that SAP guaranteed implicitly but Spark doesn't.

**What to do:** Build end-to-end integration tests that run the full pipeline on a representative sample of real historical data. Compare final outputs, not intermediate ones.

## 4. Azure Data Factory has a soft limit on pipeline complexity that nobody tells you about

ADF starts to behave unexpectedly — timeouts, silent failures, JSON parsing errors — when pipelines grow past a certain complexity. The documentation won't warn you. You'll discover it when a pipeline that worked fine in development starts failing intermittently in production under load.

The fix is decomposing large pipelines into smaller ones and chaining them. It also makes things more maintainable, so it's not a bad outcome, but it's frustrating to discover it reactively.

## 5. Document the business logic that lives in the SAP jobs, not just the code

The SAP jobs you're migrating contain years of accumulated business logic — edge case handling, client-specific exceptions, workarounds for upstream data quality issues. Most of this is invisible in the code: it's comments, tribal knowledge, or just "the way it's always been done".

Before you start writing a single line of Spark SQL, spend time with the people who built and maintained the original jobs. Record everything. Half the migration work is not translation — it's archaeology.

---

These are the lessons from a real migration. None of them will appear in a vendor's quickstart guide. If you're about to start a similar project and want to talk through the specifics, feel free to reach out.
