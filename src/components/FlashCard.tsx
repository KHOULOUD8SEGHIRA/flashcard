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
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 relative z-50 transform transition-all duration-500 animate-modal-appear"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-gray-800">{flashcard.word}</h2>
            <div className="flex gap-4">
              <button
                onClick={() => playAudio('uk')}
                className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-green-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {flashcard.uk_pronunciation}
              </button>
              <button
                onClick={() => playAudio('us')}
                className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-green-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {flashcard.us_pronunciation}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-xl font-medium text-green-800">{flashcard.translation}</p>
              <p className="text-sm text-green-600 mt-1">{flashcard.part_of_speech}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-700 mb-2">{t('flashcard.exampleSentence')}</h3>
              <p className="text-lg text-gray-800">{flashcard.exampleSentence}</p>
              <p className="text-gray-600 mt-2">{flashcard.exampleTranslation}</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
              <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                {t('flashcard.memoryTip')}
              </h3>
              <p className="text-yellow-900 italic">{flashcard.mnemonic}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-700 mb-2">{t('flashcard.relatedWords')}</h3>
                <p className="text-gray-600">{flashcard.related_words}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-gray-700 mb-2">{t('flashcard.synonyms')}</h3>
                <p className="text-gray-600">{flashcard.synonyms}</p>
              </div>
            </div>
          </div>

          {/* Next Word Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onNext}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-green-500 rounded-full overflow-hidden shadow-lg hover:bg-green-600 transition-colors"
            >
              <span className="relative z-10 flex items-center">
                {t('button.nextWord')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
