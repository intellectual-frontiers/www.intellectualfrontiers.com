---
title: Optimizing Rating Aggregation - A Method for Creating Accurate Aggregate Rating Indicators
excerpt: Existing methods and systems for rating aggregation face significant challenges in providing accurate and reliable aggregate scores for entities, such as professionals or businesses.
sectiontype: article
image: '/images/patent-summaries/aggregation-of-rating-indicators.webp'
patentId: US10489830B2
category: Patent Summaries
metadata:
  title: Improving Decision-Making with Accurate Aggregate Ratings
  description: Optimize your decision-making with accurate aggregate ratings. See how our methods improve reliability in rating aggregation, with a focus on sentiment analysis
  robots:
    index: true
    follow: true
  openGraph:
    title: Improving Decision-Making with Accurate Aggregate Ratings | IntellectualFrontiers
    site_name: IntellectualFrontiers
    description: Optimize your decision-making with accurate aggregate ratings. See how our methods improve reliability in rating aggregation, with a focus on sentiment analysis
    images:
      - url: '/images/patent-summaries/aggregation-of-rating-indicators.webp'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@IntelFrontiers'
    site: '@IntelFrontiers'
    cardType: summary_large_image
publishDate: 2023-10-28
uspto-canonical-id-label: Patent
uspto-patent-number: US10489830B2
inventor: Shah N. Shahid
owner-current-assignee: Netspective Communications LLC
patent-owners-rights:
territorial-scope: US
uspto-patent-family-members-publication-numbers:
application-date:
issue-date:
expiry-date:
patent-status: Active
url: '/patent-summaries/optimizing-rating-aggregation-a-method-for-creating-accurate-aggregate-rating-indicators'
uspto-patent-pdf:
uspto-patent-url:
thumbnail:
uspto-patent-citation-label:
forward-citations:
backward-citations:
abstract-of-the-invention-label:
abstract-of-the-invention:
problem-solved-by-the-invention:
topics:
images:
tags:
  - US10489830B2
  - Digital Reputation Management
  - Sentiment Analysis
external-links: https://patents.google.com/patent/US10489830B2/
downloadable-documents:
  - anchor_text: Download PDF
    link_url:
  - anchor_text: Download Claim Summaries
    link_url:
---

<!-- *Problem solved by invention* -->

## Challenges in Rating Aggregation

Existing methods and systems for rating aggregation face significant challenges in providing accurate and reliable aggregate scores for entities, such as professionals or businesses. Review platforms often yield disparate ratings, influenced by various factors like reviewer subjectivity and the authenticity of reviews. While rating aggregation algorithms attempt to collate these ratings to form a single indicator of an entity's credibility, they often fall short in delivering optimal and dependable results.

The limitations of current systems stem from the inherent variability in reviewers' approaches and the lack of uniform reliability among reviewers and their reviews. Consequently, there is a need for an innovative approach and system that can generate an aggregate rating indicator for entities, enabling precise and optimal entity search based on these indicators. This system must not only address the challenge of reviewer subjectivity but also tackle the issue of fraudulent rating indicators, which can skew the accuracy of the aggregated ratings.

<!-- *Technical solution* -->

## Innovative Rating Aggregation Approaches to Enhance Precision and Accuracy

In response to this need, we introduced a patented computer-implemented method and system designed to publish aggregate rating indicators. This method involves searching multiple repositories housing discrete rating indicators associated with a rated entity. It encompasses the retrieval of various rating indicators, some of which may be fraudulent. The identification and removal of these fraudulent indicators rely on a combination of parameters. Subsequently, the method aggregates the remaining genuine rating indicators to produce a reliable and accurate aggregate rating indicator. This innovation aims to enhance the precision of entity searches while overcoming the challenges posed by unreliable and fraudulent rating data, ultimately improving user experiences and decision-making in the domain of rating aggregation.

<!-- *Summary* -->

## Mechanics of Rating Aggregation Technology

This system, as shown in Figure 1 includes multiple user devices (referred to as client devices) that are connected through a network to a central server. This server connects to a rating aggregator, which is a tool for gathering and analyzing ratings. These client devices can be any devices with internet access, like computers or smartphones. They are used by users, like individuals or organizations, who want to find ratings or reviews for different entities, such as doctors, hospitals, or other professionals.

<div class="center-elements">

