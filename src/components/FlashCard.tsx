/**
 * FlashCard component for displaying language learning cards.
 * Renders a modal dialog with word information, including:
 * - Word and its translation
 * - Pronunciation (UK and US)
 * - Example sentences
 * - Memory tips
 * - Related words and synonyms
 * 
 * Props:
 * - flashcard: Word data from the Dify AI API
 * - onClose: Callback to close the modal
 * - onNext: Callback to fetch the next card
 */

import { useLanguage } from '../hooks/useLanguage';

interface FlashCardProps {
  flashcard: {
    word: string;
    translation: string;
    part_of_speech: string;
    uk_pronunciation: string;
    us_pronunciation: string;
    exampleSentence: string;
    exampleTranslation: string;
    mnemonic: string;
    related_words: string;
    synonyms: string;
    uk_speech: string;
    us_speech: string;
  };
  onClose: () => void;
  onNext: () => void;
}

const FlashCard = ({ flashcard, onClose, onNext }: FlashCardProps) => {
  const { t } = useLanguage();

  const playAudio = (type: 'uk' | 'us') => {
    const audio = new Audio(flashcard[`${type}_speech`]);
    audio.play();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 md:right-4 md:top-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Card content */}
          <div className="p-4 md:p-8">
            {/* Word and Translation */}
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                {flashcard.word}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                {flashcard.translation}
              </p>
            </div>

            {/* Pronunciation */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* UK Pronunciation */}
              <div className="text-center">
                <button
                  onClick={() => playAudio('uk')}
                  className="w-full p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-sm md:text-base font-medium">🇬🇧 {flashcard.uk_pronunciation}</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              {/* US Pronunciation */}
              <div className="text-center">
                <button
                  onClick={() => playAudio('us')}
                  className="w-full p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-sm md:text-base font-medium">🇺🇸 {flashcard.us_pronunciation}</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Example Sentence */}
            <div className="mb-6 space-y-2">
              <h3 className="text-base md:text-lg font-medium text-gray-700">{t('flashcard.example')}</h3>
              <p className="text-sm md:text-base text-gray-900">{flashcard.exampleSentence}</p>
              <p className="text-sm md:text-base text-gray-600">{flashcard.exampleTranslation}</p>
            </div>

            {/* Memory Tips */}
            <div className="mb-6 space-y-2">
              <h3 className="text-base md:text-lg font-medium text-gray-700">{t('flashcard.memoryTip')}</h3>
              <p className="text-sm md:text-base text-gray-900">{flashcard.mnemonic}</p>
            </div>

            {/* Related Words and Synonyms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-medium text-gray-700">{t('flashcard.relatedWords')}</h3>
                <p className="text-sm md:text-base text-gray-900">{flashcard.related_words}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-medium text-gray-700">{t('flashcard.synonyms')}</h3>
                <p className="text-sm md:text-base text-gray-900">{flashcard.synonyms}</p>
              </div>
            </div>

            {/* Next Card Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={onNext}
                className="px-6 py-3 text-sm md:text-base font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                {t('button.nextWord')}
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
