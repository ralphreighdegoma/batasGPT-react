import React from 'react';

interface SearchResultModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    searchResults: {
        title: string;
        case_number: string;
        content: string;
    };
}

const SearchResultModal: React.FC<SearchResultModalProps> = ({
    isOpen,
    setIsOpen,
    searchResults,
}) => {

    if (!searchResults) {
        return;
    }
    return (
        <>
            <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                <div className={`fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="h-full flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">{searchResults.title}</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 px-6 py-4 overflow-y-auto">
                            <div className="px-3 py-1 bg-gray-100 rounded-full inline-block mb-4">
                                <span className="font-semibold">Reference:</span> {searchResults.case_number}
                            </div>
                            <div
                                className="text-gray-600"
                                dangerouslySetInnerHTML={{ __html: searchResults.content }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResultModal;
