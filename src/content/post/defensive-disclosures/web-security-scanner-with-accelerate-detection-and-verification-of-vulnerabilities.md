---
title: Web Security Scanner with Accelerate Detection and Verification of Vulnerabilities 
excerpt: The web security scanner is a software tool that automatically examines web applications for security vulnerabilities through systematic crawling and testing phases. 
sectiontype: disclosure
publishDate: 2024-12-04
disclosureId: DD20241204001
metadata:
  title: Web Security Scanner with Accelerate Detection and Verification of Vulnerabilities 
  description: The web security scanner is a software tool that automatically examines web applications for security vulnerabilities through systematic crawling and testing phases.
  robots:
    index: false
    follow: false
  openGraph:
    title: Web Security Scanner with Accelerate Detection and Verification of Vulnerabilities 
    description: The web security scanner is a software tool that automatically examines web applications for security vulnerabilities through systematic crawling and testing phases.
    images:
      - url: '/images/disclosures/blockchain-voting/blockchain-voting-disclosure.webp'
        width: 1200
        height: 628
    type: website
  twitter:
    cardType: summary_large_image
submissionDate: 2024-12-02
url: '/defensive-disclosures/web-security-scanner-with-accelerate-detection-and-verification-of-vulnerabilities'
category: "Defensive Disclosure"
abstract: This publication describes techniques and apparatuses directed to the prevention of dust ingression into a foldable mobile device (e.g., at a hinge module). 
disclosureAuthors:
    - Yash Bhatnagar
image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s'
# tags:
#   - Scanner
#   - Web Security
downloadableDocument: 'https://example.com/blockchain-voting-disclosure.pdf'
---
The web security scanner is a software tool that automatically examines web applications for security vulnerabilities through systematic crawling and testing phases. Web security scanners receive customer scan configurations for deployed web applications in cloud services (e.g., application engine, compute service, kubernetes engine), including starting uniform resource locators (URLs), authentication credentials, and scan scope parameters like URLs to exclude using regular expressions. The web security scanner validates customer ownership of URLs before initiating the crawling phase.

During the crawling phase, the web security scanner systematically traverses web application structure beginning from provided URLs, discovering and cataloging additional URLs embedded within each page up to a predefined depth limit. All discovered web pages and provided URLs then become vulnerable URLs for the testing phase.

The web security scanner employs a testing engine with browser-based and standalone testing components to examine vulnerable URLs for vulnerabilities during the testing phase. The web security scanner testing engine utilizes predefined vulnerability detectors corresponding to industry-standard security risks (e.g., open worldwide application security project (OWASP)) such as cross-site scripting (XSS), structured query language (SQL) injection, etc. Each vulnerability detector employs algorithms to probe, test, and verify specific security vulnerabilities by utilizing predefined fuzzing payloads - malicious inputs designed to test application security through redirection commands, representational state transfer (REST) calls, hypertext transfer protocol (HTTP) headers, and form field inputs. Each vulnerable URL is tested against several predefined vulnerability detectors, with vulnerable URLs and corresponding identified vulnerabilities (e.g., XSS, SQL injection, mixed content) displayed in the web security scanner interface and/or exported to a security command center platform for comprehensive security monitoring across an organization's infrastructure.

Security vulnerabilities discovered by web security scanners require prompt remediation due to inherent security risks, with organizations implementing either permanent solutions or temporary mitigation measures. After implementation of remediation fixes, verifying remediation effectiveness requires initiating a new complete scan. A new complete scan requires the web security scanner to repeat both crawling and testing phases, which for large web applications can require a significant period of time (e.g., multiple days). Complete re-scanning is inefficient when organizations only need to verify fixes for specific, previously identified vulnerabilities.

Complete re-scanning causes the web security scanner to create repeated bursts of traffic that can impact application performance, requires temporary disabling of security measures (e.g., firewalls), and generates redundant alerts for known vulnerabilities. While scan scope can be limited through regular expression patterns, regular expression pattern configuration requires continuous modifications and still requires complete crawling and testing phases. Aspects of the present disclosure address the above-noted and other deficiencies by performing targeted testing of the previous identified vulnerabilities. The targeted testing may be performed in the vulnerability verification mode or the quick scan mode.

