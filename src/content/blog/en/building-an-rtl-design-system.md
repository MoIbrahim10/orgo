---
isDraft: false
title: "Building an RTL design system without treating Arabic as an exception"
category: "Localization"
translationGroup: "rtl-design-system"
author: "youssef-mansour"
image:
  src: "/images/blog/building-an-rtl-design-system.jpg"
  alt: "Abstract interface with mirrored layout blocks"
slug: "building-an-rtl-design-system"
language: "en"
tags: ["rtl", "design system", "arabic"]
publishDate: 2026-03-11T09:30:00.000Z
updatedDate: "2026-03-11T12:15:00.000Z"
metaTitle: "Building an RTL design system without treating Arabic as an exception"
metaDescription: "How Orgo approaches RTL as a first-class design constraint rather than a late translation pass."
---

## The easy mistake

It is common to design a system in English, ship the components, and then flip the interface later for Arabic. That process may produce an RTL version, but it rarely produces an interface that _feels native_.

Spacing, alignment, icon placement, and emphasis all carry meaning. If you only mirror the layout at the end, the system still thinks in one direction.

## What changed in our process

We now review core components in both directions before we call them stable. That affects more than text length. It affects:

- where actions sit in relation to labels
- how lists scan when hierarchy becomes dense
- how display type behaves at different weights

Arabic also changes the emotional tone of the interface. A line that feels crisp in English can feel abrupt in Arabic. A loose layout that feels calm in Arabic can feel under-articulated in English.

## The principle we keep

Localization is not post-production. It is product work. When bilingual behavior enters early, the system becomes simpler, not more complicated, because fewer assumptions have to be undone later.

That is the only way to make Arabic feel like a home language inside the product instead of a translated guest.
