import { useState, useEffect, useCallback } from "react";
import { PageHeader, Input, Pagination } from "antd";
import { useDebouncedCallback } from "use-debounce";

import { searchCharacters } from "../services/characterApi";
import CharacterList from "../components/CharacterList";
import CharacterDetail from "../components/CharacterDetail";

const { Search } = Input;

const CharacterPage = () => {
  const [chars, setChars] = useState([]);
  const [searchParams, setSearchParams] = useState({ page: 1, pageSize: 10 });
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const { page, pageSize } = searchParams;

  const fetchData = useCallback(
    async (search) => {
      setLoading(true);
      try {
        const { data, lastPage } = await searchCharacters({
          name: search,
          page,
          pageSize,
        });

        setLastPage(lastPage);
        setChars(data);
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize]
  );

  useEffect(() => {
    fetchData("");
  }, [fetchData]);

  const handleSearchChange = useDebouncedCallback(fetchData, 500);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Characters"
        subTitle="List of all characters"
      />
      <div className="page-content">
        <Search
          placeholder="Search Characters By Name"
          allowClear
          enterButton="Search"
          onSearch={handleSearchChange}
          loading={loading}
        />
        <div style={{ padding: "20px 0px" }}>
          <CharacterList
            characters={chars}
            loading={loading}
            pageSize={pageSize}
          />
        </div>
        <Pagination
          onChange={(value) =>
            setSearchParams({ ...searchParams, page: value })
          }
          total={lastPage * pageSize}
          current={page}
          defaultCurrent={1}
          defaultPageSize={10}
          onShowSizeChange={(page, size) =>
            setSearchParams({ ...searchParams, pageSize: size })
          }
        />
        {selected && (
          <CharacterDetail id={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
};

export default CharacterPage;
