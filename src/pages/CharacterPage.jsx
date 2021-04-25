import { useEffect, useState } from "react";
import { PageHeader, Input, Pagination, Drawer } from "antd";
import useBus from "use-bus";
import { useTitle } from "hookrouter";

import useFetch from "../hooks/useFetch";
import { searchCharacters } from "../services/characterApi";
import CharacterDetail from "../components/CharacterDetail";
import withList from "../components/shared/withList";
import CharacterCard from "../components/CharacterCard";
import { navigate } from "hookrouter";

const CharacterList = withList(CharacterCard);

const { Search } = Input;

const CharacterPage = ({ id }) => {
  useTitle("Characters Page");
  const [searchParams, setSearchParams] = useState({
    name: "",
    page: 1,
    pageSize: 10,
  });
  const [selected, setSelected] = useState(null);
  const { payload, isLoading: loading } = useFetch(
    searchCharacters,
    searchParams
  );
  const {
    data: { characters, lastPage = 0 },
  } = payload || { data: {} };

  useEffect(() => {
    if (id) {
      setSelected(id);
    }
  }, [id]);

  useBus(
    "CHARACTER_SELECTED",
    (event) => {
      navigate(`characters/${event.payload}`);
    },
    [setSelected]
  );

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
          onSearch={(name) =>
            setSearchParams({ ...searchParams, name, page: 1 })
          }
          loading={loading}
        />
        <div style={{ padding: "20px 0px" }}>
          <CharacterList data={characters} loading={loading} />
        </div>
        <Pagination
          onChange={(page, pageSize) =>
            setSearchParams({
              ...searchParams,
              page: searchParams.pageSize !== pageSize ? 1 : page,
              pageSize,
            })
          }
          total={lastPage * searchParams.pageSize}
          current={searchParams.page}
          pageSizeOptions={[10, 20, 50]}
        />
        <Drawer
          width={640}
          visible={!!selected}
          onClose={() => setSelected(null)}
          mask={false}
        >
          <PageHeader title="Character Detail" />
          {selected && (
            <CharacterDetail id={selected} houseLinkMode="navButton" />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default CharacterPage;