In the vulnerability verification mode, the web security re-scans a specified URL (e.g., a URL in which it a vulnerability was detected earlier) for a particular vulnerability. Conversely, in the quick scan mode, the web security scanner runs a portion of the scan verifying the presence vulnerabilities on a subset of URLs. The subset of URLs may include either all the URLs in which vulnerabilities were found previously, or the entire set of URLs crawled in a previous scan iteration.

FIG. 1 illustrates an example web security scanner 100 which includes a user interface 110, a scan validation module 120, a crawling engine 130, a verification engine 140, and a testing engine 150.

The UI 110 is configured to receive user input and a request to perform a full scan. The user input includes one or more starting URLs, authentication methods, login credentials, and scan scope parameters including URLs to exclude using regular expressions. The UI 110 provides the user input to the scan validation module 120. The scan validation module 120 validates the customer ownership of the starting URLs (of the user input) across different cloud computing platforms (e.g., application engine, compute engine, kubernetes engine).

The scan validation module 120 provides, to the crawling engine 130, the validated starting URLs. The crawling engine 130 accesses web pages corresponding to the validated starting URLs. The crawling engine 130 analyzes content of the accessed web pages to identify additional embedded URLs. Each of the identified additional embedded URLs is included in a list of URLs 175 with the validated starting URLs. The crawling engine 130 outputs the list of URLs 175, which may be stored in a data store 170. The crawling engine 130 may provide the list of URLs 175 directly to the testing engine 150, or the testing engine 150 may retrieve the list of URLs 175 from data store 170.

The testing engine 150, based on the requested full scan, utilizes predefined vulnerability detectors to examine each URL from the list. Each predefined vulnerability detector is configured to identify a specific type of security vulnerability (e.g., XSS, SQL injection). The testing engine 150 applies detector-specific fuzzing payloads that include custom headers, form inputs, and query parameters. The fuzzing payload parameters, such as header fields, path variables, and query strings, are dynamically generated based on the analysis of URL properties. These parameters are derived in real-time by extracting and modifying URL components like protocol type (HTTP/HTTPS), domain structure, path segments, and existing query parameters, allowing users to test how the system handles variations in these properties for vulnerability assessment. Each vulnerability detector employs specific algorithms to transmit these fuzzing payloads, analyze application responses, and verify successful exploitation of security vulnerabilities based on predefined detection criteria. When a vulnerability detector successfully determines a URL is vulnerable (e.g., vulnerable URL) to a specific type of security vulnerability based on predefined detection criteria, the testing engine 150 generates a finding. The finding includes the vulnerable URL, the security vulnerability (e.g., XSS, SQL injection), fuzzy payload(s) used to interact with the vulnerable URL, the algorithm (of the vulnerability detector used to identify the security vulnerability), and a current status (e.g., “Active”). Accordingly, each finding provides the exact testing scenario and conditions that were present when its corresponding security vulnerability was generated. In some instances, testing parameters may be persisted in the findings to provide future scans with additional context of the previous scan. The testing engine 150 may include each finding into a findings data structure (e.g., findings data structure 200).

With reference to FIG. 2, findings data structure 200 includes a plurality of entries (e.g., Entry A-n). Each entry corresponds to a finding produced by the testing engine 150 of FIG. 1. As previously discussed, each entry (or finding) includes a vulnerable URL, security vulnerability, fuzzy payload(s), algorithm, and a current status. Referring back to FIG. 1, the testing engine 150 displays the findings data structure (e.g., the findings data structure 200) to UI 110 and/or exports the findings data structure to a security command center 160.

After remediation of one or more security vulnerabilities associated with vulnerable URLs indicating in findings of the findings data structure, the UI 110 may receive a request to perform vulnerability verification on a selected entry of the findings data structure. As noted above, the verification mode re-scans a specified URL. In response to receiving the request to perform vulnerability verification on the selected entry, the verification engine 140 retrieves, from the findings data structure, the vulnerable URL, the fuzzy payload(s), and algorithm of the selected entry, which is then provided to the testing engine 150. The testing engine 150 applies the fuzzy payload(s) of the selected entry to the vulnerable URL of the selected entry using the algorithm of the vulnerability detector identified by the selected entry. If the vulnerability detector successfully determines that the vulnerable URL of the selected entry is not vulnerable to the security vulnerability, the testing engine 150 updates the current status of the selected entry to “Resolved.” Otherwise, the testing engine 150 updates the current status of the selected entry to “Active.”  

