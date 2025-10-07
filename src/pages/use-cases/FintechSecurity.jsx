import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CreditCard,
  AlertTriangle,
  Users,
  Server,
  Zap,
  TrendingUp,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageVariants, sectionVariants } from "@/lib/animations";

const textPrimary =
  "bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent";
const bgPrimary = "bg-gradient-to-r from-yellow-400 to-amber-600";

export default function UseCaseDetailPage() {
  return (
    <motion.div
      className="layout-container flex flex-col min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white px-6 md:px-10 py-20"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative text-center py-28 px-6 overflow-hidden">
        <div className="absolute w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl top-10 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-3xl bottom-10 right-1/4 animate-pulse"></div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={`text-5xl md:text-7xl font-extrabold mb-6 ${textPrimary} drop-shadow-lg`}
        >
          Fintech Security
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          In the digital finance world, security is the heartbeat of trust.
          Fintech Security safeguards digital transactions, protects sensitive
          data, ensures privacy-by-design, and helps businesses meet regulatory
          expectations while preserving customer trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Button
            asChild
            className={`${bgPrimary} px-8 py-4 text-lg rounded-full hover:shadow-[0_0_25px_#FFD700] transition-all duration-300`}
          >
            <a href="#more-info">Explore Fintech Security</a>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20"
      >
        <CardFeature
          icon={Shield}
          title="End-to-End Encryption"
          textPrimary={textPrimary}
        >
          Military-grade encryption securing all data and transactions at every
          stage.
        </CardFeature>
        <CardFeature
          icon={Lock}
          title="Multi-Factor Authentication"
          textPrimary={textPrimary}
        >
          Biometric authentication, OTPs, and device verification to strengthen
          security.
        </CardFeature>
        <CardFeature
          icon={CreditCard}
          title="Fraud Detection"
          textPrimary={textPrimary}
        >
          AI-based fraud detection preventing suspicious transactions in real
          time.
        </CardFeature>
        <CardFeature
          icon={AlertTriangle}
          title="Threat Intelligence"
          textPrimary={textPrimary}
        >
          Real-time threat intelligence for continuous protection.
        </CardFeature>
        <CardFeature
          icon={Users}
          title="Privacy Protection"
          textPrimary={textPrimary}
        >
          Minimization of personally identifiable information and strong access
          controls to keep customer data private.
        </CardFeature>
        <CardFeature
          icon={Server}
          title="Secure Infrastructure"
          textPrimary={textPrimary}
        >
          Hardened cloud and on-premise infrastructure with automated patching
          and secure configurations.
        </CardFeature>
        <CardFeature
          icon={Zap}
          title="Rapid Incident Response"
          textPrimary={textPrimary}
        >
          Tools and runbooks for detecting, containing and recovering from
          incidents quickly and safely.
        </CardFeature>
        <CardFeature
          icon={TrendingUp}
          title="Regulatory Alignment"
          textPrimary={textPrimary}
        >
          Security and privacy measures aligned to evolving finance regulations
          and industry best practices.
        </CardFeature>
        <CardFeature
          icon={Layers}
          title="Layered Security"
          textPrimary={textPrimary}
        >
          Defense-in-depth with network, application, host and data controls.
        </CardFeature>
        <CardFeature
          icon={CheckCircle2}
          title="Continuous Monitoring"
          textPrimary={textPrimary}
        >
          24/7 telemetry collection, analytics, and alerting to spot anomalies
          early.
        </CardFeature>
      </motion.div>

      {/* Why Fintech Security Section */}
      <motion.div
        id="more-info"
        style={{ paddingTop: "120px", marginTop: "-120px" }}
        variants={sectionVariants}
        className="max-w-6xl mx-auto mb-24 px-6 sm:px-8 lg:px-10"
      >
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-8 text-center ${textPrimary} drop-shadow-lg`}
        >
          Why Fintech Security is Vital
        </h2>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4 text-center max-w-3xl mx-auto">
          Fintech platforms handle massive amounts of sensitive financial data
          and real-time transactions, making them prime targets for cyber
          threats.
        </p>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 text-center max-w-3xl mx-auto">
          Strong security measures protect user assets, maintain regulatory
          compliance, and preserve brand trust. Investing in fintech security is
          not optional — it’s the foundation for long-term success in the
          digital financial world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Payments & Wallets",
              text: "Secure card-on-file storage, tokenization, and transaction-level anti-fraud to protect both merchants and end-customers.",
            },
            {
              title: "Lending & Credit",
              text: "Protection of credit decision pipelines and securing sensitive borrower data during loan origination and servicing.",
            },
            {
              title: "Trading & Brokerage",
              text: "Real-time transaction integrity, order protection, and secure market data handling for trading platforms.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(255, 223, 0, 0.7)",
              }}
              className="relative bg-gradient-to-br from-yellow-400/10 to-amber-600/10 p-8 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer border border-yellow-400/20 hover:border-yellow-400"
            >
              <h3 className="font-bold text-2xl mb-4 text-yellow-400 border-b border-yellow-400/50 pb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Architecture Overview */}
      <motion.div
        variants={sectionVariants}
        className="max-w-6xl mx-auto mb-24 px-4 sm:px-6 lg:px-8"
      >
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${textPrimary}`}
        >
          Secure Architecture Overview
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Text Section */}
          <div className="space-y-5">
            <p className="text-gray-300 text-base sm:text-lg">
              Our recommended fintech architecture separates concerns and limits
              blast radius. Core principles include:
            </p>

            {/* Fixed bullet alignment */}
            <ul className="list-disc text-gray-300 space-y-2 pl-6 sm:pl-8 text-sm sm:text-base">
              <li className="break-words leading-relaxed">
                Network segmentation and micro-segmentation
              </li>
              <li className="break-words leading-relaxed">
                Least privilege access and role-based authorization
              </li>
              <li className="break-words leading-relaxed">
                Strong encryption (in transit and at rest) and key management
              </li>
              <li className="break-words leading-relaxed">
                Immutable logs and tamper-evident audit trails
              </li>
              <li className="break-words leading-relaxed">
                Automated security testing in CI/CD pipelines
              </li>
            </ul>

            <p className="text-gray-300 text-base sm:text-lg">
              The diagram to the right (textual layout) shows typical layers:
            </p>

            {/* Fixed numbered list alignment */}
            <ol className="list-decimal text-gray-300 space-y-2 pl-6 sm:pl-8 text-sm sm:text-base">
              <li className="break-words leading-relaxed">
                Edge: API gateway, WAF, rate limiting
              </li>
              <li className="break-words leading-relaxed">
                Application: microservices, auth service, fraud engine
              </li>
              <li className="break-words leading-relaxed">
                Data: tokenized storage, encryption, access logs
              </li>
              <li className="break-words leading-relaxed">
                Operations: monitoring, SIEM, automated patching
              </li>
            </ol>
          </div>

          {/* Diagram / Layer Cards Section */}
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/20 shadow-lg hover:shadow-[0_0_40px_rgba(255,223,0,0.8)] transition-shadow duration-300">
            <div className="flex flex-col gap-4 sm:gap-5">
              {["Edge", "Application", "Data", "Operations"].map(
                (layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white/5 transition-colors duration-300 break-words"
                  >
                    <div className="text-sm sm:text-base font-semibold text-yellow-400">
                      {layer}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 break-words">
                      {layer === "Edge" && "API Gateway · WAF · CDN"}
                      {layer === "Application" &&
                        "Microservices · Auth · Fraud"}
                      {layer === "Data" && "Tokenization · Encrypted Storage"}
                      {layer === "Operations" && "Monitoring · SIEM · IR"}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Operational Security Practices */}
      <motion.div
        variants={sectionVariants}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${textPrimary}`}>
          Operational Security Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Secure Development Lifecycle",
              description: [
                "Security is built in from design to production: threat modeling, secure coding standards, automated SAST/DAST in CI, and manual reviews where necessary.",
                "Developers are provided security checklists and pipelines enforce gates before deployment.",
              ],
            },
            {
              title: "Identity & Access Management",
              description: [
                "Role-based access, MFA for all privileged accounts, just-in-time access for maintenance, and centralized audit logging.",
                "Periodic access reviews reduce standing privileges and risks.",
              ],
            },
            {
              title: "Monitoring & Detection",
              description: [
                "Telemetry from across the stack is aggregated into a monitoring platform with anomaly detection and runbook-driven alerts.",
                "Alerts are triaged using an SLA-driven playbook to reduce noise and focus on high-value incidents.",
              ],
            },
            {
              title: "Patch & Configuration Management",
              description: [
                "Automated patching workflows, hardened baseline images, and configuration as code to ensure consistent, secure deployments.",
              ],
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(255, 223, 0, 0.7)",
              }}
              className="relative bg-white/5 p-6 rounded-xl shadow-lg transition-transform duration-300 cursor-pointer hover:outline hover:outline-yellow-400 hover:outline-4"
            >
              <h3 className="font-semibold mb-3 text-xl text-yellow-400">
                {item.title}
              </h3>
              {item.description.map((desc, i) => (
                <p key={i} className="text-gray-300 text-sm mb-2">
                  {desc}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Incident Response & SLAs */}
      <motion.div
        variants={sectionVariants}
        className="max-w-6xl mx-auto mb-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-10 rounded-3xl border border-white/20 shadow-2xl"
      >
        <h2
          className={`text-4xl font-extrabold mb-12 text-center ${textPrimary} drop-shadow-lg`}
        >
          Incident Response & SLAs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Detection",
              text: "Continuous monitoring with rapid alerting, leveraging AI-driven analytics for proactive defense.",
            },
            {
              title: "Containment",
              text: "Immediate isolation of impacted systems to limit exposure and prevent lateral movement of threats.",
            },
            {
              title: "Recovery",
              text: "Forensic analysis, remediation, and lessons learned to improve resilience and prevent recurrence.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent border border-yellow-400/30 hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(255,223,0,0.6)] transition-all duration-300 shadow-lg cursor-pointer"
            >
              <h3 className="font-bold text-2xl mb-4 text-yellow-400 drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm max-w-2xl mx-auto">
            Response times and SLAs vary by engagement. For production services,
            standard response and remediation SLAs are agreed contractually to
            meet operational risk profiles.
            <span className="block mt-2 text-yellow-400 font-medium drop-shadow-sm">
              Fast, effective, and reliable incident management — every time.
            </span>
          </p>
        </div>
      </motion.div>

      {/* Data Handling & Privacy */}
      <motion.div
        variants={sectionVariants}
        className="max-w-6xl mx-auto mb-20 px-4 sm:px-6 lg:px-8"
      >
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-10 text-center ${textPrimary}`}
        >
          Data Handling & Privacy
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Principles Card */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255, 223, 0, 0.6)",
            }}
            className="p-6 sm:p-8 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:outline hover:outline-yellow-400 hover:outline-4"
          >
            <h3 className="font-semibold text-2xl mb-4 text-yellow-400">
              Principles
            </h3>
            <ul className="list-disc text-gray-300 space-y-2 pl-6 sm:pl-8 text-sm sm:text-base marker:text-gray-300">
              <li className="break-words leading-relaxed">
                Collect the minimum data required to provide services.
              </li>
              <li className="break-words leading-relaxed">
                Use strong encryption in transit and at rest.
              </li>
              <li className="break-words leading-relaxed">
                Role-based access and least privilege for data access.
              </li>
              <li className="break-words leading-relaxed">
                Data retention policies tailored to regulatory needs.
              </li>
            </ul>
          </motion.div>

          {/* Privacy Safeguards Card */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255, 223, 0, 0.6)",
            }}
            className="p-8 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:outline hover:outline-yellow-400 hover:outline-4"
          >
            {" "}
            <h3 className="font-semibold text-2xl mb-4 text-yellow-400">
              {" "}
              Privacy Safeguards{" "}
            </h3>{" "}
            <p className="text-gray-300 text-lg mb-3">
              {" "}
              We design systems to minimize exposure of personal data and to
              provide transparent controls for customers. Any processing of
              personal data follows applicable legal requirements and customer
              agreements.{" "}
            </p>{" "}
            <p className="text-gray-300 text-lg">
              {" "}
              For public-facing content, avoid publishing any sensitive customer
              data or internal technical secrets.{" "}
            </p>{" "}
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-10 text-center ${textPrimary}`}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Do you store customer payment data?",
                a: "Sensitive payment data is either not stored or is tokenized and encrypted. Storage and retention are configured per the customer's risk and regulatory requirements.",
              },
              {
                q: "How quickly do you respond to incidents?",
                a: "We maintain 24/7 monitoring and an incident response process. Service-level response times are defined in the customer agreement and depend on the chosen support tier.",
              },
              {
                q: "Which compliance frameworks do you follow?",
                a: "We align security practices with widely-adopted frameworks and standards in the financial industry (for example, PCI-DSS, ISO 27001, GDPR) and adapt implementations to customer requirements. Specific compliance obligations are agreed contractually.",
              },
            ].map((item, index) => {
              const [open, setOpen] = React.useState(false);

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 0px 20px rgba(255, 223, 0, 0.4)",
                  }}
                  className="bg-white/5 p-6 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer border border-transparent hover:border-yellow-400 w-full"
                  onClick={() => setOpen(!open)}
                >
                  {/* Question */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{item.q}</span>
                    <span className="ml-2 text-yellow-400 text-xl">
                      {open ? "×" : "+"}
                    </span>
                  </div>

                  {/* Answer */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: open ? 1 : 0,
                      height: open ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    {open && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.div
        variants={sectionVariants}
        className="text-center mt-16 flex flex-col items-center"
      >
        <h2
          className={`text-3xl md:text-4xl font-semibold mb-4 ${textPrimary}`}
        >
          Protect Your Digital Finance Platform
        </h2>

        <p className="text-gray-400 max-w-xl mb-8 text-lg leading-relaxed">
          Partner with us to build a secure, resilient, and compliant fintech
          ecosystem. Protect your customers, strengthen trust, and stay ahead of
          threats.
        </p>

        <Button asChild className="group">
          <a
            href="#more-info"
            className={`${bgPrimary} text-white px-8 py-3 rounded-full flex items-center space-x-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
          >
            <span>Learn More</span>
            <span className="group-hover:translate-x-2 transition-transform text-lg">
              →
            </span>
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}

function CardFeature({ icon: Icon, title, children, textPrimary }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 25px rgba(255, 223, 0, 0.7)",
      }}
      className="p-6 rounded-xl shadow-lg bg-white/5 transition-transform duration-300 cursor-pointer hover:outline hover:outline-yellow-400 hover:outline-4"
    >
      <div className="mb-4">
        <Icon className="text-yellow-400" size={28} />
      </div>
      <h3 className={`font-semibold text-xl mb-2 ${textPrimary}`}>{title}</h3>
      <p className="text-gray-300 text-sm">{children}</p>
    </motion.div>
  );
}
