"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState();
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setsearchResults] = useState([]);

  const [posts, setPosts] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // this will flag for case insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prmpt) ||
        regex.test(item.tag)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value); // get the value of the search input

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setsearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setsearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setsearchResults(searchResult);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={() => {
            handleTagClick();
          }}
        />
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={() => {
            handleTagClick();
          }}
        />
      )}
    </section>
  );
};

export default Feed;
