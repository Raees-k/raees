import React from "react";
import { Input, Space } from "antd";
import { useHistory } from "react-router-dom";

const SearchBar = ({ styleApply, search }) => {
  const { Search } = Input;
  const history = useHistory();

  console.log("searchBar");

  const onSearch = (value) => {
    if (value && value.length > 0) {
      history.push(
        search === "events"
          ? `/search?type=events&${value}`
          : search === "news"
          ? `/search?type=news&${value}`
          : ""
      );
    }
  };

  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder={`search ${search}`}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </div>
  );
};

export default SearchBar;
