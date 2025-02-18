import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaBuilding } from 'react-icons/fa';

interface SuburbsLocatorProps {
  onSelect?: (suburb: string) => void;
}

const SuburbsLocator = ({ onSelect }: SuburbsLocatorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const autoCompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      autoCompleteRef.current = new google.maps.places.AutocompleteService();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearch = async (input: string) => {
    setSearchTerm(input);
    
    if (!input || !autoCompleteRef.current) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await autoCompleteRef.current.getPlacePredictions({
        input,
        componentRestrictions: { country: 'au' },
        types: ['(regions)']
      });
      
      setPredictions(response?.predictions || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
    }
    setIsLoading(false);
  };

  const handleSelect = (suburb: string) => {
    setSearchTerm(suburb);
    setPredictions([]);
    if (onSelect) {
      onSelect(suburb);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for Australian suburbs..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {predictions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
      )}
    </div>
  );
};

export default SuburbsLocator;
