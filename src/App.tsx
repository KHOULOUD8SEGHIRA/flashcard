/**
 * Main application component for the Duolingo Alternative Flashcard app.
 * This file contains the core UI layout and manages the main application state,
 * including language selection, flashcard fetching, and overall app structure.
 * 
 * Features:
 * - Language selection (native and target language)
 * - Flashcard generation using Dify AI API
 * - Responsive design with Tailwind CSS
 * - Internationalization support
 */

import { useState, useEffect } from 'react';
import FlashCard from './components/FlashCard';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { initGA, event } from './utils/analytics';

const AppWrapper = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

const App = () => {
  const AppContent = () => {
    const [nativeLanguage, setNativeLanguage] = useState<string>('');
    const [targetLanguage, setTargetLanguage] = useState<string>('');
    const [flashcard, setFlashcard] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { t, currentLanguage } = useLanguage();

    const nativeLanguages = [
      'Japanese',
      'Chinese',
      'Korean',
      'French',
      'Spanish'
    ];
    const targetLanguages = ['English', 'Coming soon'];

    const fetchFlashcard = async () => {
      setLoading(true);
      try {
        const response = await fetch(import.meta.env.VITE_DIFY_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_DIFY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: { language: nativeLanguage },
            response_mode: 'blocking',
            user: 'abc-123',
          }),
        });

        const data = await response.json();
        setFlashcard(data.data.outputs);
        
        // Track flashcard generation
        event('generate_flashcard', {
          native_language: nativeLanguage,
          target_language: targetLanguage
        });
      } catch (error) {
        console.error('Error fetching flashcard:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleNextCard = () => {
      setFlashcard(null);
      fetchFlashcard();
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-center gap-6 mb-2">
              <img
                src="/images/owl.jpg"
                alt="Owl"
                className="w-20 h-20 object-contain"
              />
              <h1 className="text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {t('header.title1')}
              </h1>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t('header.title2')}
            </h1>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Native Language */}
            <div>
              <h2 className="text-2xl font-medium text-gray-700 mb-4">
                {t('languageSelector.native')}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {nativeLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setNativeLanguage(lang)}
                    className={`px-4 py-2 rounded-lg text-lg transition-all ${
                      nativeLanguage === lang
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-500'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Language */}
            <div>
              <h2 className="text-2xl font-medium text-gray-700 mb-4">
                {t('languageSelector.target')}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {targetLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setTargetLanguage(lang)}
                    disabled={lang === 'Coming soon'}
                    className={`px-4 py-2 rounded-lg text-lg transition-all ${
                      targetLanguage === lang
                        ? 'bg-green-500 text-white shadow-md'
                        : lang === 'Coming soon'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-500'
                    }`}
                  >
                    {lang === 'Coming soon' ? t('languageSelector.comingSoon') : lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Draw Card Button */}
          <div className="text-center">
            <button
              onClick={fetchFlashcard}
              disabled={loading}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-medium text-white bg-green-500 rounded-full overflow-hidden shadow-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
            >
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="mr-3 text-2xl">🎴</span>
                )}
                {loading ? t('button.drawing') : t('button.drawCard')}
              </span>
            </button>
          </div>

          {/* Flashcard Modal */}
          {flashcard && (
            <FlashCard
              flashcard={flashcard}
              onClose={() => setFlashcard(null)}
              onNext={handleNextCard}
            />
          )}
        </div>
        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://github.com/stvlynn/flashcard"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                alt="GitHub repo"
                src="https://img.shields.io/badge/github-stvlynn%2Fflashcard-black?logo=github&style=for-the-badge"
              />
            </a>
            <a
              href="https://twitter.com/stv_lynn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                alt="Twitter"
                src="https://img.shields.io/badge/twitter-@stv__lynn-1DA1F2?logo=twitter&style=for-the-badge&logoColor=white"
              />
            </a>
            <a
              href="https://github.com/langgenius/dify"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                alt="Powered by Dify"
                src="https://img.shields.io/badge/powered_by-dify-00A98F?logo=github&style=for-the-badge"
              />
            </a>
            <a
              href="https://www.buymeacoffee.com/stvlynn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                alt="Buy Me A Coffee"
                src="https://img.shields.io/badge/buy_me_a_coffee-support-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black"
              />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return <AppContent />;
};

export default AppWrapper;