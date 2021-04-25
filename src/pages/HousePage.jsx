import { useState, useEffect } from "react";
import { PageHeader, Input, Pagination, Drawer } from "antd";
import useBus from "use-bus";
import { useTitle } from "hookrouter";

import useFetch from "../hooks/useFetch";
import { searchHouses } from "../services/houseApi";
import HouseDetail from "../components/HouseDetail";
import HouseCard from "../components/HouseCard";
import withList from "../components/shared/withList";
import { navigate } from "hookrouter";

const HouseList = withList(HouseCard);
const { Search } = Input;

const HousePage = ({ id }) => {
  useTitle("Houses Page");
  const [searchParams, setSearchParams] = useState({
    name: "",
    page: 1,
    pageSize: 10,
  });
  const [selected, setSelected] = useState(null);
  const { payload, isLoading: loading } = useFetch(searchHouses, searchParams);
  const {
    data: { houses, lastPage = 0 },
  } = payload || { data: {} };

  useEffect(() => {
    if (id) {
      setSelected(id);
    }
  }, [id]);

  useBus(
    "HOUSE_SELECTED",
    (event) => {
      navigate(`houses/${event.payload}`);
    },
    [setSelected]
  );

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Houses"
        subTitle="List of all houses"
      />
      <div className="page-content">
        <Search
          placeholder="Search Houses By Name"
          allowClear
          enterButton="Search"
          onSearch={(name) =>
            setSearchParams({ ...searchParams, name, page: 1 })
          }
          loading={loading}
        />
        <div style={{ padding: "20px 0px" }}>
          <HouseList data={houses} loading={loading} />
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
          <PageHeader title="House Detail" />
          {selected && (
            <HouseDetail id={selected} characterLinkMode="navButton" />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default HousePage;
