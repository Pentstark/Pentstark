import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import Layout from '@/components/Layout';
import { ArrowLeft, ShieldCheck, Clock, Users, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UseCaseDetailPage = () => {
  const { id } = useParams();
  const useCase = useCases.find(uc => uc.id === id);

  if (!useCase) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Use Case Not Found</h1>
            <p className="text-xl text-gray-300 mb-8">The requested use case could not be found.</p>
            <Button asChild className="rounded-xl">
              <Link to="/use-cases" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Use Cases
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white pt-20 pb-20">
        {/* Hero Section */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${useCase.color} py-16`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{useCase.title}</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {useCase.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white/90 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true" className="text-gray-500">/</li>
              <li>
                <Link to="/use-cases" className="hover:text-white/90 transition-colors">Use Cases</Link>
              </li>
              <li aria-hidden="true" className="text-gray-500">/</li>
              <li className="text-white" aria-current="page">{useCase.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-gray-300">
                  Our {useCase.title} security assessment provides comprehensive protection for your {useCase.title.toLowerCase()} infrastructure. 
                  We identify vulnerabilities and provide actionable recommendations to secure your systems against the latest threats.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive security assessment of your {useCase.title.toLowerCase()} infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Identification of critical vulnerabilities and misconfigurations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Detailed remediation guidance and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ongoing security monitoring and support options</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-12 mb-4">Our Approach</h3>
                <p className="text-gray-300">
                  Our security experts follow a proven methodology to assess and secure your {useCase.title.toLowerCase()} environment. 
                  We combine automated scanning with manual testing to identify both common and complex security issues.
                </p>

                <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold mb-4">Ready to secure your {useCase.title.toLowerCase()}?</h4>
                  <p className="text-gray-300 mb-6">
                    Contact our security experts today to schedule a consultation and learn how we can help protect your {useCase.title.toLowerCase()} infrastructure.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="enterprise" className="rounded-xl">
                      <a
                        href="https://cal.com/pentstark/speak-to-an-expert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center"
                      >
                        <Zap className="mr-2 h-5 w-5" />
                        Book a Consultation
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link to="/contact" className="inline-flex items-center justify-center">
                        Contact Sales
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Key Information */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Key Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Security Level</h4>
                      <p className="text-sm text-gray-400">Enterprise-grade security</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Assessment Duration</h4>
                      <p className="text-sm text-gray-400">2-4 weeks (varies by scope)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Team</h4>
                      <p className="text-sm text-gray-400">Dedicated security experts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Related Services</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/services/ptaas" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Pentest as a Service
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/rtaas" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Red Team Assessment
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/psaas" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Product Security Assessment
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our security experts are ready to help you secure your {useCase.title.toLowerCase()} infrastructure.
                </p>
                <Button asChild className="w-full rounded-lg">
                  <a
                    href="https://cal.com/pentstark/speak-to-an-expert"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full"
                  >
                    Schedule a Call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UseCaseDetailPage;
