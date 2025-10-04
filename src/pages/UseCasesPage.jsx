import React from 'react';
import { Link } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';

const UseCasesPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Use Cases
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore how our security solutions can protect your digital assets across various platforms and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Link
                key={useCase.id}
                to={`/use-cases/${useCase.id}`}
                className={`group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${useCase.color} ${useCase.hoverColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                    <span className="text-2xl">{getIconComponent(useCase.icon)}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-gray-100 mb-6">{useCase.description}</p>
                  <div className="flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to render icons
const getIconComponent = (iconName) => {
  const icons = {
    cloud: '☁️',
    globe: '🌐',
    code: '{}',
    smartphone: '📱',
    server: '🖥️',
    link: '⛓️',
  };
  return icons[iconName] || '🔒';
};

export default UseCasesPage;
