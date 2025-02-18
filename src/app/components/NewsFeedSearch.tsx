import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaBuilding, FaTimes, FaMapMarked } from 'react-icons/fa';

// Add type declaration for google maps
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          AutocompleteService: new () => any;
          AutocompletePrediction: any;
        };
      };
    };
  }
}

interface NewsFeedSearchProps {
  onSelect?: (suburb: string) => void;
}

const NewsFeedSearch = ({ onSelect }: NewsFeedSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<Window['google']['maps']['places']['AutocompletePrediction'][]>([]);
  const autoCompleteRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedSuburb, setSelectedSuburb] = useState('');

  useEffect(() => {
    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      autoCompleteRef.current = new window.google.maps.places.AutocompleteService();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearch = async (input: string) => {
    setSearchTerm(input);
    
    if (!input) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search cities
      if (autoCompleteRef.current) {
        const response = await autoCompleteRef.current.getPlacePredictions({
          input: input + ' city philippines',
          componentRestrictions: { country: 'ph' },
          types: ['locality']
        });
        setPredictions(response?.predictions || []);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
    setIsLoading(false);
  };

  const handleSelect = (suburb: string) => {
    setSearchTerm('');
    setPredictions([]);
    setSelectedSuburb(suburb);
    setShowSearch(false);
    if (onSelect) {
      onSelect(suburb);
    }
  };

  const handleClearSuburb = () => {
    setSelectedSuburb('');
    if (onSelect) {
      onSelect('');
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        {selectedSuburb ? (
          <div className="flex items-center w-full bg-blue-50 p-2 rounded-lg">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span className="flex-1 text-blue-700">{selectedSuburb}</span>
            <button 
              onClick={handleClearSuburb}
              className="p-1 hover:bg-blue-100 rounded-full"
            >
              <FaTimes className="text-blue-500" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center justify-center p-2 text-gray-500 hover:text-blue-500 transition-colors gap-2"
          >
            <FaMapMarked className="w-5 h-5" />
            <span>Change City</span>
          </button>
        )}
      </div>

      {showSearch && (
        <div className="absolute top-0 left-0 w-full bg-white z-20">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for cities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button 
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          {predictions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              <div className="py-2">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.place_id}
                    onClick={() => handleSelect(prediction.description)}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <div>
                      <div className="font-medium">{prediction.structured_formatting.main_text}</div>
                      <div className="text-sm text-gray-500">{prediction.structured_formatting.secondary_text}</div>
                    </div>
                    <FaBuilding className="ml-auto text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeedSearch;
