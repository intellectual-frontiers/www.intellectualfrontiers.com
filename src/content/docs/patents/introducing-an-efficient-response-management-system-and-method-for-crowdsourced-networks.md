---
title: Introducing an Efficient Response Management System and Method for Crowdsourced Networks
uspto-canonical-id-label: Patent
uspto-patent-number: US9418355B2
inventor: Shah N. Shahid
owner-current-assignee: Netspective Communications LLC
patent-owners-rights: The assignee of this patent is the rightful owner of all associated rights and privileges, including the exclusive right to sell, license, and enforce the patent. Any transfer, sale, or licensing of the patent by parties other than the assignee requires explicit written authorization.
territorial-scope: US
uspto-patent-family-members-publication-numbers: None
application-date: 
issue-date: 
expiry-date: 
patent-status: Active
url: "/ip/introducing-an-efficient-response-management-system-and-method-for-crowdsourced-networks"
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
external-links: 
downloadable-documents: 
  - anchor_text: Download PDF
    link_url: https://patents.google.com/patent/US9418355B2
  - anchor_text: Download Claim Summaries
    link_url: 
---

<!-- *Problem solved by invention* -->

In the rapidly evolving digital era, people increasingly turn to online crowdsourced networks to find answers and solutions to a wide array of queries and challenges. 

## The Challenge of Reliability in Crowdsourced Networks

These platforms serve as invaluable resources, connecting individuals with a diverse and knowledgeable community eager to share insights and expertise. However, amid this digital revolution, a formidable problem has emerged, one that casts a shadow of doubt over the reliability and accuracy of the responses offered by the crowd of respondents.

## The Underlying Issue: Lack of Validation Mechanisms

This challenge is paramount, as it jeopardizes the fundamental trust users place in these online systems. Despite the immense potential they hold, current platforms grapple with a critical shortcoming: their inability to consistently deliver responses that users can unequivocally rely upon. This pervasive issue undermines the very essence of these platforms, rendering them less effective and, at times, counterproductive.

## Addressing the Reliability Predicament

At its core, the problem stems from the absence of robust mechanisms designed to safeguard the authenticity and precision of the responses provided. The lack of effective tools and strategies to validate the credibility of contributors and verify the correctness of their contributions represents a significant impediment. Consequently, users are left navigating a virtual labyrinth of potentially inaccurate, unverified, or even misleading information.

In an age where information is king and the digital realm reigns supreme, the need to address this predicament becomes increasingly urgent. As individuals, businesses, and institutions continue to rely on crowdsourced networks for critical insights and solutions, finding a dependable way to ensure the trustworthiness of responses is imperative. 

<!-- *Technical solution* -->

## Innovative Response Management Technology

To address this issue, the proposed technology aims to revolutionize response management within crowdsourced networks. The core problem it solves is the reliability and correctness of responses by leveraging the collective wisdom of the crowd and implementing rigorous credentialing processes. By doing so, it bridges the gap between user queries and responses, offering a solution that users can confidently rely on for accurate information. 

<!-- *Summary* -->

## Key Components of the Response Management System

The disclosure introduces a comprehensive Response Management System designed to overcome the challenges of managing responses within crowdsourced networks. Its key components and solutions include:

**Federated Case Handling:** The invention efficiently categorizes incoming cases into multiple federated cases based on parameters like complexity, technology involved, and desired response reliability and trust levels. This approach ensures tailored handling for each case, addressing the issue of diverse complexity. These federated cases are then distributed among the community of network respondents, with the distribution carefully managed based on the associated session parameters. These respondents provide responses to the federated cases, and a processing circuit keeps track of this input as second session parameters.

Once responses are collected for all federated cases, the system integrates them into a single comprehensive response for the original case. This integrated response is made available to the public, with anonymity maintained.

