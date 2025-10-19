import React from 'react';
import { useCases } from '@/data/useCases';
import Layout from '@/components/Layout';
import UseCaseCard from '@/components/UseCaseCard';

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
              <UseCaseCard key={useCase.id} useCase={useCase} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UseCasesPage;
