import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ClerkProvider } from "@clerk/clerk-react";
import { clerkDarkTheme } from "@/lib/clerk-theme";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import LabsPage from "@/pages/LabsPage";
import LabDetailsPage from "@/pages/LabDetailsPage";
import TracksPage from "@/pages/TracksPage";
import TrackDetailsPage from "@/pages/TrackDetailsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Toaster } from "@/components/ui/toaster";
import AcademyPage from "@/pages/AcademyPage";
import ProgramDetailsPage from "@/pages/ProgramDetailsPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailsPage from "@/pages/ServiceDetailsPage";
import PTaaSPage from "@/pages/PTaaSPage";
import RTaaSPage from "@/pages/RTaaSPage";
import PSaaSPage from "@/pages/PSaaSPage";
import UserProfilePage from "@/pages/UserProfilePage";
import UseCasesPage from "@/pages/UseCasesPage";
import UseCaseDetailPage from "@/pages/UseCaseDetailPage";
import { useAuth, AuthProvider } from "@/lib/clerk-auth.jsx";
import CareersPage from "@/pages/CareersPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import SecurityPage from "@/pages/SecurityPage";
import BlogsPage, { BlogPostPage } from "@/pages/BlogsPage";
import FintechSecurity from "@/pages/use-cases/FintechSecurity.jsx";
import AiSecurity from "@/pages/use-cases/AiSecurity.jsx";
import ContinuousPentest from "@/pages/use-cases/ContinuousPentest.jsx";
import SaasSecurity from "@/pages/use-cases/SaasSecurity.jsx";
import AppSecurity from "@/pages/use-cases/AppSecurity.jsx";
import OffensiveSecurity from "@/pages/use-cases/OffensiveSecurity.jsx";

// Get the publishable key from environment variables
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Debug environment setup
// console.log('🔍 Clerk Configuration:', {
//   key: CLERK_PUBLISHABLE_KEY ? 'Present' : 'Missing',
//   env: import.meta.env.MODE,
//   keyStart: CLERK_PUBLISHABLE_KEY ? CLERK_PUBLISHABLE_KEY.substring(0, 10) + '...' : 'None',
//   isValidFormat: CLERK_PUBLISHABLE_KEY ? /^pk_(test|live)_/.test(CLERK_PUBLISHABLE_KEY) : false
// });

// Check for placeholder keys
const isPlaceholderKey =
  CLERK_PUBLISHABLE_KEY === "pk_live_Y0luZXJlX3VzZXJfaWRfcGxhY2Vob2xkZXI" ||
  CLERK_PUBLISHABLE_KEY === "pk_test_your_key_here" ||
  CLERK_PUBLISHABLE_KEY === "pk_live_YOUR_ACTUAL_CLERK_KEY_HERE" ||
  CLERK_PUBLISHABLE_KEY === "pk_test_placeholder_key_for_development";

if (isPlaceholderKey) {
  console.error(
    "🚨 CLERK ERROR: You are using a placeholder key. Please update your environment variables with a real Clerk key."
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Temporarily allow access for testing when using placeholder keys
  if (isPlaceholderKey) {
    return children;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        state={{
          from: location,
          showAuthModal: true,
          message: "Please log in to view this content.",
        }}
        replace
      />
    );
  }

  return children;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("Runtime error caught by ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h1 className="text-xl font-bold text-red-400 mb-3">
              An error occurred
            </h1>
            <p className="text-gray-300 mb-4">
              The app encountered an error and cannot display the page.
            </p>
            <pre className="bg-black/40 p-3 rounded text-xs overflow-auto text-red-300">
              {String(
                this.state.error?.stack ||
                  this.state.error?.message ||
                  this.state.error ||
                  "Unknown error"
              )}
            </pre>
            <button
              className="mt-4 px-4 py-2 bg-primary rounded"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/labs" element={<LabsPage />} />
            <Route
              path="/labs/:labId"
              element={
                <ProtectedRoute>
                  <LabDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/tracks" element={<TracksPage />} />
            <Route
              path="/tracks/:trackId"
              element={
                // Add new route for TrackDetailsPage
                <ProtectedRoute>
                  <TrackDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/academy" element={<AcademyPage />} />
            <Route
              path="/academy/:programId"
              element={
                <ProtectedRoute>
                  <ProgramDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/ptaas" element={<PTaaSPage />} />
            <Route path="/services/rtaas" element={<RTaaSPage />} />
            <Route path="/services/psaas" element={<PSaaSPage />} />
            <Route
              path="/services/:serviceId"
              element={<ServiceDetailsPage />}
            />

            {/* Use Cases Routes */}
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route
              path="/use-cases/fintech-security"
              element={<FintechSecurity />}
            />
            <Route path="/use-cases/ai-security" element={<AiSecurity />} />
            <Route
              path="/use-cases/continuous-pentesting"
              element={<ContinuousPentest />}
            />
            <Route path="/use-cases/saas-security" element={<SaasSecurity />} />
            <Route path="/use-cases/app-security" element={<AppSecurity />} />
            <Route
              path="/use-cases/offensive-security"
              element={<OffensiveSecurity />}
            />
            <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Toaster />
    </div>
  );
};

const App = () => {
  // Check if Clerk key is provided and valid
  const hasValidClerkKey =
    CLERK_PUBLISHABLE_KEY &&
    !isPlaceholderKey &&
    /^pk_(test|live)_/.test(CLERK_PUBLISHABLE_KEY);

  // Temporarily bypass authentication for development
  const shouldShowAuthScreen = false; // Set to false to bypass auth screen

  if (!hasValidClerkKey && shouldShowAuthScreen) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-2xl">
          <div className="text-yellow-500 text-6xl">🔑</div>
          <h1 className="text-3xl font-bold text-yellow-400">
            Authentication Setup Required
          </h1>
          <div className="space-y-4 text-gray-300">
            <p>
              Your application needs a valid Clerk authentication key to
              function properly.
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 font-mono text-sm text-left">
              <h3 className="text-yellow-400 mb-3 font-semibold">
                To fix this:
              </h3>
              <ol className="space-y-2 text-gray-300">
                <li>
                  1. Go to{" "}
                  <a
                    href="https://dashboard.clerk.com/"
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dashboard.clerk.com
                  </a>
                </li>
                <li>2. Sign in to your account (or create one)</li>
                <li>3. Select your project or create a new one</li>
                <li>4. Go to "API Keys" section</li>
                <li>
                  5. Copy your publishable key (starts with{" "}
                  <code className="text-green-400">pk_test_</code> for
                  development)
                </li>
                <li>
                  6. Replace{" "}
                  <code className="text-red-400">
                    pk_test_your-actual-clerk-key-here
                  </code>{" "}
                  in <code className="text-blue-400">.env</code> with your real
                  key
                </li>
              </ol>
            </div>
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>Alternative:</strong> If you want to run the app without
                authentication temporarily, you can comment out the Clerk
                integration in the code.
              </p>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 font-mono text-sm text-left">
            <p className="text-gray-400 mb-2">Add to .env file:</p>
            <code className="text-green-400">
              VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      appearance={clerkDarkTheme}
    >
      <ErrorBoundary>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ErrorBoundary>
    </ClerkProvider>
  );
};

export default App;
