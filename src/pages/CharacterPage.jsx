import { useState } from "react";
import { PageHeader, Input, Pagination, Drawer } from "antd";

import useFetch from "../hooks/useFetch";

import { searchCharacters } from "../services/characterApi";
import CharacterList from "../components/CharacterList";
import CharacterDetail from "../components/CharacterDetail";
import useBus from "use-bus";
import HouseDetail from "../components/HouseDetail";

const { Search } = Input;

const CharacterPage = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    page: 1,
    pageSize: 10,
  });
  const [selected, setSelected] = useState(null);
  const [selHouse, setSelHouse] = useState(null);
  const { payload, isLoading: loading } = useFetch(
    searchCharacters,
    searchParams
  );
  const {
    data: { characters, lastPage = 0 },
  } = payload || { data: {} };

  useBus(
    "CHARACTER_SELECTED",
    (event) => {
      setSelected(event.payload);
    },
    [setSelected]
  );

  useBus(
    "HOUSE_SELECTED",
    (event) => {
      setSelHouse(event.payload);
    },
    [setSelHouse]
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
          <CharacterList
            characters={characters}
            loading={loading}
            pageSize={searchParams.pageSize}
          />
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
          {selected && <CharacterDetail id={selected} />}
        </Drawer>
        <Drawer
          width={640}
          placement="left"
          visible={!!selHouse}
          onClose={() => setSelHouse(null)}
          mask={false}
        >
          <PageHeader title="House Detail" />
          {selHouse && <HouseDetail id={selHouse} />}
        </Drawer>
      </div>
    </div>
  );
};

export default CharacterPage;
