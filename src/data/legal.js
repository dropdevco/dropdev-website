/*
 * Legal documents, rendered by components/LegalPage.jsx.
 *
 * IMPORTANT: unlike data/content.js, the text in this file is legal copy and
 * is reproduced VERBATIM as supplied by Drop Dev. Do not rewrite it, simplify
 * it, or strip its em dashes the way the marketing copy rules require. Only
 * the company itself (or its counsel) should change wording here.
 *
 * Block shapes understood by the renderer:
 *   { type: 'p',     text }              paragraph
 *   { type: 'p',     text, caps: true }  paragraph set at a slightly smaller
 *                                        size, for the all-caps disclaimers
 *   { type: 'short', text }              the "In Short" callout
 *   { type: 'h3',    text }              sub-heading inside a section
 *   { type: 'ul',    items: [] }         bullet list
 *
 * Inline markup inside any `text` or list item:
 *   **bold**              →  <strong>
 *   [label](href)         →  link (internal "#id" or external URL)
 */

export const privacyPolicy = {
    slug: 'privacy',
    title: 'Privacy Policy',
    updatedLabel: 'Last updated',
    updated: 'September 08, 2025',
    intro: [
        {
            type: 'p',
            text: 'This Privacy Notice for **DROPDEV LLC** ("**we**," "**us**," or "**our**"), describes how and why we might access, collect, store, use, and/or share ("**process**") your personal information when you use our services ("**Services**"), including when you:',
        },
        {
            type: 'ul',
            items: [
                'Visit our website at [http://www.dropdev.co](http://www.dropdev.co) or any website of ours that links to this Privacy Notice',
                'Engage with us in other related ways, including any sales, marketing, or events',
            ],
        },
        {
            type: 'p',
            text: '**Questions or concerns?** Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at [info@dropdev.co](mailto:info@dropdev.co).',
        },
    ],
    sections: [
        {
            id: 'summary',
            title: 'Summary of Key Points',
            blocks: [
                {
                    type: 'p',
                    text: '*This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using the table of contents to find the section you are looking for.*',
                },
                {
                    type: 'p',
                    text: '**What personal information do we process?** When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about [personal information you disclose to us](#infocollect).',
                },
                {
                    type: 'p',
                    text: '**Do we process any sensitive personal information?** Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.',
                },
                {
                    type: 'p',
                    text: '**Do we collect any information from third parties?** We do not collect any information from third parties.',
                },
                {
                    type: 'p',
                    text: '**How do we process your information?** We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about [how we process your information](#infouse).',
                },
                {
                    type: 'p',
                    text: '**In what situations and with which parties do we share personal information?** We may share information in specific situations and with specific third parties. Learn more about [when and with whom we share your personal information](#whoshare).',
                },
                {
                    type: 'p',
                    text: '**How do we keep your information safe?** We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.',
                },
                {
                    type: 'p',
                    text: '**What are your rights?** Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.',
                },
                {
                    type: 'p',
                    text: '**How do you exercise your rights?** The easiest way to exercise your rights is by submitting a [data subject access request](https://app.termly.io/dsar/aaaba9e1-7b17-4e73-9296-d689437c5e3c), or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.',
                },
            ],
        },
        {
            id: 'infocollect',
            title: '1. What Information Do We Collect?',
            blocks: [
                { type: 'h3', text: 'Personal information you disclose to us' },
                { type: 'short', text: '*We collect personal information that you provide to us.*' },
                {
                    type: 'p',
                    text: 'We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.',
                },
                {
                    type: 'p',
                    text: '**Personal Information Provided by You.** The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:',
                },
                {
                    type: 'ul',
                    items: ['names', 'phone numbers', 'email addresses', 'usernames'],
                },
                {
                    type: 'p',
                    text: '**Sensitive Information.** We do not process sensitive information.',
                },
                {
                    type: 'p',
                    text: 'All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.',
                },
                { type: 'h3', text: 'Information automatically collected' },
                {
                    type: 'short',
                    text: '*Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.*',
                },
                {
                    type: 'p',
                    text: 'We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.',
                },
                {
                    type: 'p',
                    text: 'Like many businesses, we also collect information through cookies and similar technologies.',
                },
                { type: 'p', text: 'The information we collect includes:' },
                {
                    type: 'ul',
                    items: [
                        '*Log and Usage Data.* Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).',
                        '*Location Data.* We collect location data such as information about your device’s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.',
                    ],
                },
            ],
        },
        {
            id: 'infouse',
            title: '2. How Do We Process Your Information?',
            blocks: [
                {
                    type: 'short',
                    text: '*We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.*',
                },
                {
                    type: 'p',
                    text: '**We process your personal information for a variety of reasons, depending on how you interact with our Services, including:**',
                },
                {
                    type: 'ul',
                    items: [
                        '**To send you marketing and promotional communications.** We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, contact us at [info@dropdev.co](mailto:info@dropdev.co).',
                    ],
                },
            ],
        },
        {
            id: 'whoshare',
            title: '3. When and With Whom Do We Share Your Personal Information?',
            blocks: [
                {
                    type: 'short',
                    text: '*We may share information in specific situations described in this section and/or with the following third parties.*',
                },
                {
                    type: 'p',
                    text: 'We may need to share your personal information in the following situations:',
                },
                {
                    type: 'ul',
                    items: [
                        '**Business Transfers.** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.',
                    ],
                },
            ],
        },
        {
            id: 'contact',
            title: '4. How Can You Contact Us About This Notice?',
            blocks: [
                {
                    type: 'p',
                    text: 'If you have questions or comments about this notice, you may contact us at [info@dropdev.co](mailto:info@dropdev.co).',
                },
                {
                    type: 'p',
                    text: 'DROPDEV LLC\n619 E Nevada Ave\nEl Paso, Texas 79902\nUnited States',
                },
            ],
        },
    ],
};