**Crowdsourcing Index (CI):** The CI is a crucial control mechanism that defines the credibility of the crowd of respondents. It plays a central role in managing the level of reliability and trust in the integrated response. By assigning respondents into distinct groups based on their credentialed expertise, this index ensures that only the most reliable responses are included.

**Routing and Compliance:** Cases are routed to respondents based on predefined session parameters associated with each federated case. Responses received are evaluated for compliance and appropriateness, and any deviations below a threshold lead to the adjustment of session parameters, thus addressing issues related to reliability.

**Expert Integration:** The technology also incorporates expert reviews into the response process, enhancing the overall trustworthiness of responses. Crowdsourced experts review responses and assign scores, providing users with ratings indicative of the quality and reliability of the integrated response.

**Anonymous Public Publishing:** Once the integration and expert review processes are completed, the integrated response is published anonymously, making it publicly accessible. This transparency ensures users can confidently access valuable information.

## The Ecosystem for Managing Responses

This technology includes an ecosystem as shown in FIG. 1 for managing responses to cases submitted by various entities on a crowdsourced network. The ecosystem allows entities to submit queries or cases for analysis and responses from a crowd of respondents. These respondents can analyze the cases and provide comments and responses. The ecosystem includes a server connected to the crowdsourced network, and it can be accessed through an online platform via client devices.

<div class="center-elements"> 

![Figure 1](/assets/US9418355B2-image-1.png#center)


**Figure 1** 

</div>

Entities can include patients, healthcare professionals, or professionals from other industries like finance or transportation. Respondents can be experts in various fields, including healthcare. The cases can be related to medical issues or other industries, and they can range from questions to detailed medical histories.

The server has components like a communications circuit, processing circuit, and memory. The memory stores case information, responses, and instructions for various tasks. The processing circuit routes cases to respondents based on parameters like complexity and desired reliability. Responses from the crowd increase reliability, and a crowdsourcing index helps control the trust level.

The ecosystem publishes integrated responses online, viewable by the public. Responses can be partially anonymous, and detailed analysis can be accessed by authorized users. The system also involves comparing desired parameters with actual responses and adjusting them if needed.

The system involves a network of respondents and experts. Respondents' profiles, including personal and professional details, are created and stored. These profiles can be segmented into distinct parts for credentialing. A certification engine allows crowdsourced experts to verify and accredit these segments, increasing the reliability of the information. The more experts credential a segment, the higher its trustworthiness. An inconsistency index and distribution map help assess trust levels.

In simpler terms, this system helps verify the qualifications and background of individuals in various industries by breaking down their profiles into smaller parts that can be checked by a crowd of experts. The more experts vouch for a part, the more reliable it becomes, ensuring accurate credentialing. This can be useful for job applications, healthcare, and other fields.

**The system involves several stages:**

**Receiving Medical Cases**: Medical cases are received from various entities within the crowdsourced network.

**Federating Cases:** These cases are divided into multiple sub-cases based on complexity, technology involved, and desired reliability and trust. Each sub-case is associated with specific parameters reflecting these factors.

**Routing Cases:** The system routes these sub-cases to a crowd of respondents in the network, considering the associated parameters.

**Collecting Responses:** Respondents provide responses to these sub-cases.

**Assessing Compliance:** The system assesses how well the responses align with the initial parameters. If a response does not meet the threshold of compliance, adjusted parameters are assigned.

**Rerouting Non-Compliant Cases:** Sub-cases with adjusted parameters are rerouted to a different group of respondents for a second opinion.

**Integration of Responses:** All responses to a medical case are integrated into a single response, ensuring a comprehensive solution.

**Publishing Anonymously:** The integrated response is published anonymously for public viewing.

This technology presents an innovative approach to handling complex medical cases, ensuring accuracy, and reliability through crowdsourcing and credentialing processes.

This technology can be implemented as a computer program product stored on a computer-readable medium. It can be used in various applications, from standalone computers to networked systems, and can adapt to different hardware environments.
