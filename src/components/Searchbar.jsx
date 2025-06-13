import { useEffect, useState } from "react";
import css from "../css/searchbar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearchSuggestion } from '../utils/appSlice';
import {StaticSuggestions} from '../constants/ytApi.js'

const Searchbar = () => {
  const searchSuggestion = useSelector((store) => store.app.searchSuggestion);
  const [input, setInput] = useState("");
  const [Suggestionbox, setSuggestionbox] = useState(false);
  const [SelectedSuggestion, setSelectedSuggestion] = useState(false);
  const [ActiveSuggestion, setActiveSuggestion] = useState(-1);
  const dispatch = useDispatch();

  function searchVideo() {
    setSuggestionbox(false);
    setActiveSuggestion(-1);
    dispatch(setCategory(input));
  }

  function showSuggestion() {
    if (!input.trim() || SelectedSuggestion) {
      setSelectedSuggestion(false);
      return;
    }

    const filtered = StaticSuggestions
      .filter(s => s.toLowerCase().includes(input.toLowerCase()))
      .map(value => ({ value }));

    dispatch(setSearchSuggestion(filtered));
    setSuggestionbox(true);
  }

  function selectSuggestion(suggestion) {
    setSelectedSuggestion(true);
    setInput(suggestion);
    searchVideo();
  }

  function handlekeydown(e) {
    if (!Suggestionbox) return;

    if (e.key === 'ArrowDown') {
      setActiveSuggestion((prev) => {
        const nextIdx = prev < searchSuggestion.length - 1 ? prev + 1 : 0;
        setSelectedSuggestion(true);
        setInput(searchSuggestion[nextIdx].value);
        return nextIdx;
      });
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion((prev) => {
        const nextIdx = prev > 0 ? prev - 1 : searchSuggestion.length - 1;
        setSelectedSuggestion(true);
        setInput(searchSuggestion[nextIdx].value);
        return nextIdx;
      });
    } else if (e.key === 'Enter') {
      searchVideo();
    }
  }

  function clearSearchbar() {
    setInput('');
    setSuggestionbox(false);
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      showSuggestion();
    }, 200);
    return () => {
      clearTimeout(interval);
    };
  }, [input]);

  return (
    <div className={css.container}>
      <div className={css.wraper}>
        <div className={css.sContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
            onKeyDown={handlekeydown}
          />
          <div className={css.btnbox}>
            <span
              onClick={clearSearchbar}
              className={`material-symbols-outlined ${input === "" ? css.close : ''}`}
            >close</span>
            <span
              onClick={searchVideo}
              className={`material-symbols-outlined ${css.search}`}
            >search</span>
          </div>
        </div>
        <span className="iconHover material-symbols-outlined">mic</span>
      </div>

      {Suggestionbox && (
        <div className={css.suggestionbox}>
          <ul className={`${searchSuggestion.length !== 0 && css.space}`}>
            {searchSuggestion.length === 0 ? (
              <li className={css.noResult}>No suggestions found</li>
            ) : (
              searchSuggestion.map((e, idx) => (
                <li
                  key={idx}
                  className={`iconHover ${ActiveSuggestion === idx && css.highlight}`}
                  onClick={() => selectSuggestion(e.value)}
                >
                  {e.value}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
