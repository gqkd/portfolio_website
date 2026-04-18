---
title: What an Ironman and a data pipeline have in common
date: 2025-05-10
category: sport
excerpt: Pacing, iteration, and the art of not giving up at kilometre 30. Both a long-distance triathlon and a complex data project run on the same mental model.
---

I finished my first Half-Ironman on a Sunday in May. The following Monday I was back debugging a broken ETL pipeline at work. Somewhere between the two, I realised I was using exactly the same mental tools for both.

This is not a motivational post. It's a pattern I noticed and thought was worth writing down.

## The pacing problem

Every triathlete knows the feeling: you start the bike leg with too much energy, push harder than your plan says, and pay for it on the run. The body doesn't warn you in the moment — it sends you the bill 40 kilometres later.

Data pipelines have the same problem. Early in a project, you have momentum and enthusiasm. It's tempting to build fast, skip the documentation, defer the edge cases. The pipeline works. You ship it.

Two months later you're debugging a production issue at 11pm and you have no idea what that transformation was supposed to do because you wrote it in a rush and didn't leave a comment.

Pace yourself. Write the documentation when you write the code, not after.

## Breaking it down

A Half-Ironman is 1.9km of swimming, 90km on the bike, 21km of running. If you think about the full distance at the start, it's paralysing. Every experienced endurance athlete will tell you the same thing: you don't race the full distance, you race the next segment. Then the next one.

Large data engineering projects work the same way. A full cloud migration from SAP to Azure, end to end, is overwhelming. But "migrate this one pipeline, validate it, deploy it" is a concrete task you can finish this week.

Break the work into segments. Finish each one completely before moving to the next. The full picture takes care of itself.

## The wall is just a phase

Around kilometre 30 of the run, something happens. Your legs don't respond normally, your pace drops, everything hurts. Athletes call it the wall. The instinct is to interpret it as a signal to stop.

It isn't. It's a phase. It passes.

Complex projects have a version of this too — usually around the 60% mark, when the initial excitement is gone, the end isn't visible yet, and every new problem feels disproportionately hard. Most projects that fail, fail here. Not because the technical problem is unsolvable, but because the team loses confidence and the timeline slips into chaos.

Recognising the wall as a phase, not a verdict, is the skill.

## Don't optimise too early

The classic mistake in triathlon training is overloading the schedule at the beginning — long rides, double sessions, maximum effort — before your body has built the aerobic base. You peak too early, accumulate fatigue, and arrive at race day broken.

In engineering, premature optimisation is the equivalent. You spend three days making a query 20% faster before you've confirmed the query is even producing correct results. You architect a highly scalable system for a dataset that currently fits in a spreadsheet.

Build it correct first. Build it fast second. Build it scalable third, and only when the data actually demands it.

---

I don't think there's anything mystical about the overlap. Both triathlon and engineering reward the same set of traits: patience, consistency, honest assessment of where you are, and the ability to keep moving when things are uncomfortable.

The tools transfer. That's all.