Additionally, and/or alternatively, after remediation of one or more security vulnerabilities associated findings of the findings data structure, the UI 110 may receive a request to perform a quick scan on a specified set of URLs. As noted above, the quick scan mode  runs a portion of the scan verifying the presence vulnerabilities on a subset of URLs. The specified set of URLs may be (i) vulnerable URLs associated with the findings of the findings data structure or (ii) the list of URLs from a previous full scan.

In response to receiving the request to perform the quick scan on the vulnerable URLs, the verification engine 140 retrieves, from the findings data structure, the vulnerable URL, the fuzzy payload(s) and the algorithm for each entry of the findings data structure, which is then provided to the testing engine 150. The testing engine 150 applies the fuzzy payload(s) of a respective entry to the vulnerable URL of the respective entry using the algorithm of the vulnerability detector identified by the respective entry. As previously described, the testing engine 150 updates the current status of the respective entry based on whether the vulnerability detector successfully determines that the vulnerable URL of the respective entry is not vulnerable to the security vulnerability (i.e., current status updated to “Resolved”).

In response to the request to perform the quick scan on the list of URLs from the previous full scan (e.g., list of URLs 175), the verification engine 140 retrieves, from the datastore 170, the list of URLs 175, which is then provided to the testing engine 150. The testing engine 150, as previously described with respect to the full scan, utilizes predefined vulnerability detectors to examine the list of URLs 175, where each detector applies its fuzzing payloads and algorithms to verify security vulnerabilities based on predefined detection criteria. When a vulnerability detector successfully determines a URL of the list of URLs 175 is vulnerable to a specific type of security vulnerability based on predefined detection criteria, the testing engine 150 generates a new finding for a respective URL of the list of URLs 175. If the new finding for the respective URL matches a finding for the respective URL (in the findings data structure) (e.g., matching finding), the testing engine 150 updates the current status of the matching finding to “Active.” If the new finding for the respective URL does not match a finding for the respective URL, the testing engine 150 includes the new finding for the respective URL with a current status of “Active” into the findings data structure. If there are no new findings for the respective URL, the testing engine 150 updates the current status of the finding for the respective URL to “Resolved.”

As previously described, the testing engine 150 may export the findings data structure to a security command center 160. In response to receiving the findings data structure, the security command center 160 may provide a user the ability to invoke various aspects of the web security scanner 100. In particular, the security command center 160 may provide a user interface in which the user request, via user input, a full scan, quick scan identifying a specified set of URLs, or verification of a specific URL. The security command center 160 construct an API call based on the user input. The security command center 160 sends the API request to the web security scanner 100 to invoke a corresponding operation of web security scanner 100 (e.g., full scan, quick scan, or verification). Once the web security scanner 100 completes the corresponding operation, the web security scanner 100 returns results (e.g., a new finding to include in the findings data structure of the security command center 160 or update to the current status of one or more findings in the findings data structure of the security command center 160).

## Abstract

A full scan is performed in response to receiving a request to perform a full scan. A plurality of findings is generated from the full scan. Each finding includes a URL, security vulnerability of the URL, fuzzy payload(s) used to interact with the URL, algorithm of the vulnerability detector used to identify the security vulnerability, and a current status. A verification of a finding is performed using the URL, fuzzy payload(s), and algorithm of the finding. The current status of the finding is updated based on the results of the verification of the finding. A quick scan is performed on a subset of URLs. The subset of URLs includes vulnerable URLs associated with the plurality of findings or URLs used in a previous full scan. A new finding is included into the plurality of findings or the current status of a finding of the plurality of findings is updated based on the quick scan on the subset of URLs.

## Keywords

web security scanner, security vulnerabilities, web applications, cloud services, uniform resource locators (URLs), crawling phase, testing phase, open worldwide application security project (OWASP), cross-site scripting (XSS), structured query language (SQL) injection, vulnerability detector, algorithms, fuzzing payloads, representational state transfer (REST) calls, hypertext transfer protocol (HTTP) headers, re-scanning, security command center

<div class="flex items-center mx-auto justify-center">

<img src="/images/disclosure/web-security-scanner-with-accelerate-detection-and-verification-of-vulnerabilities-1.JPG" class="!shadow-none" alt="fig-1"/>

</div>

<div class="flex items-center mx-auto justify-center">

<img src="/images/disclosure/web-security-scanner-with-accelerate-detection-and-verification-of-vulnerabilities-2.JPG" class="!shadow-none" alt="fig-2"/>

</div>