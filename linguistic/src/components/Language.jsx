import React, { useState } from 'react';
import languages from './languages';

const LanguageSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [languageFound, setLanguageFound] = useState(null);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
  
    const handleSearch = () => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const found = languages.some((language) => language.toLowerCase() === lowerCaseSearchTerm);
      setLanguageFound(found);
      setSearchClicked(true); // Set searchClicked to true after clicking the Search button
    };
  
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setSearchTerm(inputValue);
  
      // Filter the suggestions based on the input value
      const lowerCaseInputValue = inputValue.toLowerCase();
      const suggestions = languages.filter(
        (language) => language.toLowerCase().startsWith(lowerCaseInputValue)
      );
  
      // Update the filtered suggestions list
      setFilteredSuggestions(suggestions);
  
      // Reset searchClicked to false if input is changed or deleted
      setSearchClicked(false);
    };
  
    const handleSuggestionClick = (suggestion) => {
      setSearchTerm(suggestion);
      setFilteredSuggestions([]); // Clear suggestions after selecting one
    };
  
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-3" style={{fontFamily:'Arial'}}>Supported Languages <i className="fa fa-flag" aria-hidden="true"></i> </h2>
            <p className="text-center">We support 50+ languages for both transcription and translation.</p>
            <p className="text-center">Type a language to check its availability:</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Type a language..."
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            {filteredSuggestions.length > 0 && (
              <ul className="list-group">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {searchClicked && (
              <p className="text-center mt-2">
                {searchTerm} is {languageFound ? <span>available &#127881;</span> : 'not available 😭'}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default LanguageSearch;