export const termsAndConditions = {
    slug: 'terms',
    title: 'Terms and Conditions',
    updatedLabel: 'Effective as of',
    updated: 'September 08, 2026',
    intro: [],
    sections: [
        {
            id: 'agreement',
            title: 'Agreement Between User and dropdev.co',
            blocks: [
                {
                    type: 'p',
                    text: 'Welcome to [https://dropdev.co/](https://dropdev.co/). The https://dropdev.co/ website (the "Site") is comprised of various web pages operated by DROPDEV LLC ("DropDev"). https://dropdev.co/ is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of https://dropdev.co/ constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.',
                },
                { type: 'p', text: 'https://dropdev.co/ is an E-Commerce Site.' },
                {
                    type: 'p',
                    text: 'LayerOne offers software tools that automate business communications and workflows, including AI chat assistance, lead engagement, appointment scheduling and reminders, multilingual messaging, analytics, and OCR extraction from financial and business documents.',
                },
            ],
        },
        {
            id: 'privacy',
            title: 'Privacy',
            blocks: [
                {
                    type: 'p',
                    text: 'Your use of https://dropdev.co/ is subject to DropDev’s [Privacy Policy](/privacy). Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.',
                },
            ],
        },
        {
            id: 'electronic-communications',
            title: 'Electronic Communications',
            blocks: [
                {
                    type: 'p',
                    text: 'Visiting https://dropdev.co/ or sending emails to DropDev constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.',
                },
            ],
        },
        {
            id: 'children',
            title: 'Children Under Thirteen',
            blocks: [
                {
                    type: 'p',
                    text: 'DropDev does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use https://dropdev.co/ only with permission of a parent or guardian.',
                },
            ],
        },
        {
            id: 'third-party',
            title: 'Links to Third Party Sites / Third Party Services',
            blocks: [
                {
                    type: 'p',
                    text: 'https://dropdev.co/ may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of DropDev and DropDev is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. DropDev is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by DropDev of the site or any association with its operators.',
                },
                {
                    type: 'p',
                    text: 'Certain services made available via https://dropdev.co/ are delivered by third party sites and organizations. By using any product, service or functionality originating from the https://dropdev.co/ domain, you hereby acknowledge and consent that DropDev may share such information and data with any third party with whom DropDev has a contractual relationship to provide the requested product, service or functionality on behalf of https://dropdev.co/ users and customers.',
                },
            ],
        },
        {
            id: 'liability',
            title: 'Liability Disclaimer',
            blocks: [
                {
                    type: 'p',
                    caps: true,
                    text: 'THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. DROPDEV LLC AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.',
                },
                {
                    type: 'p',
                    caps: true,
                    text: 'DROPDEV LLC AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. DROPDEV LLC AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.',
                },
                {
                    type: 'p',
                    caps: true,
                    text: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DROPDEV LLC AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF DROPDEV LLC OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.',
                },
            ],
        },
        {
            id: 'intellectual-property',
            title: 'No Unlawful or Prohibited Use / Intellectual Property',
            blocks: [
                {
                    type: 'p',
                    text: 'You are granted a non-exclusive, non-transferable, revocable license to access and use https://dropdev.co/ strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to DropDev that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party’s use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site.',
                },
                {
                    type: 'p',
                    text: 'All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of DropDev or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto.',
                },
                {
                    type: 'p',
                    text: 'You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. DropDev content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of DropDev and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of DropDev or our licensors except as expressly authorized by these Terms.',
                },
            ],
        },
        {
            id: 'international',
            title: 'International Users',
            blocks: [
                {
                    type: 'p',
                    text: 'The Service is controlled, operated and administered by DropDev from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the DropDev Content accessed through https://dropdev.co/ in any country or in any manner prohibited by any applicable laws, restrictions or regulations.',
                },
            ],
        },
        {
            id: 'indemnification',
            title: 'Indemnification',
            blocks: [
                {
                    type: 'p',
                    text: 'You agree to indemnify, defend and hold harmless DropDev, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney’s fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. DropDev reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with DropDev in asserting any available defenses.',
                },
            ],
        },
        {
            id: 'class-action-waiver',
            title: 'Class Action Waiver',
            blocks: [
                {
                    type: 'p',
                    text: 'Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH’S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and DropDev agree otherwise, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding.',
                },
            ],
        },
        {
            id: 'termination',
            title: 'Termination / Access Restriction',
            blocks: [
                {
                    type: 'p',
                    text: 'DropDev reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Texas and you hereby consent to the exclusive jurisdiction and venue of courts in Texas in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section.',
                },
                {
                    type: 'p',
                    text: 'You agree that no joint venture, partnership, employment, or agency relationship exists between you and DropDev as a result of this agreement or use of the Site. DropDev’s performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of DropDev’s right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by DropDev with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect.',
                },
                {
                    type: 'p',
                    text: 'Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and DropDev with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and DropDev with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English.',
                },
            ],
        },
        {
            id: 'changes',
            title: 'Changes to Terms',
            blocks: [
                {
                    type: 'p',
                    text: 'DropDev reserves the right, in its sole discretion, to change the Terms under which https://dropdev.co/ is offered. The most current version of the Terms will supersede all previous versions. DropDev encourages you to periodically review the Terms to stay informed of our updates.',
                },
            ],
        },
        {
            id: 'contact',
            title: 'Contact Us',
            blocks: [
                {
                    type: 'p',
                    text: 'DropDev welcomes your questions or comments regarding the Terms:',
                },
                {
                    type: 'p',
                    text: 'DROPDEV LLC\n619 E Nevada Ave\nEl Paso, Texas 79902',
                },
                {
                    type: 'p',
                    text: 'Email Address: [info@dropdev.co](mailto:info@dropdev.co)\nTelephone number: [+1 (915) 234-1444](tel:+19152341444)',
                },
            ],
        },
    ],
};
