import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Select, Table } from "antd";
import _ from "lodash";
import useAsync from "./useAsync";

const endpoint = "https://60b2643d62ab150017ae21de.mockapi.io/";
const useArticles = () => {
  const { execute, data, loading, error } = useAsync(
    useCallback(async () => {
      const res = await fetch(`${endpoint}/posts`);
      return await res.json();
    }, [])
  );

  useEffect(() => execute(), [execute]);
  return {
    articles: data,
    articlesLoading: loading,
    articlesError: error
  };
};
const useCategories = () => {
  const { execute, data, loading, error } = useAsync(
    useCallback(async () => {
      const res = await fetch(`${endpoint}/categories`);
      return await res.json();
    }, [])
  );
  useEffect(() => execute(), [execute]);

  return {
    categories: data,
    categoriesLoading: loading,
    categoriesError: error
  };
};
const useCombinedArticles = (articles, categories) => {
  return useMemo(() => {
    if (!articles || !categories) return null;
    return articles.map((article) => {
      return {
        ...article,
        category: categories.find(
          (c) => String(c.id) === String(article.categoryId)
        )
      };
    });
  }, [articles, categories]);
};
const useFilteredArticles = (articles, selectedCategory) => {
  return useMemo(() => {
    if (!articles) return null;
    if (!selectedCategory) return articles;
    return articles.filter((article) => {
      console.log("filter: ", article.categoryId, selectedCategory);
      return String(article?.category?.name) === String(selectedCategory);
    });
  }, [articles, selectedCategory]);
};

const columns = [
  { dataIndex: "title", title: "Title" },
  { dataIndex: ["category", "name"], title: "Category" }
];

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { articles, articlesError } = useArticles();
  const { categories, categoriesError } = useCategories();
  const combined = useCombinedArticles(articles, categories);
  const result = useFilteredArticles(combined, selectedCategory);

  const options = useMemo(() => {
    const arr = _.uniqBy(categories, (c) => c.name).map((c) => ({
      value: c.name,
      label: c.name
    }));
    arr.unshift({ value: null, label: "All" });
    return arr;
  }, [categories]);

  if (articlesError || categoriesError) return "Failed";

  if (!result) return "Loading...";

  return (
    <div>
      <h1>Blog List</h1>
      <Select
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
        options={options}
        style={{ width: "200px" }}
        placeholder="Select a category"
      />
      <Table dataSource={result} columns={columns} />
    </div>
  );
}