![Figure 1](/images/patent-summaries/us10489830b2-image-01.png)

</div>

The client devices send their requests to the rating aggregator through the network. The rating aggregator, in turn, searches the internet, including websites and other sources, for ratings and reviews related to the requested entities. It collects these ratings and reviews and filters out any that seem unreliable or fraudulent based on various criteria.

The process includes aggregating ratings from various sources referred to as publishers. These publishers can be websites, social media pages, or any platform that shares ratings for entities like doctors or service providers. The rating aggregator connects to these publishers through the network, collects their rating data, and then combines and evaluates this data to create an overall rating for each entity.

The rating aggregator uses different algorithms and methods to calculate these aggregated ratings. It also filters out any unreliable or fraudulent ratings to ensure the final ratings are accurate and trustworthy. The aggregated ratings are then published, either on a separate website or on the same platform as the individual ratings, so users can easily compare them.

As shown in Figure 2, the system consists of several components that work together to collect, filter, process, and publish ratings. The search engine is responsible for finding ratings from various sources on the internet. The filtering engine removes any unreliable or redundant ratings. The rating evaluation unit calculates the aggregated ratings using different methods. The publishing engine shares these aggregated ratings on websites or other platforms. The memory circuit stores all the data, including individual and aggregated ratings, for future reference.

<div class="center-elements">

![Figure 2](/images/patent-summaries/us10489830b2-image-02.png)

**Figure 2**

</div>

## Sentiment Analysis in Rating Aggregation

Imagine you're searching for a new physician, and you stumble upon a plethora of online reviews. Some are filled with glowing praise, while others express dissatisfaction. How can you make sense of this information and make an informed decision?

Sentiment analysis feature of the patented technology is a powerful tool integrated into the state-of-the-art rating aggregator system. Sentiment analysis uses sophisticated algorithms and language processing to determine the sentiment or emotional tone of a piece of text. In our context, this text is often user-generated reviews and comments.

## How Sentiment Analysis Works

Here's how it works within the rating aggregator system:

**Collecting Reviews:** The system collects user reviews and comments from various sources, including websites and social media platforms.

**Sentiment Analysis Engine:** The rating aggregator is equipped with a sentiment analysis engine, a smart component that specializes in analyzing the sentiment expressed in the collected text.

**Extracting Sentiment:** The sentiment analysis engine evaluates each review, identifying positive, negative, or neutral sentiments. It essentially quantifies the emotions and opinions conveyed in the text.

**Converting to Ratings:** To make things even more user-friendly, the sentiment analysis engine converts these sentiments into numerical ratings. For instance, a positive sentiment could translate to a high rating, while a negative one might result in a lower rating.

## Why Sentiment Analysis Matters for Rating Aggregation

Why is sentiment analysis such a game-changer in the world of rating aggregation?

**Understanding Opinions:** Sentiment analysis goes beyond mere numbers. It helps us understand the real opinions, emotions, and experiences of users, adding depth to numerical ratings.

**Fraud Detection:** It plays a crucial role in fraud detection. Suspicious or fraudulent reviews can be spotted by analyzing the sentiment they convey, helping maintain the credibility of the ratings.

**Comparative Analysis:** Sentiment analysis allows for comparative analysis. It helps users distinguish between entities with similar ratings but different sentiment profiles, giving them more nuanced insights.

**Customized User Experiences:** Rating aggregators can offer users customized interfaces that present both numerical ratings and sentiment-based insights, catering to diverse user preferences.

Figure 3 shows technology components of the sentiment analysis engine integrated with various components of the rating aggregation system to aggregate ratings obtained from a variety of publishers.

<div class="center-elements">

![Figure 3](/images/patent-summaries/us10489830b2-image-03.png)

**Figure 3**

</div>

## The Future of Informed Decision-Making

Incorporating sentiment analysis into rating aggregation systems is a step toward providing users with more comprehensive and accurate information. It enhances the ability to make informed decisions, whether it's choosing a healthcare provider, a product, or any other service.

Moreover, this technology isn't limited to just doctors and healthcare. It can be applied to a wide range of industries, making it an invaluable tool for businesses, consumers, and decision-makers alike.

As technology continues to evolve, so does our capacity to make smarter choices. Sentiment analysis is just one example of how innovation is transforming the way we navigate the digital landscape, helping us separate the signal from the noise and make choices that truly align with our needs and preferences.
