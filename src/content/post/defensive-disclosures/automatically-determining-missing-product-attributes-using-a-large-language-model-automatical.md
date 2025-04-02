---
title: Automatically Determining Missing Product Attributes Using a Large Language Model Automatical
excerpt: To surface products that are relevant to customers, search engines require online merchants to fill in certain attributes relating to their products. However, merchants often do not fill in the requested attributes, which can lead to search results not surfacing the most appropriate products and merchants.
sectiontype: disclosure
publishDate: 2025-03-02
disclosureId: DD20241129002
metadata:
  title: Automatically Determining Missing Product Attributes Using a Large Language Model Automatical
  description: To surface products that are relevant to customers, search engines require online merchants to fill in certain attributes relating to their products. However, merchants often do not fill in the requested attributes, which can lead to search results not surfacing the most appropriate products and merchants.
  robots:
    index: false
    follow: false
  openGraph:
    title: Automatically Determining Missing Product Attributes Using a Large Language Model Automatical | IntellectualFrontiers
    description: To surface products that are relevant to customers, search engines require online merchants to fill in certain attributes relating to their products. However, merchants often do not fill in the requested attributes, which can lead to search results not surfacing the most appropriate products and merchants.
    images:
      - url: '/images/disclosures/blockchain-voting/blockchain-voting-disclosure.webp'
        width: 1200
        height: 628
    type: website
  twitter:
    cardType: summary_large_image
submissionDate: 2025-03-02
url: '/defensive-disclosures/automatically-determining-missing-product-attributes-using-a-large-language-model-automatical'
category: Defensive Disclosure
disclosureAuthors:
    - Gokul Pillai
    - Sandaleen Taqdees
    - Rishabh Agrawal
    - Alex Stillwell
    - Joey Chinoski
    - Sree Meruva 
# image: '/images/disclosure/eye-tracking-driven-dynamic-glanceable-passthrough-window-for-extended-reality-cover.jpg'
image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s'
tags:
  - Search Engines
downloadableDocument: 'https://example.com/blockchain-voting-disclosure.pdf'
---
## Abstract

To surface products that are relevant to customers, search engines require online merchants to fill in certain attributes relating to their products. However, merchants often do not fill in the requested attributes, which can lead to search results not surfacing the most appropriate products and merchants. This disclosure describes techniques that leverage a large language model (LLM) to automatically determine and assign attributes to products in the inventory of a merchant. Per the techniques, available product information such as product title, category, image, brief description, etc. is used to predict with high probability the values of unfilled attributes. Attributes thus filled with the help of the LLM are applied to source data in a search engine or other system that supports product search. By leveraging an LLM, optionally trained on a large catalog and/or fine-tuned based on feedback from human raters to complete the attribute set of a product, the requirement of manual entry of product attributes is obviated and products can be characterized at scale. Upon automatically filling in the predicted attribute values, a higher likelihood of merchant products being surfaced to suitable customers is realized. 

## Keywords

- Product attribute
- Missing attribute
- Attribute prediction
- Online store
- Online merchant
- Online marketplace
- Search optimization

## Background

E-commerce merchants that make their products available via online platforms (e.g., [1]) make available or send their product information to search engine providers to ensure that their products surface during keyword searches performed on search engines. To surface search results that feature products that are relevant to customers performing the search, search engines request merchants to fill in certain attributes relating to products, e.g., target age group, target gender, etc. However, merchants often do not fill in attributes requested by the search engines, since in many cases merchants do not find use for such attributes for their own websites or storefronts hosted online. Without the availability of such attributes, product search results returned by the search engine may not surface the products most likely of interest and suited to customers performing the search.

## Description

This disclosure describes techniques that leverage a large language model (LLM) such as [2] to automatically determine and assign attributes to products in the inventory of a merchant. Per the techniques, available product information such as product title, category, image, product description, etc. is used to predict with high probability the values of unfilled attributes. Attributes thus filled with the help of the LLM are applied to source data in a search engine or other system that supports product search.

Fig. 1 illustrates automatically determining the attributes of products offered by a merchant using an LLM. Known product attributes (102), e.g., those filled in by the merchant, such as product title, description, category, merchant name, etc., are provided as input to an LLM (104). The LLM predicts product attributes that are unfilled by the merchant (106), such as the target age group, gender, etc. for the product. The LLM also produces a confidence score (108) for each predicted attribute. The LLM can be trained on a large catalog of items, enabling the LLM to return product attributes accurately. Such training helps improve the accuracy of attributes predicted by the LLM and also provides a high degree of coverage across the entire range of products that merchants sell online.

Predicted attributes with a confidence score higher than a certain threshold can be automatically uploaded to source data in a search engine or other third-party system, with appropriate merchant consent. Merchant-facing tools that enable upload of product attributes can automatically suggest values for product attributes and obtain authorization from the merchant before accepting the suggested values. Features can be provided to enable merchants to override a suggested value for a product attribute. Optionally, for purposes of establishing data provenance, an attribute can be marked as being automatically generated or filled in by the merchant. Further, model predictions can be evaluated by human raters and the model fine-tuned as necessary.

In general, an LLM can be used to predict and fill in absent attributes based on attributes that are already present. For example, any subset of the set of product attributes (including product image, title, description, global trade identity number, tax, shipping information, etc.) can be used to predict the values of other (absent) members of the set. LLM inference (attribute value prediction) can be run as a batch job to achieve low computational cost.

The automatic attribute determination techniques described herein can be offered as a service that is accessible by application programming interfaces (APIs) and can be used to fill in attributes at any database other than the search engine, e.g., using data synchronization services (such as [3] [4]) that are used by merchants. By leveraging the capabilities of an LLM to complete the attribute set of a product, the need for manual entry of product attributes is obviated. Product attributes can be filled in at scale.

Merchants are provided options to override the predicted attribute values and replace with their preferred value. The techniques can also be used to provide recommended attribute values to merchants where attribute values are already present for merchants to optionally accept to improve their listing. After filling in attributes, search engines and other systems that enable product search can surface in a manner relevant to a customer’s search keywords and based on fit of the product attributes to the customer. 

Automatic data filling techniques described herein can be used by any platform that stores, uses, or processes product data, such as social media platforms that host marketplaces or support product search. E-commerce platforms can also use the techniques to automatically fill in product attributes that can be used to surface targeted search results. Automatic attribute prediction and filling can be run periodically to ensure that product attributes are updated as new products are added by merchants. With merchant permission, attribute values can be updated in the platform that hosts their online store (e.g., [1]).

## Conclusion

This disclosure describes techniques that leverage a large language model (LLM) to automatically determine and assign attributes to products in the inventory of a merchant. Per the techniques, available product information such as product title, category, image, brief description, etc. is used to predict with high probability the values of unfilled attributes. Attributes thus filled with the help of the LLM are applied to source data in a search engine or other system that supports product search. By leveraging an LLM, optionally trained on a large catalog and/or fine-tuned based on feedback from human raters to complete the attribute set of a product, the requirement of manual entry of product attributes is obviated and products can be characterized at scale. Upon automatically filling in the predicted attribute values, a higher likelihood of merchant products being surfaced to suitable customers is realized.

## References

1. “Shopify” available online at https://www.shopify.com/ accessed Nov 19, 2024.
2. “Gemini” available online at https://gemini.google.com/ accessed Nov 19, 2024.
3. “Feedonomics” available online at https://feedonomics.com/ accessed Nov 19, 2024.
4. “Simprosys” available online at https://simprosys.com/ accessed Nov 19, 2024.